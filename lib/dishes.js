export const dishes = [
  {
    id: 1,
    name: "Doro Wot",
    category: "ethiopian",
    price: 650,
    image: "/dishes/doro-wot.webp",
    imageAlt: "Traditional Ethiopian Doro Wot served with injera",
  },
  {
    id: 2,
    name: "Tibs",
    category: "ethiopian",
    price: 500,
    image: "/dishes/tibs.webp",
    imageAlt: "Ethiopian-style Tibs with sauteed meat and vegetables",
  },
  {
    id: 3,
    name: "Veg Pizza",
    category: "pizza",
    price: 450,
    image: "/dishes/veg-pizza.webp",
    imageAlt: "Vegetable pizza topped with fresh ingredients",
  },
  {
    id: 4,
    name: "Beef Burger",
    category: "burgers",
    price: 380,
    image: "/dishes/beef-burger.webp",
    imageAlt: "Beef burger served in a bun",
  },
  {
    id: 5,
    name: "Cheese Burger",
    category: "burgers",
    price: 420,
    image: "/dishes/cheese-burger.webp",
    imageAlt: "Cheeseburger with melted cheese",
  },
  {
    id: 6,
    name: "Coffee",
    category: "drinks",
    price: 70,
    image: "/dishes/coffee.webp",
    imageAlt: "Freshly brewed coffee",
  },
  {
    id: 7,
    name: "Macchiato",
    category: "drinks",
    price: 80,
    image: "/dishes/macchiato.webp",
    imageAlt: "Macchiato coffee topped with milk foam",
  },
  {
    id: 8,
    name: "Orange Juice",
    category: "drinks",
    price: 120,
    image: "/dishes/orange-juice.webp",
    imageAlt: "Glass of fresh orange juice",
  },
  {
    id: 9,
    name: "Avocado Juice",
    category: "drinks",
    price: 120,
    image: "/dishes/avocado-juice.webp",
    imageAlt: "Glass of creamy avocado juice",
  },
];

export async function getDishes() {
  return dishes;
}

export async function getDish(id) {
  return dishes.find((dish) => dish.id === Number(id));
}
