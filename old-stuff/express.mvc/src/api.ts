import { Express, Response, Request } from 'express';

import { getVaultFor, hasVaultFor } from './vault';
import { getValidator, filterStructure } from './dto-compiler';

import {
    ContextBuilder,
    APIVaultRecord,
    GenericClass,
    Nullable,
    ResultError,
} from './type';

import { Result } from './result';
import { isStringNotEmpty, isObjectNotEmpty, wrapError } from './util';

export const ERROR_INTERNAL = 'internal';
export const ERROR_REQUEST = 'request';

export const useControllers = (
    app: Express,
    controllers: GenericClass[],
    contextBuilder?: ContextBuilder,
) => {
    controllers.forEach(controller => {
        if (!hasVaultFor(controller)) {
            return;
        }

        const { endpoint: rootEndpoint, methods } = getVaultFor(
            controller,
        ) as APIVaultRecord;
        if (isStringNotEmpty(rootEndpoint) && isObjectNotEmpty(methods)) {
            Object.keys(methods).forEach((methodName: string) => {
                const methodRecord = methods[methodName];

                const {
                    method,
                    fn,
                    endpoint = '',
                    bodyDTO,
                    outputDTO,
                } = methodRecord;
                if (!isStringNotEmpty(method) && !(typeof fn === 'function')) {
                    return;
                }

                let appFunction: Nullable<Function> = null;
                if (method === 'get') {
                    appFunction = app.get;
                } else if (method === 'post') {
                    appFunction = app.post;
                } else if (method === 'put') {
                    appFunction = app.put;
                } else if (method === 'patch') {
                    appFunction = app.patch;
                } else if (method === 'delete') {
                    appFunction = app.delete;
                }

                if (!appFunction) {
                    throw new Error(
                        `Unsupported method produced by a decorator: ${method}`,
                    );
                }

                appFunction.apply(app, [
                    `${rootEndpoint}/${endpoint}`,
                    wrapError(async (req: Request, res: Response) => {
                        const errors: ResultError[] = [];
                        if (bodyDTO) {
                            const validator = getValidator(bodyDTO);
                            if (validator) {
                                try {
                                    await validator.validate(req.body, {
                                        abortEarly: false,
                                    });
                                    req.body = filterStructure(
                                        req.body,
                                        bodyDTO,
                                    );
                                } catch (e) {
                                    e.inner.forEach((error: Error) => {
                                        errors.push({
                                            message: error.message,
                                            code: 'validation',
                                            type: ERROR_REQUEST,
                                        });
                                    });
                                }
                            }
                        }

                        let result = null;
                        if (errors.length) {
                            result = new Result();
                            result.errors = errors;
                        } else {
                            result = await fn(req.params || {}, {
                                req,
                                res,
                                body: req.body,
                                headers: req.headers,
                                context:
                                    typeof contextBuilder === 'function'
                                        ? await contextBuilder({ req, res })
                                        : {},
                            });
                        }

                        let status = 200;
                        if (result instanceof Result) {
                            if (result.status) {
                                // eslint-disable-next-line prefer-destructuring
                                status = result.status;
                            } else if (
                                result.errors.find(
                                    error => error.type === ERROR_INTERNAL,
                                )
                            ) {
                                status = 500;
                            } else if (
                                result.errors.find(
                                    error => error.type === ERROR_REQUEST,
                                )
                            ) {
                                status = 400;
                            }

                            if (outputDTO) {
                                result.data = filterStructure(
                                    result.data || [],
                                    outputDTO,
                                );
                            }
                        }
                        res.status(status);

                        const headers = res.getHeaders();
                        if (!('Content-Type' in headers)) {
                            res.header('Content-Type', 'application/json');
                        }

                        return res.send(JSON.stringify(result));
                    }),
                ]);
            });
        }
    });
};
