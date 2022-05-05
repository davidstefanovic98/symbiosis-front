import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../common/src/environments/environment";
import jwt_decode from "jwt-decode";

export interface JwtToken {
  roles: string[];
  exp: number;
  iat: number;
  sub: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private static USER_TOKEN: string = "tokenuljarkovic";

  constructor(private httpClient: HttpClient) {

  }

  public login(email: string, password: string) {
    return this.httpClient.post(`${environment.baseUrl}/login`, {
      "email": email,
      "password": password,
    }, {responseType: 'text'})
      .subscribe(data => {
        if (data) {
          try {
            this.setToken(data);
            this.roleRouting();
          } catch (e) {
            console.log(e);
          }
        }
      });
  }

  private setToken(token: string) {
    localStorage.setItem(AuthenticationService.USER_TOKEN, token);
  }

  private static decodeToken(token: string): JwtToken {
    return jwt_decode(token);
  }

  private hasRole(roles: string[], role: string) {
    return roles.some(r => r === role);
  }

  private getRoles() {
    const token = localStorage.getItem(AuthenticationService.USER_TOKEN);
    if (token) {
      return AuthenticationService.decodeToken(token).roles;
    }
  }

  private roleRouting() {
    if (this.hasRole(this.getRoles(), "ROLE_ADMIN")) {
      window.location.href = environment.adminUrl;
    } else {
      // window.location.href = environment.loginUrl;
    }
  }

  public logout() {
    localStorage.removeItem(AuthenticationService.USER_TOKEN);
    this.goToLogin();
  }

  private goToLogin() {
    if (environment.production) {
      window.open(`${location.origin}/${environment.loginUrl}`, "_self");
    } else {
      window.open(environment.loginUrl, "_self");
    }
  }
}

