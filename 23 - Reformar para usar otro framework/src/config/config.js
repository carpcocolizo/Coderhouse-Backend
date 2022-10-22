import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 8080,
  productId: process.env.PRODUCTIDTEST,
  productId2: process.env.PRODUCTIDTEST2,
  mongodb: {
    connectionString: process.env.CONNECTIONSTRING,
  },
};
