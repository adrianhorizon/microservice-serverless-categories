'use strict';

const categoriesStylus = require('./controllers/categories')

module.exports.createCategories = categoriesStylus.create;
module.exports.deleteCategories = categoriesStylus.deleteCategories;
module.exports.getCategories = categoriesStylus.get;
module.exports.listCategories = categoriesStylus.list;
