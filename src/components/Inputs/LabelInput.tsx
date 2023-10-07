import { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { twMerge } from 'tailwind-merge';

import useThemeContext from 'contexts/ThemeContext';

interface ILabelInput extends InputHTMLAttributes<HTMLInputElement> {
  type: HTMLInputTypeAttribute;
  isLoading: boolean;
  title: string;
}
export default function LabelInput({
  isLoading,
  id,
  title,
  className,
  ...restProps
}: ILabelInput) {
  const { theme } = useThemeContext();
  return (
    <label
      htmlFor={id}
      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
    >
      <span className="ml-2">{title}</span>
      {isLoading ? (
        <SkeletonTheme
          baseColor={theme === 'light' ? '#172554' : '#e6e7eb'}
          highlightColor="#7580a5"
        >
          <Skeleton
            style={{ height: 40, width: '100%', minWidth: 150 }}
            borderRadius="8px"
          />
        </SkeletonTheme>
      ) : (
        <input
          id={id}
          className={twMerge(
            'mt-2.5 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600  dark:bg-gray-500 dark:text-white dark:placeholder-gray-400',
            className
          )}
          {...restProps}
        />
      )}
    </label>
  );
}
