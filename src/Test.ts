import Scope from './Scope';
import InvalidParam from "./InvalidParam";

enum Pazuzu {
    Hazazel = 213
}

try {
    const schema = new Scope(null);
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
} catch (e) {
    console.log('catch', e);
    if (e instanceof InvalidParam) {
        console.log('È um erro de InvalidParam');
    }

}

console.log(Pazuzu.Hazazel);