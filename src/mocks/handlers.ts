import { rest } from 'msw';
import { Skill } from '../shared/interface';

let skills: Skill[] = [
  {
    id: '0',
    name: 'React',
    level: 80,
    notes: 'Hooks, context',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '1',
    name: 'TypeScript',
    level: 45,
    notes: 'Generics basics',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Angular',
    level: 25,
    notes: 'Basics',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Javascript',
    level: 95,
    notes: 'Advanced concepts',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Node.js',
    level: 70,
    notes: 'Express, REST APIs',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'CSS',
    level: 60,
    notes: 'Flexbox, Grid, Animations',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Python',
    level: 50,
    notes: 'Scripting, Data Analysis',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'GraphQL',
    level: 35,
    notes: 'Queries, Mutations, Apollo',
    updatedAt: new Date().toISOString(),
  },
];

export const handlers = [
  rest.get('/api/skills', (req, res, ctx) => {
    return res(ctx.delay(250), ctx.status(200), ctx.json(skills));
  }),
  rest.post('/api/skills', async (req, res, ctx) => {
    const body = await req.json();
    const newSkill = {
      ...body,
      id: String(Date.now()),
      updatedAt: new Date().toISOString(),
    };
    skills.push(newSkill);
    return res(ctx.delay(200), ctx.status(201), ctx.json(newSkill));
  }),
  rest.put('/api/skills/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const patch = await req.json();
    skills = skills.map((s) =>
      s.id === id ? { ...s, ...patch, updatedAt: new Date().toISOString() } : s
    );
    const updated = skills.find((s) => s.id === id);
    return res(ctx.delay(200), ctx.status(200), ctx.json(updated));
  }),
  rest.delete('/api/skills/:id', (req, res, ctx) => {
    const { id } = req.params;
    skills = skills.filter((s) => s.id !== id);
    return res(ctx.delay(150), ctx.status(200), ctx.json({ ok: true }));
  }),
  rest.get('/api/export', (req, res, ctx) => {
    const header = ['id', 'name', 'level', 'notes', 'updatedAt'];
    const rows = skills.map((s) => [
      s.id,
      s.name,
      String(s.level),
      s.notes || '',
      s.updatedAt,
    ]);
    const csv = [header, ...rows]
      .map((r) =>
        r.map((c) => '"' + String(c).replace(/"/g, '""') + '"').join(',')
      )
      .join('\n');
    return res(
      ctx.delay(100),
      ctx.status(200),
      ctx.body(csv),
      ctx.set('Content-Type', 'text/csv')
    );
  }),
];
