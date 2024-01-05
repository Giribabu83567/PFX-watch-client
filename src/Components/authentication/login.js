import './login.css';

import { useState } from 'react';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Authentication = () => {
    const [auth, authBth] = useState('login')
    let navigate = useNavigate()

    const [name, setName] = useState('')
    const renderName = () => {
        return (
            <>
                <label htmlFor='username' className='label-text'>
                    USER NAME
                </label>
                <input type='text'
                    placeholder='User Name'
                    id='username'
                    className='user-input form-control'
                    onChange={(e) => setName(e.target.value)}
                    value={name}>
                </input>
            </>
        )
    };

    const [email, setEmail] = useState('')
    const renderEmail = () => {
        return (
            <>
                <label htmlFor='email' className='label-text'>
                    EMAIL
                </label>
                <input id='email' type='email' className='form-control user-input'
                    placeholder='Email' onChange={(e) => setEmail(e.target.value)}
                    value={email}>
                </input>
            </>
        )
    };

    const [gender, setGender] = useState('')
    const renderGender = () => {
        return (
            <>
                <label htmlFor='gender' className='label-text'>
                    GENDER
                </label>
                <input id='gender' type='text' placeholder='Gender' className='user-input form-control'
                    onChange={(e) => setGender(e.target.value)} value={gender}>
                </input>
            </>
        )
    };

    const [mobile, setMobile] = useState('')
    const renderMobile = () => {
        return (
            <>
                <label htmlFor='phone' className='label-text'>
                    MOBILE NUMBER
                </label>
                <input id='phone' type='text' placeholder='Mobile Number'
                    className='form-control user-input' onChange={(e) => setMobile(e.target.value)}
                    value={mobile}>
                </input>
            </>
        )
    };

    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const renderPassword = () => {
        return (
            <>
                <label htmlFor='password' className='label-text'>
                    PASSWORD
                </label>
                <input id='password' type={showPassword? 'text' : 'password'}
                    placeholder='Password' className='form-control user-input-pwd'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}>
                </input>
                <div className='mb-3'>
                    <input type='checkbox' id='showPwd' className='show-pwd-checkbox'
                        onClick={()=> setShowPassword(!showPassword)}>
                    </input>
                    <label htmlFor='showPwd'>Show Password</label>
                </div>
            </>
        )
    };

    const [confirmPassword, setConfirmPassword] = useState('')
    const [showConfirmPwd, setShowConfirmPwd] = useState(false)
    const renderConfirmPassword = () => {
        return (
            <>
                <label htmlFor='confirmpwd' className='label-text'>
                    CONFIRM PASSWORD
                </label>
                <input id='confirmpwd' className='form-control user-input-pwd'
                    type={showConfirmPwd? 'text' : 'password'}
                    placeholder='Confirm Password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}>
                </input>
                <div className='mb-3'>
                    <input id='showConfirmPass' type='checkbox' className='show-pwd-checkbox'
                        onClick={()=> setShowConfirmPwd(!showConfirmPwd)}>

                    </input>
                    <label htmlFor='showConfirmPass'>Show Password</label>
                </div>
            </>
        )
    };

    const [errorMsg, setErrorMsg] = useState('')
    const [showSubmitError, setShowSubmitError] = useState(false)
    const onSubmitUserData = async (event)=> {
        event.preventDefault()

        if (auth === 'login')
        {
            const url = "http://localhost:4003/auth/login"
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            };
            const response = await fetch(url, options)
            const data = await response.json()
            if(response.ok === true){
                setErrorMsg('')
                Cookies.set('jwtToken', data.token)
                navigate('/')
            }
            else{
                setShowSubmitError(true)
                setErrorMsg(data.message)
            }
        } 
        else {
            
           if (password === confirmPassword) 
           {
                const url = "http://localhost:4003/auth/signup"
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        gender: gender,
                        mobile: mobile,
                        password: password,
                        confirmPassword: confirmPassword
                    })
                };
                const response = await fetch(url, options)
                const data = await response.json()
                if(response.ok === true){
                    setErrorMsg('')
                    authBth('login')
                }
                else{
                    setShowSubmitError(true)
                    setErrorMsg(data.message)
                }
           } 
           else {
                setShowSubmitError(true)
                setErrorMsg('Passwords Must be Same')
           }
        }

        setName('')
        setEmail('')
        setGender('')
        setMobile('')
        setPassword('')
        setConfirmPassword('')
    }

    useEffect(()=> {
        let token = Cookies.get('jwtToken')
        if(token !== undefined)
        {
            navigate('/')
        }
    });

    return (
        <div>
            {auth === 'login' ?
                (
                    <div className='login-auth-container'>
                        <div className='login-card-container'>
                            <h1 className='text-center mb-3'><span className='logo'>PFX</span> WATCH</h1>
                        
                            <form onSubmit={onSubmitUserData}>
                                <div className='row login-container'>
                                    <div className='col-12 login-user-input'>{renderEmail()}</div>
                                    <div className='col-12 login-user-input'>{renderPassword()}</div>
                                    <div className='col-12 login-user-input'>
                                        <button className='login-btn' type='submit'>Login</button>
                                    </div>
                                    {showSubmitError && <p className='login-user-input error-msg'>{errorMsg}</p>}

                                    <p className='navigate-signup'>Need an account? <span onClick={() => authBth('signup')} className='navTo-signup'>
                                            Sign up
                                        </span>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                )
                :
                (
                    <div className='login-auth-container'>
                        <div className='signup-card-container'>
                            <h1 className='text-center mb-3'><span className='logo'>PFX</span> WATCH</h1>
                        
                            <form onSubmit={onSubmitUserData}>
                                <div className='row'>
                                    <div className='col-lg-6 col-sm-12 signup-user-input'>
                                        {renderName()}
                                    </div>
                                    <div className='col-lg-6 col-sm-12 signup-user-input'>
                                        {renderEmail()}
                                    </div>
                                    <div className='col-lg-6 col-sm-12 signup-user-input'>{renderGender()}</div>
                                    <div className='col-lg-6 col-sm-12 signup-user-input'>{renderMobile()}</div>
                                    <div className='col-lg-6 col-sm-12 signup-user-input'>{renderPassword()}</div>
                                    <div className='col-lg-6 col-sm-12 signup-user-input'>{renderConfirmPassword()}</div>
                                    <div className='col-lg-12 signup-btn-container'>
                                        <button className='signup-btn' type='submit'>Signup</button>
                                    </div>
                                    {showSubmitError && <p className='error-msg'>{errorMsg}</p>}

                                    <p className='navigate-login'>Already have an account? <span onClick={() => authBth('login')} className='navTo-login'>
                                            Log in
                                        </span>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
        </div>
    )
};

export default Authentication;