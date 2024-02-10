export type BlobContent = {
    uuid: string,
    blobType: string | undefined,
    blobLocation: string,
    blobSize: number | undefined,
    blobFileName: string | undefined,
    blobOriginalName: string | undefined, 
}

export type QueryObject = {
    id: string
}

export type SuccessPayload = {
    success: boolean,
    data?: BlobContent,
}
