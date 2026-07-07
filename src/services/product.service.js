
import * as model from '../models/firestore.model.js'
const collection= 'products';

const formatProductStructure = (product) => {
    if (!product) return null;

    return {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        stock: product.stock,
        description: product.description || "" // Si no tiene descripción, evita que quede undefined
    };
};


export async function getAllProducts() {
     const products = await model.readDocuments(collection);
   return products.map(product => formatProductStructure(product));
}

export const getProductById = async (id) => {
    const product =await model.readDocument(collection,id);
    if (product && (typeof product.exists === 'function' ? product.exists() : product)) {
        
        return formatProductStructure ( product);
    }else{
        console.warn(` No se encontró ningún producto con el ID: ${id}`);
    return null;
    }
     
    

};

export const createProduct = async (productData) => {
   return model.createDocument(collection,   productData) 
};

export const updateProduct = async (id, data) => {
   model.updateDocument(collection, id, data) 
};

export const deleteProduct = async (id) => {
    model.deleteDocument(collection,id);
};

export const clearProductsCollection = async () => {
    model.clearDocument(collection)
};




