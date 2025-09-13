import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Setting, PlayerSettings } from ".";

@Entity("setting_value")
class SettingValue {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 255 })
  value: string;
  @ManyToOne(() => Setting, (setting) => setting.settingValue, {
    nullable: false
  })
  setting: Setting;
  @OneToMany(
    () => PlayerSettings,
    (playerSettings) => playerSettings.settingValue
  )
  playerSetting: PlayerSettings[];
}

export { SettingValue };
