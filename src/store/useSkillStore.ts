import { create } from 'zustand';
import { Skill } from '../shared/interface';

type State = {
  skills: Skill[];
  loading: boolean;
  fetchSkills: () => Promise<void>;
  add: (s: Omit<Skill, 'id' | 'updatedAt'>) => Promise<void>;
  update: (id: string, p: Partial<Skill>) => Promise<void>;
  remove: (id: string) => Promise<void>;
};

export const useSkillStore = create<State>((set) => ({
  skills: [],
  loading: false,
  fetchSkills: async () => {
    set({ loading: true });
    const res = await fetch('/api/skills');
    const data = await res.json();
    set({ skills: data, loading: false });
  },
  add: async (s) => {
    const res = await fetch('/api/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(s),
    });
    const created = await res.json();
    set((state) => ({ skills: [...state.skills, created] }));
  },
  update: async (id, p) => {
    const res = await fetch(`/api/skills/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p),
    });
    const updated = await res.json();
    set((state) => ({
      skills: state.skills.map((sk) => (sk.id === id ? updated : sk)),
    }));
  },
  remove: async (id) => {
    await fetch(`/api/skills/${id}`, { method: 'DELETE' });
    set((state) => ({ skills: state.skills.filter((sk) => sk.id !== id) }));
  },
}));
