import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { useSkillStore } from './useSkillStore';
import { Skill } from '../shared/interface';

const mockSkills: Skill[] = [
  { id: '1', name: 'JS', level: 3, updatedAt: '2025-01-01' },
  { id: '2', name: 'TS', level: 2, updatedAt: '2025-01-02' },
];

describe('useSkillStore', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockReset();
  });

  it('should fetch skills', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockSkills,
    });

    const { result } = renderHook(() => useSkillStore());

    await act(async () => {
      await result.current.fetchSkills();
    });

    expect(result.current.skills).toEqual(mockSkills);
    expect(result.current.loading).toBe(false);
  });

  it('should add a skill', async () => {
    const newSkill = { name: 'React', level: 4 };
    const createdSkill = { ...newSkill, id: '3', updatedAt: '2025-01-03' };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => createdSkill,
    });

    const { result } = renderHook(() => useSkillStore());

    await act(async () => {
      await result.current.add(newSkill);
    });

    expect(result.current.skills).toContainEqual(createdSkill);
  });

  it('should update a skill', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockSkills,
    });

    const { result } = renderHook(() => useSkillStore());

    await act(async () => {
      await result.current.fetchSkills();
    });

    const updated = { ...mockSkills[0], name: 'JavaScript' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => updated,
    });

    await act(async () => {
      await result.current.update('1', { name: 'JavaScript' });
    });

    expect(result.current.skills.find((s) => s.id === '1')?.name).toBe('JavaScript');
  });

  it('should remove a skill', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockSkills,
    });

    const { result } = renderHook(() => useSkillStore());

    await act(async () => {
      await result.current.fetchSkills();
    });

    (fetch as jest.Mock).mockResolvedValueOnce({});

    await act(async () => {
      await result.current.remove('1');
    });

    expect(result.current.skills.find((s) => s.id === '1')).toBeUndefined();
  });
});
