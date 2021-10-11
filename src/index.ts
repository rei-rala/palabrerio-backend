
export const express = require('express')
const PalErrorRoute = require('./routes/palerror.routes')
const cors = require('cors')

import { getPalErrors, getPalErrorById, saveNewPalError, getFirstPalError, getLastPalError } from "./controllers/palabrerioAPI.controller"


//archivoPalabrerioErrors.cleanFile()
//  .finally(() => agregaErroresPrueba())



const app = express()
const PORT = process.env.PORT || 8080

// middleware

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api', PalErrorRoute)


app.listen(PORT, () => { console.log(`Escuchando en puerto ${PORT}`) })
app.on('error', (err: any) => console.info(`Se produjo el siguiente error:\n\t=>${err}`))


// ! RUTAS

// ! Errores
PalErrorRoute.get('/', getPalErrors)
PalErrorRoute.get('/first', getFirstPalError)
PalErrorRoute.get('/last', getLastPalError)
PalErrorRoute.get('/:idError', getPalErrorById)
PalErrorRoute.post('/', saveNewPalError)