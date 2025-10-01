import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { League } from "./league.entity";
import { Game } from "./game.entitie";
import { Round } from "./round.entitie";

@Entity("schedule")
class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  year: number;

  @Column({ type: "int" })
  month: number;

  @ManyToOne(() => League, (league) => league.schedule)
  league: League;

  @OneToMany(() => Game, (game) => game.schedule)
  game: Game;

  @OneToMany(() => Round, (round) => round.schedule)
  schedule: Round[];
}

export { Schedule };
