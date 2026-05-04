import "./AddProductForm.scss";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { ButtonComponent } from "../ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { useCategoriesQuery, useCitiesQuery } from '../../fetchData'
import { selectStyles } from '../../custom/styles';
import Select, { type SingleValue } from 'react-select';
import { type ProductCardType } from "../../types/objects-types";
import { useQueryClient } from "@tanstack/react-query";

interface FormValues {
    name: string;
    category: string;
    city: string;
    description: string;
    price: string;
}

type SelectOption = {
    value: string;
    label: string;
};

export const AddProductForm = () => {
    
    const { data: categories, isLoading: categoriesLoading } = useCategoriesQuery()
    const { data: cities, isLoading: citiesLoading } = useCitiesQuery()
    const queryClient = useQueryClient();

    const navigate = useNavigate();
    const initialValues: FormValues = {
        name: "",
        category: "",
        city: "",
        description: "",
        price: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Введите название товара")
            .matches(/^(?!\d+$).+$/, "Нельзя вводить только числа"),
        description: Yup.string().max(500, "Описание не более 500 символов"),
        price: Yup.number()
            .moreThan(50, "Цена аренды должна быть больше 50 рублей")
            .required("Введите цену товара"),
    });

    const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        console.log("Данные формы:", values);

        setSubmitting(false);
        const product: ProductCardType = {
            id: '10',
            owner_id: "2",
            title: values.name,
            category_id: '',
            category: values.category,
            price: Number(values.price),
            deposit_amount: 0,
            description: values.description,
            images: ['https://www.k-marumie.com/wpsys/wp-content/uploads/2025/01/0001.jpg'],
            city: values.city,
            rating: 0,
            status: "active",
            created_at: new Date().toISOString(),
        };

        queryClient.setQueryData<ProductCardType[]>(
            ["products"],
            (oldData) => {
                if (!oldData) return [product];
                return [...oldData, product];
            }
        )
        navigate("/profile");
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, values, setFieldValue }) => (
                <Form className="product-form">
                    <h1 className="product-form__title">Создать карточку товара</h1>

                    <div className="product-form__field">
                        <div className="product-form__content">
                            <label htmlFor="name">Название товара:</label>
                            <Field type="text" name="name" id="name" />
                        </div>
                        <ErrorMessage name="name" component="div" className="error" />
                    </div>

                    <div className="product-form__field">
                        <div className="product-form__content">
                            <label htmlFor="category">Категория:</label>
                            <Select
                                name='category'
                                options={categories as SelectOption[]}
                                styles={selectStyles}
                                placeholder={'Выберите из списка'}
                                value={categories?.find((c: SelectOption) => c.value === values.category) || null}
                                onChange={(selectedOption: SingleValue<SelectOption>) => {
                                    setFieldValue("category", selectedOption?.value);
                                }}
                            ></Select>
                        </div>
                        <ErrorMessage name="category" component="div" className="error" />
                    </div>
                    <div className="product-form__field">
                        <div className="product-form__content">
                            <label htmlFor="city">Город:</label>
                            <Select
                                name='city'
                                options={cities as SelectOption[]}
                                styles={selectStyles}
                                placeholder={'Выберите из списка'}
                                value={cities?.find((c: SelectOption) => c.value === values.city) || null}
                                onChange={(selectedOption: SingleValue<SelectOption>) => {
                                    setFieldValue("city", selectedOption?.value);
                                }}
                            ></Select>
                        </div>
                        <ErrorMessage name="city" component="div" className="error" />
                    </div>
                    <div className="product-form__text-field">
                        <div className="product-form__content up-style">
                            <label htmlFor="description">Описание:</label>
                            <Field as="textarea" name="description" id="description" />
                        </div>
                        <ErrorMessage name="description" component="div" className="error" />
                    </div>

                    <div className="product-form__field">
                        <div className="product-form__content">
                            <label htmlFor="price">Цена / сутки:</label>
                            <Field type="number" name="price" id="price" />
                        </div>
                        <ErrorMessage name="price" component="div" className="error" />
                    </div>

                    <div className="product-form__photos">
                        <p>Фотографии товара</p>
                        <ButtonComponent className="img-add-btn" type="button">Добавить</ButtonComponent>
                    </div>

                    <ButtonComponent
                        className="product-form__add-button"
                        type="submit"
                        disabled={isSubmitting}
                    >Создать</ButtonComponent>
                </Form>
            )}
        </Formik>
    );
};