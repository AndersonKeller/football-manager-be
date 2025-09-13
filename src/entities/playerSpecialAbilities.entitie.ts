import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { SpecialAbility, Player } from ".";

@Entity("player_special_abilities")
class PlayerSpecialAbilities {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column("boolean")
  active: boolean;
  @ManyToOne(() => Player, (player) => player.specialAbilities, {
    nullable: false
  })
  player: Player;
  @ManyToOne(
    () => SpecialAbility,
    (specialAbility) => specialAbility.playerSpecialAbilities,
    {
      nullable: false
    }
  )
  specialAbility: SpecialAbility;
}

export { PlayerSpecialAbilities };
