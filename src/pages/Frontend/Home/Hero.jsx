import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { Spin } from 'antd'
import { toast } from 'react-toastify'
import { Modal, Input, Select } from 'antd';
import 'antd/dist/reset.css'; // For antd v5 or later

import { firestore } from '../../../config/firebase'
import { collection, getDocs, deleteDoc, doc, setDoc, serverTimestamp, query, where } from 'firebase/firestore/lite'

function Hero() {

    const { Option } = Select;

    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

    const { user } = useContext(AuthContext);

    const [editTodo, setEditTodo] = useState({});
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isProccessingDel, setIsProccessingDel] = useState(null);

    const handleChange = e => {
        setEditTodo(s => ({ ...s, [e.target.name]: e.target.value }));
    }

    const fetchDocuments = async () => {

        let array = [];
        setIsLoading(true)

        try {
            const q = query(collection(firestore, "todos"), where("createdBy.uid", "==", user.uid));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                let data = doc.data();
                array.push(data);

            });
            setDocuments(array);
        } catch (error) {
            console.error(error);
            toast.error('something went wrong while loading your todos')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (user?.uid) {
            fetchDocuments();
        }
    }, [user])

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

    const handleUpdate = async (todo) => {

        let formData = { ...todo };
        formData.dateCreated = formData.dateCreated
        formData.dateModified = serverTimestamp();

        formData.ModifiedBy = {
            email: user.email,
            uid: user.uid
        }
        try {
            await setDoc(doc(firestore, 'todos', formData.id), formData, { merge: true })
            toast.success('Todo updated successfully');

            let newDocuments = documents.map((doc) => {
                if (doc.id === todo.id) {
                    return todo
                } else {
                    return doc
                }
            })
            setDocuments(newDocuments);
        }
        catch (error) {
            console.error(error);
            toast.error('Something went wrong while update todo');
        }
        setIsModalOpen(false)
    };


    return (
        <>
            {isLoading
                ? (
                    <div className="mt-30 scale-[2] text-center">
                        <Spin size="large" />
                    </div>
                )
                : (
                    documents.length === 0
                        ? (
                            <h1 className='pt-6 text-3xl text-center !font-bold'>You Have No Todo List Yet</h1>
                        )
                        : (
                            <div className='py-16 flex flex-col items-center'>
                                <h1 className='pb-4 text-3xl !font-bold'>My Todos</h1>
                                <table className="min-w-[700px] rounded-lg overflow-auto shadow-2xl text-sm text-center md:table">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-2">Sr.No</th>
                                            <th className="px-4 py-2">Title</th>
                                            <th className="px-4 py-2">Location</th>
                                            <th className="px-4 py-2">Description</th>
                                            <th className="px-4 py-2">Status</th>
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
                                                <td className="px-4 py-2">{todo.status}</td>
                                                <td className="px-4 py-2 text-center">
                                                    <button onClick={() => { setEditTodo(todo); setIsModalOpen(true); showModal(true) }} className="bg-[#449DD1] !text-white px-8 py-2.5 rounded-full cursor-pointer">Edit</button>
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
                            </div>
                        )
                )}
            {/* modal */}
            <Modal title="Update Todo" open={isModalOpen} onOk={() => { handleUpdate(editTodo) }} onCancel={handleCancel}>
                <Input
                    name='title'
                    className="mb-3 outline-0"
                    value={editTodo?.title}
                    onChange={handleChange}
                    placeholder="Title"
                />
                <div className='my-3'>
                    <Input
                        name='location'
                        value={editTodo?.location}
                        onChange={handleChange}
                        placeholder="Location"
                    />
                </div>
                <Input.TextArea
                    name='description'
                    rows={3}
                    value={editTodo?.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <div className='mt-3'>
                    <select
                        name='status'
                        className="w-full p-1 rounded border border-gray-300 cursor-pointer"
                        value={editTodo?.status}
                        onChange={handleChange}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </Modal>
        </>
    )
}

export default Hero