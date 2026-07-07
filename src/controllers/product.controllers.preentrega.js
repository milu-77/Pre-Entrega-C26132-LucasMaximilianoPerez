
const url ="https://fakestoreapi.com"
export const getAllProducts = async () => {
    try {
        const res = await fetch(url+'/products');
        const data = await res.json();
        console.log("\n--- DETALLE DE  PRODUCTOS ---");
 
        console.table(data, ["id", "title", "price", "category"]);
    } catch (error) {
        console.error("Error al obtener el producto:", error.message);
    }
}
export const getProductById = async (id) => {
    try {
        const res = await fetch(url+`/products/${id}`);
        const contentLength = res.headers.get('content-length');
        if (!res.ok || parseInt(contentLength) === 0) {
            throw new Error(`No se encontró el producto con ID: ${id}`);
        }
        const data = await res.json();
        if (!data) {
            throw new Error(`No se encontró el producto con ID: ${id}`);
        }
        console.log("\n--- DETALLE DEL PRODUCTO ---");
        console.table([data], ["id", "title", "price", "category"]);

    } catch (error) {
        console.error("Error al obtener el producto:", error.message);
    }
}
export const createProduct = async (params) => {
    console.log("\n--- CREACION DE UN NUEVO PRODUCTO ---");
    
    try {
         const res = await fetch(url+`/products`,
            {
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
            });
            
        const data = await res.json();
         console.log("PRODUCTO CREADO EXITOSAMENTE");
         console.table([data], ["id", "title", "price", "category"]);
    } catch (error) {
        console.error("Error al obtener el producto:", error.message);
    }





}
export const deleteProducts = async (id) => {
    try {
        const res = await fetch(url+`/products/${id}`,
            {
                method: 'DELETE'
            });
        const data = await res.json();
        console.log("\n--- BORRADO DEL PRODUCTO ---");
         console.log("PRODUCTO BORRADO EXITOSAMENTE");
        console.table([data], ["id", "title", "price", "category"]);

    } catch (error) {
        console.error("Error al borrar el producto:", error.message);
    }
}