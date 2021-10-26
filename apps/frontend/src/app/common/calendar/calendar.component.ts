import { Component, HostBinding, OnInit } from "@angular/core";
import { CostsService } from "../../service/costs.service";
import moment from "moment";
import { CalendarDto, CalendarItemDto } from "@fa-example/models/calendar-item.dto";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewModeEnum } from "../../enums/view-mode.enum";
import { ActionEnum } from "../../enums/action.enum";

@Component({
  selector: "fa-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.less"]
})
export class CalendarComponent implements OnInit {
  @HostBinding("class.fa-calendar")
  private hostClass: boolean = true;

  public date: moment.Moment = moment();
  public calendar: CalendarDto;
  public month: string = "";

  public readonly mode = ViewModeEnum.CALENDAR;
  public readonly actions: typeof ActionEnum = ActionEnum;
  public readonly daysTitles: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  public isToday(day: string): boolean {
    const currentMoment = moment();
    return this.month + "-" + day === currentMoment.format("MMMM-D");
  }

  constructor(public calendarService: CostsService, private router: Router, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.month = params?.month || moment().format("MMMM");
      this.date = moment(this.month, "MMMM");
      this.calendarService.getCalendar(this.date.format("MM-DD-YYYY")).subscribe((calendar: CalendarDto) => {
        this.calendar = calendar;
      });
    });
  }

  public trackByFn(index: number, item: CalendarItemDto): string {
    return item.day;
  }

  public selectDate(date: Date): void {
    this.router.navigate(["/", moment(date).format("MMMM")]);
  }

  public doAction(action: string): void {
    switch (action) {
      case this.actions.CATEGORY:
        this.router.navigate(["/categories"]);
        break;
      case this.actions.BACK:
        this.router.navigate(["/", this.date.subtract(1, "M").format("MMMM")]);
        break;
      case this.actions.NEXT:
        this.router.navigate(["/", this.date.add(1, "M").format("MMMM")]);
        break;
    }
  }
}
