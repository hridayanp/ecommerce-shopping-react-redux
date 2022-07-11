import { SigninForm } from '../../components/signin/signin-form';
import { SignupForm } from '../../components/signup/signup-form';
import { AuthenticationContainer } from './authentication.styles';

export const Authentication = () => {


  return (
    <AuthenticationContainer>
      <SigninForm />
      <SignupForm />
    </AuthenticationContainer>
  );
};
