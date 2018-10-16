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
    }
};