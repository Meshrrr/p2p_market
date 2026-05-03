import './ProductCard.scss'

export type ProductCardType = {
    id: string;
    owner_id: string;
    name: string;
    category?: string;
    image: string; //photos: Array[string, string, ...]
    price: number;
    city: string;
    deposit: number;
    description: string;
    created_at: string;
}

interface ProductCardProps {
    product: ProductCardType;
    onClick?: () => void;
}

export const ProductCard = ( { product, onClick }: ProductCardProps ) => {
    return (
    <div id={product.id} className="product-card" onClick={onClick}>
        <img className='product-card__image' src={product.image} />
        <div className='product-card__text'>
            <div className='product-card__content'>
                <h3 className='product-card__title'>{product.name}</h3>
                {/* <p className='product-card__descr'>{product.description}</p> */}
            </div>
            <span className='product-card__price'>
                <strong>{product.price}</strong> ₽ / сутки
            </span>
        </div>
    </div>
)};