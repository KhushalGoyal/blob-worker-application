import { WorkJobStatus, WorkerJob } from "../entities/Entities";
import logger from "../helpers/Logger";
import RequestHelper from "../helpers/Request";
import { WorkerJobs } from "../models/WorkerJobsModel";
import { v4 as uuidv4 } from 'uuid';

class WorkService {
    private requestHelper: RequestHelper;
    private baseURL: string = 'https://worker.cloud.net/' // Worker Service Path toh Post the data
    constructor() {
        this.requestHelper = new RequestHelper()
    }

    async get(uniqueId: string): Promise<WorkerJob> {
        logger.info("Get Worker Details " + uniqueId)
        const data = await WorkerJobs.findOne({ where: { uuid: uniqueId } });
        console.log(data?.dataValues)
        return {
            uuid: data?.getDataValue("uuid"),
            blobId: data?.getDataValue("blobId"),
            tenentId: data?.getDataValue("tenentId"),
            clientId: data?.getDataValue("clientId"),
            payloadLocation: data?.getDataValue("payloadLocation"),
            payloadSize: data?.getDataValue("payloadSize"),
            status: WorkJobStatus[data?.getDataValue("status")],
            email: data?.getDataValue("email"),
        }
    }

    async addJob(data: Omit<WorkerJob, "uuid" | "status">): Promise<Omit<WorkerJob, "status">> {
        /**
         * 1. Create Worker Record 
         */
        const workerData : Omit<WorkerJob, "status"> = {
            ...data,
            uuid: uuidv4()
        } as any
        console.log(workerData)
        await this.requestHelper.post(this.baseURL, data);
        logger.info("Add Job ", data)
        await WorkerJobs.create(workerData)
        return workerData;
    }
}

export default WorkService;