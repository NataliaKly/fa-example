import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from "@angular/core";
import { ActionEnum } from "../../enums/action.enum";
import { ViewModeEnum } from "../../enums/view-mode.enum";

@Component({
  selector: "fa-action-panel",
  templateUrl: "./action-panel.component.html",
  styleUrls: ["./action-panel.component.less"]
})
export class ActionPanelComponent implements OnInit {
  @HostBinding("class.fa-action-panel")
  private hostClass: boolean = true;

  @Input()
  public mode: typeof ViewModeEnum;

  @Input()
  public controlsHidden: boolean = false;

  @Output()
  public actionClick: EventEmitter<string> = new EventEmitter<string>();

  public viewMode: typeof ViewModeEnum = ViewModeEnum;
  public readonly actions: typeof ActionEnum = ActionEnum;

  ngOnInit(): void {}
}
