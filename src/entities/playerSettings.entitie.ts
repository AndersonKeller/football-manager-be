import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Setting, SettingValue, Player } from ".";

@Entity("player_settings")
class PlayerSettings {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column("varchar", { nullable: true })
  value: string | null;
  @ManyToOne(() => Player, (player) => player.position, {
    nullable: false
  })
  player: Player;

  @ManyToOne(() => Setting, (setting) => setting.settings, {
    nullable: false
  })
  setting: Setting;
  @ManyToOne(() => SettingValue, (settingValue) => settingValue.playerSetting, {
    nullable: true
  })
  settingValue: SettingValue;
}

export { PlayerSettings };
