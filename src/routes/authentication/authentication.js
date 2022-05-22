import { SigninForm } from '../../components/signin/signin-form';
import { SignupForm } from '../../components/signup/signup-form';
import './authentication.scss';

export const Authentication = () => {


  return (
    <div className='authentication-container'>
      <SigninForm />
      <SignupForm />
    </div>
  );
};
