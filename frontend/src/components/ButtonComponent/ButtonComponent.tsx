import './ButtonComponent.scss'
import type { ReactNode } from 'react';

interface ButtonProps {
    ref?: React.Ref<HTMLButtonElement>;
    type?: 'button' | 'submit' | undefined;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    children?: ReactNode;  
}

export const ButtonComponent = ({ className, type, onClick, children, ref, disabled }: ButtonProps ) => {
    return (
        <button className={className} onClick={onClick} type={type} ref={ref} disabled={disabled}>
            {children}
        </button>
    )
}