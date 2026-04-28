import './ButtonComponent.scss'
import type { ReactNode } from 'react';

interface ButtonProps {
    type?: 'button' | 'submit' | undefined;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    children?: ReactNode;  
}

export const ButtonComponent = ({ className, type, onClick, children }: ButtonProps ) => {
    return (
        <button className={className} onClick={onClick} type={type}>
            {children}
        </button>
    )
}