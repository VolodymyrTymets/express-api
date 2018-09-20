const _ = require('lodash');
// object => object // { 'profile.phone': '1111' } => {profile: { phone: '111' } }
const parseFormDataBody = body => {
  const newBody = {};
  _.keys(body).forEach(key => _.set(newBody, key, body[key]));
  return newBody;
};

/**
 * @example
 *
 *        const query = { 'documents.value' : 1 };
 *        queryToObject(query) === { documents: { value: 1 } };
 * **/
const queryToObject = query => {
  const obj = {};
  _.keys(query).forEach(key => _.set(obj, key, query[key]));
  return obj;
};

/**
 * @example
 *       _.pickBy({a: '', b: false, c: undefined }, onlyDefined) => { b:false }
 * **/
const onlyDefined = v => (_.isString(v) && !!v) || (_.isBoolean(v) && true) ||  !!v;


/**
 * @example
 *       _.pickBy({a: '', b: false, c: undefined }, onlyDefined) => { b:false }
 * **/
const pickFieldsFilterFor = (fields, Model) => {
  const piked = _.pick(fields || {}, _.keys(Model.schema.paths));
  _.keys(piked).forEach(key => _.extend(piked, { [key]: parseInt(piked[key]) }));
  return piked;
};


module.exports = { parseFormDataBody, queryToObject, onlyDefined, pickFieldsFilterFor };