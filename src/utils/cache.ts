import redisClient from "./redis";
//Setting cache
export const setCache = async (key: string, value: any, expiration: number) => {
  await redisClient.set(key, JSON.stringify(value), "EX", expiration);
};
// get cache data from redis
export const getCache = async (key: string) => {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};

// delete cache
export const deleteCache = async (key: string) => {
  await redisClient.del(key);
};
