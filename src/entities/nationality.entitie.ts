import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { League, Player, Team } from ".";

@Entity("nationality")
class Nationality {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 255 })
  name: string;

  @OneToMany(() => Player, (player) => player.nationality)
  players: Player[];

  @OneToMany(() => Team, (team) => team.nationality)
  team: Team[];

  @OneToMany(() => League, (league) => league.nationality)
  league: League[];
}

export { Nationality };
