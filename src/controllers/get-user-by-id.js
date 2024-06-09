import validator from "validator";
import { badRequest, ok, serverError } from "./helper.js";

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            
            const isIdValid = validator.isUUID(httpRequest.params.userId);

            if(!isIdValid) {
                return badRequest({
                    message: 'The provided id is not valid',
                });
            }

            const getUserByIdUseCase = new GetUserByIdController();

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId
            );

            return ok(user);
        }catch(error) {
            console.error(error);
            return serverError();
        }
    }
}