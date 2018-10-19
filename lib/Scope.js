"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("./validators");
const InvalidParam_1 = require("./InvalidParam");
class Scope {
    constructor(config) {
        this.setConfig(config);
        this.errors = [];
    }
    init(params, schema) {
        const response = this.validate(params, schema, null);
        if (response)
            throw new InvalidParam_1.default(response);
        return response;
    }
    validate(params, schema, heritage) {
        if (Array.isArray(params))
            params.forEach((obj, index) => this.validateObject(obj, schema, `${heritage}(${index})`));
        else
            this.validateObject(params, schema, heritage);
        return this.errors.length ? this.errors : null;
    }
    callFunction(name, params) {
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
            });
        }
        else if (name === 'childs') {
            this.validate(params.value, params.property, params.key);
        }
        else {
            return validators_1.default[name](params);
        }
    }
    validateObject(params, schema, heritage) {
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
    setConfig(config) {
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
exports.default = Scope;
