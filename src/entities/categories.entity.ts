import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Properties } from "./properties.entity";
import { v4 as uuid } from "uuid";

@Entity("categories")
export class Categories {
  @PrimaryColumn("uuid")
 readonly id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Properties, (properties) => properties.category)
  properties: Properties[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
