import { CreateUserCase } from "../use-cases/create-user.js";
import  validator  from 'validator';

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;
    
            //validar a requisisção (Campos obrigatórios e tamanho de senha)
    
            const requiredFields = ['first_name', 'last_name', 'email', 'password'];
            
            for(const field of requiredFields) {
                if(!params[field] || params[field].trim().length === 0) {
                    return {
                        statusCode:400,
                        body: {
                            message: `Missing param: ${field}`
                        },
                    }
                }
            }

            if(params.password.length < 6) {
                return {
                    statusCode:400,
                    body: {
                        errorMessage: 'Password must be at least 6 characters'
                    }
                }
            }

            const emailValid = validator.isEmail(params.email);

            if(!emailValid) {
                return {
                    statusCode:400,
                    body: {
                        errorMessage: 'Invalid email'
                    }
                }
            }
    
            //chamar o use-case
    
            const createUserUseCase = new CreateUserCase(); 
    
            const createdUser = await createUserUseCase.execute(params);
    
            return {
                statusCode: 201,
                body: createdUser
            }
        } catch(error) {
                return {
                    statusCode:500,
                    body: {
                        message: `internal server error ${error.message}`
                    }
                }
        }
    }
}