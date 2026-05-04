import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import "flatpickr/dist/l10n/ru.js";
import './ProductWindow.scss'
import type { ProductCardType } from "../../types/objects-types";
import type { UserType } from '../../types/objects-types';
import { ButtonComponent } from '../ButtonComponent/ButtonComponent';
import { useEffect, useState, useRef } from 'react';
import { getData } from '../../fetchData';



interface ProductWindowProps {
    product: ProductCardType;
    action: () => void;
}

export const ProductWindow = ({ product, action }: ProductWindowProps) => {

    const [owner, setOwner] = useState<UserType | undefined>()
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        /* getData<UserType>(`/users/${product?.owner_id}`)
            .then(data => setOwner(data)) */
    }, [])

    useEffect(() => {
        if (!inputRef.current) return;

        const fp = flatpickr(inputRef.current, {
            mode: "range",
            locale: "ru",
            position: "auto",
            dateFormat: "d-m-Y",
        });

        return () => {
            fp.destroy()
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    }, [product.id]);

    const getRented = () => {
        const dates = inputRef.current?.value?.trim();
        const rentBtn = buttonRef.current

        if (!dates || !rentBtn) return;

        const rent = {
            owner_id: product.owner_id,
            price: product.price,
            rent_dates: dates.split(' — '),
        }

        action()
        console.log(rent, rentBtn);

    };

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
                    <h3 className='product-window__product-name'>{product.title}</h3>
                    <span className='product-window__product-category'>{product.category}</span>
                    <p className='product-window__product-descr'>{product.description}</p>
                </div>
            </div>
            <div className='product-window__rent'>
                <span className='product-window__time'>Время создания: {new Date(product.created_at).toLocaleString().slice(0, -3)}</span>
                <div className='product-window__price'>
                    <div className='product-window__rent-info'>
                        <span>Цена / сутки: {product.price} ₽</span>
                        <input type="text" ref={inputRef} placeholder="Выберите период аренды"></input>
                    </div>
                    {product.status == "booked" ?
                        <ButtonComponent ref={buttonRef} disabled={true}>
                            Арендовано
                        </ButtonComponent>
                        :
                        <ButtonComponent ref={buttonRef} onClick={() => getRented()}>
                            Арендовать
                        </ButtonComponent>
                    }
                </div>
            </div>
        </div >
    )
}