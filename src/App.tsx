import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import SkillsPage from './pages/SkillsPage/SkillsPage';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';

export default function App() {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            SkillTrack
          </Typography>
          <Button color='inherit' component={Link} to='/'>
            Dashboard
          </Button>
          <Button color='inherit' component={Link} to='/skills'>
            Skills
          </Button>
          <LanguageSwitcher />
        </Toolbar>
      </AppBar>
      <Container className='container'>
        <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/skills' element={<SkillsPage />} />
        </Routes>
      </Container>
    </div>
  );
}
