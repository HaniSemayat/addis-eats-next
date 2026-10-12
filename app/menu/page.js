import Link from "next/link";
import CategoryBar from "./CategoryBar";
import SearchBox from "./SearchBox";
import { getDishes } from "../../lib/dishes";

export const metadata = {
  title: "Menu",
  description:
    "Explore Ethiopian dishes, pizzas, burgers, and drinks on the Addis Eats menu.",
  alternates: {
    canonical: "/menu",
  },
};

const categories = [
  "All",
  "Ethiopian",
  "Pizza",
  "Burgers",
  "Drinks",
];

export default async function MenuPage({ searchParams }) {
  const params = await searchParams;
  const requestedCategory = (params?.category || "").toLowerCase();

  const validCategories = categories
    .filter((category) => category !== "All")
    .map((category) => category.toLowerCase());

  const category = validCategories.includes(requestedCategory)
    ? requestedCategory
    : "";

  const selectedCategory =
    categories.find(
      (item) => item.toLowerCase() === category
    ) || "All";

  const dishes = await getDishes();

  const filteredDishes = category
    ? dishes.filter((dish) => dish.category === category)
    : dishes;

  const limit = 3;

  const initialData = {
    dishes: filteredDishes.slice(0, limit),
    page: 1,
    totalPages: Math.max(
      1,
      Math.ceil(filteredDishes.length / limit)
    ),
  };

  return (
    <main>
      <h1>Our Menu</h1>

      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
      />

      <SearchBox
        initialData={initialData}
        category={category}
      />

      <Link href="/">Back Home</Link>
    </main>
  );
}
