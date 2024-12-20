import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoute from './modules/Auth/auth.route';
import blogRouter from './modules/blog/blog.route';
const app = express();

// middleware
app.use(express.json()),
    app.use(cors());

// Routes
app.use('/api/auth', authRoute)
app.use('/api', blogRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running 🏃‍♂️');
});

export default app;
