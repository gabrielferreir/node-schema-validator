class Scope {

    constructor(content, scope, config) {
        if (config)
            this._config(config);

        this._errors = [];
        this._validators = require("./validators");
        this._validate(content, scope);
        this._end();
    }

    _validate(content, scope, heritage) {
        const paramsName = Object.keys(scope);
        this._valid(paramsName, content, scope, heritage);
    }

    _valid(paramsName, content, scope, heritage) {
        paramsName.forEach(param => {

            const keys = Object.keys(scope[param]);

            keys.forEach(property => {
                const item = {
                    property: property,
                    propertyValue: scope[param][property],
                    name: heritage ? `${heritage}.${param}` : param,
                    value: content[param]
                };

                // objects array / simple object
                if (property == 'items') {
                    if (Array.isArray(item.value)) {
                        item.value.forEach((obj, index) => {
                            this._validate(obj, scope[param][property], `${param}[${index}]`);
                        });
                    }
                    // simple object
                    else {
                        const name = heritage ? `${heritage}.${param}` : param;
                        this._validate(item.value, scope[param][property], name);    
                    }
                }

                // simple array
                else if (property == 'rules') {
                    const rules = Object.keys(item.propertyValue);

                    rules.forEach(rule => {

                        let values = content[param];

                        values.forEach((item, i) => {
                            const arrayItem = {
                                propertyValue: scope[param][property][rule],
                                name: `${param}[${i}]`,
                                value: item
                            };

                            const response = this._callValidator(rule, arrayItem);
                            response && this._errors.push(response);
                        });
                    });
                }
                else {
                    const response = this._callValidator(property, item);
                    response && this._errors.push(response);
                }
            });
        });
    }

    _callValidator(name, item) {
        const vFunc = this._validators[name];
        if (vFunc)
            return vFunc(item)
    }

    _config(config) {
        this.status = config.status;
    }

    _end() {
        if (this._errors.length)
            throw { statusCode: this.status || 400, messages: this._errors };
    }
}

module.exports = Scope