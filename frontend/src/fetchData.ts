import axios from "axios"
import type { ProductCardType } from "./components/ProductCard/ProductCard"

const baseUrl = '/'

const mockProducts = [
    { "id": "1", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Электрогриль', "description": 'Краткое описание товара', "pricePerDay": 450 },
    { "id": "2", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Коллекция книг', "description": 'Краткое описание товара', "pricePerDay": 200 },
    { "id": "3", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Лодочный мотор', "description": 'Краткое описание товара', "pricePerDay": 1000 },
    { "id": "4", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Палатка', "description": 'Краткое описание товара', "pricePerDay": 400 },
    { "id": "5", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Набор инструментов', "description": 'Краткое описание товара', "pricePerDay": 300 },
    { "id": "6", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Reno Logan', "description": 'Краткое описание товара', "pricePerDay": 3000 },
    { "id": "7", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Трактор', "description": 'Краткое описание товара', "pricePerDay": 5000 },
    { "id": "8", "image": 'https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg', "title": 'Бензопила', "description": 'Краткое описание товара', "pricePerDay": 300 },
]

export async function getProducts(path: string) {
    /* try {
        const response = await axios.get(`${baseUrl}${path}`)
        return response.data

    } catch (error) {
        console.log(error);
        return []
    } */
    return mockProducts
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