import { Router } from 'express'
import * as flightsCtrl from "../controllers/flights.js"
const router = Router()

router.get("/", flightsCtrl.index)
router.get("/new", flightsCtrl.new)
router.post("/flights", flightsCtrl.create)

export {
  router
}
