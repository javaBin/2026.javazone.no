import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '6lfixonw',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})
