import './ButtonComponent.scss'
import type { ReactNode } from 'react';

interface ButtonProps {
    onClick?: () => void;
    className?: string;
    children?: ReactNode;  
}

export const ButtonComponent = ({ className, onClick, children }: ButtonProps ) => {
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    )
}