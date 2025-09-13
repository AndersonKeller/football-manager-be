import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from "typeorm";
import { Team } from ".";

@Entity("formation")
class Formation {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 120 })
  name: string;
  @Column("int")
  defenders: number;
  @Column("int")
  midfielders: number;
  @Column("int")
  forwards: number;
  @OneToMany(() => Team, (team) => team.formation)
  teams: Team[];
}

export { Formation };
