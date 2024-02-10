import { Sequelize } from "sequelize";
import logger from "./Logger";

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: '../database/blob-service-db.sqlite',
    logging: console.log
})

sequelize.authenticate().then(()=> {
    logger.info("Database is connected!")
}).catch((error: Error) => {
    logger.error("Error while authenticate Database", error.message)
})
