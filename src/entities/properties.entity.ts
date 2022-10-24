import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Addresses } from "./addresses.entity";
import { SchedulesProperties } from "./schedulesUserProperties.entity";
import { Categories } from "./categories.entity";
import { v4 as uuid } from "uuid";

@Entity("properties")
export class Properties {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ default: false })
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  value: number;

  @Column({ type: "integer" })
  size: number;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;

  @OneToOne(() => Addresses)
  @JoinColumn()
  address: Addresses;

  @OneToMany(
    () => SchedulesProperties,
    (schedulesProperties) => schedulesProperties.property
  )
  schedulesProperties: SchedulesProperties[];

  @ManyToOne(() => Categories)
  category: Categories;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
