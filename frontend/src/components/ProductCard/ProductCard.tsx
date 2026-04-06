import './ProductCard.scss'

export type ProductCardType = {
    id: string;
    image: string;
    title: string;
    description?: string;
    price: number;
    owner?: string;
}

interface ProductCardProps {
    product: ProductCardType
}

export const ProductCard = ( { product }: ProductCardProps ) => {
    return (
    <div id={product.id} className="product-card">
        <img className='product-card__image' src={product.image} />
        <div className='product-card__text'>
            <div>
                <h3 className='product-card__title'>{product.title}</h3>
                <p className='product-card__descr'>{product.description}</p>
            </div>
            <span className='product-card__price'>
                <strong>{product.price}</strong> ₽ / сутки
            </span>
        </div>
    </div>
)};