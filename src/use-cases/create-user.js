import {v4 as uuid4} from 'uuid';
import bcrypt from 'bcrypt';
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js';
import { PostgresGetUserByEmail } from '../repositories/postgres/get-user-by-email.js';
import { EmailAlreadyInUserError } from '../errors/use.js';

export class CreateUserCase {
    async execute (createUserParams) {

        const postgresGetUserByEmail = new PostgresGetUserByEmail();

        const userWithProviderEmail = await postgresGetUserByEmail.execute(
            createUserParams.email
        );

        if(userWithProviderEmail) {
            throw new EmailAlreadyInUserError(createUserParams.email);
        }
        
        const userId = uuid4();

        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        const user = { 
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        const postgresCreateUserRepository = new PostgresCreateUserRepository();

        return await postgresCreateUserRepository.execute(user);
    }
}