export interface Score {
  _id: string
  user_id: number
  accuracy: number
  mods: ['MR', 'DT', 'HR', 'HD', 'NC', 'FI', 'RD']
  score: number
  max_combo: number
  created_at: string
  beatmap_id: number
  beatmapset_id: number
}