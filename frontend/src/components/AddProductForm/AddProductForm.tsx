import "./AddProductForm.scss";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { ButtonComponent } from "../ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router-dom";

interface FormValues {
    name: string;
    category: string;
    description: string;
    price: string;
}

export const AddProductForm = () => {

    const navigate = useNavigate();
    const initialValues: FormValues = {
        name: "",
        category: "",
        description: "",
        price: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Введите название товара")
            .matches(/^(?!\d+$).+$/, "Нельзя вводить только числа"),  
        category: Yup.string().required("Выберите категорию"),
        description: Yup.string().max(500, "Описание не более 500 символов"),
        price: Yup.number()
            .moreThan(50, "Цена аренды должна быть больше 50 рублей")
            .required("Введите цену товара"),
    });

    const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        console.log("Данные формы:", values);
        setSubmitting(false);
        navigate("/profile");
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
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
                            <Field type="text" name="category" id="category" />
                        </div>
                        <ErrorMessage name="category" component="div" className="error" />
                    </div>

                    <div className="product-form__text-field">
                        <div className="product-form__content">
                            <label htmlFor="description">Описание товара</label>
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