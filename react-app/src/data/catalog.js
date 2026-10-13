export const PRODUCTS = [
  { id: 'p1',  name: 'Helado Fresa Slowpoke',     cat: 'clasicos',  price: 24.00, img: 'assets/images/p-fresa.jpg',         desc: 'Cremoso helado de fresa con trozos reales de fruta. Suave y dulce.' },
  { id: 'p2',  name: 'Helado Vainilla Relax',     cat: 'clasicos',  price: 22.00, img: 'assets/images/p-vainilla.jpg',        desc: 'Vainilla de Madagascar batida lentamente para una textura sedosa.' },
  { id: 'p3',  name: 'Helado Frutos del Bosque',  cat: 'frutales',  price: 26.00, img: 'assets/images/p-frutos.jpg',         desc: 'Mezcla de moras, arándanos y frambuesas en una base láctea.' },
  { id: 'p4',  name: 'Sundae Rosado',             cat: 'especiales',price: 38.00, img: 'assets/images/p-sundae.jpg',         desc: 'Sundae de fresa con crema batida, sirope y grageas pastel.' },
  { id: 'p5',  name: 'Banana Split Slowpoke',     cat: 'especiales',price: 48.00, img: 'assets/images/p-banana.jpg',         desc: 'Tres bolas, plátano, caramelo y cerezas. El clásico reinventado.' },
  { id: 'p6',  name: 'Milkshake de Fresa',        cat: 'especiales',price: 31.00, img: 'assets/images/p-milkshake.jpg',      desc: 'Batido espeso de fresa con crema y nuestra firma rosa.' },
  { id: 'p7',  name: 'Copa Tropical',             cat: 'frutales',  price: 36.00, img: 'assets/images/p-tropical.jpg',        desc: 'Mango, piña y coco en una copa fresca y vibrante.' },
  { id: 'p8',  name: 'Helado Premium de Chocolate', cat: 'premium', price: 33.00, img: 'assets/images/p-chocolate.jpg',       desc: 'Chocolate belga 70% con virutas finas. Intenso y aterciopelado.' },
  { id: 'p9',  name: 'Helado Arcoíris',           cat: 'especiales',price: 29.00, img: 'assets/images/p-arcoiris.jpg',        desc: 'Cinco sabores en una sola copa: fresa, vainilla, limón, menta y mango.' },
  { id: 'p10', name: 'Edición Sweet Dreams',      cat: 'temporales',price: 41.00, img: 'assets/images/p-sweetdreams.jpg',     desc: 'Swirl pastel de algodón de azúcar con destellos comestibles.' },
  { id: 'p11', name: 'Helado de Pistacho',        cat: 'premium',   price: 32.00, img: 'assets/images/p-pistacho.jpg',        desc: 'Pistachos sicilianos triturados a mano sobre base cremosa.' },
  { id: 'p12', name: 'Menta Chip',                cat: 'clasicos',  price: 25.00, img: 'assets/images/p-menta.jpg',           desc: 'Refrescante menta con chispas de chocolate amargo.' },
  { id: 'p13', name: 'Dulce de Leche Artesanal',  cat: 'premium',   price: 30.00, img: 'assets/images/p-dulce.jpg',           desc: 'Dulce de leche cocido a fuego lento, rico y reconfortante.' },
  { id: 'p14', name: 'Cookies & Cream',           cat: 'clasicos',  price: 27.00, img: 'assets/images/p-cookies.jpg',         desc: 'Crema dulce con generosos trozos de galleta de chocolate.' },
  { id: 'p15', name: 'Calabaza Otoñal',           cat: 'temporales',price: 30.00, img: 'assets/images/p-otono.jpg',           desc: 'Edición limitada de calabaza especiada con un toque de canela.' },
  { id: 'p16', name: 'Especial Slowpoke',         cat: 'especiales',price: 45.00, img: 'assets/images/p-slowpoke-special.jpg', desc: 'Nuestra creación insignia: rosa cremoso con corazón de fresa.' },
];

export const CATEGORIES = [
  { id: 'all',        label: 'Todos' },
  { id: 'clasicos',  label: 'Clásicos' },
  { id: 'frutales',  label: 'Frutales' },
  { id: 'especiales',label: 'Especiales Slowpoke' },
  { id: 'premium',   label: 'Premium' },
  { id: 'temporales',label: 'Ediciones Temporales' },
];

export const STAFF = {
  mesa: [
    { name: 'Camila Rojas',   phone: '+591 70011223', role: 'Mesera' },
    { name: 'Iván Peredo',    phone: '+591 70022334', role: 'Mesero' },
    { name: 'Lucía Mendoza',  phone: '+591 70033445', role: 'Mesera' },
  ],
  llevar: [
    { name: 'Diego Terán',    phone: '+591 71544880', role: 'Repartidor' },
    { name: 'Marcela Vargas', phone: '+591 71655991', role: 'Repartidora' },
    { name: 'Alex Quiroga',   phone: '+591 71766002', role: 'Repartidor' },
  ],
};
