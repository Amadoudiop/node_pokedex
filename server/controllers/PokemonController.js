var mongoose = require("mongoose");

var Pokemon = mongoose.model("Pokemon");

var pokemonController = {};

//show all pokemon
pokemonController.list = function(req, res) {
  Pokemon.find({}).exec(function (err, pokemons) {
    if (err) {
      res.status(500).send(err)
    }
    else {
       res.status(200).send(pokemons);
    }
  });
};

//show one pokemon
pokemonController.show = function(req, res) {
	Pokemon.findById(req.params.pokemonId, (err, pokemon) => {  
	    if (err) {
	        res.status(500).send(err)
	    }
	    if (pokemon) {
	        res.status(200).send(pokemon)
	    } else {
	        res.status(404).send("No pokemon found with that ID")
	    }
	});
};

//create pokemon
pokemonController.save = function(req, res) {
  	var pokemon = new Pokemon(req.body);

	pokemon.save((err, createdPokemonObject) => {  
	    if (err) {
	        res.status(500).send(err);
	    }
	    // This createdPokemonObject is the same one we saved, but after Mongo
	    // added its additional properties like _id.
	    res.status(200).send(createdPokemonObject);
	});
};

//update pokemon
pokemonController.update = function(req, res) {
  	Pokemon.findById(req.params.pokemonId, (err, pokemon) => {  
	    if (err) {
	        res.status(500).send(err);
	    } else {
	        // Update each attribute with any possible attribute that may have been submitted in the body of the request
	        // If that attribute isn't in the request body, default back to whatever it was before.
	        pokemon.name = req.body.name || pokemon.name;
	        pokemon.type = req.body.type || pokemon.type;
	        pokemon.niveau = req.body.niveau || pokemon.niveau;
	        pokemon.img = req.body.img || pokemon.img;	

	        // Save the updated document back to the database
	        pokemon.save((err, pokemon) => {
	            if (err) {
	                res.status(500).send(err)
	            }
	            res.status(200).send(pokemon);
	        });
	    }
	});
};

//delete pokemon
pokemonController.delete = function(req, res) {
  Pokemon.findByIdAndRemove(req.params.pokemonId, (err, pokemon) => {  
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    le response = {
        message: "Pokemon successfully deleted",
        id: pokemon._id
    };
    res.status(200).send(response);
});
};

module.exports = pokemonController;