import { SignupForm } from '../../components/signup/signup-form';
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
} from '../../utils/firebase/firebase.utils';

export const Signin = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();

    const userDocRef = await createUserDocFromAuth(response.user);
  };

  return (
    <div>
      <h1>Signin</h1>

      <button onClick={logGoogleUser}>Sign in with Google</button>

      <SignupForm />
    </div>
  );
};
