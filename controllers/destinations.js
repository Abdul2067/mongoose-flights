import { Destination } from "../models/destination.js"

function newDestination(req, res) {
  Destination.find({}, function(err, destinations) {
    res.render("destinations/new", {
    title: "Add Destination",
    destinations
    })
  })
}

function create(req, res) {
  console.log(req.body)
  console.log("Creating Destination")
}

export {
  newDestination as new,
  create
}