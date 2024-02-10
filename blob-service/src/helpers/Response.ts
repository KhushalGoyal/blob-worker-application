export default class BaseResponse {
    public status: number;
    public message: string;
    constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }
}

export class SuccessResponse extends BaseResponse {
    public data = {};
    constructor(status: number, message: string, data: any) {
        super(status, message)
        this.data = data
    }
}

export class ErrorResponse extends BaseResponse {
    errors = [];
    constructor(status: number, message: string, errors: []) {
        super(status, message)
        this.errors = errors;
    }
}