import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd'
import { toast } from 'react-toastify'

import { firestore } from '../../../config/firebase'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore/lite'

function Hero() {

    const whiteSpinner = (
        <LoadingOutlined
            style={{
                fontSize: 20,
                color: 'white',
            }}
            spin
        />
    );


    const { user } = useContext(AuthContext);

    const [todo, setTodo] = useState({});
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isProccessing, setIsProccessing] = useState(false);
    const [isProccessingDel, setIsProccessingDel] = useState(null);

    const fetchDocuments = async () => {

        let array = [];
        setIsLoading(true)

        const querySnapshot = await getDocs(collection(firestore, "todos"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            let data = doc.data();
            array.push(data);

            setDocuments(array);
            setIsLoading(false)
        });
    }

    useEffect(() => {
        fetchDocuments();
    }, [])

    const handleDelete = async todo => {
        console.log(todo)

        setIsProccessingDel(todo.id);
        try {
            await deleteDoc(doc(firestore, "todos", todo.id));
            let newDocuments = documents.filter(doc => doc.id !== todo.id)
            setDocuments(newDocuments);
            toast.success('Todo has been successfully deleted')

        }
        catch (error) {
            console.error(error);
            toast.error('Something went wrong while loading data')
        }

        setIsProccessingDel(null);
    }

    return (
        <div className='py-16 flex flex-col items-center'>
            {documents.length === 0
                ? (<h1 className='text-3xl font-bold'>There are no todos yet</h1>)
                : (<>
                    <div className='py-16 flex flex-col items-center'>
                        {isLoading
                            ? <Spin size='large' />
                            : <table className="min-w-[700px] rounded-lg overflow-auto shadow-2xl text-sm text-center md:table">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2">Sr.No</th>
                                        <th className="px-4 py-2">Title</th>
                                        <th className="px-4 py-2">Location</th>
                                        <th className="px-4 py-2">Description</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {documents.map((todo, idx) => {
                                        return <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-4 py-2">{idx + 1}</td>
                                            <td className="px-4 py-2">{todo.title}</td>
                                            <td className="px-4 py-2">{todo.location}</td>
                                            <td className="px-4 py-2">{todo.description}</td>
                                            <td className="px-4 py-2 text-center">
                                                <button onClick={() => { setTodo(todo) }} className="bg-[#449DD1] !text-white px-8 py-2.5 rounded-full cursor-pointer">Edit</button>
                                                <button onClick={() => { handleDelete(todo) }} className="bg-red-600 !text-white px-6 py-2.5 !ml-2 rounded-full cursor-pointer">
                                                    {isProccessingDel === todo.id
                                                        ? <Spin />
                                                        : 'Delete'
                                                    }
                                                </button>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        }

                    </div>
                </>)
            }
        </div>
    )
}

export default Hero