import { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;

  children: ReactNode;
};

const ModalComponent = (props: ModalProps) => {
  return (
    <div className={props.isOpen ? 'modal-bg active' : 'modal-bg'}>
      <div className={'modal'}>{props.children}</div>
    </div>
  );
};

export default ModalComponent;
