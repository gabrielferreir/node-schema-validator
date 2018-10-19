const Validators = require('../dist/validators');

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

    })


});