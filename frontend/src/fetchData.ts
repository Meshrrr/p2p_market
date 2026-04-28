import axios from "axios"
import type { ProductCardType } from "./components/ProductCard/ProductCard"
import { mockProducts, categories, cities } from "./mock"

const baseUrl = '/'

export async function getData<T>(path: string) {
    /* try {
        const response = await axios.get(`${baseUrl}${path}`)
        return response.data

    } catch (error) {
        console.log(error);
        return []
    } */
    const data = (path == 'categories' ? categories : path == 'cities' ? cities : mockProducts)
    return data as T
}


export async function addProduct(path: string, product: ProductCardType) {
    try {
        const response = await axios.post(`${baseUrl}${path}`, product)
        return 'Товар успешно добавлен!'

    } catch (error) {
        console.log(error);
        return 'Ошибка создания товара, попробуйте позже!'
    }
}

