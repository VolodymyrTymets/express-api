const { Router: router } = require('express');
const { authenticate } = require('../../middleware');
const update = require('./update');
const create = require('./careate');
const remove = require('./remove');
const get = require('./get');
const { list } = require('./list');


/**
 * Provide Api for Cars

 GET /api/v1/cars/ - List
 @header
      Authorization: Bearer {token}

 GET /api/v1/cars/:_id - get single
 @header
        Authorization: Bearer {token}

 POST /api/v1/cars/ - Create
 @header
      Authorization: Bearer {token}
 @param
       model (require) - {string}
       manufacture (require) - {string}
       connectors (require) - [string] - 'Type2' || 'CCS'
       batteryCapacity (require) - {number}
       transform (require) - {string}

 PUT /api/v1/cars/:_id - Update
 @header
        Authorization: Bearer {token}
 @param
       model - {string}
       manufacture - {string}
       connectors - [string] - 'Type2' || 'CCS'
       batteryCapacity - {number}
       transform - {string}

 DELETE /api/v1/cars/:_id - Remove
 @header
        Authorization: Bearer {token}

 **/

module.exports = (models, { config }) => {
  const api = router();

  api.get('/', authenticate, list(models, { config }));
  api.get('/:_id', authenticate, get(models));
  api.post('/', authenticate, create(models));
  api.put('/:_id', authenticate, update(models));
  api.delete('/:_id', authenticate, remove(models));

  return api;
};
