import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@mui/material';
import DOMPurify from 'dompurify';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSkillStore } from '../../store/useSkillStore';

const schema = z.object({
  name: z.string().min(1),
  level: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

type SkillFormProps = {
  editingId?: string | null;
  onDone?: () => void;
};

const getDefaultValues = () => ({ name: '', notes: '', level: 0 });

const SkillForm: React.FC<SkillFormProps> = ({ editingId, onDone }) => {
  const { t } = useTranslation();
  const { skills, add, update } = useSkillStore();
  const { register, handleSubmit, reset, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    if (editingId) {
      const skill = skills.find((x) => x.id === editingId);
      if (skill) {
        setValue('name', skill.name);
        setValue('level', skill.level);
        setValue('notes', skill.notes || '');
      }
    } else {
      reset(getDefaultValues());
    }
  }, [editingId, skills, setValue, reset]);

  const onSubmit = async (data: FormData) => {
    const safeNotes = data.notes ? DOMPurify.sanitize(data.notes) : undefined;
    const payload = {
      name: data.name,
      level: data.level || 0,
      notes: safeNotes,
    };
    if (editingId) {
      await update(editingId, payload);
    } else {
      await add(payload);
    }
    reset(getDefaultValues());
    if (onDone) onDone();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <TextField label={t('skill')} InputLabelProps={{ shrink: true }} {...register('name')} />
      <TextField
        label={t('level')}
        InputLabelProps={{ shrink: true }}
        type="number"
        {...register('level', { valueAsNumber: true })}
      />
      <TextField label={t('notes')} InputLabelProps={{ shrink: true }} {...register('notes')} />
      <Button type="submit" variant="contained">
        {t('add')}
      </Button>
    </form>
  );
};

export default SkillForm;
