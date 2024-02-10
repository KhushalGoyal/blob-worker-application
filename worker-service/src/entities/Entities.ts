export type WorkerJob = {
    uuid: string,
    blobId: string,
    tenentId: string,
    clientId: string,
    email: string,
    payloadLocation: string,
    payloadSize: string,
    status: string,
}

export type QueryObject = {
    id: string
}

export type SuccessPayload = {
    success: boolean,
    data?: WorkerJob,
}

export enum WorkJobStatus {
    RUNNING,
    SUCCESS,
    FAILED
}

export type User = {
    tenentId: string,
    clientId: string,
    email: string,
}