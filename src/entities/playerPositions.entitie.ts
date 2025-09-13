import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Player, Position } from ".";

@Entity("player_positions")
class PlayerPositions {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("boolean")
  registered: boolean;

  @ManyToOne(() => Player, (player) => player.position, {
    nullable: false
  })
  player: Player;

  @ManyToOne(() => Position, (position) => position.position, {
    nullable: false
  })
  position: Position;
}

export { PlayerPositions };
