const { curry } = require('lodash');
const { NotFoundError } = require('rest-api-errors');

const STATUSES = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
};


const sendResponse = (res, data, status = STATUSES.SUCCESS) => res.status(status).json(data).end();

const withoutErrors = (next, callback) => (err, updatedTank) => {
  if (err) {
    return next(err);
  }
  return callback && callback(updatedTank);
};

const sendOne = curry((res, entity) => {
  if (!entity) {
    throw new NotFoundError();
  }

  return sendResponse(res, entity);
});



const sendList = curry((res, entityList) => sendResponse(res, entityList));
const sendCreated = curry((res, entity) => sendResponse(res, entity));
const sendUpdated = curry((res, updatedEntity) => sendResponse(res, updatedEntity));
const sendDeleted = curry(res => sendResponse(res, null, STATUSES.NO_CONTENT));
const sendAccepted = (res) => () => sendResponse(res, null);

module.exports = {
  sendOne,
  sendList,
  sendCreated,
  sendUpdated,
  sendDeleted,
  sendAccepted,
  withoutErrors,
};
