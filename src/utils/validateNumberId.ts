export const validateNumberIDs = (id: number) => {
  // TODO: Refactor
  //if (idProducto && idProducto === -1 && idCarrito && idCarrito === -1) { return ({ error: true, msg: 'ID Producto e ID PalabrerioError invalido' }) }
  // else  if (idProducto && idProducto === -1) { return ({ error: true, msg: 'ID Producto invalido' }) }
  /* else */ if (id && id === -1) { return ({ error: true, msg: 'ID PalabrerioError invalido' }) }

  return ({ error: false, msg: 'continue' })
}