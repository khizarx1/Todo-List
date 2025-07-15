import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase'

const initialState = { email: '', password: '' };

function Login() {

    const whiteSpinner = (
        <LoadingOutlined
            style={{
                fontSize: 20,
                color: 'white',
            }}
            spin
        />
    );

    const navigate = useNavigate();
    const [state, setState] = useState(initialState);
    const [isProccessing, setIsProccessing] = useState(false);

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = state;
        setIsProccessing(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                let user = userCredential.user
                console.log('user', user);
                navigate('/Dashboard');
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsProccessing(false);
            })
    }


    return (
        <div className='h-screen w-full flex items-center justify-center bg-[#449DD1]'>
            <form onSubmit={handleSubmit} className='w-[600px] p-4 rounded-lg grid grid-cols-1 gap-y-2 shadow-xl bg-white'>
                <h1 className="text-3xl text-center font-bold">Login Form</h1>
                <input
                    className="p-2 rounded-lg border border-slate-400"
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    onChange={handleChange}
                />
                <input
                    className="p-2 rounded-lg border border-slate-400"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    onChange={handleChange}
                />
                <button className="w-1/2 py-2 justify-self-center rounded-lg bg-green-700 hover:bg-green-900 !text-white cursor-pointer">
                    {!isProccessing
                        ? 'Login'
                        : <Spin indicator={whiteSpinner} />
                    }
                </button>
                <div className='flex gap-5 text-sm justify-self-center pt-2'>
                    <p>Need an account?</p>
                    <Link to='/authentication/Register' className='underline'>Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login