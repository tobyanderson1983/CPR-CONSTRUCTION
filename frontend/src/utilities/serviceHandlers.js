
import axios from 'axios';

export const handleSubmitService = async ({ formData, isEditMode, isAdminView, serviceId, navigate }) => {
  const { confirmPassword, ...safeData } = formData;

  if (!isEditMode && formData.password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  try {
    if (isEditMode) {
      await axios.put(`http://localhost:5000/api/customers/services/${serviceId}`, {
        serviceType: formData.serviceType,
        description: formData.description,
      });
      alert('Service updated successfully!');
    } else {
      if (isAdminView) {
        const formPayload = new FormData();
        Object.entries({ ...safeData, role: 'admin' }).forEach(([key, value]) => {
          formPayload.append(key, value);
        });

        await axios.post('http://localhost:5000/api/customers/', formPayload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post('http://localhost:5000/api/customers/', formData);
      }

      alert('Service request submitted successfully!');
    }

    navigate(isAdminView ? '/adminDashboard' : '/');
  } catch (error) {
    console.error('Error submitting request:', error);
    alert('Failed to submit request.');
  }
};
