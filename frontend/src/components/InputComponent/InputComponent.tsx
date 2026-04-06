import './InputComponent.scss'
import { forwardRef, type InputHTMLAttributes } from 'react';

export const InputComponent = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    (props, ref) => {
        return (
            <input ref={ref} {...props} />
        )
    }
);
