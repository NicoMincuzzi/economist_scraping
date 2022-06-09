class ApiError extends Error {
    get getStatus() {
        return this.status;
    }

    get getFields() {
        return this.fields;
    }

    private readonly status;
    private fields: { code: { message: string } };

    constructor(msg: string = "Generic Error", statusCode: number = 500, code: string = "GENERIC_ERROR") {
        super();
        this.message = msg;
        this.status = statusCode;
        this.name = code;
    }
}

export default ApiError;
