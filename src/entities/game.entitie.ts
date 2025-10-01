import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Team } from "./team.entitie";
import { Schedule } from "./schedule.entitie";
import { Round } from "./round.entitie";

@Entity("game")
class Game {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  round: number;

  @ManyToOne(() => Team, (team) => team.home)
  home: Team;

  @ManyToOne(() => Team, (team) => team.away)
  away: Team;

  @ManyToOne(() => Schedule, (schedule) => schedule.game)
  schedule: Schedule;

  @OneToMany(() => Round, (game) => game.game)
  schedule_round: Game[];
}

export { Game };
