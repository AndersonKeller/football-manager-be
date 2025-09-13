import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Stadium } from ".";

@Entity("stadium_area")
class StadiumArea {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 255 })
  name: string;
  @OneToMany(() => Stadium, (stadium) => stadium.stadiumArea)
  stadium: Stadium[];
}

export { StadiumArea };
