import { CategoryDto } from "@fa-example/models/category.dto";

export interface CostDto {
  id: string;
  title: string;
  date: string;
  amount: number;
  category: CategoryDto;
}
