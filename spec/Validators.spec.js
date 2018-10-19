const Validators = require('../lib/validators');

describe('Validators functions', () => {

    describe('required', () => {

        it('is required and has no value', () => {
            expect(Validators.default.required(
                {
                    key: 'nome',
                    property: true,
                    value: ''
                }
            ))
                .toEqual({
                    message: 'nome is required',
                    type: 'required',
                    attribute: 'nome'
                });
        });

        it('is not required and has no value', () => {
            expect(Validators.default.required(
                {
                    key: 'nome',
                    property: false,
                    value: ''
                }
            ))
                .toEqual();
        });

    });

    describe('minLength', () => {

        it('The value is less than the minLength', () => {
            expect(Validators.default.minLength(
                {
                    key: 'nome',
                    property: 3,
                    value: 'R'
                }
            ))
                .toEqual(
                    {
                        message: 'nome it\'s smaller than 3',
                        type: 'minLength',
                        attribute: 'nome'
                    }
                )
        });

        it('The value is equal than the minLength', () => {
            expect(Validators.default.minLength(
                {
                    key: 'nome',
                    property: 3,
                    value: 'asd'
                }
            ))
                .toEqual()
        });

        it('The property empty', () => {
            expect(Validators.default.minLength(
                {
                    key: 'nome',
                    property: null,
                    value: 'asdfg'
                }
            ))
                .toEqual()
        });

        it('The value is greater than the minLength', () => {
            expect(Validators.default.minLength(
                {
                    key: 'nome',
                    property: 3,
                    value: 'Neymar'
                }
            ))
                .toEqual()
        });

        it('The value is empty', () => {
            expect(Validators.default.minLength({
                key: 'nome',
                property: 3,
                value: null
            }))
                .toEqual()
        });

    });

    describe('Type', () => {

        it('Array is Array', () => {
            expect(Validators.default.type({
                key: 'names',
                property: Array,
                value: []
            })).toEqual()
        });

        it('Object is Array', () => {
            expect(Validators.default.type({
                key: 'names',
                property: Array,
                value: {name: 'G'}
            })).toEqual({
                message: 'names not is type Array',
                type: 'type',
                attribute: 'names'
            })
        });

        it('String is String', () => {
            expect(Validators.default.type({
                key: 'name',
                property: String,
                value: 'Gabriel'
            })).toEqual()
        });

        it('String is Number', () => {
            expect(Validators.default.type({
                key: 'name',
                property: String,
                value: 17
            })).toEqual({
                message: 'name not is type String',
                type: 'type',
                attribute: 'name'
            })
        });

        it('Number is Number', () => {
            expect(Validators.default.type({
                key: 'number',
                property: Number,
                value: 17
            })).toEqual()
        });

        it('Boolean is String', () => {
            expect(Validators.default.type({
                key: 'iswoman',
                property: Boolean,
                value: 'true'
            })).toEqual({
                message: 'iswoman not is type Boolean',
                type: 'type',
                attribute: 'iswoman'
            })
        });

        it('Boolean is Boolean', () => {
            expect(Validators.default.type({
                key: 'iswoman',
                property: Boolean,
                value: true
            })).toEqual()
        });

    });

    describe('Pattern', () => {

        it('Pattern with matches', () => {
            expect(Validators.default.pattern({
                key: 'haveNumbers',
                property: /(\d)/g,
                value: 'Test123'
            })).toEqual()
        });

        it('Pattern without matches', () => {
            expect(Validators.default.pattern({
                key: 'haveNumbers',
                property: /(\d)/g,
                value: 'Test'
            })).toEqual({
                message: `haveNumbers is not acceptable for regExp /(\\d)/g`,
                type: 'pattern',
                attribute: 'haveNumbers'
            })
        })

    });

    describe('isEqual', () => {

        it('String is not equal', () => {
            expect(Validators.default.isEqual({
                key: 'genre',
                property: 'M',
                value: 'F'
            })).toEqual({
                message: 'genre is not equal M',
                type: 'isEqual',
                attribute: 'genre'
            })
        });

        it('String is not equal', () => {
            expect(Validators.default.isEqual({
                key: 'genre',
                property: 'M',
                value: 'M'
            })).toEqual()
        });

        it('String inside array', () => {
            expect(Validators.default.isEqual({
                key: 'genre',
                property: ['M', 'W'],
                value: 'M'
            })).toEqual()
        });

        it('String outside array', () => {
            expect(Validators.default.isEqual({
                key: 'genre',
                property: ['M', 'W'],
                value: 'X'
            })).toEqual({
                message: 'genre is not equal [M, W]',
                type: 'isEqual',
                attribute: 'genre'
            })
        });

    });

    describe('isCpf', () => {

        it('valid', () => {
            expect(Validators.default.isCpf({
                key: 'cpf',
                property: true,
                value: '07962961031'
            })).toEqual()
        });

        it('invalid', () => {
            expect(Validators.default.isCpf({
                key: 'cpf',
                property: true,
                value: '07962961032'
            })).toEqual({
                message: 'cpf it\'s not a cpf',
                type: 'isCpf',
                attribute: 'cpf'
            })

        });

    });

});