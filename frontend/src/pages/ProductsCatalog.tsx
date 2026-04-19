import { useEffect, useState } from 'react'
import { ProductList } from '../components/ProductsList/ProductsList';
import { SearchComponent } from '../components/SearchComponent/SearchComponent';
import { type ProductCardType } from '../components/ProductCard/ProductCard';
import { SearchIcon } from '../components/SearchIcon/SearchIcon';

export const ProductsCatalog = () => {

    const [productData, setProductData] = useState<ProductCardType[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredCards, setFilteredCards] = useState<ProductCardType[]>([])

    function filterCards() {
        if (searchQuery != '' || productData.length == 0) {
            setFilteredCards(productData.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase())))
        } else { setFilteredCards(productData) }
    }

    useEffect(() => {
        setProductData([
            { "id": "1", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Электрогриль', "description": 'Краткое описание товара', "pricePerDay": 450 },
            { "id": "2", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Коллекция книг', "description": 'Краткое описание товара', "pricePerDay": 200 },
            { "id": "3", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Лодочный мотор', "description": 'Краткое описание товара', "pricePerDay": 1000 },
            { "id": "4", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Палатка', "description": 'Краткое описание товара', "pricePerDay": 400 },
            { "id": "5", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Набор инструментов', "description": 'Краткое описание товара', "pricePerDay": 300 },
            { "id": "6", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Reno Logan', "description": 'Краткое описание товара', "pricePerDay": 3000 },
            { "id": "7", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Трактор', "description": 'Краткое описание товара', "pricePerDay": 5000 },
            { "id": "8", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Бензопила', "description": 'Краткое описание товара', "pricePerDay": 300 },
        ])
    }, [])

    useEffect(() => {
        if (productData.length != 0) { filterCards() }
    }, [productData])

    return (
        <>
            <section className='hero-section'>
                <h1>Акции, выгодные предложения</h1>
            </section>
            <section className='catalog-section'>
                <div className="container">
                    <SearchComponent 
                    btnValue={<SearchIcon></SearchIcon>} queryFn={setSearchQuery} btnOnClick={() => filterCards}></SearchComponent>
                    <ProductList products={filteredCards}></ProductList>
                </div>
            </section>

        </>
    )
}