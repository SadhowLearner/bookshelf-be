import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

import type { ErrorDetails } from "../errors/app-error.js";

type SuccessResponse<TData> = {
  success: true;
  message: string;
  data: TData;
};

type ErrorResponse = {
  success: false;
  message: string;
  errors?: ErrorDetails;
};

export const successResponse = <TData>(
  c: Context,
  message: string,
  data: TData,
  statusCode: ContentfulStatusCode = 200,
) => {
  const response: SuccessResponse<TData> = {
    success: true,
    message,
    data,
  };

  return c.json(response, statusCode);
};

export const errorResponse = (
  c: Context,
  message: string,
  statusCode: ContentfulStatusCode,
  errors?: ErrorDetails,
) => {
  const response: ErrorResponse = {
    success: false,
    message,
    ...(errors === undefined ? {} : { errors }),
  };

  return c.json(response, statusCode);
};
