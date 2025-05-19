import React, { useRef, useState } from 'react';
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineCameraAlt } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify"; 
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, updateError] = useState({});
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    employeeId: '',
    department: '',
    designation: '',
    project: '',
    type: '',
    status: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const validation = () => {
    const newError = {};
    if (!form.name) newError.name = "Please enter the Name";
    if (!form.employeeId) newError.employeeId = "Please enter the Employee ID";
    if (!form.department) newError.department = "Please enter the Department";
    if (!form.designation) newError.designation = "Please enter the Designation";
    if (!form.type) newError.type = "Please enter the Type";
    if (!form.status) newError.status = "Please enter the Status";
    return newError;
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    } else {
      toast.error('Please select a valid image file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorValidator = validation();
    
    if (Object.keys(errorValidator).length === 0) {
      const formData = new FormData();
      formData.append('image', fileInputRef.current.files[0]); 
      for (const key in form) {
        formData.append(key, form[key]);
      }

      try {
        const res = await fetch('http://localhost:5005/upload', {
          method: 'POST',
          body: formData
        });

        if (res.ok) {
          toast.success("Data added successfully");
          setForm({
            name: '',
            employeeId: '',
            department: '',
            designation: '',
            project: '',
            type: '',
            status: ''
          });
          setImagePreview(null);
          updateError({});
        } else {
          toast.error("Upload failed");
        }
      } catch (error) {
        toast.error("An error occurred");
      }
    } else {
      updateError(errorValidator);
    }
  };

  const handleCancel = () => {
    setForm({
      name: '',
      employeeId: '',
      department: '',
      designation: '',
      project: '',
      type: '',
      status: ''
    });
    setImagePreview(null);
    updateError({});
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='container p-3 pb-5'>
          <h3><span onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
          &lt;
        </span>Add New Employee</h3>
          <p className="big-font mt-3">
            <IoPersonOutline /> Personal Info
          </p>

          <div>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="img-thumbnail mb-3"
                style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }}
              />
            )}
            <MdOutlineCameraAlt
              fontSize={25}
              className="icon-outline"
              onClick={handleIconClick}
              style={{ cursor: 'pointer' }}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          <div className='row'>
            <div className='col-md-6'>
              <h5>Name*</h5>
              <input type='text' onChange={handleChange} value={form.name} name='name' className='inputbox' />
              {error.name && <p className="text-danger">{error.name}</p>}
            </div>
            <div className='col-md-6'>
              <h5>Employee ID*</h5>
              <input
                type='text'
                className='inputbox'
                onChange={handleChange}
                value={form.employeeId}
                name='employeeId'
              />
              {error.employeeId && <p className="text-danger">{error.employeeId}</p>}
            </div>
          </div>

          <div className='row mt-3'>
            <div className='col-md-6'>
              <h5>Department*</h5>
              <input
                type='text'
                className='inputbox'
                onChange={handleChange}
                value={form.department}
                name='department'
              />
              {error.department && <p className="text-danger">{error.department}</p>}
            </div>
            <div className='col-md-6'>
              <h5>Designation*</h5>
              <input
                type='text'
                className='inputbox'
                onChange={handleChange}
                value={form.designation}
                name='designation'
              />
              {error.designation && <p className="text-danger">{error.designation}</p>}
            </div>
          </div>

          <div className='row mt-3'>
            <div className='col-md-6'>
              <h5>Project</h5>
              <input
                type='text'
                className='inputbox'
                onChange={handleChange}
                value={form.project}
                name='project'
              />
            </div>
            <div className='col-md-6'>
              <h5>Type*</h5>
              <input
                type='text'
                className='inputbox'
                onChange={handleChange}
                value={form.type}
                name='type'
              />
              {error.type && <p className="text-danger">{error.type}</p>}
            </div>
          </div>

          <div className='row mt-3'>
            <div className='col-md-6'>
              <h5>Status*</h5>
              <input
                type='text'
                className='inputbox'
                onChange={handleChange}
                value={form.status}
                name='status'
              />
              {error.status && <p className="text-danger">{error.status}</p>}
            </div>
          </div>

          <div className='row mt-3 mb-5'>
            <div className='col text-end'>
              <button className='btn btn-primary me-2' type='submit'>Submit</button>
              <button className='btn btn-secondary' type='button' onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Upload;
