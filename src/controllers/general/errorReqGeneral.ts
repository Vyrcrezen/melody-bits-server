import { ErrorRequestHandler } from "express";

export const errorReqHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    // console.log(error);

    res.status(500).json({
        message: 'Unexpected server error!',
        errorMessage: `${error}`
    });
}

