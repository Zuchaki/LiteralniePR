import classNames from "classnames";
import { type FC, type PropsWithChildren } from "react";
import ReactModal from "react-modal";
type ModalProps = React.ComponentProps<typeof ReactModal>;

type Props = ModalProps & {
  showCloseButton?: boolean;
  closeButtonLabel?: string;
};
ReactModal.setAppElement("#__next");

const Modal: FC<PropsWithChildren<Props>> = ({
  children,
  showCloseButton = false,
  closeButtonLabel = "Close",
  className,
  overlayClassName,
  bodyOpenClassName = "overflow-hidden",
  ...props
}) => (
  <ReactModal
    {...props}
    className={classNames(
      "m-auto flex flex-col overflow-auto rounded-lg bg-primary-400 items-center p-5 justify-center text-neutral-1000",
      {
        [`${className}`]: !!className,
        [`${overlayClassName}`]: !!overlayClassName,
        [`${bodyOpenClassName}`]: !!bodyOpenClassName,
      }
    )}
    overlayClassName="bg-[#00000080] overflow-auto scroll-transparent fixed z-30 inset-0 flex items-center justify-center p-4"
    bodyOpenClassName={bodyOpenClassName}
  >
    {children}
    {showCloseButton && (
      <button
        onClick={props.onRequestClose}
        className="bg-secondary-300 border-2 border-secondary-1000 justify-end flex rounded-xl px-4 py-2 mt-10"
      >
        {closeButtonLabel}
      </button>
    )}
  </ReactModal>
);

export default Modal;
