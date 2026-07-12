export const successResponse = (c, message, data, statusCode = 200) => {
    const response = {
        success: true,
        message,
        data,
    };
    return c.json(response, statusCode);
};
export const errorResponse = (c, message, statusCode, errors) => {
    const response = {
        success: false,
        message,
        ...(errors === undefined ? {} : { errors }),
    };
    return c.json(response, statusCode);
};
