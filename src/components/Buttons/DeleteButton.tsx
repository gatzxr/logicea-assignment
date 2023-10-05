import { twMerge } from 'tailwind-merge';

import BaseButton, { BaseButtonType } from './BaseButton';

export default function DeleteButton({
  text,
  children,
  className,
  ...restProps
}: BaseButtonType) {
  return (
    <BaseButton
      className={twMerge('bg-red-500 text-white', className)}
      {...restProps}
      text={text}
    >
      {children}
    </BaseButton>
  );
}
