import { Entity, Column, PrimaryColumn } from "typeorm";

import { v4 as uuid } from "uuid";

@Entity("address")
export class Addresses {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  district: string;

  @Column()
  zipCode: string;

  @Column({ nullable: true })
  number: string;

  @Column()
  city: string;

  @Column()
  state: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
