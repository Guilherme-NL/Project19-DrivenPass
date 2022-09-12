export function validateSchemaMiddleware(schema) {
    return function (req, res, next) {
        var validation = schema.validate(req.body);
        if (validation.error) {
            return res.status(422).send(validation.error);
        }
        next();
    };
}
