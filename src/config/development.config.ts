/* eslint-disable prettier/prettier */
const developmentConfig = {
  db: {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    params: {
      host: process.env.DATABASE_HOST,
      dialect: process.env.DATABASE_DIALECT,
      define: {
        underscored: true,
        charset: process.env.DATABASE_CHARSET,
        dialectOptions: {
          collate: process.env.DATABASE_DIALECT_COLLATE,
        },
      },
    },
  },
  jwt: {
    secret: process.env.JWT_SECRETKEY,
    options: {
      session: false,
    },
  },
};
export default developmentConfig;