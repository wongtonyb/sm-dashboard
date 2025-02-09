"use client";

import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter();

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search); // grabs the query params from the URL
    params.set("page", newPage.toString()); // sets the 'page' query param to the new page number
    // updating the page params, will trigger the useEffect in the parent component
    router.push(`${window.location.pathname}?${params}`); // navigate to the new URL with updated query parameters
  };

  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled={!hasPrev}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => {
          changePage(page - 1);
        }}
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from(
          { length: Math.ceil(count / ITEM_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                key={pageIndex}
                className={`px-2 rounded-sm ${
                  page === pageIndex ? "bg-smSky" : ""
                }`}
                onClick={() => {
                  changePage(pageIndex);
                }}
              >
                {pageIndex}
              </button>
            );
          }
        )}
      </div>
      <button
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!hasNext}
        onClick={() => {
          changePage(page + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
