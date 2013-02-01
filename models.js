var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/burgers');

var Food = mongoose.Schema({
	name: String,
	cost: Number
});
var Ingredient = mongoose.model('Ingredient', Food);
exports.Ingredient = Ingredient;

var orderSchema = mongoose.Schema({
	customerName: String,
	ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}]
});
var order = mongoose.model('order', orderSchema);
exports.order = order;