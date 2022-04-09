import { signInWithGooglePopup, createUserDocFromAuth } from "../../utils/firebase/firebase.utils"


export const Signin = () => {
  const logGoogleUuse = async () => {
    const response = await signInWithGooglePopup();
    
    const userDocRef= await createUserDocFromAuth(response.user);
  }

  return (
    <div>
      <h1>Signin</h1>

      <button onClick={logGoogleUuse}>Sign in with Google</button>
    </div>
  )
}
