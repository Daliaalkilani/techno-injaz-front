import { useEffect } from 'react'

/** Minimal client-side SEO: sets document title + meta description per page. */
export function useSeo(title: string, description?: string) {
  useEffect(() => {
    document.title = `${title} — تكنو إنجاز`
    if (description) {
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', 'description')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', description)
    }
  }, [title, description])
}
