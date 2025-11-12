import React from 'react'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher: React.FC = ()=>{
  const { i18n } = useTranslation()
  const toggle = ()=> i18n.changeLanguage(i18n.language === 'en' ? 'ua' : 'en')
  return <Button color="inherit" onClick={toggle}>{i18n.language === 'en' ? 'UA' : 'EN'}</Button>
}

export default LanguageSwitcher
