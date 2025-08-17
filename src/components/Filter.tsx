"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

function Filter() {
  const searchParamas = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParamas.toString());
    params.set("sort", value);

    router.push(pathname + "?" + params.toString(), { scroll: false });
  };

  return (
    <div className="flex my-6 justify-end items-center gap-4 text-sm text-gray-500">
      <span>Sort by:</span>
      <select
        className="ring-1 ring-gray-200 shadow-md rounded-md p-1 text-sm outline-green-200"
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
}

export default Filter;
