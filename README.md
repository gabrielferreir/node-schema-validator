# node-schema-validator
A package for objects validations using javascript.


## Demo

```js
const {Scope, InvalidParam} = require('node-schema-validator');

try {
    const schema = new Scope();

    const params = {
        name: 'Mandruva of the world',
        teams: [
            {
                name: 'SafaWar',
                members: [
                    {
                        name: 'Safadão',
                        nick: 'Safawar'
                    }
                ]
            },
            {
                name: 'Didia FC',
                members: [
                    {
                        name: 'Didi',
                        nick: 'didia'
                    }
                ]
            },
            {
                name: 'Paneleira',
                members: [
                    {
                        name: 'Panela',
                        nick: 'srPanela'
                    }
                ]
            },
            {
                name: 'Ladraozera',
                members: [
                    {
                        name: 'Ladraozinho',
                        nick: 'ladron'
                    }
                ]
            }
        ]
    };

    const scope = {
        name: {
            type: String,
            maxLength: 32,
            required: true
        },
        teams: {
            type: Array,
            maxSize: 16,
            minSize: 4,
            childs: {
                name: {
                    type: String,
                    maxLength: 32,
                    required: true
                },
                members: {
                    type: Array,
                    minSize: 1,
                    maxSize: 3,
                    childs: {
                        name: {
                            type: String,
                            required: true,
                            maxLength: 32
                        },
                        nick: {
                            type: String,
                            required: true,
                            maxLength: 12
                        }
                    }
                }
            }
        },
    };

    const errors = schema.isValid(params, scope);

} catch (err) {
    if (err instanceof InvalidParam) {
        console.log('Invalid request', err);
    }
}
```

## Response example

```js
[
    {
        message: 'teams it\'s smaller than 4 <array>',
        type: 'minSize',
        attribute: 'teams'
    }
]
```

## Functions

#### Required
#### minSize
#### maxSize
#### minLength
#### maxLength
#### minNumber
#### maxNumber
#### type
#### pattern
#### isEqual
#### isCpf
#### isCnpj
#### isEmail
#### Function

