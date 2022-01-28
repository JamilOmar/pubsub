import { injectable } from 'inversify';
import { IUser } from '../interfaces';
@injectable()
export class User implements IUser {
  constructor(
    public email: string,
    public name: string,
    public _id?: string
  ) { }
}