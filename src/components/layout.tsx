// Layout.tsx
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeContext } from './theme_context';

const getRouteBackground = (path: string, theme: 'light' | 'dark') => {
    if(path) return theme === 'light' ? '#ffffff' : '#111827'; // default
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme, colors } = useContext(ThemeContext);
  const location = useLocation();

  const backgroundColor = getRouteBackground(location.pathname, theme);

  return (
    <div
      style={{
        backgroundColor,
        color: colors.text,
        minHeight: '3vh',
        transition: 'background-color 0.3s ease',
      }}
    >
      {children}
    </div>
  );
};

export default Layout;
