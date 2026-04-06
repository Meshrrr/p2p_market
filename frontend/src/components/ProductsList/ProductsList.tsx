import './ProductsList.scss'
import { ProductCard, type ProductCardType } from '../ProductCard/ProductCard'

interface ProductListProps {
    products: ProductCardType[];
};

export const ProductList = ({ products }: ProductListProps) => {
    if (products.length === 0) {
        return (
            <h2>Объявления не найдены</h2>
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
