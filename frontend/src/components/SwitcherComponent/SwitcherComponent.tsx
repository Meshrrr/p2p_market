import { useState } from 'react';
import './SwitcherComponent.scss'

interface SwitcherProps {
    states: Array<string>;
    onClick?: () => void;
    returnStatus: (arg: string) => void;
}

export const SwitcherComponent = ({ states, onClick, returnStatus }: SwitcherProps) => {

    const [status, setStatus] = useState<'first' | 'second'>('first')

    const changeStatus = () => {
        const value = status === 'first' ? 'second' : 'first'
        setStatus(value)
        returnStatus(value)
    }

    return (
        <div
            className='switcher'
            onClick={() => {
                onClick
                changeStatus()
            }}>
            <div className='switcher__body'>
                <span>{states[0]}</span>
                <span>{states[1]}</span>
                <div className={`switcher__colb ${status}`}></div>
            </div>
        </div>
    )
}