import { NextFunction, Request, Response } from "express"

const handleError = async (error: Error, req: Request, res: Response, next: NextFunction) => {

    if (error instanceof AppError) {
        return res.status(error.statusCode).send({ message: error.message })
    }


    return res.status(500).send({
        message: error.message
    })

}

export default handleError

class AppError extends Error {

    statusCode: number

    constructor(message: string, statusCode: number = 400) {
        super()
        this.message = message
        this.statusCode = statusCode
    }
}

export { AppError }
