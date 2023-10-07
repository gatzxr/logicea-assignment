import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import Spinner from 'components/Spinner';

export type BaseButtonType = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
} & (
    | {
        children: ReactNode;
        text?: never;
      }
    | {
        text: string;
        children?: never;
      }
  );

interface IBaseButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  isLoading?: boolean;
}

export default function BaseButton({
  text,
  children,
  className,
  disabled,
  isLoading,
  ...restProps
}: IBaseButton): ReactElement {
  return (
    <button
      disabled={disabled || isLoading}
      className={twMerge(
        clsx({
          'cursor-pointer rounded-lg border border-gray-400 px-4 py-2 shadow-lg transition hover:drop-shadow-xl':
            true,
          'cursor-default opacity-5': disabled
        }),

        className
      )}
      {...restProps}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        children ?? <span className="text-sm font-bold">{text}</span>
      )}
    </button>
  );
}
