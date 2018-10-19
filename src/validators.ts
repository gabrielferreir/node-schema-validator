import {Errors, ParamValidator} from "./ScopeInterface";

export default class Validators {

    static required(params: ParamValidator): Errors {
        if (!params.value && params.property === true) {
            return {
                message: `${params.key} is required`,
                type: 'required',
                attribute: params.key
            };
        }
    }

    static minLength(params: ParamValidator): Errors {
        if (params.value && params.value.length < params.property) {
            return {
                message: `${params.key} it's smaller than ${params.property}`,
                type: 'minLength',
                attribute: params.key
            }
        }
    }

    static type(params: ParamValidator) {

        if (params.value) {
            if (params.property !== params.value.constructor) {
                return {
                    message: `${params.key} not is type ${params.property.name}`,
                    type: 'type',
                    attribute: params.key
                }
            }
        }
    }

    static min(params: ParamValidator) {
        if (!params.value || params.value.length < params.property) {
            return {
                message: `${params.key} <\array> it's smaller than ${params.property}`,
                type: 'min',
                attribute: params.key
            }
        }
    }

    static max(params: ParamValidator) {
        if (params.value && params.value.length > params.property) {
            return {
                message: `${params.key} <\array> it's bigger  than ${params.property}`,
                type: 'max'
            }
        }
    }

    static childs(params: ParamValidator) {
        // O CONTEUDO DESTA FUNÇÃO É IGUAL O MUNDIAL DO PALMEIRAS
    }

    static simpleChild(params: ParamValidator) {
        // MAGO HAZAZEL PRAGA PASSOU POR AQUI
    }

    static Function(params: ParamValidator): void {
        params.property(params.value)
    }

    static pattern(params: ParamValidator): Errors {
        const regExp = new RegExp(params.property);
        if (!regExp.test(params.value)) {
            return {
                message: `${params.key} is not acceptable for regExp${params.property}`,
                type: 'pattern',
                attribute: params.key
            }
        }
    }

    static isEqual(params: ParamValidator): Errors {
        if (Array.isArray(params.property) && !params.property.filter(item => item === params.value).length) {
            return {
                message: `${params.key} is not equal [${params.property.join(', ')}]`,
                type: 'isEqual',
                attribute: params.key
            }
        } else if (!Array.isArray(params.property) && params.value !== params.property) {
            return {
                message: `${params.key} is not equal ${params.property}`,
                type: 'isEqual',
                attribute: params.key
            }
        }
    }

    static isCpf(params: ParamValidator): Errors {
        if (params.value && params.property === true) {
            let Soma;
            let Resto;
            Soma = 0;
            const invalid = {
                message: `${params.key} it's not a cpf`,
                type: 'isCPF',
                attribute: params.key
            };
            if (params.value === '00000000000') return invalid;
            for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(params.value.substring(i - 1, i)) * (11 - i);
            Resto = (Soma * 10) % 11;
            if ((Resto === 10) || (Resto === 11)) Resto = 0;
            if (Resto !== parseInt(params.value.substring(9, 10))) return invalid;
            Soma = 0;
            for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(params.value.substring(i - 1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;
            if ((Resto === 10) || (Resto === 11)) Resto = 0;
            if (Resto !== parseInt(params.value.substring(10, 11))) return invalid;
        }
    }

}