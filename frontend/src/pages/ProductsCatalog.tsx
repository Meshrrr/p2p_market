import { useEffect, useState, useMemo } from 'react'
import { ProductList } from '../components/ProductsList/ProductsList';
import { SearchComponent } from '../components/SearchComponent/SearchComponent';
import { type ProductCardType } from '../components/ProductCard/ProductCard';
import { SearchIcon } from '../components/SearchIcon/SearchIcon';
import { getData } from '../fetchData';
import { selectStyles } from '../custom/styles';
import Select, { type SingleValue } from 'react-select';
import { InputComponent } from '../components/InputComponent/InputComponent';

type SelectOption = {
    value: string;
    label: string;
};

export const ProductsCatalog = () => {

    const [productData, setProductData] = useState<ProductCardType[]>([])
    const [filteredCards, setFilteredCards] = useState<ProductCardType[]>([])
    const [categories, setCategories] = useState([])
    const [cities, setCities] = useState([])

    const [filters, setFilters] = useState({
        name: '',
        city: '',
        category: '',
        price: [] as number[]
    });

    const handleQueryChange = (name: string) => {
        setFilters(prev => ({ ...prev, name: name || '' }))
    };

    const handleCityChange = (city: SingleValue<SelectOption>) => {
        setFilters(prev => ({ ...prev, city: city?.value || '' }))
    };

    const handleCategoryChange = (category: SingleValue<SelectOption>) => {
        setFilters(prev => ({ ...prev, category: category?.value || '' }))
    };

    const handlePriceChange = (priceStart: string, priceEnd: string) => {
        const price = priceStart === '' ? [filters.price[0], Number(priceEnd)] : [Number(priceStart), filters.price[1]]
        setFilters(prev => ({ ...prev, price }));
    };


    function filterCards() {
        if (productData.length != 0) {
            console.log('g');
            setFilteredCards(productData.filter(product =>
                (!filters.name || product.name.toLowerCase().includes(filters.name.toLowerCase())) &&
                (!filters.city || product.city === filters.city) &&
                (!filters.category || product.category === filters.category) &&
                (!filters.price.length || (product.price >= filters.price[0] && product.price <= filters.price[1]))
            ))
        } else { setFilteredCards(productData) }
    }

    useEffect(() => {
        getData<ProductCardType[]>('products') /* получаем товары */
            .then(data => setProductData(data))

        getData<[]>('categories') /* получаем категории товаров */
            .then(data => setCategories(data))

        getData<[]>('cities') /* получаем города */
            .then(data => setCities(data))
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
                        onChange={(e) => handleQueryChange(e.target.value)}
                        btnOnClick={() => filterCards()}
                    >
                    </SearchComponent>
                    <h3 className='catalog-section__filters-title'>Фильтры:</h3>
                    <div className='catalog-section__filters'>
                        <Select
                            options={categories}
                            styles={selectStyles}
                            placeholder={'Категория'}
                            onChange={handleCategoryChange}
                        ></Select>
                        <Select
                            options={cities}
                            styles={selectStyles}
                            placeholder={'Город'}
                            onChange={handleCityChange}
                        ></Select>
                        <InputComponent
                            type='number'
                            min={0}
                            className='price-filter'
                            onChange={(e) => handlePriceChange(e.target.value, '')}
                            placeholder='Цена от'
                        ></InputComponent>
                        <InputComponent
                            type='number'
                            min={0}
                            className='price-filter'
                            onChange={(e) => handlePriceChange('', e.target.value)}
                            placeholder='Цена до'>
                        </InputComponent>
                    </div>
                    <ProductList products={filteredCards}></ProductList>
                </div>
            </section>
        </>
    )
}