import React from 'react';
import PropTypes from "prop-types";
import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/Shared/LoadingSpinner/LoadingSpinner';
import { Navigate } from 'react-router-dom';

const ModeratorRoute = ({children}) => {
   const [role,isLoading] = useRole()

    if (isLoading) return <LoadingSpinner></LoadingSpinner>;
    if (role === 'Moderator') return children;
    return <Navigate to="/" replace="true" />;
  };
  
  ModeratorRoute.propTypes = {
    children: PropTypes.element,
  };
  

export default ModeratorRoute;