import { Flight } from "../models/flight.js"

function index(req, res) {
  console.log()
}

function newFlight(req, res) {
  res.render("flights/new", {
    title: "Add Flight",
  })
}

function create(req, res) {
  Flight.create(req.body, function(error, flight) {
    if (error) {
      console.log(error)
      return res.redirect("/flights/new")
    }
    res.redirect("/flights")
  })
}

export {
  index,
  newFlight as new,
  create,
}