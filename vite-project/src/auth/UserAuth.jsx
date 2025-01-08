import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';
import PropTypes from 'prop-types'; // Import PropTypes

const UserAuth = ({ children }) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !user) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, [user, token, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

// Add PropTypes validation for children
UserAuth.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is a node
};

export default UserAuth;
