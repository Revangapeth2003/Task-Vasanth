import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoPersonOutline } from "react-icons/io5";

const Preview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5005/employees/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading employee:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!form) return <div className="text-center mt-5 text-danger">Employee not found.</div>;

  return (
    <div className='container p-3 pb-5'>
      <h3>
        <span onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
          &lt;
        </span>{" "}
        Employee Preview
      </h3>

      <p className="big-font mt-3">
        <IoPersonOutline /> Personal Info
      </p>

      {form.image && (
        <div className="mb-3">
          <img
            src={form.image}
            alt="Preview"
            className="img-thumbnail"
            style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>
      )}

      <div className='row'>
        <div className='col-md-6'>
          <h5>Name*</h5>
          <input type='text' value={form.name} readOnly className='inputbox form-control' />
        </div>
        <div className='col-md-6'>
          <h5>Employee ID*</h5>
          <input type='text' value={form.employeeId} readOnly className='inputbox form-control' />
        </div>
      </div>

      <div className='row mt-3'>
        <div className='col-md-6'>
          <h5>Department*</h5>
          <input type='text' value={form.department} readOnly className='inputbox form-control' />
        </div>
        <div className='col-md-6'>
          <h5>Designation*</h5>
          <input type='text' value={form.designation} readOnly className='inputbox form-control' />
        </div>
      </div>

      <div className='row mt-3'>
        <div className='col-md-6'>
          <h5>Project*</h5>
          <input type='text' value={form.project} readOnly className='inputbox form-control' />
        </div>
        <div className='col-md-6'>
          <h5>Type*</h5>
          <input type='text' value={form.type} readOnly className='inputbox form-control' />
        </div>
      </div>

      <div className='row mt-3 mb-5'>
        <div className='col-md-6'>
          <h5>Status*</h5>
          <input type='text' value={form.status} readOnly className='inputbox form-control' />
        </div>
      </div>
    </div>
  );
};

export default Preview;
