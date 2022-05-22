import { useState, useEffect } from 'react';
import { signInWithGooglePopup, createUserDocFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import { FormInput } from '../form-inputs/form-input';
import '../form-inputs/form-input.scss';
import './signin-form.scss';
import { Button } from '../button/button';

const defaultFormFields = {
    email: '',
    password: '',
}


export const SigninForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const signInWithGoogle = async () => {
        resetFormFields();
        const response = await signInWithGooglePopup();

        await createUserDocFromAuth(response.user);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    alert('User not found');
                    break;

                case 'auth/wrong-password':
                    alert('Wrong password');
                    break;

                default:
                    console.log('Error signing in with email and password', error.message);
            }
        }
    };

    return (
        <div className='sign-up-container'>
            <h2>Already have an account</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleFormSubmit}>


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
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType='google'>Google Signin</Button>
                </div>

            </form>
        </div>
    );
};
