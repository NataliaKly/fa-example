import { CostDto } from "@fa-example/models/cost.dto";

export interface CalendarItemDto {
  day: string;
  costs: CostDto[];
}

export interface CalendarDto {
  month: string;
  year: string;
  days: CalendarItemDto[];
}
