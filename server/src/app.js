import cookieParser from 'cookie-parser';
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import adminRoutes from "./routes/admin.routes.js";
import cors from 'cors';
const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.use((error, req, res, next) => {
    console.error(error);

    res.status(400).json({
        message: error.message
    });
});

app.get('/',(req, res)=>{
    res.send('server is running');
})

export default app;