import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ability, Player } from ".";

@Entity("player_abilities")
class PlayerAbilities {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column("int")
  value: number;

  @ManyToOne(() => Player, (player) => player.abilities, {
    nullable: false
  })
  player: Player;
  @ManyToOne(() => Ability, (ability) => ability.player, {
    nullable: false
  })
  ability: Ability;
}

export { PlayerAbilities };
