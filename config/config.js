module.exports = {
    secret: 'superSecret',
    port: 8000,
    development: {
        dialect: "sqlite",
        storage: "../db/db.development.sqlite"
    },
    test: {
        dialect: "sqlite",
        storage: ":memory:"
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: 'mysql',
    }
};
