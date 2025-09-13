import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Position } from ".";


@Entity("position_category")
class PositionCategory {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 255 })
  name: string;
  @Column({ length: 40 })
  short: string;

  @OneToMany(() => Position, (position) => position.positionCategory)
  positions: Position[];
}

export { PositionCategory };
