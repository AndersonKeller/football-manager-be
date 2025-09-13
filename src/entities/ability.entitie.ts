import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PlayerAbilities } from ".";

@Entity("ability")
class Ability {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 255 })
  name: string;
  @Column({ length: 255 })
  description: string;
  @Column("int", { default: 1 })
  min: number;
  @Column("int", { default: 99 })
  max: number;

  @OneToMany(() => PlayerAbilities, (playerAbility) => playerAbility.ability)
  player: PlayerAbilities[];
}

export { Ability };
