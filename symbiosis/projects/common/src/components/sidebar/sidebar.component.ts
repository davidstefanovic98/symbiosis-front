import {AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GenericLink} from "../../util/GenericLink";
import {AuthenticationService} from "../../../../login/src/app/services/authentication.service";
import {MatDrawerMode} from "@angular/material/sidenav";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterContentChecked {
  opened = true;
  mode: MatDrawerMode = 'side';
  showSidebarText = true;
  blockUpdate = true;

  _links: GenericLink[] = [];

  constructor(private auth: AuthenticationService, private cdref : ChangeDetectorRef, public router: Router) {
  }

  ngOnInit() {
    this.triggerResizeEvent();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  @Input()
  get links(): GenericLink[] {
    return this._links;
  }

  set links(links: GenericLink[]) {
    if (links.length > 0) {
      this._links = links;
    }
  }

  public logout() {
    this.auth.logout();
  }

  onResize(event) {
    if (this.blockUpdate) {
      this.blockUpdate = false;
      return;
    }
    if (event.target.innerWidth > 1280) {
      this.mode = "side";
      this.opened = true;
    } else if (event.target.innerWidth <= 1280 && event.target.innerWidth > 480) {
      this.opened = true;
      this.mode = "side";
    } else if (event.target.innerWidth <= 480) {
      this.opened = false;
      this.mode = "over";
    }
  }

  triggerResizeEvent() {
    window.dispatchEvent(new Event("resize"));
  }
}
