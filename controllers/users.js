const Validator = require('../helpers/validator/validator2');

module.exports = {
    create
};

async function create(req, res, next) {
    try {
        const params = {
            name: req.body.name,
            phone: req.body.phone,
            objeto: req.body.objeto,
            arraySimples: req.body.arraySimples
        };

        const schema = {
            // SIMPLES
            name: {
                required: true,
                minLength: 2
            },
            // ARRAY DE OBJETOS
            phone: {
                type: Array,
                max: 4,
                min: 1,
                childs: {
                    ddd: {
                        required: true
                    },
                    number: {
                        required: true
                    }
                }
            },
            // OBJETO DENTRO DE OBJETO
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
            // ARRAY SIMPLES
            arraySimples: {
                type: Array,
                simpleChild: {
                    minLength: 20,
                    Function: (x) => {
                        console.log(`Nome: ${x}`);
                    }
                }
            }
        };

        Validator(params, schema);

        res.status(200).json({
            message: 'OK'
        })

    } catch (error) {
        next(error);
    }
}