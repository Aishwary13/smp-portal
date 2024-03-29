import React from 'react'
import { useState, useEffect,useCallback} from 'react';
import axios from 'axios';

export default function Attendance({handleClose,handleButtonSave,meetingId}) {

    const [attendanceList, setattendanceList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAttendanceList, setFilteredAttendanceList] = useState([]);

    useEffect(() => {
      // Update the filtered list when the search query or attendanceList changes
      const filteredList = attendanceList.filter(
        (student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.id.toString().includes(searchQuery)
      );
      setFilteredAttendanceList(filteredList);
    }, [searchQuery, attendanceList]);

    const fetchAttendance = useCallback( async () => {
        try {
        //   console.log(userDetails)
          const response = await axios.post("http://127.0.0.1:8000/getAttendance/",
          JSON.stringify({
            meetingId: meetingId,
          }));

        //   console.log(response.data.attendees)

          if (response.status === 200) {
            setattendanceList(response.data.attendees)
            // console.log(response.data.attendees)
          }
        } catch (error) {
          console.error("Error fetching Attendance:", error);
        }
    }, [meetingId]);

    const updateAttendance = async() => {
        const response1 = await axios.post("http://127.0.0.1:8000/updateAttendance/",
        JSON.stringify({
            meetingId: meetingId,
            attendees : attendanceList
        }));

        if(response1.status === 200){
            alert('Attendance updated succesfully');
        }

    }   

    const handleSave = () => {
        updateAttendance();
        handleButtonSave();
    }

    useEffect(() => {
        // if(isFirstTime){setisFirstTime(false);fetchMeetings();}
        fetchAttendance();
    }, [fetchAttendance]);

    const handleCheckboxChange = (studentId) => {
        setattendanceList((prevAttendanceList) => {
          return prevAttendanceList.map((student) => {
            if (student.id === studentId) {
              return { ...student, attendance: student.attendance === 0 ? 1 : 0 };
            }
            return student;
          });
        });
      };


      return (
        <div>
          <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Take Attendance</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
    
                {filteredAttendanceList ? (
                  <div className="modal-body">
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name or roll number"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="table-header">
                      <table className="table">
                        <thead>
                          <tr style={{ width: '100%' }}>
                            <th className='text-center' style={{ width: '33%' }}>Mark Attendance</th>
                            <th className='text-center' style={{ width: '33%' }}>Roll Number</th>
                            <th className='text-center' style={{ width: '33%' }}>Name</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                    {/* Make the table body scrollable */}
                    <div className="table-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                      <table className="table">
                        <tbody>
                          {filteredAttendanceList.map((student) => (
                            <tr key={student.id} style={{ width: '100%' }}>
                              <td className='text-center' style={{ width: '33%' }}>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`attendanceCheckbox${student.id}`}
                                  checked={student.attendance === 1}
                                  onChange={() => handleCheckboxChange(student.id)}
                                />
                              </td>
                              <td className='text-center' style={{ width: '33%' }}>{student.id}</td>
                              <td className='text-center' style={{ width: '33%' }}>{student.name}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <p>Loading Attendance....</p>
                )}
    
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSave}>
                    Save Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

