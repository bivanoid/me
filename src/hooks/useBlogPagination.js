// hooks/useBlogPagination.js
import { useState, useCallback } from 'react';
import { supabase } from './supabaseClient';

const ITEMS_PER_PAGE = 10;

export function useBlogPagination() {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchBlogsWithPagination = useCallback(async (filterType, currentPage) => {
    const from = currentPage * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;

    let query = supabase
      .from("blog")
      .select("*, image_url, title_blog, sub_title, category, created_at", { count: 'exact' })
      .range(from, to);

    if (filterType === "latest") {
      query = query.order("created_at", { ascending: false });
    } else {
      query = query.order("created_at", { ascending: true });
    }

    const { data, error, count } = await query;

    if (data) {
      setHasMore(to < count - 1);
    }

    return { data, error, count };
  }, []);

  return { fetchBlogsWithPagination, page, setPage, hasMore };
}