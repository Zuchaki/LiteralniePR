import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

type Props = {
  className?: string;
} & VariantProps<typeof textStyles>;

const textStyles = cva('', {
  variants: {
    variant: {
      sm: 'text-body-s',
      md: 'text-body-m',
      lg: 'text-body-l',
      heading: 'text-heading',
    },
  },
});
const Text: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  variant,
}) => {
  return (
    <div className={classNames(`${textStyles({ variant })}`, className)}>
      {children}
    </div>
  );
};

export default Text;
