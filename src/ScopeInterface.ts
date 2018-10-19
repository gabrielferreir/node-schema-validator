export interface Config {
    statusCode: number;
}

export interface Errors {
    attribute: string;
    type: string;
    message: string;
}

export interface ParamValidator {
    key: string;
    property: any;
    value: any;
}