class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(nombreMascota) {
        this.mascotas.push(nombreMascota)
    } 

    countMascotas() {
        return this.mascotas.length
    }
    
    addBook(nombreLibro, autorLibro) {
        this.libros.push({ nombre: nombreLibro , autor: autorLibro})
    }

    getBookNames() {
        let bookNames = []
        this.libros.forEach(libro => {
          bookNames.push(libro.nombre);
        })
        return bookNames
    }
}

let user = new Usuario("German", "Valente", [{nombre: "LOTR", autor: "Tolkien"}, {nombre: "1984", autor: "Orwell"}], ["Elivs", "Luna", "Daisy"])

console.log(user)
console.log(user.getFullName())
console.log(user.countMascotas())
console.log(user.getBookNames())
user.addMascota("Sandokan")
user.addBook("El extranjero", "Camus")
console.log(user.countMascotas())
console.log(user.getBookNames())
console.log(user)
