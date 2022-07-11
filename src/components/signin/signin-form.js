import { useState } from 'react';
import { signInWithGooglePopup, createUserDocFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import { FormInput } from '../form-inputs/form-input';
import { Button, BUTTON_TYPE_CLASSES } from '../button/button';
import { ButtonsContainer, SignInContainer } from './signin-form.styles';


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
        await signInWithGooglePopup();
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            // console.log(response);

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
        <SignInContainer>
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
                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Google Signin</Button>
                </ButtonsContainer>

            </form>
        </SignInContainer>
    );
};
