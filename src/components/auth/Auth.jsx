//REACT

//COMPONENTS
import SignUpForm from "../sign-up-form/SignUpForm";
import SignInForm from "../sign-in-form/SignInForm";

//CSS
import './Auth.scss'

function SignIn() {


    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default SignIn