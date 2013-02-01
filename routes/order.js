var models = require('../models');
Ingredient = models.Ingredient;
order = models.order;

exports.list = function(req, res){
	order.find().populate('ingredients').exec(function(err, db_order){
		if (err)
			return console.log("error", err);
		res.render('orderList', {title: 'Order List', orders: db_order});
	});
};

exports.complete = function(req, res){
	console.log(req.body);
	order.remove({_id:req.body.id}).exec(function(err){
		if (err)
			return console.log('error', err);
		return console.log('removed');
	})
};

exports.new = function(req, res){
	Ingredient.find().exec(function(err, db_Ingredient){
		if (err)
			return console.log("error", err);
		res.render('orderForm', {title: 'New Order', ingredients: db_Ingredient});
	});
};

exports.create = function(req, res){
	var orderIngredients = [];
	req.body.ingredients.forEach(function(ingredient){
		Ingredient.findOne({'name':ingredient}, function(err, ingredient){
			if (err)
				return console.log("error", err);
			orderIngredients.push(ingredient);
			if (orderIngredients.length == req.body.ingredients.length){
				buildOrder(req.body.customerName, orderIngredients)
			}
		});
	});
};

function buildOrder(name, ingredients){
	var newOrder = new order({customerName:name
		,ingredients:ingredients})
	newOrder.save(function (err){
		if (err)
			return console.log("error", err)
	});
}
