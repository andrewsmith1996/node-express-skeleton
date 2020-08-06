/**
 * Endpoint to test whether the API is running successfully.
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 * @memberof AuthController
 * Returns whether the API is successfully working.
 */
export const test: (req: Request, res: Response) => void = (req: Request, res: Response) => res.send("API successfully running!");
