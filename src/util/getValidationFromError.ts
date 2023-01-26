import { ValidationError as ValidationErrorCv } from "class-validator";
import { ValidationError as ValidationErrorSeq } from "sequelize";

export function getValidationFromError(err: unknown) {
    let validationError: {
        target: string | null,
        path: string | null,
        value: string | null,
        message: string | null
    }[] | undefined;

    console.log(err);

    if (err instanceof ValidationErrorSeq) {
        validationError = err.errors.map((error) => {
            console.log(error);

            return {
                target: error.instance ? error.instance.constructor.name : null,
                path: error.path,
                value: error.value,
                message: error.message
            }
        });
    }

    if (Array.isArray(err)) {
        validationError = err.map((errItem) => {
            if (errItem instanceof ValidationErrorCv) {

                let message: string = '';

                if (Array.isArray(errItem.children)) {
                    message += errItem.children?.reduce((messages, childItem) => {

                        if (typeof childItem.constraints == 'object') {
                            messages.push(JSON.stringify(childItem.constraints).replaceAll('"', '').replaceAll('{', '').replaceAll('}', ''));
                        }
                        return messages;
                    }, new Array<string>).join('\r\n') as string;
                }
                if (typeof errItem.constraints === 'object') {
                    message += JSON.stringify(errItem.constraints).replaceAll('"', '').replaceAll('{', '').replaceAll('}', '');
                }

                return {
                    target: errItem.value ? `${errItem.value.constructor.name}` : null,
                    path: `${errItem.property}`,
                    value: typeof errItem.value === 'object' ? (JSON.stringify(errItem.value) === 'null' ? `${errItem.value}` : JSON.stringify(errItem.value)).replaceAll('"', '').replaceAll('{', '').replaceAll('}', '') : `${errItem.value}`,
                    message: message
                };
            }
            else {
                return {
                    target: 'unknown',
                    path: 'unknown',
                    value: 'unknown',
                    message: 'unknown',
                }
            }
        });
    }

    return validationError;
}
