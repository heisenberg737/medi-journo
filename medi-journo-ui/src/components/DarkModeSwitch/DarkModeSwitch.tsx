import React, { FC } from 'react';
import { useTheme } from '../../ThemeProvider';
import Switch from '@mui/material/Switch';


interface DarkModeSwitchProps {}

const DarkModeSwitch: FC<DarkModeSwitchProps> = () => {
  const { toggleTheme, mode } = useTheme();
  return (
    <Switch
      checked={mode === 'dark'}
      onChange={toggleTheme}
      inputProps={{ 'aria-label': 'Toggle dark mode' }}
    />
  );};

export default DarkModeSwitch;
