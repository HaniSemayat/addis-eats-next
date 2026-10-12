"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { useCart } from "../Providers";
import fetcher from "../../lib/fetcher";

export default function SearchBox({ initialData, category = "" }) {
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [page, setPage] = useState(1);
  const [addedDishId, setAddedDishId] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(term.trim());
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [term]);

  useEffect(() => {
    setPage(1);
  }, [category]);

  const isInitialPage = debouncedTerm === "" && page === 1;

  const { data, error, isLoading } = useSWR(
    `/api/dishes?q=${encodeURIComponent(
      debouncedTerm
    )}&category=${encodeURIComponent(category)}&page=${page}`,
    fetcher,
    {
      keepPreviousData: true,
      fallbackData: isInitialPage ? initialData : undefined,
    }
  );

  if (error) {
    return (
      <p className="mt-4 text-red-600">
        Failed to load dishes. Please try again.
      </p>
    );
  }

  function handleAddToCart(dish) {
    addToCart(dish);
    setAddedDishId(dish.id);
  }

  return (
    <section className="mt-8">
      <label
        htmlFor="dish-search"
        className="block text-sm font-semibold"
      >
        Search dishes
      </label>

      <input
        id="dish-search"
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Search for a dish..."
        className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
      />

      {isLoading && !data && (
        <p className="mt-4 text-gray-600" role="status">
          Loading dishes...
        </p>
      )}

      {data && (
        <>
          {data.dishes.length === 0 ? (
            <p className="mt-6 text-gray-600">
              No dishes found.
            </p>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.dishes.map((dish, index) => {
                const priorityImage =
                  page === 1 &&
                  debouncedTerm === "" &&
                  index === 0;

                return (
                  <article
                    key={dish.id}
                    className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-orange-50">
                      <Image
                        src={dish.image}
                        alt={dish.imageAlt}
                        width={800}
                        height={600}
                        sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) calc(50vw - 3rem), 33vw"
                        priority={priorityImage}
                        loading={priorityImage ? "eager" : "lazy"}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-orange-600">
                      {dish.category}
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-gray-900">
                      {dish.name}
                    </h2>

                    <p className="mt-2 text-lg font-semibold text-orange-600">
                      {dish.price} ETB
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(dish)}
                        className="rounded-lg bg-orange-600 px-4 py-2 font-medium text-white transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      >
                        {addedDishId === dish.id
                          ? "Add Another"
                          : "Add to Cart"}
                      </button>

                      <Link
                        href={`/menu/${dish.id}`}
                        className="rounded-lg bg-gray-900 px-4 py-2 font-medium text-white transition hover:bg-gray-800"
                      >
                        View Dish
                      </Link>
                    </div>

                    {addedDishId === dish.id && (
                      <p
                        className="mt-2 text-sm text-green-700"
                        role="status"
                      >
                        {dish.name} added to cart!
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-6 flex items-center gap-4">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((current) => current - 1)}
              className="rounded-lg border px-4 py-2 disabled:opacity-50"
            >
              Previous
            </button>

            <span aria-live="polite">
              Page {data.page} of {data.totalPages}
            </span>

            <button
              type="button"
              disabled={page >= data.totalPages}
              onClick={() => setPage((current) => current + 1)}
              className="rounded-lg border px-4 py-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}
