import React from 'react';
import AddPetForm from './AddPetForm';
import useAuth from '../../../hooks/useAuth';

const AddPets = () => {

    const {darkLight, user} = useAuth()

    return (
      <div className={`${darkLight ? "dark" : ""} p-5 dark:bg-gray-900`}>
        <AddPetForm darkLight={darkLight} user={user}></AddPetForm>
      </div>
    );
};

export default AddPets;