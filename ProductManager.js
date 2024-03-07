const fs = require("fs");
const fileProducts = "./fileProducts.json";
const productos = [
    { title: "dummyprod 1", description: "dummydesc 1", price: 200, img: "sin img", code: "COD1", stock: 10 },
    { title: "dummyprod 2", description: "dummydesc 2", price: 300, img: "sin img", code: "COD2", stock: 12 },
    { title: "dummyprod 3", description: "dummydesc 3", price: 400, img: "sin img", code: "COD3", stock: 22 },
    { title: "dummyprod 4", description: "dummydesc 4", price: 500, img: "sin img", code: "COD4", stock: 25 },
    { title: "dummyprod 5", description: "dummydesc 5", price: 600, img: "sin img", code: "COD5", stock: 32 },
    { title: "dummyprod 6", description: "dummydesc 6", price: 250, img: "sin img", code: "COD6", stock: 3 },
    { title: "dummyprod 7", description: "dummydesc 7", price: 350, img: "sin img", code: "COD7", stock: 77 },
    { title: "dummyprod 8", description: "dummydesc 8", price: 450, img: "sin img", code: "COD8", stock: 52 },
    { title: "dummyprod 9", description: "dummydesc 9", price: 550, img: "sin img", code: "COD9", stock: 81 },
    { title: "dummyprod 10", description: "dummydesc 10", price: 650, img: "sin img", code: "COD10", stock: 19 }
];

class ProductManager {
    //Variable estática:
    static ultId = 0
    constructor() {
        this.products = [];
        this.path = fileProducts;
    }


    addProduct(title, description, price, img, code, stock) {
        //Validaciones:
        //Que se agreguen todos los campos
        if (!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son obligatorios.");
            return;
        }


        if (this.products.some(item => item.code === code)) {
            console.log("El codigo ya existe.");
            return;
        }

        //Crear el objeto

        const newProduct = {
            id: ++ProductManager.ultId, //Sumo a la variable estactica, después asigno
            title,
            description,
            price,
            img,
            code,
            stock
        }

        //Agrego el objeto al array
        this.products.push(newProduct);
        this.guardarProductos();
    }

    getProducts() {
        return this.products;
    }



    getProductById(id) {
        const product = this.products.find(item => item.id === id);

        if (!product) {
            return undefined; // No se encontro el producto.
        } else {
            return product;
        }
    }

    guardarProductos() {
        fs.writeFile(this.path, JSON.stringify(this.products, null, 2), err => {
            if (err) {
                console.error('Error al guardar los productos:', err);
            }
        });
    }

    updateProduct(id, updatedFields) {
        const i = this.products.findIndex(product => product.id === id);
        if (i !== -1) {
            this.products[i] = { ...this.products[i], ...updatedFields };
            this.guardarProductos(); // Llama a la función para guardar los productos en el archivo.
        } else {
            console.log("Producto no encontrado.");
        }
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.guardarProductos(); // Llama a la función para guardar los productos en el archivo.
    }
}


const manager = new ProductManager();

//TESTING
//Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(manager.getProducts());

// Agrego 10 productos y los muestro
for (const producto of productos) {
    manager.addProduct(producto.title, producto.description, producto.price, producto.img, producto.code, producto.stock);
}
console.log(manager.getProducts());

//El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
manager.addProduct("dummyprod 1", "dummydesc 1", 200, "sin img", "COD1", 10);

//Validación de campos faltantes
manager.addProduct("dummydesc 1", 200, "sin img", "COD11", 10);

//Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado
manager.getProductById(2);

//en caso de no existir, debe arrojar un error.
manager.getProductById(11);

//Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto. 
manager.deleteProduct(2)
console.log(manager.getProducts());

//O que arroje un error en caso de no existir.
manager.deleteProduct(20)

// Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
manager.updateProduct(10, {
    title: "Producto 11",
    description: "Descripción del producto 11",
    price: 54,
    img: "con img",
    code: "COD10",
    stock: 50
});
console.log(manager.getProducts());

//Editamos un producto que no existe
manager.updateProduct(15, {
    title: "Producto 11",
    description: "Descripción del producto 11",
    price: 54,
    img: "con img",
    code: "COD10",
    stock: 50
});