import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import {
  Nationality,
  PlayerAbilities,
  PlayerAppearances,
  PlayerPositions,
  PlayerSettings,
  PlayerSpecialAbilities,
  PlayerTeams
} from ".";

@Entity("player")
class Player {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  strip_name: string;

  @ManyToOne(() => Nationality, (nationality) => nationality.players, {
    nullable: false
  })
  nationality: Nationality;

  @OneToMany(() => PlayerAbilities, (abilitiy) => abilitiy.player)
  abilities: PlayerAbilities[];
  @OneToMany(() => PlayerAppearances, (appearances) => appearances.player)
  appearances: PlayerAppearances[];
  @OneToMany(() => PlayerPositions, (playerPositions) => playerPositions.player)
  position: PlayerPositions[];
  @OneToMany(() => PlayerSettings, (playerSettings) => playerSettings.player)
  settings: PlayerSettings[];
  @OneToMany(() => PlayerTeams, (playerTeams) => playerTeams.player)
  team: PlayerTeams;
  @OneToMany(
    () => PlayerSpecialAbilities,
    (playerSpecialAbilities) => playerSpecialAbilities.player
  )
  specialAbilities: PlayerSpecialAbilities[];
}

export { Player };
