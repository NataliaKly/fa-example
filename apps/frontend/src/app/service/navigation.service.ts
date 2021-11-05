import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import moment from "moment";

@Injectable()
export class NavigationService {
  constructor(private router: Router) {}

  public goToMonth(momentDate: moment.Moment): void {
    this.router.navigate(["/", momentDate.format("YYYY"), momentDate.format("MMMM")]);
  }

  public goToDay(momentDate: moment.Moment): void {
    this.router.navigate(["/", momentDate.format("YYYY"), momentDate.format("MMMM"), momentDate.format("D")]);
  }
}
