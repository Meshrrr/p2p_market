import './scss/App.scss'
import { useEffect, useState } from 'react'
import { ProductCard} from './components/ProductCard/ProductCard'
import { type ProductCardType } from './components/ProductCard/ProductCard';
import { QueryClientProvider, useQuery, QueryClient } from "@tanstack/react-query"



export default function App() {
  const [productCards, setProductCards] = useState<ProductCardType[]>([])

  useEffect(() => {
    setProductCards([
      {"id":"1", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Товар1', "description": 'Краткое описание товара', "price": 1000 },
      {"id":"2", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Товар1', "description": 'Краткое описание товара', "price": 1000 },
      {"id":"3", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Товар1', "description": 'Краткое описание товара', "price": 1000 },
      {"id":"4", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Товар1', "description": 'Краткое описание товара', "price": 1000 },
      {"id":"5", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Товар1', "description": 'Краткое описание товара', "price": 1000 },
  ])}, [])

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
            <div className="catalog-section__cards">
              {productCards.map((card) => (
                <ProductCard key={card.id} id={card.id} image={card.image} title={card.title} price={card.price}></ProductCard>
              ))}
            </div>
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
