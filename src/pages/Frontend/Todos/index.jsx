import React, { useState, useContext } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd'
import { toast } from 'react-toastify'
import '../../../config/global'

import { firestore } from '../../../config/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore/lite';
import { AuthContext } from '../../../context/AuthContext';

const initialState = {};

function index() {
    const whiteSpinner = (
        <LoadingOutlined
            style={{
                fontSize: 20,
                color: 'white',
            }}
            spin
        />
    );


    const [isProccessing, setIsProccessing] = useState(false)
    const [state, setState] = useState(initialState);
    const { user } = useContext(AuthContext);

    const handleChange = e => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }));

    }
    const handleSubmit = e => {
        e.preventDefault()

        const title = (state.title || '').trim();
        const location = (state.location || '').trim();
        const description = (state.description || '').trim();

        if (title.length < 3) {
            return toast.error('Title length should be atleast 3 chars.');
        }
        if (location.length < 3) {
            return toast.error('Please enter correct location');
        }
        if (description.length < 10) {
            return toast.error('Please enter description above 10 words');
        }

        const formData = { title, location, description };

        formData.dateCreated = serverTimestamp();
        formData.id = window.getRandomId();
        formData.status = 'active'
        formData.createdBy = {
            email: user.email,
            uid: user.uid
        }
        createdDocument(formData);
    }

    const createdDocument = async (formData) => {

        setIsProccessing(true);
        try {
            await setDoc(doc(firestore, "todos", formData.id), formData);
            toast.success('Todo has been successfully added.success');
        }
        catch (error) {
            console.error(error);
            toast.error('something went wrong.Todo did\'t added. error');
        }
        setIsProccessing(false);
    }

    return (
        <div className='py-16 flex flex-col items-center'>
            <h1 className="pb-2 text-3xl text-center !font-bold">My Todos</h1>
            <div className='w-[700px] p-8 rounded-lg  shadow-2xl'>
                <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-2'>
                    <input
                        className="p-2 rounded-lg border border-slate-400 outline-0"
                        type="text"
                        placeholder="Enter Title"
                        name="title"
                        onChange={handleChange}
                    />
                    <input
                        className="p-2 rounded-lg border border-slate-400 outline-0"
                        type="text"
                        placeholder="Enter Location"
                        name="location"
                        onChange={handleChange}
                    />
                    <textarea
                        rows='4'
                        className="p-2 rounded-lg col-span-2 border border-slate-400 outline-0"
                        placeholder="Enter Description"
                        name="description"
                        onChange={handleChange}
                    ></textarea>
                    <button className="w-1/2 py-2 col-span-2 justify-self-center rounded-lg bg-[#449DD1] hover:bg-blue-400 !text-white cursor-pointer">
                        {!isProccessing
                            ? 'Add'
                            : <Spin indicator={whiteSpinner} />
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default index