var models = require('../models');
Ingredient = models.Ingredient;

exports.new = function(req, res){
	res.render('ingredientForm',{title:'New Ingredient'});
};

exports.create = function(req, res){
	var newIngredient = new Ingredient({name:req.body.name
		,cost:req.body.cost})
	newIngredient.save(function (err){
		if (err)
			return console.log("error", err)
	res.send('You have created the ingredient ' + req.body.name);
	});
};