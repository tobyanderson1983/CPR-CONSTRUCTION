import { useEffect, useState } from 'react';
import axios from 'axios';
import { handleSubmitService } from './../utilities/serviceHandlers';

const useServiceForm = ({ location, navigate, isAdminView }) => {
  const data = location.state?.service || {};
  const serviceId = location.pathname.split('/').pop();

  const [formData, setFormData] = useState({
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    streetAddress: data.streetAddress || '',
    city: data.city || '',
    state: data.state || 'WA',
    zipCode: data.zipCode || '',
    phoneNumber: data.phoneNumber || '',
    username: data.username || '',
    password: '',
    confirmPassword: '',
    serviceType: data.serviceType || '',
    description: data.description || '',
  });

  const isEditMode = Boolean(data._id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    navigate(isAdminView ? '/adminDashboard' : '/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitService({
      formData,
      isEditMode,
      isAdminView,
      serviceId: data._id,
      navigate,
      setFormData
    });
  };

  useEffect(() => {
    if (isEditMode) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/customers/service/${serviceId}`);
          const { customer, service } = res.data;
          setFormData({
            firstName: customer.firstName,
            lastName: customer.lastName,
            streetAddress: customer.streetAddress,
            city: customer.city,
            state: customer.state,
            zipCode: customer.zipCode,
            phoneNumber: customer.phoneNumber,
            username: customer.username,
            password: '',
            confirmPassword: '',
            serviceType: service.serviceType || '',
            description: service.description || '',
          });
        } catch (err) {
          console.error('Failed to fetch full customer data:', err);
        }
      };
      fetchData();
    }
  }, [isEditMode, serviceId]);

  return { formData, handleChange, handleSubmit, handleCancel, isEditMode };
};

export default useServiceForm;
