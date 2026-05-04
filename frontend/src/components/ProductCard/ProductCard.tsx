import './ProductCard.scss'
import type { ProductCardType } from '../../types/objects-types';

interface ProductCardProps {
    product: ProductCardType;
    onClick?: () => void;
}

export const ProductCard = ( { product, onClick }: ProductCardProps ) => {
    return (
    <div id={product.id} className="product-card" onClick={onClick}>
        <img className='product-card__image' src={product.images? product.images[0]: ''} />
        <div className='product-card__text'>
            <div className='product-card__content'>
                <h3 className='product-card__title'>{product.title}</h3>
                <p className='product-card__category'><i>{product.category}</i></p>
            </div>
            <span className='product-card__price'>
                <p><strong>{product.price}</strong> ₽ / сутки</p>
                <p className='product-card__city'>г. {product.city}</p>
            </span>
        </div>
    </div>
)};