import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { League } from ".";

@Entity("league_category")
class LeagueCategory {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 255 })
  name: string;
  @OneToMany(() => League, (league) => league.category)
  leagues: League[];
}

export { LeagueCategory };
