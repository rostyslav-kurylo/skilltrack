import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { DashboardPage, SkillsPage } from './pages';
import { LanguageSwitcher } from './components';
import { LANG_KEY } from './shared/constants';

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const storedLang = localStorage.getItem(LANG_KEY);
    if (storedLang && storedLang !== i18n.language) {
      i18n.changeLanguage(storedLang);
    }
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SkillTrack
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/skills">
            Skills
          </Button>
          <LanguageSwitcher />
        </Toolbar>
      </AppBar>
      <Container className="container">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/skills" element={<SkillsPage />} />
        </Routes>
      </Container>
    </div>
  );
}
