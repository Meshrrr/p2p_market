import { useState, useMemo } from 'react'
import { ProductList } from '../components/ProductsList/ProductsList';
import { SearchComponent } from '../components/SearchComponent/SearchComponent';
import { SearchIcon } from '../components/SearchIcon/SearchIcon';
import { selectStyles } from '../custom/styles';
import Select, { type SingleValue } from 'react-select';
import { InputComponent } from '../components/InputComponent/InputComponent';
import { useProductsQuery, useCategoriesQuery, useCitiesQuery } from '../fetchData';

type SelectOption = {
    value: string;
    label: string;
};

export const ProductsCatalog = () => {

    const { data: productData, isLoading: productsLoading } = useProductsQuery()
    const { data: categories, isLoading: categoriesLoading } = useCategoriesQuery()
    const { data: cities, isLoading: citiesLoading } = useCitiesQuery()

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


    const filteredCards = useMemo(() => {
        if (!productData) return []
        return productData.filter(product =>
            (!filters.name || product.title.toLowerCase().includes(filters.name.toLowerCase())) &&
            (!filters.city || product.city === filters.city) &&
            (!filters.category || product.category === filters.category) &&
            (!filters.price.length || (product.price >= filters.price[0] && product.price <= filters.price[1]))
        )
    }, [productData, filters])
    

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
                        btnOnClick={() => {}}
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