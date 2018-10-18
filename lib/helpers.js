module.exports = {
    isCpf,
    isCnpj
}

function isCpf(value) {
    value = value.replace(/[^\d]+/g, '');

    let sum;
    let Rest;
    sum = 0;
    if (value == "00000000000" ||
        value == "11111111111" ||
        value == "22222222222" ||
        value == "33333333333" ||
        value == "44444444444" ||
        value == "55555555555" ||
        value == "66666666666" ||
        value == "77777777777" ||
        value == "88888888888" ||
        value == "99999999999") return false;

    for (let i = 1; i <= 9; i++) sum = sum + parseInt(value.substring(i - 1, i)) * (11 - i);
    Rest = (sum * 10) % 11;

    if ((Rest == 10) || (Rest == 11)) Rest = 0;
    if (Rest != parseInt(value.substring(9, 10)))
        return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(value.substring(i - 1, i)) * (12 - i);
    Rest = (sum * 10) % 11;

    if ((Rest == 10) || (Rest == 11)) Rest = 0;
    if (Rest != parseInt(value.substring(10, 11)))
        return false;

    return true;
}

function isCnpj(value) {
    value = value.replace(/[^\d]+/g, '');

    if (value == "00000000000000" ||
        value == "11111111111111" ||
        value == "22222222222222" ||
        value == "33333333333333" ||
        value == "44444444444444" ||
        value == "55555555555555" ||
        value == "66666666666666" ||
        value == "77777777777777" ||
        value == "88888888888888" ||
        value == "99999999999999") return false;

    let length = value.length - 2;
    let numbers = value.substring(0, length);
    let digits = value.substring(length);
    let sum = 0;
    let pos = length - 7;

    for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--;
        if (pos < 2)
            pos = 9;
    }

    let resultado = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (resultado != digits.charAt(0))
        return false;

    length = length + 1;
    numbers = value.substring(0, length);
    sum = 0;
    pos = length - 7;

    for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--;
        if (pos < 2)
            pos = 9;
    }

    resultado = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (resultado != digits.charAt(1))
        return false;

    return true;
}