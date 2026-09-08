import { ReactNode } from 'react';
import classNames from 'classnames';

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
};

const ModalComponent = ({ isOpen, children }: ModalProps) => {
  return (
    <div className={classNames('modal-bg', { active: isOpen })}>
      <div className="modal">{children}</div>
    </div>
  );
};

export default ModalComponent;
