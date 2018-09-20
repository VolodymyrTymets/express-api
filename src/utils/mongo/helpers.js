/**
 * Provide generate method for search query
 *
 * @example
 *         Model.methods.fieldsToSearch =
 *         search => ['title'].map(fieldToSearch(search));
 *
 *         ...
 *
 *         { $or: new Model().fieldsToSearch(search) } -> { $or: [ { title: /Darrick/i } ] }
 *
 * **/

const symbols = /[&\/\\#,+()$~%.'":*?<>{}]/g;

const fieldToSearch = search => fieldName => {
  const field = {};
  const replacedSearch = search.replace(symbols, "\\$&");
  field[fieldName] = new RegExp(`${replacedSearch}`, 'i');
  return field;
};

module.exports = { fieldToSearch };