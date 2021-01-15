const Sequelize = require('sequelize');

// Configuración de la base de datos
const db = new Sequelize('test', 'postgres', 'root', {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
    // pool: {
    //     max: 5,
    //     min: 0,
    //     acquire: 30000,
    //     idle: 10000
    // }
});

// Conecta a la base de datos
const conectarDB = async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {
    conectarDB,
    db
};