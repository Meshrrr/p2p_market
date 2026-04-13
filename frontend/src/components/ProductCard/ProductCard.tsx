import './ProductCard.scss'

export type ProductCardType = {
    id: string;
    title: string;
    category?: string;
    image: string; //photos: Array[string, string, ...]
    pricePerDay: number;
    description?: string;
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
                <strong>{product.pricePerDay}</strong> ₽ / сутки
            </span>
        </div>
    </div>
)};