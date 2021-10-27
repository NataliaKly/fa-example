import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CostDao } from "../../db/domain/cost.dao";
import { Between, Repository } from "typeorm";
import { CostDto } from "@fa-example/models/cost.dto";
import { Response, Request } from "express";
import moment = require("moment");

@Controller("/costs")
export class CostsController {
  constructor(
    @InjectRepository(CostDao)
    private costsRepository: Repository<CostDao>
  ) {}

  @Get()
  async getCosts(@Req() req: Request, @Res() res: Response): Promise<void> {
    let date: moment.Moment;
    let endDate: moment.Moment;
    const dateString: string = <string>req.query["date"];

    if (!dateString) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Date is not specified.",
        errorCode: "FA_GET_COSTS_ERROR"
      });
    }
    date = moment(dateString, "MM-DD-YYYY");
    endDate = moment(date).add(1, "d").subtract(1, "ms");

    const costs = await this.costsRepository.find({
      relations: ["category"],
      where: {
        date: Between(date.toISOString(true), endDate.toISOString(true))
      }
    });

    res.status(HttpStatus.OK).send(
      costs.map((cost: CostDao) => ({
        id: cost.id,
        title: cost.title,
        date: cost.date,
        amount: cost.amount,
        category: cost.category
      }))
    );
  }

  @Get("/calendar")
  async getCalendar(@Req() req: Request, @Res() res: Response): Promise<void> {
    let date: moment.Moment;
    let endDate: moment.Moment;
    const dateString: string = <string>req.query["date"];

    if (!dateString) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Date is not specified.",
        errorCode: "FA_GET_CALENDAR_ERROR"
      });
    }
    date = moment(dateString, "MM-DD-YYYY");
    date.set({
      date: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    endDate = moment(date).add(1, "M").subtract(1, "ms");
    const costs = await this.costsRepository.find({
      relations: ["category"],
      where: {
        date: Between(date.toISOString(true), endDate.toISOString(true))
      }
    });
    const days = [];

    for (let i = 1; i < endDate.date() + 1; i++) {
      const costsFoDay = costs.filter((cost: CostDao) => {
        if (moment(cost.date).date() === i) {
          return true;
        }
      });
      days.push({
        day: i,
        costs: costsFoDay.map((cost: CostDao) => ({
          id: cost.id,
          title: cost.title,
          date: cost.date,
          amount: cost.amount,
          category: cost.category
        }))
      });
    }

    res.status(HttpStatus.OK).send({
      month: date.format("MMMM"),
      year: date.format("YYYY"),
      days: days
    });
  }

  @Get(":id")
  async getCost(@Param() params): Promise<CostDto> {
    const cost = await this.costsRepository.findOne(params.id, {
      relations: ["category"]
    });
    return {
      id: cost.id,
      title: cost.title,
      date: cost.date,
      amount: cost.amount,
      category: cost.category
    };
  }

  @Post()
  async addCost(@Body() costs: CostDto[], @Res() res: Response): Promise<void> {
    const savedCost = await this.costsRepository.save(costs);
    savedCost
      ? res.status(201).send(
          savedCost.map(cost => {
            return {
              id: cost.id,
              title: cost.title,
              date: cost.date,
              amount: cost.amount,
              category: cost.category
            };
          })
        )
      : res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: "Data ware not saved.",
          errorCode: "FA_SAVE_ERROR"
        });
  }

  @Patch()
  async updateCost(@Body() cost: CostDto): Promise<CostDto> {
    const editedCost = await this.costsRepository.save({
      id: cost.id,
      title: cost.title,
      date: cost.date,
      amount: cost.amount,
      category: cost.category
    });

    return {
      id: editedCost.id,
      title: editedCost.title,
      date: editedCost.date,
      amount: editedCost.amount,
      category: editedCost.category
    };
  }

  @Delete(":id")
  async deleteCost(@Param() params, @Res() res: Response): Promise<void> {
    await this.costsRepository.delete(params.id);
    res.status(HttpStatus.OK).send();
  }
}
