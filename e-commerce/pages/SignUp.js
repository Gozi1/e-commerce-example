import React, { useState } from 'react'
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {registerWithEmailAndPassword} = useStateContext(); 
  return (
    <div>
    <h3>Sign Up</h3>
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
      onClick={() => registerWithEmailAndPassword(email, password)}>
        Submit
      </button>
    </div>
    <div className="d-grid">
    <Link href={`/Login`}>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
      </Link>
    </div>
    </div> 
    </div>
  
  )
}

export default SignUp