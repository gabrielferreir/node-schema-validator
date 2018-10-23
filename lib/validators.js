"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validators {
    static required(params) {
        if (!params.value && params.property === true) {
            return {
                message: `${params.key} is required`,
                type: 'required',
                attribute: params.key
            };
        }
    }
    static minSize(params) {
        if (!params.value || params.value.length < params.property) {
            return {
                message: `${params.key} it's smaller than ${params.property} <array>`,
                type: 'minSize',
                attribute: params.key
            };
        }
    }
    static maxSize(params) {
        if (params.value && params.value.length > params.property) {
            return {
                message: `${params.key} it's greater than ${params.property} <array>`,
                type: 'minSize',
                attribute: params.key
            };
        }
    }
    static minLength(params) {
        if (params.value && params.value.length < params.property) {
            return {
                message: `${params.key} it's smaller than ${params.property}`,
                type: 'minLength',
                attribute: params.key
            };
        }
    }
    static maxLength(params) {
        if (params.value && params.value.length > params.property) {
            return {
                message: `${params.key} it's greater than ${params.property}`,
                type: 'maxLength',
                attribute: params.key
            };
        }
    }
    static minNumber(params) {
        if (params.value && params.value < params.property) {
            return {
                message: `${params.key} must be a greater number than ${params.property}`,
                type: 'minNumber',
                attribute: params.key
            };
        }
    }
    static maxNumber(params) {
        if (params.value && params.value > params.property) {
            return {
                message: `${params.key} must be less than ${params.property}`,
                type: 'maxNumber',
                attribute: params.key
            };
        }
    }
    static type(params) {
        if (params.value) {
            if (params.property !== params.value.constructor) {
                return {
                    message: `${params.key} not is type ${params.property.name}`,
                    type: 'type',
                    attribute: params.key
                };
            }
        }
    }
    static pattern(params) {
        const regExp = new RegExp(params.property);
        if (!regExp.test(params.value)) {
            return {
                message: `${params.key} is not acceptable for regExp ${params.property}`,
                type: 'pattern',
                attribute: params.key
            };
        }
    }
    static isEqual(params) {
        if (Array.isArray(params.property) && !params.property.filter(item => item === params.value).length) {
            return {
                message: `${params.key} is not equal [${params.property.join(', ')}]`,
                type: 'isEqual',
                attribute: params.key
            };
        }
        else if (!Array.isArray(params.property) && params.value !== params.property) {
            return {
                message: `${params.key} is not equal ${params.property}`,
                type: 'isEqual',
                attribute: params.key
            };
        }
    }
    static isCpf(params) {
        if (params.value && params.property === true) {
            let soma;
            let resto;
            soma = 0;
            const invalid = {
                message: `${params.key} it's not a cpf`,
                type: 'isCpf',
                attribute: params.key
            };
            if (params.value === '00000000000')
                return invalid;
            for (let i = 1; i <= 9; i++)
                soma = soma + parseInt(params.value.substring(i - 1, i)) * (11 - i);
            resto = (soma * 10) % 11;
            if ((resto === 10) || (resto === 11))
                resto = 0;
            if (resto !== parseInt(params.value.substring(9, 10)))
                return invalid;
            soma = 0;
            for (let i = 1; i <= 10; i++)
                soma = soma + parseInt(params.value.substring(i - 1, i)) * (12 - i);
            resto = (soma * 10) % 11;
            if ((resto === 10) || (resto === 11))
                resto = 0;
            if (resto !== parseInt(params.value.substring(10, 11)))
                return invalid;
        }
    }
    static isCnpj(params) {
        if (params.value && params.property === true) {
            const invalid = {
                message: `${params.key} it's not a cnpj`,
                type: 'isCnpj',
                attribute: params.key
            };
            if (params.value.length !== 14)
                return invalid;
            let tamanho = params.value.length - 2;
            let numeros = params.value.substring(0, tamanho);
            let digitos = params.value.substring(tamanho);
            let soma = 0;
            let pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado.toString() !== digitos.charAt(0))
                return invalid;
            tamanho = tamanho + 1;
            numeros = params.value.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado.toString() !== digitos.charAt(1))
                return invalid;
        }
    }
    static isEmail(params) {
        const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        if (params.value && !pattern.test(params.value)) {
            return {
                message: `${params.key} must be a valid email address`,
                type: 'isEmail',
                attribute: params.key
            };
        }
    }
    static Function(params) {
        return params.property(params);
    }
}
exports.default = Validators;
