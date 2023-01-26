
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            DB_USER: string;
            DB_PWD: string;
            DB_NAME: string;
            DB_URL: string;
            JWT_PVK: string;
        }
    }
}

export {};
