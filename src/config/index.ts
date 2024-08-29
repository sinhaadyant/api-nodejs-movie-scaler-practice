import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
};
