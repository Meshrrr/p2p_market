import './ProductWindow.scss'
import type { ProductCardType } from '../ProductCard/ProductCard'
import type { UserType } from '../../types/objects-types';
import { ButtonComponent } from '../ButtonComponent/ButtonComponent';
import { useEffect, useState } from 'react';
import { getData } from '../../fetchData';

interface ProductWindowProps {
    product: ProductCardType;
}

export const ProductWindow = ({ product }: ProductWindowProps) => {

    const [owner, setOwner] = useState<UserType | undefined>()

    useEffect(() => {
        /* getData<UserType>(`/users/${product?.owner_id}`)
            .then(data => setOwner(data)) */
    }, [])

    return (
        <div className='product-window'>
            <div className='product-window__info'>
                <div className='product-window__owner'>
                    <img className='product-photo' src="/" />
                    <div className='product-window__owner-info'>
                        <img className='product-window__owner-photo' src="/" />
                        {owner ? (
                            <div className='product-window__owner-name'>
                                <span>{owner.name}</span>
                                <span>{owner.rating}</span>
                            </div>
                        )
                            :
                            <div className='product-window__owner-name'>
                                <span>ФИО арендодателя</span>
                                <span>Рейтинг</span>
                            </div>
                        }
                    </div>
                </div>
                <div className='product-window__product-info'>
                    <h3 className='product-window__product-name'>{product.name}</h3>
                    <span className='product-window__product-category'>{product.category}</span>
                    <p className='product-window__product-descr'>{product.description}</p>
                </div>
            </div>
            <div className='product-window__rent'>
                <span className='product-window__time'>Время создания: {new Date(product.created_at).toLocaleString()}</span>
                <div className='product-window__price'>
                    <span>Цена / сутки: {product.price} ₽</span>
                    <ButtonComponent>Арендовать</ButtonComponent>
                </div>
            </div>
        </div >
    )
}