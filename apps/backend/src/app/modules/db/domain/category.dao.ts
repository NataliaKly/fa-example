import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CostDao } from './cost.dao';

@Entity("category")
export class CategoryDao {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  title: string;

  @OneToMany(type => CostDao, costs => costs.category, {
    nullable: false
  })
  costs: CostDao[];
}
