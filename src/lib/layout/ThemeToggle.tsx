import { IconButton, useColorMode } from '@chakra-ui/react';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton aria-label="theme toggle" onClick={toggleColorMode}>
      {colorMode === 'light' ? <RiMoonFill /> : <RiSunLine />}
    </IconButton>
  );
};

export default ThemeToggle;
