import Validators from './validators';
import InvalidParam from './InvalidParam';
import {Config, Errors, ParamValidator} from "./ScopeInterface";

export default class Scope {

    private config: Config;
    public errors: Errors[];

    constructor(config: Config) {
        this.setConfig(config);
        this.errors = [];
    }

    public init(params: any, schema: any) {
        const response = this.validate(params, schema, null);
        if (response)
            throw new InvalidParam(response);
        return response
    }

    public validate(params: any, schema: any, heritage: string) {
        if (Array.isArray(params))
            params.forEach((obj, index) => this.validateObject(obj, schema, `${heritage}[${index}]`));
        else
            this.validateObject(params, schema, heritage);

        return this.errors.length ? this.errors : null;
    }

    private callFunction(name: string, params: ParamValidator) {
        if (name === 'simpleChild') {
            params.value.forEach((value, index) => {
                const keys = Object.keys(params.property);
                keys.forEach(key => {
                    const response = this.callFunction(key, {
                        key: params.key + index,
                        property: params.property[key],
                        value: value
                    });
                    response && this.errors.push(response);
                });
            })
        } else if (name === 'childs') {
            this.validate(params.value, params.property, params.key);
        } else {
            return Validators[name](params);
        }
    }

    private validateObject(params: any, schema: any, heritage: string) {
        const keys = Object.keys(schema);
        keys.forEach(key => {
            const arrayProperties = Object.keys(schema[key]);
            arrayProperties.forEach(propertyValidator => {
                const valueProperty = schema[key][propertyValidator];
                const response = this.callFunction(propertyValidator, {
                    key: heritage ? `${heritage}.${key}` : key,
                    property: valueProperty,
                    value: params ? params[key] : undefined
                });
                response && this.errors.push(response);
            });
        });
    }

    private setConfig(config: Config) {
        if (!config) {
            config = {
                statusCode: null
            };
        }
        this.config = {
            statusCode: config.statusCode || 400
        };
    }

}