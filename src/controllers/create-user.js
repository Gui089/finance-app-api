import { CreateUserCase } from "../use-cases/create-user.js";
import  validator  from 'validator';
import { badRequest, created, serverError } from "./helper.js";
import { EmailAlreadyInUserError } from "../errors/use.js";

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;
    
            const requiredFields = ['first_name', 'last_name', 'email', 'password'];
            
            for(const field of requiredFields) {
                if(!params[field] || params[field].trim().length === 0) {
                    return badRequest({message:`Missing param ${field}`});
                }
            }

            if(params.password.length < 6) {
                return badRequest({message: 'Password must be at least 6 characters'});
            }

            const emailValid = validator.isEmail(params.email);

            if(!emailValid) {
                return badRequest({message:'Invalid email'});
            }
    
    
            const createUserUseCase = new CreateUserCase(); 
    
            const createdUser = await createUserUseCase.execute(params);
    
            return created(createdUser);
        } catch(error) {
                if(error instanceof EmailAlreadyInUserError) {
                    return badRequest({message: error.message});
                } 
                return serverError();
        }
    }
}