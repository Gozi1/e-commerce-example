import React,{useState} from 'react'
import { useStateContext } from '../context/StateContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login,signUp} = useStateContext();

  return (
    <div>
    
    <div className="mb-3">
      <label>Email address</label>
      <input
        type="email"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
    </div>
   <div>
   <div className="d-grid">
      <button  
      className="btn btn-primary"
      onClick={() => login(email, password)}>
        Sign In
      </button>
    </div>
    <div className="d-grid">
      <button  
      className="btn btn-primary"
      onClick={() => signUp(email, password)}>
        Sign Up
      </button>
    </div>
    </div> 
  </div>
  )
}

export default Login