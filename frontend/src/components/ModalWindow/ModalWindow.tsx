import type { ReactNode } from 'react';
import './ModalWindow.scss'

interface ModalProps {
    visible: boolean;
    changeVisibility: (param: boolean) => void;
    children: ReactNode;
}

export const ModalWindow = ( {visible, changeVisibility, children}: ModalProps ) => {
    const status = visible ? 'visible' : ''

    return (
        <div className={`modal ${status}`} onClick={() => changeVisibility(false)}>
            <div className='modal__content' onClick={(e) => {e.stopPropagation()}}>
                {children}
            </div>
        </div>
    )
} 