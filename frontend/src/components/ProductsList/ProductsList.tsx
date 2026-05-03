import './ProductsList.scss'
import { ProductCard, type ProductCardType } from '../ProductCard/ProductCard'
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { ProductWindow } from '../ProductWindow/ProductWindow';
import { useState } from 'react';

interface ProductListProps {
    products: ProductCardType[];
};

export const ProductList = ({ products }: ProductListProps) => {
    const [productShown, setProductShown] = useState<ProductCardType>()
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    if (products.length === 0) {
        return (
            <div className='no-products'>
                <h2>Товары не найдены</h2>
            </div>
        )
    }

    const changeModalVisibility = () => {
        setModalVisible(modalVisible === true ? false : true)
    }

    return (
        <div>
            <div className='product-list'>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onClick={() => {
                        setProductShown(product)
                        changeModalVisibility()
                    }} />
                ))}
            </div>
            <ModalWindow visible={modalVisible} changeVisibility={changeModalVisibility}>
                <ProductWindow product={productShown}></ProductWindow>
            </ModalWindow>
        </div>
    )
}
