'use strict'

exports.errorHandler = error => {
    let message = '';

    if (error.code) {
        let {code, name, keyValue} = error;
        switch (code) {
            case 11000:
                message = `${name} with code: ${code} - category *${keyValue.slug}* already exists!`;
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (let errorName in error.errorors) {
            if (error.errorors[errorName].message) message = error.errorors[errorName].message;
        }
    }
 
    return message;
};
