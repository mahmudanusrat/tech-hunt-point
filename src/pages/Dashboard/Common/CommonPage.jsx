import React from 'react';
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner/LoadingSpinner';
import { Helmet } from 'react-helmet-async';
import Statistics from '../Admin/Statistics';

const CommonPage = () => {
    const [role, isLoading] = useRole();

    if(isLoading) return <LoadingSpinner></LoadingSpinner>
    if(role === 'user') return <Navigate to='/'></Navigate>
    if(role === 'Moderator') return <Navigate to='/dashboard/product-review'></Navigate>
    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        {role === 'Admin' &&  <Statistics /> }
       
      </div>
    )
  }
  

export default CommonPage;