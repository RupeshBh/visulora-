import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import type { PromptCard } from './data'

const ASPECTS: PromptCard['aspect'][] = ['tall', 'landscape', 'tall', 'square', 'landscape', 'tall']

export function useSupabasePrompts() {
  const [cards, setCards] = useState<PromptCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) { console.error(error); return }

      const mapped: PromptCard[] = (data || []).map((row, i) => ({
        id:             String(row.id),
        title:          row.title,
        category:       row.category,
        image:          row.image_url,
        prompt:         row.prompt_text,
        tags:           row.tags ? row.tags.split(',').map((t: string) => t.trim()) : [],
        likes:          row.likes ?? 0,
        views:          0,
        featured:       row.featured ?? false,
        aspect:         ASPECTS[i % ASPECTS.length],
        createdDaysAgo: Math.floor((Date.now() - new Date(row.created_at).getTime()) / 86400000),
      }))

      setCards(mapped)
      setLoading(false)
    }
    fetch()
  }, [])

  return { cards, loading }
}