import { useState } from 'react';
import * as Yup from 'yup';
import useAuthStore from '../store/authStore';

const phoneRegExp = /((0?9)|(\+?989))\d{9}/g;

export const usePhoneForm = () => {
  const { handlePhoneSubmit } = useAuthStore();
  const [initialValues] = useState({ phone: "09372259143" });

  const validationSchema = Yup.object().shape({
    phone: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required"),
  });

  return { initialValues, validationSchema, handlePhoneSubmit };
};