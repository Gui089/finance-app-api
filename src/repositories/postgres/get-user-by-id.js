import { PostgresHelper } from "../../db/postgres/helper.js";


export class GetUserByIdRepository {
    async execute(userId) {
        const user = await PostgresHelper.query(
            'SELECT * FROM user WHERE id = $1',
            [userId]
        );
    return user[0];
    }
}