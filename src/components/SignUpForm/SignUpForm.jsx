import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

const schema = yup.object({
  login: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().min(6).max(16).required(),
  gender: yup.string().required(),
  age: yup.string().required(),
});

const Gender = {
  MALE: 'male',
  FEMALE: 'female',
};

export const SignUpForm = () => {
  const INITIAL_STATE = {
    login: '',
    email: '',
    password: '',
    agreed: false,
    gender: null,
    age: '',
  };
  const [initialState, setInitialState] = useState(INITIAL_STATE);

  const handleSubmit = (values, formikBag) => {
    setInitialState(values);
    formikBag.resetForm();
  };

  return (
    <Formik
      initialValues={INITIAL_STATE}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {({ values: { agreed, gender, login, age }, setFieldValue }) => (
        <Form>
          <label>
            Name
            <Field type="text" placeholder="Enter login" name="login" />
            <ErrorMessage name="login" component="div" />
          </label>
          <label>
            Email
            <Field type="email" placeholder="Enter email" name="email" />
            <ErrorMessage name="email" component="div" />
          </label>
          <label>
            Password
            <Field
              type="password"
              placeholder="Enter password"
              name="password"
            />
            <ErrorMessage name="password" component="div" />
          </label>
          <label>
            Agree to terms
            <Field
              name="agreed"
              type="checkbox"
              checked={agreed}
              onChange={() => setFieldValue('agreed', !agreed)}
            />
          </label>
          <label>
            Male
            <Field
              type="radio"
              name="gender"
              value={Gender.FEMALE}
              checked={gender === Gender.FEMALE}
            />
          </label>
          <label>
            Female
            <Field
              type="radio"
              name="gender"
              value={Gender.MALE}
              checked={gender === Gender.MALE}
            />
          </label>
          <ErrorMessage name="gender" component="div" />
          <label>
            Choose your age
            <Field as="select" name="age" value={age}>
              <option value="" disabled>
                ...
              </option>
              <option value="18-25">18-25</option>
              <option value="26-35">26-35</option>
              <option value="36+">36+</option>
            </Field>
            <ErrorMessage name="age" component="div" />
          </label>
          <button type="submit" disabled={!agreed}>
            Sign up as {login}
          </button>
        </Form>
      )}
    </Formik>
  );
};

// cSpell:words Formik
