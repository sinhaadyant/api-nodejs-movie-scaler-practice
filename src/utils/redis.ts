import Redis from "ioredis";
import config from "../config"; // Adjust the path if needed

// Define a connection URL for Redis
const redisUrl = config.redisUrl || "redis://localhost:6379"; // Fallback to localhost if not set

// Create the Redis client
const redisClient = new Redis(redisUrl);

// Optional: Handle Redis connection events
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

// Optional: Handle reconnection attempts
redisClient.on("reconnecting", (time: number) => {
  console.log(`Reconnecting to Redis in ${time} ms...`);
});

// Optional: Log connection closed
redisClient.on("close", () => {
  console.log("Redis connection closed");
});

// Optional: Log when connection is lost
redisClient.on("end", () => {
  console.log("Redis connection ended");
});

export default redisClient;
