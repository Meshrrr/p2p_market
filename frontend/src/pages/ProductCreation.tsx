import { BaseLayout } from "./BaseLayout"
import { AddProductForm } from "../components/AddProductForm/AddProductForm"

export const ProductCreation = () => {

    return (
        <BaseLayout>
            <div className='container'>
                <AddProductForm></AddProductForm>
            </div>
        </BaseLayout>
    )
}