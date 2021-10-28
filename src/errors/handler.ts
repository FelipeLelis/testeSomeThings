import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
    [key: string]: string[];
}
const errorHandler: ErrorRequestHandler = (error, req, res, _) => {
    _
    console.log(error);
    const [errorType] = error.toString().split(': ');
    if (error instanceof ValidationError) {
        const errors: ValidationErrors = {};
        error.inner.forEach((err) => {
            errors[err.path] = err.errors;
        });

        return res.status(400).json({ message: 'Validation Fails', errors });
    }
    else if (error.code == 23505) {
        return res
            .status(400)
            .json({ message: 'Validation Fails', error: error.detail });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
