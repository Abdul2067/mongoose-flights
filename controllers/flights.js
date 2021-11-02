import { Flight } from "../models/flight.js"

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
    res.redirect("/flights")
  })
}

function show(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    console.log("this flight", flight)
    res.render("flights/show", {
      title: "Flight Details",
      flight,
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
  // deleteTicket,
}