import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryDao } from './category.dao';

@Entity("cost")
export class CostDao {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ type: "timestamp", nullable: false})
  date: string;

  @Column({ nullable: false, default: 0 })
  amount: number;

  @ManyToOne(type => CategoryDao, category => category.costs, {
    onDelete: 'CASCADE'
  })
  category: CategoryDao;

}
