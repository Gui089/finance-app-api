import {v4 as uuid4} from 'uuid';
import bcrypt from 'bcrypt';
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user';

export class CreateUserCase {
    async execute (createUserParams) {
        
        const userId = uuid4();

        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        const user = { 
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }
        return await PostgresCreateUserRepository.execute(user);
    }
}