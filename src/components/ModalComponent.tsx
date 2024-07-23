import { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
};
import classNames from 'classnames';

const ModalComponent = (props: ModalProps) => {
  const btnClass = classNames({
    active: props.isOpen,
    'modal-bg': true,
  });
  return (
    <div className={btnClass}>
      <div className={'modal'}>{props.children}</div>
    </div>
  );
};

export default ModalComponent;
