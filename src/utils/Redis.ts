import Redis from "ioredis";

const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = parseInt(process.env.REDIS_PORT || "6379");

class RedisService {
    private redis: Redis;

    constructor() {
        if (
            redisHost.startsWith("redis://") ||
            redisHost.startsWith("rediss://")
        ) {
            this.redis = new Redis(redisHost);
        } else {
            this.redis = new Redis({
                host: redisHost,
                port: redisPort,
            });
        }

        this.redis.on("connect", () => {
            console.log("Redis client connected");
        });
        this.redis.on("error", (err: Error) => {
            console.error("Redis error:", err);
        });
    }

    async get(key: string): Promise<string | null> {
        return this.redis.get(key);
    }

    async set(key: string, value: string, ttl?: number): Promise<void> {
        if (ttl) {
            await this.redis.set(key, value, "EX", ttl);
        } else {
            await this.redis.set(key, value);
        }
    }

    async del(key: string): Promise<void> {
        this.redis.del(key);
    }
}

export default RedisService;
