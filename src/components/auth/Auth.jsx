//REACT

//COMPONENTS
import SignUpForm from "../sign-up-form/SignUpForm";
import SignInForm from "../sign-in-form/SignInForm";

//CSS
import {AuthenticationContainer} from './Auth.styles'

function SignIn() {


    return (
        <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    )
}

export default SignIn