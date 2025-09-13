import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { LeagueCategory, Nationality, Team } from ".";

@Entity("league")
class League {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @ManyToOne(() => LeagueCategory, (category) => category.leagues, {
    nullable: false
  })
  category: LeagueCategory;
  @Column({ length: 255 })
  name: string;
  @Column({ length: 52, nullable: true, type: "varchar" })
  strip_name: string | null;

  @OneToMany(() => Team, (team) => team.league)
  team: Team[];

  @ManyToOne(() => Nationality, (nationality) => nationality.league, {
    nullable: false
  })
  nationality: Nationality;
}

export { League };
