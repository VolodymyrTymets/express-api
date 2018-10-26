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

/**
 * Provide update fields in mongoose by from some object
 *
 * @example
 *         updateDeepModel(model, { newField: { name: 'test' } }).save()
 *
 * **/

const updateDeepModel = (model, object) => {
	const keys = Object.keys(object);
	keys.forEach(key => {
		model[key] = object[key] instanceof Object && !(object[key] instanceof Date)
      ? updateDeepModel(model[key], object[key])
      : object[key]
	});
	return model;
};

module.exports = { fieldToSearch, updateDeepModel };