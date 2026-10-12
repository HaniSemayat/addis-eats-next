import { getDishes } from "../../../lib/dishes";

const validCategories = [
  "ethiopian",
  "pizza",
  "burgers",
  "drinks",
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q")?.trim().toLowerCase() || "";
  const requestedCategory =
    searchParams.get("category")?.trim().toLowerCase() || "";
  const requestedPage = Number(searchParams.get("page")) || 1;
  const page = Number.isInteger(requestedPage)
    ? Math.max(1, requestedPage)
    : 1;
  const limit = 3;

  if (
    requestedCategory &&
    !validCategories.includes(requestedCategory)
  ) {
    return Response.json(
      { error: "Invalid category" },
      { status: 400 }
    );
  }

  const dishes = await getDishes();

  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory =
      !requestedCategory || dish.category === requestedCategory;
    const matchesSearch = dish.name.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredDishes.length / limit);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const start = (safePage - 1) * limit;

  return Response.json({
    dishes: filteredDishes.slice(start, start + limit),
    page: safePage,
    totalPages,
  });
}
