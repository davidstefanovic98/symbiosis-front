import {Component, OnInit} from '@angular/core';
import {GenericLink} from "../../../../common/src/util/GenericLink";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  links: GenericLink[] = [
    {
      path: "/users",
      icon: "person_search",
      title: "Users"
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
