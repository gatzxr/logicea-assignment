import useTheme from 'hooks/useTheme';

import { PrimaryButton } from './Buttons';

export default function Header() {
  const { toggleTheme, theme } = useTheme();

  return (
    <div className="flex h-[60px] items-center justify-between bg-gray-300 px-5 transition dark:bg-gray-800">
      <span className="text-lg font-bold transition dark:text-white">
        JokeApp
      </span>
      <PrimaryButton
        className="capitalize"
        text={theme === 'dark' ? 'light' : 'dark'}
        onClick={() => toggleTheme()}
      />
    </div>
  );
}
