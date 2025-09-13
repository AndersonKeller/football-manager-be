import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Appearance, PlayerAppearances } from ".";

@Entity("appearance_value")
class AppearanceValue {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 255 })
  value: string;
  @ManyToOne(() => Appearance, (appearance) => appearance.id, {
    nullable: false
  })
  appearance: Appearance;
  @OneToMany(
    () => PlayerAppearances,
    (playerAppearances) => playerAppearances.appearanceValue
  )
  playerAppearances: PlayerAppearances[];
}
export { AppearanceValue };
