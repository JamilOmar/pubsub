import {getConnection} from 'typeorm';
import {User} from '../models/user.model';

export function getRepository() {
  const conn = getConnection();
  const userRepository = conn.getRepository(User);
  return userRepository;
}
