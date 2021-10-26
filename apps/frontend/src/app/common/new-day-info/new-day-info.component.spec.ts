import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NewDayInfoComponent } from "./new-day-info.component";

describe("NewDayInfoComponent", () => {
  let component: NewDayInfoComponent;
  let fixture: ComponentFixture<NewDayInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewDayInfoComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDayInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
