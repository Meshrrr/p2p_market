import './AddProductForm.scss'
import { ButtonComponent } from "../ButtonComponent/ButtonComponent"
import { InputComponent } from '../InputComponent/InputComponent'


export const AddProductForm = () => {

    const createProductData = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        // ...

    }

    return (
        <form className='product-form' action="POST">
            <h1 className='product-form__title'>Создать карточку товара</h1>
            <div className='product-form__field'>
                <label htmlFor="title">Наименование:</label>
                <InputComponent type="text" name='title'></InputComponent>
            </div>
            <div className='product-form__field'>    
                <label htmlFor="short-descr">Краткое описание:</label>
                <InputComponent type="text" name='short-descr'></InputComponent>
            </div>
            <div className='product-form__text-field'>
                <label htmlFor="descr">Описание товара</label>
                <textarea name="descr"></textarea>
            </div>
            <div className='product-form__field'>
                <label htmlFor="cost">Цена / сутки:</label>
                <InputComponent type="text" name='cost'></InputComponent>
            </div>
            <div className='product-form__photos'>
                <p>Фотографии товара</p>
                <ButtonComponent className='img-add-btn'>Добавить</ButtonComponent>
            </div>
            <ButtonComponent className='product-form__add-button' onClick={(e) => createProductData(e)}>Создать</ButtonComponent>
        </form>
    )
}