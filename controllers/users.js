const Validator = require('../helpers/validator/validator');

module.exports = {
    create
};

async function create(req, res, next) {
    try {
        const params = {
            name: req.body.name,
            cpf: req.body.cpf,
            cnpj: req.body.cnpj,
            url: req.body.url,
            phone: req.body.phone,
            objeto: req.body.objeto,
            arraySimples: req.body.arraySimples
        };

        const schema = {
            // SIMPLES
            name: {
                required: true,
                minLength: 2,
                isEqual: ['GA', 'BR', 10]
            },
            cpf: {
                required: true,
                isCpf: true
            },
            cnpj: {
                required: true,
                isCnpj: true
            },
            url: {
                required: true,
                isUrl: true
            }
            // ARRAY DE OBJETOS
            // phone: {
            //     type: Array,
            //     max: 4,
            //     min: 1,
            //     childs: {
            //         ddd: {
            //             required: true
            //         },
            //         number: {
            //             required: true
            //         }
            //     }
            // },
            // OBJETO DENTRO DE OBJETO
            // objeto: {
            //     type: Object,
            //     childs: {
            //         pax: {
            //             type: Object,
            //             childs: {
            //                 a: {
            //                     required: true,
            //                     minLength: 15
            //                 }
            //             }
            //         }
            //     }
            // },
            // ARRAY SIMPLES
            // arraySimples: {
            //     type: Array,
            //     simpleChild: {
            //         minLength: 20,
            //         // Function: (x) => {
            //         //     console.log(`Nome: ${x}`);
            //         // }
            //         pattern: /gabriel/g
            //     }
            // }
        };

        Validator(params, schema);

        res.status(200).json({
            message: 'OK'
        })

    } catch (error) {
        next(error);
    }
}