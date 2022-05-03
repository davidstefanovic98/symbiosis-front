const http = require("http");
const {constants} = require("http2");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || "3000";
const HttpStatus = constants;

let routes = {};
const proxyFilePath = path.join(__dirname, "proxy.json");
const proxyOverrideFilePath = path.join(__dirname, "proxy.override.json");

const logBody = process.argv.indexOf("--body") !== -1;

if (fs.existsSync(proxyOverrideFilePath)) {
  routes = JSON.parse(fs.readFileSync(proxyOverrideFilePath).toString());
} else if (fs.existsSync(proxyFilePath)) {
  routes = JSON.parse(fs.readFileSync(proxyFilePath).toString());
} else {
  console.error("proxy.js: proxy.json not found in script directory");
  process.exit(1);
}

console.log("Starting proxy server on port " + PORT);
console.log(routes);
http.createServer(onRequest).listen(PORT);

function getOptions(req) {
  let path = req.url;
  const method = req.method;
  const headers = req.headers;
  let hostname = req.hostname || "localhost";
  let port = req.port || PORT;

  const matchedPath = Object.keys(routes).find(path => (new RegExp(path)).test(req.url));

  if (matchedPath) {
    const proxyUrlOrPort = routes[matchedPath];

    if (typeof proxyUrlOrPort === "number") { // if port
      port = proxyUrlOrPort;
    } else if (typeof proxyUrlOrPort === "string") { // if url
      const url = new URL(proxyUrlOrPort);
      port = url.port;
      hostname = url.hostname;

      if (!req.url.startsWith(url.pathname)) {
        path = url.pathname + req.pathname;
      }

    }
  } else {
    throw new Error(`\x1b[31m${req.url} - path is unmapped (consider adding it to proxy[.override].json)\x1b[0m`);
  }

  return {hostname, port, path, method, headers};
}

function onRequest(client_req, client_res) {
  let options;
  try {
    options = getOptions(client_req);
  } catch (e) {
    client_res.writeHead(502, {});
    client_res.end();
    console.error(e.message);
    return;
  }

  let data = "";
  if (logBody)
    client_req.on("data", chunk => {
      data += chunk.toString();
    });

  const proxy = http.request(options, function (res) {
    if (!res.headers["access-control-allow-origin"]) {
      const allowedHeaders = client_req.headers["access-control-request-headers"] || "Authorization, Content-Type";
      res.headers["access-control-allow-origin"] = "*";
      res.headers["access-control-allow-methods"] = "GET, PUT, PATCH, POST, DELETE";
      res.headers["access-control-allow-headers"] = allowedHeaders;
    }
    res.headers["cache-control"] = "no-cache";

    client_res.writeHead(res.statusCode, res.headers);
    res.pipe(client_res, {end: true});

    let clientData = "";
    if (logBody)
      res.on("data", chunk => {
        if (res.headers["content-type"] && res.headers["content-type"].indexOf("application/json") !== -1) {
          clientData += chunk.toString();
        }
      });

    res.on("end", () => {
      if (res.statusCode < 400) {
        process.stdout.write(`${client_req.method} ${client_req.url}\n`);
        if (data.trim()) {
          if (client_req.headers["content-type"] === "application/json") {
            console.log(JSON.stringify(JSON.parse(data), null, 4));
          } else {
            console.log(data);
          }
        }
        process.stdout.write(`-> ${options.hostname}:${options.port}${options.path} ${res.statusCode}\n`);
        if (clientData.trim()) {
          if (res.headers["content-type"] && res.headers["content-type"] === "application/json") {
            console.log(JSON.stringify(JSON.parse(clientData), null, 4));
          }
        }
      } else {
        process.stdout.write(`\x1b[31m${client_req.method} ${client_req.url}\n-> ${options.hostname}:${options.port}${options.path}\x1b[0m ${res.statusCode}\n`);
      }
    });

  });

  proxy.on("error", err => {
    process.stderr.write(`\x1b[31m${client_req.method} ${client_req.url}\n-> error: ${err.message}\x1b[0m\n`);
    client_res.writeHead(HttpStatus.HTTP_STATUS_BAD_GATEWAY);
    client_res.end();
  });

  client_req.pipe(proxy, {end: true});
}
