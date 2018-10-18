const helpers = require("./helpers");

module.exports = {
    required: param => {
        if (!param.value)
            return `${param.name} is required`;
    },
    type: param => {
        if (param.value && param.value.constructor !== param.propertyValue)
            return `${param.name} must be ${param.propertyValue.name} type`;
    },
    isEqual: param => {
        if (param.value) {
            if (Array.isArray(param.propertyValue)) {
                const result = param.propertyValue.includes(param.value);
                return !result ? `${param.name} must be one of those values: [${param.propertyValue}]` : null
            }
            else if(param.value != param.propertyValue)
                return `${param.name} should be equal to ${param.propertyValue}`;
        }
    },
    minLength: param => {
        if (param.value && param.value.length <= param.propertyValue)
            return `${param.name} it's smaller than ${param.propertyValue}`;
    },
    maxLength: param => {
        if (param.value && param.value.length >= param.propertyValue)
            return `${param.name} it's bigger than ${param.propertyValue}`;
    },
    minNumber: param => {
        if (param.value && param.value.length <= param.propertyValue)
            return `${param.name} must be a greater number than ${param.propertyValue}`;
    },
    maxNumber: param => {
        if (param.value && param.value.length >= param.propertyValue)
            return `${param.name} must be less than ${param.propertyValue}`;
    },
    isEmail: param => {
        const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

        if (param.value && !pattern.test(param.value))
            return `${param.name} must be a valid email`;
    },
    isCpf: param => {
        if (param.value && !helpers.isCpf(param.value))
            return `${param.name} must be valid`;
    },
    isCnpj: param => {
        if (param.value && !helpers.isCnpj(param.value))
            return `${param.name} must be valid`;
    },
    isUrl: param => {

    },
    isHEX: param => {

    },
    isBase64: param => {

    }
};