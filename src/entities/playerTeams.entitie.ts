import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player, Team } from ".";

@Entity("player_teams")
class PlayerTeams {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @ManyToOne(() => Player, (player) => player.team, {
    nullable: false
  })
  player: Player;
  @ManyToOne(() => Team, (team) => team.playerTeams, {
    nullable: false
  })
  team: Team;
  @Column("boolean")
  starter: boolean;
  @Column("boolean")
  captain: boolean;
  @Column("boolean")
  long_fk_taker: boolean;
  @Column("boolean")
  short_fk_taker: boolean;
  @Column("boolean")
  left_ck_taker: boolean;
  @Column("boolean")
  right_ck_taker: boolean;
  @Column("boolean")
  penalty_taker: boolean;
  @Column("int")
  number: number;
}

export { PlayerTeams };
