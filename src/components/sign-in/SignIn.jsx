//REACT

//FIREBASE
import { signInWithGooglePopup, createUserDocumentFromAuth  } from "../../utils/firebase/firebase"

function SignIn() {

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(response.user);
        console.log(userDocRef);
    }

    return (
        <>
            <div>SignIn</div>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        </>
    )
}

export default SignIn