import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { Team } from "./team.entitie";
import { StadiumArea } from ".";

@Entity("stadium")
class Stadium {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 255 })
  name: string;
  @Column("int")
  capacity: number;

  @Column("int")
  ticket: number;

  @ManyToOne(() => StadiumArea, (stadiumArea) => stadiumArea.stadium, {
    nullable: true
  })
  stadiumArea: StadiumArea;
  @OneToMany(() => Team, (team) => team.stadium)
  team: Team;
}

export { Stadium };
