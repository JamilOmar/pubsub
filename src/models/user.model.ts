import { injectable } from 'inversify';
import { IUser } from '../interfaces';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  ObjectIdColumn,
  ObjectID
} from "typeorm";

@Entity()
export class User implements IUser {
  @ObjectIdColumn() 
  public id: ObjectID; 
  @Column()
  public email: string;
  @Column()
  public total!: number;
}