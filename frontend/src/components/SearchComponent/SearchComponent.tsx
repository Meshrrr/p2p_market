import './SearchComponent.scss'
import { InputComponent } from '../InputComponent/InputComponent'
import { ButtonComponent } from '../ButtonComponent/ButtonComponent'
import { useRef, type ChangeEvent } from 'react'

interface SearchComponentProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;  
    btnOnClick: () => void;          
    btnValue: React.ReactNode;
}

export const SearchComponent = ({ btnValue, btnOnClick, onChange }: SearchComponentProps) => {
    const inputRef = useRef(null)

    return (
        <div className='search-component'>
            <InputComponent
                ref={inputRef}
                onChange={onChange}
                className='search-input'
                name='search'
                placeholder='Поиск...'
            >
            </InputComponent>
            <ButtonComponent
                onClick={btnOnClick}
                className='search-button'>
                {btnValue}
            </ButtonComponent>
        </div>

    )
}