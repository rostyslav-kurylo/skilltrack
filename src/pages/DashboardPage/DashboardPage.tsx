import { Card, Typography } from '@mui/material';
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Tooltip } from 'chart.js';
import { format } from 'date-fns';
import React, { useEffect, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { Loading } from '../../components';
import { useSkillStore } from '../../store/useSkillStore';

import './DashboardPage.css';

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
    datasets: [{ label: t('skills'), data: progress, backgroundColor: '#1976d2' }],
  };

  return (
    <div className="dashboard-page">
      <Typography variant="h4" gutterBottom component="h1" tabIndex={0}>
        {t('dashboard')}
      </Typography>
      <Card className="card" component="section" aria-label={t('skills')}>
        {loading ? (
          <Loading />
        ) : (
          <div className="bar-chart fade-in" role="region" aria-label={t('skills')}>
            <Bar
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { x: { ticks: { autoSkip: false } } },
              }}
              height={300}
              aria-label={t('skills')}
            />
          </div>
        )}
      </Card>
      <Card className="card" component="section" aria-label={t('lastUpdate')}>
        <Typography variant="body2">
          {t('lastUpdate', {
            date: skills.length ? format(new Date(skills[0].updatedAt), 'PPpp') : '—',
          })}
        </Typography>
      </Card>
    </div>
  );
};

export default DashboardPage;
