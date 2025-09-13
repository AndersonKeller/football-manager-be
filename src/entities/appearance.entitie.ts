import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { PlayerAppearances } from "./playerAppearances";
import { AppearanceValue } from ".";

@Entity("appearance")
class Appearance {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 255 })
  name: string;
  @Column("boolean")
  required: boolean;
  @Column("int", { nullable: true })
  min: number | null;
  @Column("int", { nullable: true })
  max: number | null;
  @OneToMany(
    () => AppearanceValue,
    (appearanceValue) => appearanceValue.appearance
  )
  appearanceValue: AppearanceValue[];

  @OneToMany(
    () => PlayerAppearances,
    (playerAppearances) => playerAppearances.appearance
  )
  playerAppearances: PlayerAppearances[];
}
export { Appearance };
