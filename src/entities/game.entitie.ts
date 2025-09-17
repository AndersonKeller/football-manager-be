import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "./team.entitie";
import { Schedule } from "./schedule.entitie";

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
}

export { Game };
