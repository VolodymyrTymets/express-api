const _ = require('lodash');
/**
 * @example
 *        .map(only('_id'))
 * **/
const only = name => object => _.get(object, name);

/**
 * @example
 *        .filter(notIn(_id))
 * **/
const notIn = target => search => !target.includes(search);

/**
 * @example
 *        .map(only('_id'))
 * **/
const fieldAs = (field, value) => object => object[field] === value;

/**
 * @example
 *        .map(idToString)
 * **/
const idToString = id => id && id.toString();

/**
 * @example
 *        .map(idToString)
 * **/
const includes = (ids, id) => ids.map(idToString).includes(id.toString());


module.exports = { only, notIn, fieldAs, idToString, includes };
