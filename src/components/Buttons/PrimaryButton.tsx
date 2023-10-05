import { twMerge } from 'tailwind-merge';

import BaseButton, { BaseButtonType } from './BaseButton';

export default function PrimaryButton({
  text,
  children,
  className,
  ...restProps
}: BaseButtonType) {
  return (
    <BaseButton
      className={twMerge(
        'bg-blue-950 text-white dark:bg-blue-200 dark:text-black',
        className
      )}
      {...restProps}
      text={text}
    >
      {children}
    </BaseButton>
  );
}
