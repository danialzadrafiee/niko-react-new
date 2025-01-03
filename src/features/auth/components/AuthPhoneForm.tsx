import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { usePhoneForm } from '@/features/auth/hooks/usePhoneForm';
import { Button } from "@/components/ui/button";

const AuthPhoneForm: React.FC = () => {
  const { initialValues, validationSchema, handlePhoneSubmit } = usePhoneForm();

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlePhoneSubmit}>
      {({ values, handleChange, handleBlur }) => (
        <Form className="space-y-4">
          <div>
            <Field name="phone" type="tel" placeholder="Phone number" className="w-full p-2 border rounded" value={values.phone} onChange={handleChange} onBlur={handleBlur} />
            <ErrorMessage name="phone" component="div" className="mt-1 text-sm text-red-500" />
          </div>
          <Button type="submit"  className="w-full" variant="primary">
            ثبت
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthPhoneForm;