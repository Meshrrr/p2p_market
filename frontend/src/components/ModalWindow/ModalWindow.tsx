import { type ReactNode, useEffect, useState } from 'react';
import './ModalWindow.scss'

interface ModalProps {
    visible: boolean;
    children: ReactNode;
    changeVisibility: () => void;
}

export const ModalWindow = ({ visible, children, changeVisibility }: ModalProps) => {
    const [status, setStatus] = useState<string>('')

    useEffect(() => {
        if (visible) setStatus('visible')
    }, [visible])

    return (
        <div className={`modal ${status}`} onClick={() => {
            setStatus('')
            changeVisibility()
        }}>
            <div className='modal__content' onClick={(e) => {
                e.stopPropagation()
            }}>
                {children}
            </div>
        </div>
    )
} 