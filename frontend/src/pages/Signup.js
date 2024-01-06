import {useState} from 'react'
import {useAuthContext} from '../hooks/useAuthContext'
import {useSignup} from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password)
    }

    return (  
        <form onSubmit = {handleSubmit}>
            <h3>Sign Up</h3>

            <label for = "fmail">Email:</label>
            <input 
            type = "email" 
            onChange = {e => setEmail(e.target.value)}
            id  = "fmail"
            placeholder = "Email"
            value = {email}
            />
            <label for = "fpass">Password</label>
            <input 
            type = "text" 
            onChange = {e => setPassword(e.target.value)}
            placeholder = "password"
            id  = "fpass"
            value = {password}
            />
            <button disabled = {isLoading}>Sign up</button>
            {error && <div className = "error">{error}</div>}
        </form>
        
    );
}
 
export default Signup;