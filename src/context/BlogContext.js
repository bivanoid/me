import { createContext, useContext, useState } from "react"

const BlogContext = createContext()

export function BlogProvider({ children }) {
  const [blogs, setBlogs] = useState([])
  const [hasFetched, setHasFetched] = useState(false)

  return (
    <BlogContext.Provider value={{ blogs, setBlogs, hasFetched, setHasFetched }}>
      {children}
    </BlogContext.Provider>
  )
}

export function useBlogContext() {
  return useContext(BlogContext)
}
