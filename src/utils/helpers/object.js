const _ = require('lodash');
/**
 * Provide deep updating of object
 *
 * @params
 *        {Object} - which object to update
 *        {Object} - from which object get new values
 *        [String] - fields
 * @example
 *        _.extend(user, {
            services: updateDeep(user.services.toObject(), newServices),
            shareable: updateDeep(user.shareable.toObject(), newShareable),
          });
          await user.save();
 *
 *
 * **/

const updateDeep = (target, source, fields) => {
  const newFields = _.isUndefined(fields) ? _.keys(target) : fields;
  const keys = _.isArray(newFields) ? newFields : [newFields];
  const res = {};
  keys.forEach(key =>
    _.extend(res, { [key]: _.get(source, key) || _.get(target, key) })
  );
  return res
};

module.exports = { updateDeep };