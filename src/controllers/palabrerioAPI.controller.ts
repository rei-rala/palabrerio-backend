import { archivoPalabrerioErrors } from "../models/Archivo";
import { PalabrerioError } from "../models/PalabrerioError";
import { validateNumberIDs } from "../utils/validateNumberId";

export const getPalErrors = (_, res) => {
  try {
    archivoPalabrerioErrors
      .read()
      .then((fullList: PalabrerioError[]) => {
        res.send({ ok: true, msg: 'Mostrando lista completa', total: fullList.length, fullList });
      })
      .catch((msg) => {
        throw msg;
      });
  } catch (err) {
    res.send({ ok: false, msg: err });
  }
};

export const getFirstPalError = (_, res) => {
  try {
    archivoPalabrerioErrors
      .read()
      .then((fullList: PalabrerioError[]) => {
        res.send({ ok: true, msg: 'Mostrando primer registro', total: fullList.length, userError: fullList[1] });
      })
      .catch((msg) => {
        throw msg;
      });
  } catch (err) {
    res.send({ ok: false, msg: err });
  }
};

export const getLastPalError = (_, res) => {
  try {
    archivoPalabrerioErrors
      .read()
      .then((fullList: PalabrerioError[]) => {
        res.send({ ok: true, msg: 'Mostrando ultimo registro', total: fullList.length, userError: fullList[fullList.length - 1] });
      })
      .catch((msg) => {
        throw msg;
      });
  } catch (err) {
    res.send({ ok: false, msg: err });
  }
};

export const getPalErrorById = (req, res) => {
  const idError =
    req.params.idError && !isNaN(req.params.idError)
      ? parseInt(req.params.idError)
      : -1;

  try {
    const test = validateNumberIDs(idError);
    if (test.error) {
      throw test.msg;
    }

    return archivoPalabrerioErrors
      .getById(idError)
      .then((found) => {
        if (found) {
          console.log(found)
          res.send({ ok: true, msg: `Mostrando error con id ${idError}`, userError: found });
        } else {
          res.status(404).send({ ok: false, msg: `No encontrado id ${idError}` });
        }
      })
      .catch((msg) => { throw msg; });
  } catch (err) {
    return res.status(400).send({ ok: false, msg: err });
  }
};

export const saveNewPalError = (req, res) => {
  const {
    typed,
    expected,
    prevChar,
    currentWord,
    charIndex,
    wordIndex,
  } = <
    {
      typed: string;
      expected: string;
      prevChar: string;
      currentWord: string;
      charIndex: number;
      wordIndex: number;
    }
    >req.body;
  console.log({
    typed: typed,
    expected: expected,
    prevChar: prevChar,
    currentWord: currentWord,
    charIndex: charIndex,
    wordIndex: wordIndex
  })
  try {
    if (
      typed != undefined &&
      expected != undefined &&
      prevChar != undefined &&
      currentWord != undefined &&
      charIndex != undefined &&
      wordIndex != undefined
    ) {
      const newError = new PalabrerioError(
        typed,
        expected,
        prevChar,
        currentWord,
        charIndex,
        wordIndex
      );
      return archivoPalabrerioErrors.saveNewObject(newError)
        .then(ok => ok && res.send({ ok: true, msg: 'Guardado con exito' }))
        .catch(err => { throw err })
    } else {
      throw "Faltan completar campos";
    }
  } catch (err) {
    return res.send({ ok: false, msg: err });
  }
};
