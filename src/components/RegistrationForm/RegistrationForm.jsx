import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        console.log("registration success");
      })
      .catch(() => {
        console.log("registration error");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form} autoComplete="off">
          <div className={css.label}>
            <label htmlFor="name">Username</label>
            <Field type="text" name="name" autoComplete="off" as={TextField} />
            <ErrorMessage name="name" component="div" className={css.error} />
          </div>
          <div className={css.label}>
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              name="email"
              autoComplete="off"
              as={TextField}
            />
            <ErrorMessage name="email" component="div" className={css.error} />
          </div>
          <div className={css.label}>
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              name="password"
              autoComplete="off"
              as={TextField}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={css.error}
            />
          </div>
          <Button type="submit" variant="outlined" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
