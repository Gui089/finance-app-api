import 'dotenv/config.js';
import express from 'express';

import { CreateUserController } from './src/controllers/create-user.js';

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
    res.status(200).send("Node it's Running");
});

app.post('/api/users', async (req, res) => {
    const createUserController = new CreateUserController();

    const createUserResponse = await createUserController.execute(req);

    res.status(createUserResponse.statusCode).send(createUserResponse.body);
});



app.listen(process.env.PORT, () => console.log(`Listen on ${process.env.PORT}`));