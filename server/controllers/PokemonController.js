var mongoose = require("mongoose");

var Pokemon = mongoose.model("Pokemon");

var pokemonController = {};

//show all pokemon
pokemonController.list = function(req, res) {
  Pokemon.find({}).exec(function (err, pokemons) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/pokemons/index", {pokemons: pokemons});
    }
  });
};

//show one pokemon
pokemonController.show = function(req, res) {
  Pokemon.findOne({_id: req.params.id}).exec(function (err, pokemon) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/pokemons/show", {pokemon: pokemon});
    }
  });
};

//create pokemon
pokemonController.save = function(req, res) {
  var pokemon = new Pokemon(req.body);

  pokemon.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/pokemons/create");
    } else {
      console.log("Successfully created a pokemon.");
      res.redirect("/pokemons/show/"+pokemon._id);
    }
  });
};

//update pokemon
pokemonController.update = function(req, res) {
  Pokemon.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, pokemon) {
    if (err) {
      console.log(err);
      res.render("../views/pokemons/edit", {pokemon: req.body});
    }
    res.redirect("/pokemons/show/"+pokemon._id);
  });
};

//delete pokemon
pokemonController.delete = function(req, res) {
  Pokemon.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Pokemon deleted!");
      res.redirect("/pokemons");
    }
  });
};

module.exports = pokemonController;