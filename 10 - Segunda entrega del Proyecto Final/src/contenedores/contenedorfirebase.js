import admin from "firebase-admin"
import config from "../config.js"

admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
});
  
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue

console.log("Conectado a la base de datos de FireBase!")


class ContenedorFirebase {
    
    constructor(collectionName) {
      this.collection = db.collection(collectionName);
    }

  insert = async (document) => {
    try {
      const newDoc = this.collection.doc();
      await newDoc.create(document);
      await newDoc.update(({id: newDoc.id}))
      return newDoc.id
    } catch(error) {
      console.log(`Hubo un error: ${error}`)
    }
  }

  getAll = async () => {
    try {
      const snapshot = await this.collection.get();
      return snapshot.docs.map(doc => doc.data())
    } catch(error) {
      console.log(`Hubo un error: ${error}`)
    }
  }

  getById = async (id) => {
    try {
      const doc = this.collection.doc(id)
      const item = await doc.get()
      if (item.data().productos) {
        return item.data().productos
      }
      return item.data()
    } catch(error) {
      console.log(`Hubo un error: ${error}`)
    }
  }

  update = async (id, document) => {
    try {
      const doc = this.collection.doc(id)
      return await doc.update(document)
    } catch(error) {
      console.log(`Hubo un error: ${error}`)
    }
  }
  // Al usar arrayUnion no se puede incluir 2 elementos iguales en 1 array, por eso recurro a una forma alternativa
  push = async (id, document) => {
    try {
      const doc = this.collection.doc(id)
      const items = await doc.get()
      const itemsProductos = items.data().productos
      itemsProductos.push(document)
      return await doc.update({productos: itemsProductos})
    } catch(error) {
      console.log(`Hubo un error: ${error}`)
    }
  }

  deleteById = async (id) => {
    try {
      const doc = this.collection.doc(id)
      return await doc.delete()
    } catch(error) {
      console.log(`Hubo un error: ${error}`)
    }
  }

  // Al usar arrayUnion no se puede filtrar por values, por eso recurro a una forma alternativa
  deleteFromCarrito = async (id1, id2) => {
    try {
      const doc = this.collection.doc(id1)
      const items = await doc.get()
      console.log(items)
      const itemsProductos = items.data().productos
      const newArray = itemsProductos.filter((producto) => {
        if(producto.id != id2) {
          return producto
        }})
      return await doc.update({productos: newArray})
    } catch(error) {
      console.log(`Hubo un error: ${error}`)
    }
  }

}

export default ContenedorFirebase;