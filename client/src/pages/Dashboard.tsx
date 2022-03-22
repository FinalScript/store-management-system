import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NewStoreModal } from '../components/NewStoreModal';
import { StoreDataState } from '../types';

export const Dashboard = () => {
    const storeData = useSelector((state: StoreDataState) => state.storeReducer.storeData);
    const [newStoreModalHidden, setNewStoreModalHidden] = useState(true);
    const navigate = useNavigate();

    const toggleNewStoreModal = () => {
        setNewStoreModalHidden((prevState) => !prevState);
    };

    useEffect(() => {
        document.title = 'Dashboard';
    }, []);

    return (
        <div className='min-h-screen h-full bg-gray-800 text-white pt-20 pb-20 flex flex-col items-center'>
            <NewStoreModal hidden={newStoreModalHidden} toggle={toggleNewStoreModal} />
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
                            <div
                                onClick={() => {
                                    navigate('store/' + store.id + '/', { state: { store } });
                                }}
                                key={store.id}
                                className='flex space-x-2 mb-3 bg-gray-800 rounded-xl cursor-pointer'>
                                <p className='bg-gray-700 rounded-l-xl py-2 w-12 text-center'>{store.id}</p>
                                <p className='rounded-r-xl p-2'>{store.name}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
