import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';
import ReactModal from 'react-modal';

import Button from './Button';
import Text from './Text';

type ModalProps = React.ComponentProps<typeof ReactModal>;

type Props = ModalProps & {
  showCloseButton?: boolean;
  closeButtonLabel?: string;
  header?: string;
};
ReactModal.setAppElement('#__next');

const Modal: FC<PropsWithChildren<Props>> = ({
  children,
  header,
  showCloseButton = false,
  closeButtonLabel = 'Zamknij',
  className,
  ...props
}) => (
  <ReactModal
    {...props}
    shouldFocusAfterRender={false}
    className={classNames(
      'm-auto flex flex-col overflow-auto rounded-lg bg-primary-100 items-center px-16 py-5 justify-center text-primary-900',
      {
        [`${className}`]: !!className,
      },
    )}
    overlayClassName="bg-[#00000080] overflow-auto scroll-transparent fixed z-30 inset-0 flex items-center justify-center p-4"
  >
    {header && (
      <Text className="mb-5" variant="heading">
        {header}
      </Text>
    )}

    <Text variant="md">{children}</Text>
    {showCloseButton && (
      <Button className="mt-5" onClick={props.onRequestClose}>
        {closeButtonLabel}
      </Button>
    )}
  </ReactModal>
);

export default Modal;
