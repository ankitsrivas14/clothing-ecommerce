//REACT
import { useState, useContext } from "react"


//FIREBASE
import { signUp, createUserDocumentFromAuth } from "../../utils/firebase/firebase"

//COMPONENTS
import FormInput from "../form-input/FormInput"
import Button from "../button/Button"

//CSS
import './SignUpForm.scss'

//CONTEXT
import { UserContext } from "../../context/UserContext"

function SignUpForm() {

    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { setCurrentUser } = useContext(UserContext);

    const {displayName, email, password, confirmPassword} = formFields

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

        if(!(displayName && email && password && confirmPassword)){
            alert('All fields are required');
            return;
        }
        if(password.trim() !== confirmPassword.trim()){
            alert('Passwords do not match');
            return;
        }

        try {
            const { user } = await signUp(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('User already in use.')
            }
            console.log('user creation failed', error);
        }

    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' type="text" name="displayName" onChange={handleChange} value={displayName} required/>
                <FormInput label='Email' type="email" name="email" onChange={handleChange} value={email} required/>
                <FormInput label='Password' type="password" name="password" onChange={handleChange} value={password} required/>
                <FormInput label='Confirm Password' type="password" name="confirmPassword" onChange={handleChange} value={confirmPassword} required/>

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm