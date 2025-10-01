import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./game.entitie";
import { Schedule } from "./schedule.entitie";

@Entity("schedule_round")
class Round {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "int" })
  round: number;

  @ManyToOne(() => Game, (game) => game.schedule_round)
  game: Game;

  @ManyToOne(() => Schedule, (schedule) => schedule.schedule)
  schedule: Schedule;
}

export { Round };
