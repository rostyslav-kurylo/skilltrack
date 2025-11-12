export type Skill = {
  id: string
  name: string
  level: number
  notes?: string
  updatedAt: string
}

export const client = {
  list: async ()=> {
    const res = await fetch('/api/skills');
    return res.json();
  }
}
