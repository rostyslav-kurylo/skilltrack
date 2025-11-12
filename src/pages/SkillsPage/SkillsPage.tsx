import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Card, IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/Loading/Loading';
import SkillForm from '../../components/SkillForm/SkillForm';
import { useSkillStore } from '../../store/useSkillStore';

const SkillsPage: React.FC = () => {
  const { t } = useTranslation();
  const { skills, fetchSkills, remove, loading } = useSkillStore();
  const [editing, setEditing] = useState<string | null>(null);
  useEffect(() => {
    fetchSkills();
  }, []);

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
    <div>
      <Typography variant='h4' gutterBottom>
        {t('skills')}
      </Typography>
      <Card className='card' style={{ marginBottom: 12 }}>
        <SkillForm editingId={editing} onDone={() => setEditing(null)} />
      </Card>
      {loading ? (
        <Loading />
      ) : (
        <Grid container spacing={2}>
          {skills.map((s) => (
            <Grid key={s.id} size={{ xs: 12, md: 6 }}>
              <Card className='card'>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <Typography variant='h6'>{s.name}</Typography>
                    <Typography variant='body2'>
                      {t('level', { level: s.level })}
                    </Typography>
                  </div>
                  <div>
                    <IconButton onClick={() => setEditing(s.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => remove(s.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
                <Typography variant='caption'>
                  {t('updated', {
                    date: new Date(s.updatedAt).toLocaleString(),
                  })}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <div style={{ marginTop: 12 }}>
        <Button variant='outlined' onClick={exportCSV}>
          {t('exportCsv')}
        </Button>
      </div>
    </div>
  );
};

export default SkillsPage;
