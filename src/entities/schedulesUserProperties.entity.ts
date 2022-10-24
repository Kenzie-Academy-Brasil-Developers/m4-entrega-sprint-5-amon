import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { Properties } from "./properties.entity";
import { User } from "./user.entity";
import { v4 as uuid } from "uuid";

@Entity("schedules")
export class SchedulesProperties {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => Properties)
  property: Properties;

  @ManyToOne(() => User, { eager: true })
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
