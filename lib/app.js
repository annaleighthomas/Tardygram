import express from 'express';
import cookieParser from 'cookie-parser';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import authController from './controllers/auth.js';
import postController from './controllers/posts.js';
import commentController from './controllers/comments.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(authController);
app.use(postController); 
app.use(commentController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
