import './scss/App.scss'
import { useEffect, useState } from 'react'
import { ProductList } from './components/ProductsList/ProductsList';
import { SearchComponent } from './components/SearchComponent/SearchComponent';
import { type ProductCardType } from './components/ProductCard/ProductCard';
import { QueryClientProvider, useQuery, QueryClient } from "@tanstack/react-query"


export default function App() {
  const [productData, setProductData] = useState<ProductCardType[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredCards, setFilteredCards] = useState<ProductCardType[]>([])

  function filterCards() {
    if (searchQuery != '' || productData.length == 0) {
      setFilteredCards(productData.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase())))
    }

    else {
      setFilteredCards(productData)
    }
  }

  useEffect(() => {
    setProductData([
      { "id": "1", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Товар1', "description": 'Краткое описание товара', "price": 1000 },
      { "id": "2", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Товар2', "description": 'Краткое описание товара', "price": 1000 },
      { "id": "3", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Товар3', "description": 'Краткое описание товара', "price": 1000 },
      { "id": "4", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Товар2', "description": 'Краткое описание товара', "price": 1000 },
      { "id": "5", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Товар1', "description": 'Краткое описание товара', "price": 1000 },
    ])
  }, [])

  useEffect(() => {
    if (productData.length != 0) { filterCards() }
  }, [productData])

  
  return (
    <>
      <header>
        <div className='container'>
          <div className='profile-photo'></div>
        </div>
      </header>

      <main>
        <section className='hero-section'>
          <h1>Акции, выгодные предложения</h1>
        </section>
        <section className='catalog-section'>
          <div className="container">
            <SearchComponent btnValue='Поиск' queryFn={setSearchQuery} btnOnClick={() => filterCards}></SearchComponent>
            <ProductList products={filteredCards}></ProductList>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
        </div>
      </footer>
    </>
  )
}
