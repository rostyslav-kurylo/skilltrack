import { Card, Typography } from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { format } from 'date-fns';
import React, { useEffect, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/Loading/Loading';
import { useSkillStore } from '../../store/useSkillStore';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { skills, fetchSkills, loading } = useSkillStore();
  useEffect(() => {
    fetchSkills();
  }, []);

  const progress = useMemo(() => skills.map((s) => s.level), [skills]);
  const labels = useMemo(() => skills.map((s) => s.name), [skills]);
  const data = {
    labels,
    datasets: [
      { label: t('skills'), data: progress, backgroundColor: '#1976d2' },
    ],
  };

  return (
    <div>
      <Typography variant='h4' gutterBottom>
        {t('dashboard')}
      </Typography>
      <Card className='card' style={{ marginBottom: 12 }}>
        <Typography variant='h6'>{t('overview')}</Typography>
        {loading ? (
          // <div>{t('loading')}</div>
          <Loading />
        ) : (
          <div className='fade-in' style={{ height: '100%' }}>
            <Bar data={data} />
          </div>
        )}
      </Card>
      <Card className='card'>
        <Typography variant='body2'>
          {t('lastUpdate', {
            date: skills.length
              ? format(new Date(skills[0].updatedAt), 'PPpp')
              : '—',
          })}
        </Typography>
      </Card>
    </div>
  );
};

export default DashboardPage;
