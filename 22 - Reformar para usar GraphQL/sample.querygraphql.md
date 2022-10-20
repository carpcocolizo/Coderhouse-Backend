mutation crearAuris {
        createProducto(datos: { nombre: "Auris", descripcion: "Shure", codigo: "S200", foto:"https://cdn1.iconfinder.com/data/icons/music-instrument-vol-2/512/headset_headphones_monitor_music-256.png", precio: 500, stock: 100}) {
         nombre _id descripcion foto precio
        }
}

{
  getProductoById(_id: "COLOCAR ID") {
   nombre descripcion codigo precio
  }
}

{
  getAllProductos {
   nombre precio stock
  }
}

mutation {
  updateProducto(_id: "COLOCAR ID", datos: {nombre: "Auris", descripcion: "Sennheiser", codigo: "SS", foto: "https://cdn1.iconfinder.com/data/icons/music-instrument-vol-2/512/headset_headphones_monitor_music-256.png", precio: 700, stock: 500}) {
    descripcion codigo precio stock
  }
}

mutation {
  deleteProducto(_id: "COLOCAR ID") {
    nombre
  }
}
