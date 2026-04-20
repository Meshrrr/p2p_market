import { useEffect, useState } from 'react'
import { ProductList } from '../components/ProductsList/ProductsList';
import { SearchComponent } from '../components/SearchComponent/SearchComponent';
import { type ProductCardType } from '../components/ProductCard/ProductCard';
import { SearchIcon } from '../components/SearchIcon/SearchIcon';
import { getProducts } from '../fetchData';

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
        getProducts('')
            .then(data => setProductData(data))
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
                        btnValue={<SearchIcon></SearchIcon>}
                        queryFn={setSearchQuery}
                        btnOnClick={() => filterCards}
                    >
                    </SearchComponent>
                    <ProductList products={filteredCards}></ProductList>
                </div>
            </section>

        </>
    )
}