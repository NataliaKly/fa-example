import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoryDto } from "@fa-example/models/category.dto";
import { CostsService } from "../../service/costs.service";
import { ActivatedRoute, Router } from "@angular/router";
import moment from "moment";
import { CostDto } from "@fa-example/models/cost.dto";

@Component({
  selector: "fa-new-day-info",
  templateUrl: "./new-day-info.component.html",
  styleUrls: ["./new-day-info.component.less"]
})
export class NewDayInfoComponent implements OnInit {
  public month: string = "";
  public day: string = "";
  public date: moment.Moment = moment();
  public formGroup: FormGroup;
  public categories: CategoryDto[] = [];
  public loading: boolean = false;

  public get dateString(): string {
    return this.date.format("DD.MM.YYYY");
  }

  public get formArray(): FormArray {
    return this.formGroup.get("items") as FormArray;
  }

  constructor(
    public costsService: CostsService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
    this.loading = true;
    this.route.params.subscribe(params => {
      this.month = params?.month;
      this.day = params?.day;
      this.date = moment(this.month + "-" + this.day, "MMMM-D");

      this.costsService.getCategories().subscribe((categories: CategoryDto[]) => {
        this.categories = categories;
        this.loading = false;

        this.addControl();
      });
    });
  }

  public save(): void {
    this.costsService.saveCosts(this.formArray.value).subscribe(() => {
      this.router.navigate(["/", this.month, this.day]);
    });
  }

  public addControl(): void {
    this.formArray.push(
      this.formBuilder.group({
        title: ["", [Validators.required]],
        amount: [null, [Validators.required, Validators.min(1)]],
        category: [null, [Validators.required]],
        date: [this.date.toISOString(true)]
      })
    );
  }

  public backToCalendar(): void {
    this.router.navigate(["/", this.month]);
  }
}
