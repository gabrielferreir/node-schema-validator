"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("./Scope");
const InvalidParam_1 = require("./InvalidParam");
var Pazuzu;
(function (Pazuzu) {
    Pazuzu[Pazuzu["Hazazel"] = 213] = "Hazazel";
})(Pazuzu || (Pazuzu = {}));
try {
    const schema = new Scope_1.default(null);
    const errors = schema.init({}, {
        objeto: {
            type: Object,
            childs: {
                pax: {
                    type: Object,
                    childs: {
                        a: {
                            required: true,
                            minLength: 15
                        }
                    }
                }
            }
        },
    });
}
catch (e) {
    console.log('catch', e);
    if (e instanceof InvalidParam_1.default) {
        console.log('È um erro de InvalidParam');
    }
}
console.log(Pazuzu.Hazazel);
