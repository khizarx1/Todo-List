import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Spin } from 'antd'
import { toast } from 'react-toastify'
import { LoadingOutlined } from '@ant-design/icons';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase'
import { firestore } from '../../../config/firebase'
import { doc, setDoc } from 'firebase/firestore/lite'
import { AuthContext } from '../../../context/AuthContext';

const initialState = {};

function Register() {

    const whiteSpinner = (
        <LoadingOutlined
            style={{
                fontSize: 20,
                color: 'white',
            }}
            spin
        />
    );

    const { isAuthenticated, dispatch } = useContext(AuthContext);

    const [state, setState] = useState(initialState);
    const [isProccessing, setIsProccessing] = useState(false);

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, firstName, lastName } = state;
        setIsProccessing(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                let user = userCredential.user
                addDocument(user, firstName, lastName)
                console.log('user created')
            })
            .catch(error => {
                console.error(error);
            })
    }

    const addDocument = async (user, firstName, lastName) => {
        try {
            await setDoc(doc(firestore, "users", user.uid), {
                firstName: firstName,
                lastName: lastName,
                uid: user.uid,
            });
            toast.success('Registered successfully')
            setIsProccessing(false);
            dispatch({type: 'LOGIN'})
        }
        catch (error) {
            console.error(error)
            setIsProccessing(false);
        }
    }


    return (
        <div className='h-screen w-full flex items-center justify-center bg-[#449DD1]'>
            <div className='w-[600px] p-4 rounded-lg  shadow-xl bg-white'>
                <h1 className="pb-2 text-3xl text-center font-bold">Register Form</h1>
                <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-2'>
                    <input
                        className="p-2 rounded-lg border border-slate-400"
                        type="text"
                        placeholder="Enter First name"
                        name="firstName"
                        onChange={handleChange}
                    />
                    <input
                        className="p-2 rounded-lg border border-slate-400"
                        type="text"
                        placeholder="Enter Last name"
                        name="lastName"
                        onChange={handleChange}
                    />
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
                    <button className="w-1/2 py-2 col-span-2 justify-self-center rounded-lg bg-green-700 hover:bg-green-900 !text-white cursor-pointer">
                        {!isProccessing
                            ? 'Register'
                            : <Spin indicator={whiteSpinner} />
                        }
                    </button>
                    <div className='flex gap-5 text-sm col-span-2 justify-self-center pt-2'>
                        <p>Already have an account?</p>
                        <Link to='/authentication/Login' className='underline'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register