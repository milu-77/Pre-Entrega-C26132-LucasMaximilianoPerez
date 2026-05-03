export class Product {
    constructor({ 
    title="pruducto generico", 
    price = 0, 
    description = "Sin descripción", 
    category = "varios", 
    image = "https://placehold.co/150" 
} = {}) {
    this._title = title;
    this._price = price;
    this._description = description;
    this._category = category;
    this._image = image;
}

  
    
}