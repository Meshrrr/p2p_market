import './SearchComponent.scss'
import { InputComponent } from '../InputComponent/InputComponent'
import { ButtonComponent } from '../ButtonComponent/ButtonComponent'
import { useRef } from 'react'

export const SearchComponent = ({ ...props }) => {
    const inputRef = useRef(null)

    return (
        <div className='search-component'>
            <InputComponent
                ref={inputRef}
                onChange={e => props.queryFn(e.target.value)}
                className='search-input'
                name='search'
                placeholder='Поиск...'
            >
            </InputComponent>
            <ButtonComponent
                onClick={props.btnOnClick()} 
                className='search-button'>
                {props.btnValue}
            </ButtonComponent>
        </div>

    )
}