
import { Flight } from "../models/flight.js"
import { Destination } from "../models/destination.js"

function index(req, res) {
  Flight.find({}, function(error, flights) {
    res.render("flights/index", {
      flights,
      error,
      title: "All Flights",
    })
  })
}

function newFlight(req, res) {
  res.render("flights/new", {
    title: "Add Flight",
  })
}

function create(req, res) {
  console.log("flight", req.body)
  Flight.create(req.body, function(error, flight) {
    if (error) {
      console.log(error)
      return res.redirect("/flights/new")
    }
    res.redirect(`/flights/${flight._id}`)
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate("destinations")
  .exec(function(err, flight) {
    Destination.find({_id: {$nin: flight.destinations}}, function(err, destinationsNotInDestinations){ 
      res.render("flights/show", {
        title: "Flight Details",
        flight,
        destinationsNotInDestinations,
    })
    })
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id, function(error, flight) {
    flight.tickets.push(req.body)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id, function(error, flight) {
    res.redirect("/flights")
  })
}

function addToDestinations(req, res) {
  console.log(addToDestinations)
  Flight.findById(req.params.id, function(err, flight) {
    flight.destinations.push(req.body.destinationId)
    flight.save(function(err) {
      console.log("ERROR", err);
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

// function deleteTicket(req, res) {
//   Flight.findByIdAndDelete(req.params.id, function(error, flight) {
//     flight.tickets.delete(req.body)
//     flight.save(function(err) {
//       res.redirect(`/flights/${flight._id}`)
//     })
//   })
// }

export {
  index,
  newFlight as new,
  create,
  show,
  createTicket,
  deleteFlight as delete,
  addToDestinations,
  // deleteTicket,
}