import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PlayerSpecialAbilities } from ".";

@Entity("special_ability")
class SpecialAbility {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 255 })
  name: string;
  @Column({ length: 255 })
  description: string;
  @OneToMany(
    () => PlayerSpecialAbilities,
    (playerSpecialAbilities) => playerSpecialAbilities.specialAbility
  )
  playerSpecialAbilities: PlayerSpecialAbilities[];
}

export { SpecialAbility };
