//REACT
import { useState, useContext } from "react"


//FIREBASE
import { signInWithGooglePopup, createUserDocumentFromAuth, signIn } from "../../utils/firebase/firebase"

//COMPONENTS
import FormInput from "../form-input/FormInput"
import Button from "../button/Button"

//CSS
import './SignInForm.scss'

//CONTEXT
import { UserContext } from "../../context/UserContext"

function SignInForm() {

    const defaultFormFields = {
        email: '',
        password: '',
    }

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { setCurrentUser } = useContext(UserContext)

    const {email, password} = formFields

    const handleChange = (e) => {
        setFormFields((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();

        if(!(email && password)){
            alert('All fields are required');
            return;
        }

        try {
            // TODO: Sign in
            const { user } = await signIn(email, password);
            setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            if(error.code === 'auth/user-not-found'){
                alert('User not found')
                return
            }
            if(error.code === 'auth/wrong-password'){
                alert('Wrong username or password!')
                return
            }
            alert(error.code)
            console.log(error);
        }

    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        setCurrentUser(user);
        await createUserDocumentFromAuth(user);
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type="email" name="email" onChange={handleChange} value={email} required/>
                <FormInput label='Password' type="password" name="password" onChange={handleChange} value={password} required/>

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType='google'>Google sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm