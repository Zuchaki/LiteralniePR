import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import classNames from 'classnames';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

type Props = {
  prefixIcon?: IconDefinition;
  suffixIcon?: IconDefinition;
  className?: string;
} & ComponentProps<'button'> &
  VariantProps<typeof buttonStyles>;

const buttonStyles = cva(
  'flex select-none items-center justify-center transition-colors disabled:!cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'rounded-md bg-primary-900 font-semibold text-primary-100 duration-100 hover:bg-primary-300 hover:text-primary-700',
      },
      size: {
        md: 'px-8 py-4',
        'w-full': 'h-12 w-full md:h-14',
        keyboardKey: 'h-14 w-8 md:h-16 md:w-16',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

const Button: FC<PropsWithChildren<Props>> = ({
  variant,
  size,
  onClick,
  children,
  prefixIcon,
  suffixIcon,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      {...props}
      disabled={props.disabled}
      className={classNames(`${buttonStyles({ variant, size })}`, className)}
    >
      {prefixIcon && <FontAwesomeIcon size="1x" icon={prefixIcon} />}
      {children}
      {suffixIcon && <FontAwesomeIcon size="1x" icon={suffixIcon} />}
    </button>
  );
};

export default Button;
