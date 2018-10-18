const helpers = require("./helpers");

module.exports = {
    required: param => {
        if (param.propertyValue === true && !param.value) {
            return {
                message: `${param.name} is required`,
                type: 'required',
                attribute: param.name
            }
        }
    },
    type: param => {
        if (param.value && param.value.constructor !== param.propertyValue) {
            return {
                message: `${param.name} must be ${param.propertyValue.name} type`,
                type: 'type',
                attribute: param.name
            }
        }
    },
    isEqual: param => {
        if (param.value) {
            if (Array.isArray(param.propertyValue)) {
                if (!param.propertyValue.includes(param.value)) {
                    return {
                        message: `${param.name} must be one of those values: [${param.propertyValue}]`,
                        type: 'isEqual',
                        attribute: param.name
                    }
                }
            }
            else if (param.value != param.propertyValue) {
                return {
                    message: `${param.name} should be equal to ${param.propertyValue}`,
                    type: 'isEqual',
                    attribute: param.name
                }
            }
        }
    },
    minLength: param => {
        if (param.value && param.value.length < param.propertyValue) {
            return {
                message: `${param.name} must be greater than ${param.propertyValue} characters`,
                type: 'minLength',
                attribute: param.name
            }
        }
    },
    maxLength: param => {
        if (param.value && param.value.length > param.propertyValue) {
            return {
                message: `${param.name} must be less than ${param.propertyValue} characters`,
                type: 'maxLength',
                attribute: param.name
            }
        }
    },
    minNumber: param => {
        if (param.value && param.value < param.propertyValue) {
            return {
                message: `${param.name} must be a greater number than ${param.propertyValue}`,
                type: 'minNumber',
                attribute: param.name
            }
        }
    },
    maxNumber: param => {
        if (param.value && param.value > param.propertyValue) {
            return {
                message: `${param.name} must be less than ${param.propertyValue}`,
                type: 'maxNumber',
                attribute: param.name
            }
        }
    },
    isEmail: param => {
        const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

        if (param.value && !pattern.test(param.value)) {
            return {
                message: `${param.name} must be a valid email address`,
                type: 'isEmail',
                attribute: param.name
            }
        }
    },
    isCpf: param => {
        if (param.value && !helpers.isCpf(param.value)) {
            return {
                message: `${param.name} must be a valid CPF`,
                type: 'isCpf',
                attribute: param.name
            }

        }
    },
    isCnpj: param => {
        if (param.value && !helpers.isCnpj(param.value)) {
            return {
                message: `${param.name} must be a valid CNPJ`,
                type: 'isCnpj',
                attribute: param.name
            }
        }
            return `${param.name} must be valid`;
    },
    isUrl: param => {

    },
    isHEX: param => {

    },
    isBase64: param => {

    }
};