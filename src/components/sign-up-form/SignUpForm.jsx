//REACT
import { useState } from "react"


//FIREBASE
import { signUpWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase"

function SignUpForm() {

    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [formFields, setFormFields] = useState(defaultFormFields)

    const {displayName, email, password, confirmPassword} = formFields

    const handleChange = (e) => {
        setFormFields((prev) => {
            return {
                ...prev,
                [e.target.id]: e.target.value
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
            const { user } = await signUpWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
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
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="displayName">Display Name</label>
                <input type="text" id="displayName" onChange={handleChange} value={displayName} required/>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={handleChange} value={email} required/>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={handleChange} value={password} required/>

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" onChange={handleChange} value={confirmPassword} required/>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm