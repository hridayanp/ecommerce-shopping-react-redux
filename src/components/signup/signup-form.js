import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from '../../utils/firebase/firebase.utils';
import { FormInput } from '../form-inputs/form-input';
import '../form-inputs/form-input.scss';
import './signup-form.scss';
import { Button } from '../button/button';

const defaultFormFields = {
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
}


export const SignupForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password, confirmPassword, displayName } = formFields;



    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            await createUserDocFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Email already in use');
            }
            else {
                console.log('Error creating user with email and password', error.message);
            }
        }
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleFormSubmit}>
                <FormInput
                    label='Display Name'
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                    required
                />

                <FormInput
                    label='Email'
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='Password'
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='Confirm Password'
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                />
                <Button type='submit'>Sign In</Button>
            </form>
        </div>
    );
};
