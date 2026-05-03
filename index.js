import { getAllProducts, getProductById, createProduct, deleteProducts } from './src/controllers/productControllers.js';
import { Product } from './src/models/Product.js';
const [, , method, path, ...args] = process.argv;

// getAllProducts();
// getProductById(1);
// const producto = new Product();
// createProduct(producto);
// deleteProducts(1);

const main = async () => {
    if (method === 'GET' && path === 'products') {
        await getAllProducts();
    }
    else if (method === 'GET' && path.startsWith('products/')) {
        try {
            const id = path.split('/')[1];
            if (!id) throw new Error("El ID es obligatorio para el GET BY ID.");
            await getProductById(id);
        } catch (err) {
            console.error("Error de entrada:", err.message);
        }
    }
    else if (method === 'POST' && path === 'products') {
        try {

            const [title, price, category] = args;
            if (!title) throw new Error("El título es obligatorio para el POST.");
            if (!price) throw new Error("El Precio es obligatorio para el POST.");
            if (!category) throw new Error("La Categoria es obligatorio para el POST.");

            await createProduct(new Product({ title: title, price: price, category: category }));


        } catch (err) {
            console.error("Error de entrada:", err.message);
        }
    }
    else if (method === 'DELETE' && path.startsWith('products/')) {
        try {
            const id = path.split('/')[1];
            if (!id) throw new Error("El ID es obligatorio para el DELETE.");
            await deleteProducts(id);

        } catch (err) {
            console.error("Error de entrada:", err.message);
        }

    }
    else {
        console.log("Comando no reconocido");
    }
};

main();