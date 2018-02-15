'use strict';

module.exports.error500 = function (res, err) {
    console.log(err);
    res.status(500);
    res.json({ error: 500, errorMsg: 'server error' });
};

module.exports.error404 = function (res, err) {
    if (err) {
        console.log(err);
    }
    res.status(404);
    res.json({ error: 404, errorMsg: 'not found' });
};

module.exports.error400 = function (res, err) {
    if (err) {
        console.log(err);
    }
    res.status(400);
    res.json({ error: 400, errorMsg: 'bad request' });
};

module.exports.error401 = function (res, err) {
    if (err) {
        console.log(err);
    }
    res.status(401);
    res.json({ error: 401, errorMsg: 'unauthorized' });
};

module.exports.error409 = function (res, err) {
    if (err) {
        console.log(err);
    }
    res.status(409);
    res.json({ error: 409, errorMsg: 'already exists' });
};

module.exports.error422 = function (res, err) {
    if (err) {
        console.log(err);
    }
    res.status(422);
    res.json({ error: 422, errorMsg: 'missing parameters' });
};
//# sourceMappingURL=request-api-error.js.map