class ApiError extends Error {
    get getStatus() {
        return this.status;
    }

    get getFields() {
        return this.fields;
    }

    private readonly status;
    private fields: { name: { message: string } };

    constructor(msg: string = "Generic Error", statusCode: number = 500, name: string = "ApiError") {
        super();
        this.message = msg;
        this.status = statusCode;
        this.name = name;
    }
}

export default ApiError;
