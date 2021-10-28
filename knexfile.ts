// Arquivo de configuração de conexão ao banco de dados // Utilizando Knex
import path from 'path';
export default {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'test',
            database: 'profitfy',
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
        },
        seeds: {
            directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
        },
    },
};
