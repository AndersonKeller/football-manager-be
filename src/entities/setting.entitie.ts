import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { SettingValue, PlayerSettings } from ".";

@Entity("setting")
class Setting {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 255 })
  name: string;
  @Column({ length: 255 })
  description: string;
  @Column("boolean")
  required: boolean;
  @Column("int", { nullable: true })
  min: number | null;
  @Column("int", { nullable: true })
  max: number | null;
  @OneToMany(() => SettingValue, (settingValue) => settingValue.setting)
  settingValue: SettingValue[];
  @OneToMany(() => PlayerSettings, (playerSettings) => playerSettings.setting)
  settings: PlayerSettings[];
}

export { Setting };
