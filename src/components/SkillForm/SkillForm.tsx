import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { TextField, Button } from '@mui/material';
import { useSkillStore } from '../../store/useSkillStore';
import DOMPurify from 'dompurify';

const schema = z.object({
  name: z.string().min(1),
  level: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const SkillForm: React.FC<{
  editingId?: string | null;
  onDone?: () => void;
}> = ({ editingId, onDone }) => {
  const { skills, add, update } = useSkillStore();
  const { register, handleSubmit, reset, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { level: 0 },
  });

  useEffect(() => {
    if (editingId) {
      const s = skills.find((x) => x.id === editingId);
      if (s) {
        setValue('name', s.name);
        setValue('level', s.level);
        setValue('notes', s.notes || '');
      }
    } else {
      reset({ level: 0, name: '', notes: '' });
    }
  }, [editingId]);

  const onSubmit = async (data: FormData) => {
    const safeNotes = data.notes ? DOMPurify.sanitize(data.notes) : undefined;
    if (editingId) {
      await update(editingId, {
        name: data.name,
        level: data.level || 0,
        notes: safeNotes,
      });
    } else {
      await add({ name: data.name, level: data.level || 0, notes: safeNotes });
    }
    reset();
    onDone && onDone();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}
    >
      <TextField label='Skill' {...register('name')} />
      <TextField
        label='Level'
        type='number'
        {...register('level', { valueAsNumber: true })}
      />
      <TextField label='Notes' {...register('notes')} />
      <Button type='submit' variant='contained'>
        Save
      </Button>
    </form>
  );
};

export default SkillForm;
