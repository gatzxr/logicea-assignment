import { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export type BaseButtonType = ButtonHTMLAttributes<HTMLButtonElement> &
  (
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
}

export default function BaseButton({
  text,
  children,
  className,
  ...restProps
}: IBaseButton): ReactElement {
  return (
    <button
      className={twMerge(
        'cursor-pointer rounded-lg border border-gray-400 px-4 py-2 shadow-lg transition hover:shadow-xl ',
        className
      )}
      {...restProps}
    >
      {children ?? <span className="text-sm font-bold">{text}</span>}
    </button>
  );
}
