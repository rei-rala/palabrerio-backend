import { express } from ".."

const PalErrorRoute = express.Router()

PalErrorRoute.get('/', (_, __, next) => {
  console.log('.../api/palerror request')
  next()
})

module.exports = PalErrorRoute
