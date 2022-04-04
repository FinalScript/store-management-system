import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteStoreModal } from '../components/DeleteStoreModal';
import { NewStoreModal } from '../components/NewStoreModal';
import { UpdateStoreModal } from '../components/UpdateStoreModal';
import { StoreDataState } from '../types';

export const Dashboard = () => {
    const storeData = useSelector((state: StoreDataState) => state.storeReducer.storeData);
    //const [modalHidden, setModalHidden] = useState({ newStore: true, deleteStore: true, updateStore: true })
    const [newStoreModalHidden, setNewStoreModalHidden] = useState(true);
    const [deleteStoreModalHidden, setDeleteStoreModalHidden] = useState(true);
    const [updateStoreModalHidden, setUpdateStoreModalHidden] = useState(true);
    const [storeId, setStoreId] = useState(0);
    const navigate = useNavigate();

    const toggleNewStoreModal = () => {
        setNewStoreModalHidden((prevState) => !prevState);
    };

    const toggleDeleteStoreModal = () => {
        setDeleteStoreModalHidden((prevState) => !prevState);
    };

    const toggleUpdateStoreModal = () => {
        setUpdateStoreModalHidden((prevState) => !prevState);
    };

    useEffect(() => {
        document.title = 'Dashboard';
    }, []);

    return (
        <div className='min-h-screen h-full bg-gray-800 text-white pt-20 pb-20 flex flex-col items-center'>
            <NewStoreModal hidden={newStoreModalHidden} toggle={toggleNewStoreModal} />
            <UpdateStoreModal hidden={updateStoreModalHidden} toggle={toggleUpdateStoreModal} storeId={storeId} />
            <DeleteStoreModal hidden={deleteStoreModalHidden} toggle={toggleDeleteStoreModal} storeId={storeId} />
            <div className='bg-gray-900 container mt-14 p-7 rounded-xl'>
                <div>
                    <div className='flex justify-between'>
                        <h1 className='text-3xl'>My Stores</h1>
                        <button onClick={toggleNewStoreModal} className='bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 text-gray-100 p-1 px-2 rounded-lg'>
                            New Store
                        </button>
                    </div>
                    <div className='py-4'>
                        <div className='w-full border-t border-gray-300'></div>
                    </div>
                </div>
                <div>
                    {storeData.map((store) => {
                        return (
                            <div key={store.id} className='flex space-x-2 mb-3 bg-gray-800 rounded-xl cursor-pointer'>
                                <p className='bg-gray-700 rounded-l-xl py-2 w-12 text-center'>{store.id}</p>
                                <p
                                    onClick={() => {
                                        navigate('store/' + store.id + '/', { state: { store } });
                                    }}
                                    className='rounded-r-xl p-2 w-full'>
                                    {store.name}
                                </p>
                                <div className='flex items-center space-x-1 ml-auto'>
                                    <button
                                        onClick={() => {
                                            setStoreId(store.id);
                                            toggleUpdateStoreModal();
                                        }}
                                        className='bg-green-600 hover:bg-green-800 focus:ring-green-800 text-white text-center p-1 px-3 h-full rounded-l-xl'>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            setStoreId(store.id);
                                            toggleDeleteStoreModal();
                                        }}
                                        className='bg-red-500 hover:bg-red-800 focus:ring-red-800 text-white text-center p-1 px-3 h-full rounded-r-xl'>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
