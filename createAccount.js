import React, {useState} from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

function validateUseName(value) {
    let error;
    if (!value) {
        error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
    }
    return error;
}

function validatePassWord(value) {
    let error;
    if (!value) {
        error = 'Required';
    }

    return error;
}

const ValidatedLoginForm = () => {

        const initialValues = {
            email: '',
            password: '',
            confirmPassword: ''
        };

        const validationSchema = Yup.object().shape({
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
            password: Yup.string()
                .concat(Yup.string().required('Password is required'))
                .min(6, 'Password must be at least 6 characters'),
            confirmPassword: Yup.string()
                .when('password', (password, schema) => {
                    if (password) return schema.required('Confirm Password is required');
                })
                .oneOf([Yup.ref('password')], 'Passwords must match')
        });

        return (
            <Formik initialValues={initialValues} validationSchema={validationSchema}>
                {({errors, touched, isSubmitting, setFieldValue}) => {
                    // const [user, setUser] = useState({});
                    // const [showPassword, setShowPassword] = useState(false);

                    return (
                        <Form>
                            <div className="form-row">
                                <div className="form-group col-7">
                                    <label>Email</label>
                                    <Field name="email" type="text"
                                           className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}/>
                                    <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                                </div>

                                <label>Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />

                                <div className="form-group col">
                                    <label>Confirm Password</label>
                                    <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                    <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                </div>
                            </div>

                            <div className="form-group">
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Save
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        )
    }
;

export default ValidatedLoginForm;
