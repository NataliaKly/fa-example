import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CalendarDto } from "@fa-example/models/calendar-item.dto";
import { CostDto } from "@fa-example/models/cost.dto";
import { CategoryDto } from "@fa-example/models/category.dto";

@Injectable()
export class CostsService {
  constructor(private http: HttpClient) {}

  getCalendar(date: string): Observable<CalendarDto> {
    return this.http.get<CalendarDto>("/api/costs/calendar", {
      params: {
        date: date
      }
    });
  }

  getDayInfo(date: string): Observable<CostDto[]> {
    return this.http.get<CostDto[]>("/api/costs", {
      params: {
        date: date
      }
    });
  }

  public getCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>("/api/categories");
  }

  public saveCategories(categories: CategoryDto[]): Observable<CategoryDto[]> {
    return this.http.post<CategoryDto[]>("/api/categories", categories);
  }

  public saveCosts(costs: CostDto[]): Observable<CostDto[]> {
    return this.http.post<CostDto[]>("/api/costs", costs);
  }

  public update(cost: CostDto): Observable<CostDto> {
    return this.http.patch<CostDto>("/api/costs", cost);
  }

  public getCostById(id: string): Observable<CostDto> {
    return this.http.get<CostDto>("/api/costs/" + id);
  }
}
