import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Appearance, AppearanceValue, Player } from ".";

@Entity("player_appearances")
class PlayerAppearances {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column("int")
  value: number;
  @ManyToOne(() => Player, (player) => player.appearances, {
    nullable: false
  })
  player: Player;
  @ManyToOne(() => Appearance, (appearance) => appearance.playerAppearances, {
    nullable: false
  })
  appearance: Appearance;
  @ManyToOne(
    () => AppearanceValue,
    (appearanceValue) => appearanceValue.playerAppearances,
    {
      nullable: true
    }
  )
  appearanceValue: AppearanceValue;
}

export { PlayerAppearances };
