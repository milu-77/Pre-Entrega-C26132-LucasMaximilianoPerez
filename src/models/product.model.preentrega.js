export class Product {
    constructor({ 
    title="pruducto generico", 
    price = 0, 
    description = "Sin descripción", 
    category = "varios", 
    image = "https://placehold.co/150" 
} = {}) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.category = category;
    this.image = image;
}

  
    
}