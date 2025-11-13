import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Card, IconButton, Typography, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Loading, SkillForm } from '../../components';
import { useSkillStore } from '../../store/useSkillStore';

import './SkillsPage.css';

const SkillsPage: React.FC = () => {
  const { t } = useTranslation();
  const { skills, fetchSkills, remove, loading } = useSkillStore();
  const [editing, setEditing] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleEdit = (id: string) => setEditing(id);
  const handleDelete = (id: string) => remove(id);
  const handleDone = () => setEditing(null);

  const filteredSkills = useMemo(() => {
    if (!filter) return skills;

    const re = new RegExp(filter, 'i');
    return skills.filter((s) => re.test(s.name) || re.test(s.notes || ''));
  }, [filter, skills]);

  const exportCSV = async () => {
    const res = await fetch('/api/export');
    const csv = await res.text();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'skills.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="skills-page">
      <Typography variant="h4" gutterBottom component="h1" tabIndex={0}>
        {t('skills')}
      </Typography>
      <Card className="card" component="section" aria-label={t('add')}>
        <SkillForm editingId={editing} onDone={handleDone} />
      </Card>
      {loading ? (
        <Loading />
      ) : (
        <>
          <TextField
            className="filter-input"
            label={t('filter')}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder={t('filterPlaceholder')}
            inputProps={{ 'aria-label': t('filter') }}
          />
          <Grid container spacing={2} aria-label={t('skills')}>
            {filteredSkills.map((s) => (
              <Grid key={s.id} size={{ xs: 12, md: 6 }}>
                <Card className="card" component="article" aria-labelledby={`skill-title-${s.id}`}>
                  <div className="card-content">
                    <div>
                      <Typography variant="h6" id={`skill-title-${s.id}`} tabIndex={0}>
                        {s.name}
                      </Typography>
                      <Typography variant="body2">{t('levelValue', { level: s.level })}</Typography>
                    </div>
                    <div>
                      <IconButton aria-label={t('edit') + ' ' + s.name} onClick={() => handleEdit(s.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label={t('delete') + ' ' + s.name} onClick={() => handleDelete(s.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                  <Typography variant="caption">
                    {t('updated', {
                      date: new Date(s.updatedAt).toLocaleString(),
                    })}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      <div className="export-button-container">
        <Button variant="outlined" onClick={exportCSV} aria-label={t('exportCsv')}>
          {t('exportCsv')}
        </Button>
      </div>
    </div>
  );
};

export default SkillsPage;
