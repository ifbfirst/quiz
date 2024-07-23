import { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
};
import classNames from 'classnames';

const ModalComponent = (props: ModalProps) => {
  return (
    <div
      className={classNames({
        active: props.isOpen,
        'modal-bg': true,
      })}
    >
      <div className={'modal'}>{props.children}</div>
    </div>
  );
};

export default ModalComponent;
