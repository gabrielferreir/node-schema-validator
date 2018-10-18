module.exports = init;

let errors;

/**
 * Limpa o array de erros, inicia a validação e retorna um erro caso necessario
 * @param params    Parametros passados pelo usuario
 * @param schema    Schema definido
 * @return {*}
 */
function init(params, schema) {
    errors = [];
    const response = validate(params, schema, null);
    if (response)
        throw {status: 400, errors: response};
    return response;
}

function validate(params, schema, heritage) {
    if (Array.isArray(params))
        params.forEach((obj, index) => validateObject(obj, schema, `${heritage}(${index})`));
    else
        validateObject(params, schema, heritage);

    return errors.length ? errors : null;
}

/**
 * Chama a função que ira validar o campo
 * @param name      -> Nome da função
 * @param params    -> { key: nome da chave, valueProperty: valor da chave, param: valor passado pela requisição }
 * @return { key }
 */
function callFunction(name, params) {
    return validators[name](params);
}

/**
 * Valida um objeto
 * @param params
 * @param schema
 * @param heritage
 */
function validateObject(params, schema, heritage) {
    const keys = Object.keys(schema);
    keys.forEach(key => {
        const arrayProperties = Object.keys(schema[key]);
        arrayProperties.forEach(propertyValidator => {
            const valueProperty = schema[key][propertyValidator];
            // key = name
            // valueProperty = true
            // validators[propertyValidator](key, valueProperty, params[key]);
            const response = callFunction(propertyValidator, {
                key: heritage ? `${heritage}.${key}` : key,
                valueProperty: valueProperty,
                param: params ? params[key] : undefined
            });

            response && errors.push(response);
        });
    });
}

/**
 * Funções de validação
 * @type {{required: validators.required, minLength: validators.minLength, type: validators.type, min: validators.min, max: validators.max, childs: validators.childs, simpleChild: validators.simpleChild, Function: validators.Function}}
 */
validators = {
    required: request => {
        if (!request.param && request.valueProperty === true) {
            return {
                message: `${request.key} is required`,
                type: 'required'
            }
        }
    },
    minLength: request => {
        if (request.param && request.param.length < request.valueProperty) {
            return {
                message: `${request.key} it's smaller than ${request.valueProperty}`,
                type: 'minLength'
            }
        }
    },
    type: request => {
        if (request.valueProperty === Array) {
            if (!Array.isArray(request.param)) {
                return {
                    message: `${request.key} not is type Array`,
                    type: 'type'
                }
            }
        }

    },
    min: request => {
        if (!request.param || request.param.length < request.valueProperty) {
            return {
                message: `${request.key} <\array> it's smaller than ${request.valueProperty}`,
                type: 'min'
            }
        }
    },
    max: request => {
        if (request.param && request.param.length > request.valueProperty) {
            return {
                message: `${request.key} <\array> it's bigger  than ${request.valueProperty}`,
                type: 'max'
            }
        }
    },
    childs: request => {
        validate(request.param, request.valueProperty, request.key);
    },
    simpleChild: request => {
        request.param.forEach((value, index) => {
            const keys = Object.keys(request.valueProperty);
            keys.forEach(key => {
                const response = callFunction(key, {
                    key: request.key + index,
                    valueProperty: request.valueProperty[key],
                    param: value
                });
                response && errors.push(response);
            });
        })

    },
    Function: request => {
        request.valueProperty(request.param)
    },
    pattern: request => {
        const regExp = new RegExp(request.valueProperty);
        if (!regExp.test(request.param)) {
            return {
                message: `${request.key} is not acceptable for regExp${request.valueProperty}`,
                type: 'pattern'
            }
        }
    },
    isEqual: request => {
        if (Array.isArray(request.valueProperty) && !request.valueProperty.filter(item => item === request.param).length) {
            return {
                message: `${request.key} is not equal [${request.valueProperty.join(', ')}]`,
                type: 'isEqual'
            }
        } else if (!Array.isArray(request.valueProperty) && request.param !== request.valueProperty) {
            return {
                message: `${request.key} is not equal ${request.valueProperty}`,
                type: 'isEqual'
            }
        }
    },
    isCpf: request => {
        if (request.param && request.valueProperty === true) {
            let Soma;
            let Resto;
            Soma = 0;
            const invalid = {
                message: `${request.key} it's not a cpf`,
                type: 'isCPF'
            };
            if (request.param === '00000000000') return invalid;
            for (i = 1; i <= 9; i++) Soma = Soma + parseInt(request.param.substring(i - 1, i)) * (11 - i);
            Resto = (Soma * 10) % 11;
            if ((Resto === 10) || (Resto === 11)) Resto = 0;
            if (Resto !== parseInt(request.param.substring(9, 10))) return invalid;
            Soma = 0;
            for (i = 1; i <= 10; i++) Soma = Soma + parseInt(request.param.substring(i - 1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;
            if ((Resto === 10) || (Resto === 11)) Resto = 0;
            if (Resto !== parseInt(request.param.substring(10, 11))) return invalid;
        }
    },
    isCnpj: request => {

        if (request.param && request.valueProperty === true) {

            const invalid = {
                message: `${request.key} it's not a cnpj`,
                type: 'isCNPJ'
            };

            if (request.param.length !== 14)
                return invalid;

            let tamanho = request.param.length - 2;
            let numeros = request.param.substring(0, tamanho);
            let digitos = request.param.substring(tamanho);
            let soma = 0;
            let pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado.toString() !== digitos.charAt(0))
                return invalid;

            tamanho = tamanho + 1;
            numeros = request.param.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado.toString() !== digitos.charAt(1))
                return invalid;
        }

    },
    isUrl: request => {
    },
    isEmail: request => {

    },
    isHEX: request => {

    },
    isBase64: request => {

    }
};