import React, { useState, useEffect } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Swal from 'sweetalert2';

const Profile = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5005/employees")
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error("Error fetching employees:", err));
  }, []);

  const deleteId = (id) => {
    Swal.fire({
      text: "Are you sure you want to delete?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5005/employee/${id}`, {
          method: "DELETE"
        })
          .then((res) => {
            if (!res.ok) throw new Error("Delete failed");
            return res.json();
          })
          .then(() => {
            setEmployees(employees.filter((emp) => emp.id !== id)); 
            Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
          })
          .catch(() => {
            Swal.fire('Error!', 'There was a problem deleting the employee.', 'error');
          });
      }
    });
  };

  return (
    <div className="container">
      <div className='row align-items-center mb-3'>
        <div className='col-8'>
          <h3>Employee</h3>
        </div>
        <div className='col-2'>
          <input className='form-control searchbox' type='search' placeholder='🔍 Search' />
        </div>
        <Link to="/upload" className='col-2 d-flex align-items-center justify-content-center new text-white text-decoration-none'>
          <IoIosAddCircleOutline fontSize={15} />
          <span className='mb-0 ms-2'>Add New Employee</span>
        </Link>
      </div>

      <div className='row'>
        <div className='col-12'>
          <div className='table-responsive'>
            <table className='table text-center'>
              <thead className='border-1 fw-bold'>
                <tr>
                  <td>Employee Name</td>
                  <td>Employee ID</td>
                  <td>Department</td>
                  <td>Designation</td>
                  <td>Project</td>
                  <td>Type</td>
                  <td>Status</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">
                      <h5 className='mt-5 mb-5'>No Record Found</h5>
                    </td>
                  </tr>
                ) : (
                  employees.map(emp => (
                    <tr key={emp.id}>
                      <td>
                        {emp.image ? (
                          <img
                            src={emp.image}
                            alt="employee"
                            style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', marginRight: '8px' }}
                          />
                        ) : (
                          ""
                        )}
                        <span className="ms-2">{emp.name}</span>
                      </td>
                      <td>{emp.employeeId}</td>
                      <td>{emp.department}</td>
                      <td>{emp.designation}</td>
                      <td>{emp.project}</td>
                      <td>{emp.type}</td>
                      <td>{emp.status}</td>
                      <td>
                        <Link to={`/employee/${emp.id}`} className='iconic preview'>
                          <FaRegEye fontSize={25} />
                        </Link>
                        <Link to={`/employee/edit/${emp.id}`} className='ms-2 iconic edit'>
                          <CiEdit fontSize={25} />
                        </Link>
                        <span className='ms-2 iconic delete' onClick={() => deleteId(emp.id)}>
                          <MdDeleteOutline fontSize={25} />
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
