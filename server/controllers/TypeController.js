var mongoose = require("mongoose");

var Type = mongoose.model("Type");

//show all type
typeController.list = function(req, res) {
  Type.find({}).exec(function (err, types) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/types/index", {types: types});
    }
  });
};

//show one type
typeController.show = function(req, res) {
  Type.findOne({_id: req.params.id}).exec(function (err, type) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/types/show", {type: type});
    }
  });
};

//create type
typeController.save = function(req, res) {
  var type = new Type(req.body);

  type.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/types/create");
    } else {
      console.log("Successfully created a type.");
      res.redirect("/types/show/"+type._id);
    }
  });
};

//update type
typeController.update = function(req, res) {
  Type.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, type) {
    if (err) {
      console.log(err);
      res.render("../views/types/edit", {type: req.body});
    }
    res.redirect("/types/show/"+type._id);
  });
};

//delete type
typeController.delete = function(req, res) {
  Type.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Type deleted!");
      res.redirect("/types");
    }
  });
};

module.exports = typeController;