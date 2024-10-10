import * as yup from "yup";

export const ProductFormSchema = yup.object().shape({
  name: yup.string().required("Please fill in the name field"),
  price: yup
    .number()
    .required("Please enter the price")
    .min(0, "Price must be at least 0")
    .positive("Price must be a positive number"),
  stock: yup
    .number()
    .required("Please enter the stock quantity")
    .min(1,"Stock must be at least 1")
    .positive("Stock must be a positive number"),
  description: yup.string().required("Please fill in the description field"),
});
