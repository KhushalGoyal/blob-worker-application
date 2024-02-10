import { INTEGER, STRING, FLOAT } from "sequelize";
import { sequelize } from "../helpers/SqlConnection";

export const BlobData = sequelize.define("BlobData", {
    id: {
        type: INTEGER,
        primaryKey: true,
    },
    uuid: {
        type: STRING,
        unique: true,
    },
    blobType: {
        type: STRING,
    },
    blobSize: {
        type: STRING,
    },
    blobLocation: {
        type: STRING,
    },
    blobOriginalName: {
        type: STRING,
    },
    blobFileName: {
        type: STRING,
    }
}, {
    tableName: "BlobData",
    timestamps: true,
    freezeTableName: true
})

// BlobData.sync({ alter: true}).then((result) => {
//     console.log(`${BlobData.tableName} Database table is altered`)
// }).catch((err) => {
//     console.log(`Error while altering ${BlobData.tableName}`)
// })