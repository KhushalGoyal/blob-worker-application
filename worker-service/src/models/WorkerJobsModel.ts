import { INTEGER, STRING, FLOAT } from "sequelize";
import { sequelize } from "../helpers/SqlConnection";
import { WorkJobStatus } from "../entities/Entities";
import { NUMBER } from "sequelize";

export const WorkerJobs = sequelize.define("WorkerJobs", {
    id: {
        type: INTEGER,
        primaryKey: true,
    },
    uuid: {
        type: STRING,
        unique: true,
    },
    blobId: {
        type: STRING,
    },
    status: {
        type: INTEGER,
        defaultValue: WorkJobStatus.RUNNING
    },
    payloadLocation: {
        type: STRING,
    },
    payloadSize: {
        type: NUMBER,
    },
    tenentId: {
        type: STRING,
    },
    clientId: {
        type: STRING,
    },
    email: {
        type: STRING,
    }
}, {
    tableName: "WorkerJobs",
    timestamps: true,
    freezeTableName: true
})

// WorkerJobs.sync({ alter: true}).then((result) => {
//     console.log(`${WorkerJobs.tableName} Database table is altered`)
// }).catch((err) => {
//     console.log(`Error while altering ${WorkerJobs.tableName}`)
// })