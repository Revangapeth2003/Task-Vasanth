import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { MdOutlineCameraAlt } from 'react-icons/md';
import { IoPersonOutline } from 'react-icons/io5';
import 'react-toastify/dist/ReactToastify.css';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    employeeId: '',
    department: '',
    designation: '',
    project: '',
    type: '',
    status: '',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5005/employees/${id}`);
        if (!res.ok) throw new Error('Fetch failed');

        const data = await res.json();

        setForm({
          name: data.name || '',
          employeeId: data.employeeId || '',
          department: data.department || '',
          designation: data.designation || '',
          project: data.project || '',
          type: data.type || '',
          status: data.status || '',
        });

        if (data.image) {
          setImagePreview(data.image);
        }
      } catch (err) {
        console.error(' Error fetching employee:', err);
        toast.error('Failed to fetch employee');
      }
    };

    fetchData();
  }, [id]);

  // Input handler
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // File handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Click icon triggers file input
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    ['name', 'employeeId', 'department', 'designation', 'type', 'status'].forEach(field => {
      if (!form[field]) newErrors[field] = 'This field is required';
    });
    return newErrors;
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErr = validate();
    if (Object.keys(newErr).length > 0) {
      setError(newErr);
      return;
    }

    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }

    if (fileInputRef.current.files[0]) {
      formData.append('image', fileInputRef.current.files[0]);
    }

    try {
      const res = await fetch(`http://localhost:5005/employee/${id}`, {
        method: 'PATCH',
        body: formData,
      });

      if (res.ok) {
        toast.success('Employee updated successfully');
        setTimeout(() => navigate('/'), 1500);
      } else {
        toast.error('Failed to update employee');
      }
    } catch (err) {
      console.error(' Update Error:', err);
      toast.error('Update failed');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="container p-4">
          <h3>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>&lt;</span> Edit Employee Details
          </h3>

          <p className="mt-3 fs-5"><IoPersonOutline /> Personal Info</p>

          <div className="mb-3">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }}
              />
            )}
            <MdOutlineCameraAlt
              fontSize={28}
              onClick={handleIconClick}
              style={{ cursor: 'pointer', marginLeft: '10px' }}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          <div className="row">
            {['name', 'employeeId', 'department', 'designation'].map(field => (
              <div className="col-md-6 mb-3" key={field}>
                <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}*</label>
                <input
                  type="text"
                  className="form-control"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                />
                {error[field] && <small className="text-danger">{error[field]}</small>}
              </div>
            ))}
          </div>

          <div className="row">
            {['project', 'type', 'status'].map(field => (
              <div className="col-md-6 mb-3" key={field}>
                <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}*</label>
                <input
                  type="text"
                  className="form-control"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                />
                {error[field] && <small className="text-danger">{error[field]}</small>}
              </div>
            ))}
          </div>

          <div className="text-end">
            <button className="btn btn-primary me-2" type="submit">Update</button>
            <button className="btn btn-secondary" type="button" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Edit;
