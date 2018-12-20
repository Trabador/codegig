module.exports = {
    PORT: process.env.PORT || 5500,
    DBNAME: process.env.DBNAME || 'codegig',
    DBUSER: process.env.DBUSER || 'root',
    DBPASS: process.env.DBPASS || '',
    DIALECT: process.env.DIALECT || 'mysql',
    HOST: process.env.HOST || 'localhost'
};