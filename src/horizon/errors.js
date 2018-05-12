import { ServerErrorBase } from '../errors'

/**
 * Generic Horizon error response.
 *
 * @export
 * @class
 */
export class HorizonError extends ServerErrorBase {}

/**
 * Horizon 400(BadRequest) error.
 *
 * @export
 * @class
 */
export class BadRequestError extends HorizonError {}

/**
 * Horizon 401(Unauthorized) error.
 *
 * @export
 * @class
 */
export class UnauthorizedError extends HorizonError {}

/**
 * Horizon 404(Not Found) error.
 *
 * @export
 * @class
 */
export class NotFoundError extends HorizonError {}

/**
 * Horizon 500(Internal Server Error) error.
 *
 * @export
 * @class
 */
export class InternalServerError extends HorizonError {}
