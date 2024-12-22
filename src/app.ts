import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoute from './modules/Auth/auth.route';
import blogRouter from './modules/blog/blog.route';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import { AdminRoutes } from './modules/admin/admin.route';
const app = express();

// middleware
app.use(express.json()),
    app.use(cors());

// Routes
app.use('/api/auth', authRoute)
app.use('/api', blogRouter)
app.use('/api', AdminRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running 🏃‍♂️');
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
