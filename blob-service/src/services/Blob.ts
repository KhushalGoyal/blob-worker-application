import { BlobContent } from "../entities/Entities";
import logger from "../helpers/Logger";
import RequestHelper from "../helpers/Request";
import { v4 as uuidv4 } from 'uuid';
import { BlobData } from "../models/BlobModel";

class BlobService {
    private requestHelper: RequestHelper;
    private baseURL: string = 'https://worker.blob.net/' // Worker Service Path toh Post the data
    constructor() {
        this.requestHelper = new RequestHelper()
    }

    async get(uniqueId: string): Promise<BlobContent> {
        logger.info("Get Blob Details " + uniqueId)
        const data = await BlobData.findOne({ where: { uuid: uniqueId } });
        return {
            uuid: data?.getDataValue("uuid"),
            blobType: data?.getDataValue("blobType"),
            blobSize: data?.getDataValue("blobSize"),
            blobLocation: data?.getDataValue("blobLocation"),
            blobOriginalName: data?.getDataValue("blobOriginalName"),
            blobFileName: data?.getDataValue("blobFileName"),
        }
    }

    async addBlob(data: Omit<BlobContent, "uuid">): Promise<BlobContent> {
        /**
         * 1. Create Worker Record 
         */
        const blobData = {
            ...data,
            uuid: uuidv4()
        } as any
        await this.requestHelper.post(this.baseURL, data);
        logger.info("Blob Data :", data)
        await BlobData.create(blobData)
        return blobData;
    }
}

export default BlobService;