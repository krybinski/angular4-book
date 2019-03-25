import { User } from '../interfaces/User';

export class UserData {

  constructor(
    public token: string,
    public user: User
  ) {}

}
