import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { PlayerPositions, PositionCategory } from ".";

@Entity("position")
class Position {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 255 })
  name: string;
  @Column({ length: 255 })
  description: string;
  @Column({ length: 45 })
  short: string;
  @ManyToOne(
    () => PositionCategory,
    (positionCategory) => positionCategory.positions,
    {
      nullable: false
    }
  )
  positionCategory: PositionCategory;
  @OneToMany(() => PlayerPositions, (playerPositions) => playerPositions.player)
  position: PlayerPositions[];
}

export { Position };
