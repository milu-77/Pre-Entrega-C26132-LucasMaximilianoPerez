export const getAllProducts = async () => {
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        console.log("\n--- DETALLE DE  PRODUCTOS ---");
        console.table(data, ["title", "price"]);
    } catch (error) {
        console.error("Error al obtener el producto:", error.message);
    }
}
export const getProductById = async (id) => {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const contentLength = res.headers.get('content-length');
        if (!res.ok || parseInt(contentLength) === 0) {
            throw new Error(`No se encontró el producto con ID: ${id}`);
        }
        const data = await res.json();
        if (!data) {
            throw new Error(`No se encontró el producto con ID: ${id}`);
        }
        console.log("\n--- DETALLE DEL PRODUCTO ---");
        console.table([data], ["title", "price"]);

    } catch (error) {
        console.error("Error al obtener el producto:", error.message);
    }
}
export const createProduct = async (params) => {
    console.log("\n--- CREACION DE UN NUEVO PRODUCTO ---");
    console.table([params], ["_title", "_price"]);

}
export const deleteProducts = async (id) => {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`,
            {
                method: 'DELETE'
            });
        const data = await res.json();
        console.log("\n--- BORRADO DEL PRODUCTO ---");
        console.table([data], ["title", "price"]);

    } catch (error) {
        console.error("Error al borrar el producto:", error.message);
    }
}