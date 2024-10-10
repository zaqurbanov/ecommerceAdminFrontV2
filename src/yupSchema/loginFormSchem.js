import * as yup from "yup";
import { userFormMesasges } from "../enums/messages";

export const loginSchema = yup.object().shape({
  username: yup
    .string(`username ${userFormMesasges.string}`)
    .required(`username ${userFormMesasges.string}`)
    .min(3, `${userFormMesasges.min} 3 values`)
    .matches(/^\S+$/, userFormMesasges.void),
  password: yup
    .string(`password ${userFormMesasges.string}`)
    .required(`password ${userFormMesasges.required}`)
    .min(8, `${userFormMesasges.min} 8 values`)
    .matches(/^(?=.*[A-Z]).{8,}$/, userFormMesasges.password),
});
