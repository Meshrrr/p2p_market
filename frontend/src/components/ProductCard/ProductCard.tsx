import './ProductCard.scss'

export type ProductCardType = {
    id: string;
    image: string;
    title: string;
    description?: string;
    price: number;
    owner?: string;
}

export const ProductCard: React.FC<ProductCardType> = ({ id, image, title, description, price, owner}) => {
    return (
    <div id={id} className="product-card">
        <img className='product-card__image' src={image} />
        <div className='product-card__text'>
            <div>
                <h3 className='product-card__title'>{title}</h3>
                <p className='product-card__descr'>{description}</p>
            </div>
            <span className='product-card__price'>
                <strong>{price}</strong> ₽ / сутки
            </span>
        </div>
    </div>
)};