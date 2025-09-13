import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Formation, League, Nationality, PlayerTeams, Stadium, User } from ".";

@Entity("team")
class Team {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255 })
  name: string;
  @Column({ length: 45 })
  short: string;
  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date", nullable: true })
  deletedAt: string | null;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => PlayerTeams, (playerTeams) => playerTeams.team)
  playerTeams: PlayerTeams[];
  @ManyToOne(() => League, (league) => league.team, {
    nullable: false
  })
  league: League;

  @ManyToOne(() => Stadium, (stadium) => stadium.team, {
    nullable: false
  })
  stadium: Stadium;
  @ManyToOne(() => Formation, (formation) => formation.teams, {
    nullable: false
  })
  formation: Formation;
  @ManyToOne(() => Nationality, (nationality) => nationality.team, {
    nullable: false
  })
  nationality: Nationality;
}
export { Team };
