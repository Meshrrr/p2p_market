import './ProductsList.scss'
import { ProductCard, type ProductCardType } from '../ProductCard/ProductCard'

interface ProductListProps {
    products: ProductCardType[];
};

export const ProductList = ({ products }: ProductListProps) => {
    if (products.length === 0) {
        return (
            <div className='no-products'>
                <h2>Товары не найдены</h2>
            </div>
        )
    }

    return (
        <div className='product-list'>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}
