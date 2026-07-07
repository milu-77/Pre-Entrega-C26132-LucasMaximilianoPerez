import * as productsService from '../services/product.service.js'


export const getAllProducts = async (req, res) => {
    try {
    const products = await productsService.getAllProducts();
    res.status(200).json(products);
    }catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al conectar con el servicio externo de datos (Firestore).'
        });
    }


}

export const getProductById = async (req, res) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string' || id.trim().length !== 20) {
        return res.status(400).json({
            status: 'error',
            message: 'El ID provisto no es válido. Debe ser una cadena de texto válida de Firestore.'
        });
    }
    try {
    const product = await productsService.getProductById(id);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al obtener el producto desde la base de datos.'
        });
    }
}

export const createProduct = async (req, res) => {
    const { name, description, price, category, stock, imageUrl } = req.body;
    
    if (!name || !description || !price || !category || !stock) {
        return res.status(400).json({
            status: 'error',
            message: 'Faltan campos obligatorios. Debes proveer: name, description, price, category y stock.'
        });
    }

    if (isNaN(price) || Number(price) <= 0) {
        return res.status(400).json({
            status: 'error',
            message: 'El precio debe ser un número mayor a cero.'
        });
    }
    if (isNaN(stock) || Number(stock) < 0) {
        return res.status(400).json({
            status: 'error',
            message: 'El stock no puede ser un número negativo.'
        });
    }
    try {
        const newProduct = await productsService.createProduct(req.body);
    res.status(201).json({
        status: 'success',
        message: 'Producto validado y creado con éxito',
        data: { name, description, price, category, stock, imageUrl }
    });
     } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'No se pudo guardar el producto. El servicio de datos no responde.'
        });
    }
}

export const updateProduct = async (req, res) => {
    const { name, description, price, category, stock, imageUrl } = req.body;
    const { id } = req.params;


    if (!id || typeof id !== 'string' || id.trim().length !== 20) {
        return res.status(400).json({
            status: 'error',
            message: 'El ID provisto no es válido. Debe ser una cadena de texto válida de Firestore.'
        });
    }
    // validar precio no vacio y mayor a 0
    if (price !== undefined && (isNaN(price) || Number(price) <= 0)) {
        return res.status(400).json({
            status: 'error',
            message: 'El precio provisto debe ser un número mayor a cero.'
        });
    }

    // validar stock: no vacio y mayor a 0
    if (stock !== undefined && (isNaN(stock) || Number(stock) < 0)) {
        return res.status(400).json({
            status: 'error',
            message: 'El stock provisto no puede ser un número negativo.'
        });
    }
     if (name !== undefined && name.trim() === "") {
        return res.status(400).json({
            status: 'error',
            message: 'El nombre no puede quedar vacío.'
        });
    }
    try {

    await productsService.updateProduct(id, req.body);
    res.status(200).json({
        status: 'ok',
        message: 'Producto actualizado'
    });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error de conexión. No se pudo actualizar el producto.'
        });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string' || id.trim().length !== 20) {
        return res.status(400).json({
            status: 'error',
            message: 'El ID provisto no es válido. Debe ser una cadena de texto válida de Firestore.'
        });
    }
   try {
        // Corrección: Agregamos await
        await productsService.deleteProduct(id);
        return res.status(200).json({
            status: 'ok',
            message: 'Producto borrado permanentemente'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'No se pudo eliminar el recurso de la base de datos remota.'
        });
    }
}

export const clearProductsCollection = async (req, res) => {
    try {
    const products = await productsService.clearProductsCollection();
    return res.status(200).json({
            status: 'success',
            message: 'Colección de productos vaciada por completo'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Fallo crítico al intentar limpiar la colección.'
        });
    }
}