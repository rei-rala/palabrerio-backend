import { PalabrerioError } from "./PalabrerioError";

// TODO: Use mongo or sql DB
const fs = require("fs")

export default class Archivo {
  fileName: string

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  read = () => {
    try {
      return fs.promises.readFile(`./${this.fileName}.txt`, "utf-8")
        .then((data: string) => data ? JSON.parse(data) : [])
        .catch(err => { throw new Error(err) })
    }
    catch (err) {
      console.log(`Error en lectura:\n\t=> ${err}`)
      this.cleanFile()
      return []
    }
  }

  getById = async (objId: number) => {
    return await this.read()
      .then(((arr: []) => (
        arr.length
          ? arr.find((obj: PalabrerioError) => obj.id === objId) || null
          : null
      )))
  }

  saveNewObject = async (newObject: PalabrerioError) => {
    try {
      const data = await this.read()
      data.push(newObject)

      return fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(data, null, '\t'), null, "\t")
        .then(() => (true))
        .catch((err) => { throw err })
    }
    catch (err) {
      console.log(`Error en escritura:\n\t=> ${err}`)
      return err
    }
  }

  updateObject = async (objId: number, newData: PalabrerioError) => {
    try {
      let status = {}
      const data = await this.read()
      const updated = data.find((obj: PalabrerioError) => obj.id === objId)

      if (updated) {
        for (let prop in newData) { updated[prop] = newData[prop] }
        // Correccion de ID (wtf?)
        updated.id = objId

        await this.overWriteFile(data)
        status = ({ ok: true, msg: `${typeof newData} con id ${objId} actualizado` })
      } else {
        status = ({ ok: false, msg: `${typeof newData} no encontrado con id ${objId}` })
      }
      return status
    }
    catch (err) {
      console.log(`Error en escritura:\n\t=> ${err}`)
      return ({ ok: false, msg: err })
    }
  }

  deleteObject = async (objId: number) => {
    try {
      let status = {}
      const data = await this.read()
      const updated = data.filter((obj: PalabrerioError) => obj.id !== objId)

      if (updated) {
        await this.overWriteFile(updated)
        status = ({ ok: true, msg: `${typeof updated} con id ${objId} eliminado` })
      } else {
        status = ({ ok: false, msg: `${typeof updated} no encontrado con id ${objId}` })
      }
      return status
    }
    catch (err) {
      console.log(`Error en escritura:\n\t=> ${err}`)
      return ({ ok: false, msg: err })
    }
  }

  overWriteFile = async (arrayObjs: PalabrerioError[]) => {
    try {
      return fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(arrayObjs, null, '\t'), null, "\t")
        .then(() => ({ ok: true, msg: 'Sobreescrito archivo completo con exito', arrayObjs }))
        .catch((err) => { throw new Error(err) })
    }
    catch (err) {
      console.log(`Error en escritura:\n\t=> ${err}`)
      return ({ ok: false, msg: err })
    }
  }

  cleanFile = () => {
    try {
      return fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify([], null, '\t'), null, "\t")
        .then(() => ({ ok: true, msg: `Archivo ${this.fileName} vaciado con exito` }))
        .catch((err) => { throw new Error(err) })
    }
    catch (err) {
      console.log(`Error en escritura:\n\t=> ${err}`)
      return ({ ok: false, msg: err })
    }
  }
}

export const archivoPalabrerioErrors = new Archivo("_PalabrerioError");

// esta funcion solamente es para que el array de productos comience con items para probar las request
/* export  const agregaErroresPrueba = async () => {
  const error_a = new PalabrerioError('e', 'a', 'r', 'real', 1, 3);
  const error_b = new PalabrerioError('e', 'a', 'r', 'real', 1, 3);
  const error_c = new PalabrerioError('e', 'a', 'r', 'real', 1, 3);
  const error_x = new PalabrerioError('e', 'a', 'r', 'real', 1, 3);
  const error_y = new PalabrerioError('e', 'a', 'r', 'real', 1, 3);
  const error_z = new PalabrerioError('e', 'a', 'r', 'real', 1, 3);

  archivoPalabrerioErrors.saveNewObject(error_a)
    .then(() => archivoPalabrerioErrors.saveNewObject(error_b))
    .then(() => archivoPalabrerioErrors.saveNewObject(error_c))
    .then(() => archivoPalabrerioErrors.saveNewObject(error_x))
    .then(() => archivoPalabrerioErrors.saveNewObject(error_y))
    .then(() => archivoPalabrerioErrors.saveNewObject(error_z))
}
*/