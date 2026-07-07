// seed.js
import { createProduct } from './src/services/product.service.js';

const librosCienciaFiccion = [
    {
        name: "Dune",
        price: 32000,
        category: "ciencia-ficcion",
        stock: 12,
        description: "La obra maestra de Frank Herbert ambientada en el desértico planeta Arrakis, donde se disputa el control de la especia, la sustancia más valiosa del universo."
    },
    {
        name: "Fundación",
        price: 28500,
        category: "ciencia-ficcion",
        stock: 8,
        description: "El inicio de la mítica saga de Isaac Asimov. El psicohistorrador Hari Seldon predice la caída del Imperio Galáctico y crea la Fundación para preservar el conocimiento humano."
    },
    {
        name: "Neuromante",
        price: 26000,
        category: "ciencia-ficcion",
        stock: 15,
        description: "La novela de William Gibson que definió el género Cyberpunk. Case, un hacker informático en desgracia, es contratado para dar el golpe definitivo en el ciberespacio."
    },
    {
        name: "¿Sueñan los androides con ovejas eléctricas?",
        price: 24000,
        category: "ciencia-ficcion",
        stock: 6,
        description: "La obra de Philip K. Dick que inspiró la película Blade Runner. Rick Deckard es un cazador de bonificaciones encargado de 'retirar' a un grupo de replicantes rebeldes."
    },
    {
        name: "Fahrenheit 451",
        price: 22000,
        category: "ciencia-ficcion",
        stock: 20,
        description: "Una distopía clásica de Ray Bradbury donde los bomberos tienen la misión de quemar libros por orden del gobierno para mantener a la sociedad controlada y apática."
    },
    {
        name: "Un mundo feliz",
        price: 23500,
        category: "ciencia-ficcion",
        stock: 10,
        description: "Aldous Huxley presenta una sociedad futura sombría y tecnológicamente avanzada donde el dolor y la guerra han sido erradicados a cambio de sacrificar la libertad y el arte."
    }
];

const seed = async () => {
    console.log("Carga de productos en Firebase...");
    try {
        for (const libros of librosCienciaFiccion ) {
            // Adaptamos para que use el nombre de tu función de servicios
            const id = await createProduct(libros);
            console.log(`  Producto creado: ${libros.name} con ID: ${id}`);
        }
        console.log("✨ Proceso de semilla terminado con éxito");
        process.exit(0);
    } catch (error) {
        console.error(" Error en la carga:", error.message);
        process.exit(1);
    }
};

seed();