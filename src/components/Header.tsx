import useAuthContext from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import useTheme from 'hooks/useTheme';

import { PrimaryButton } from './Buttons';

export default function Header() {
  const navigate = useNavigate();
  const { toggleTheme, theme } = useTheme();
  const { logOut } = useAuthContext();
  return (
    <div className="flex h-[60px] items-center justify-between bg-gray-300 px-5 transition dark:bg-gray-800">
      <span className="text-lg font-bold transition dark:text-white">
        JokeApp
      </span>
      <div className="flex gap-2">
        <PrimaryButton
          className="capitalize"
          text={theme === 'dark' ? 'light' : 'dark'}
          onClick={toggleTheme}
        />
        <PrimaryButton
          text="Logout"
          onClick={() => {
            logOut();
            navigate('/login');
          }}
        />
      </div>
    </div>
  );
}
