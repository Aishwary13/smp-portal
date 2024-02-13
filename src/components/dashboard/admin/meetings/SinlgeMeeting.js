import React from 'react'
import { useState } from 'react';
import TakeMeetingDetails from './TakeMeetingDetails';
import Attendance from './Attendance';
import ViewAttendance from './ViewAttendance';
import departmentOptions from "../../../../data/departmentOptions.json";

export default function SinlgeMeeting({ meet, ondelete, editMeeting, userDetails, isPreviousMeeting}) {
  const handleButtonClick = (e) => {
    e.stopPropagation();
  };

  const meetingId = `meeting-${meet.meetingId}`;

  const [isEditing, setIsEditing] = useState(false);

  const [confirmdelete, setconfirmdelete] = useState(false);

  const [editedMeeting, setEditedMeeting] = useState(meet);

  const [showAttendance, setshowAttendance] = useState(false);

  const [viewAttendance, setviewAttendance] = useState(false);


  const handleEditClick = () => {
    // Add your edit functionality here
    setIsEditing(true);
    console.log("Edit clicked for meeting ID:", meet.meetingId);
    console.log(editedMeeting)
  };

  const handleEditSave = () => {
    editMeeting(meet.meetingId, editedMeeting);
    setIsEditing(false);
  };

  const handleEditClose = () => {
    setEditedMeeting(meet);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    // Add your delete functionality here
    setconfirmdelete(true);
    // console.log('Delete clicked for meeting ID:', meet.meetingId);
  };

  const handletitle = (e) => {
    setEditedMeeting({
      ...editedMeeting,
      title: e.target.value,
    });
  };

  const handledate = (e) => {
    setEditedMeeting({
      ...editedMeeting,
      date: e.target.value,
    });
  };

  const handletime = (e) => {
    setEditedMeeting({
      ...editedMeeting,
      time: e.target.value,
    });
  };

  const handleattendees = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setEditedMeeting((prevDetails) => {
      if (isChecked) {
        return {
          ...prevDetails,
          attendee: [...prevDetails.attendee, value],
        };
      } else {
        return {
          ...prevDetails,
          attendee: prevDetails.attendee.filter(
            (attendee) => attendee !== value
          ),
        };
      }
    });
  };

  const handleBranch = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setEditedMeeting((prevDetails) => {
      const updatedbranch = isChecked
        ? [...prevDetails.mentorBranches, value]
        : prevDetails.mentorBranches.filter((branch) => branch !== value);

      return {
        ...prevDetails,
        mentorBranches: updatedbranch,
      };
    });
  }

  const handleAllBranchesChange = (e) => {
    const isChecked = e.target.checked;
    const allBranches = Object.keys(departmentOptions);
  
    setEditedMeeting((prevDetails) => {
      if (isChecked) {
        // If "All Branches" is checked, set mentorBranches to all branch keys
        return {
          ...prevDetails,
          mentorBranches: allBranches,
        };
      } else {
        // Set mentorBranches to an empty array if no individual branch is selected
        return {
          ...prevDetails,
          mentorBranches: [],
        };
      }
    });
  };


  const handleDescription = (e) => {
    setEditedMeeting({
      ...editedMeeting,
      description: e.target.value,
    });
  };

  const handleCancelDelete = () => {
    setconfirmdelete(false);
  };

  const handleConfirmDelete = () => {
    ondelete(meet.meetingId);
    setconfirmdelete(false);
  };

  const handleShowAttendance = () => {
    setshowAttendance(true)
  }

  const handleCloseAttendance= () => {
    setshowAttendance(false)
  }

  const handleSaveAttendance = () => {
    setshowAttendance(false)
  }

  const handleViewAttendance = () => {
    setviewAttendance(true)
  }

  const handleCloseViewAttendance= () => {
    setviewAttendance(false)
  }

  return (
    <div className="mb-2" style={{ width: "100%" }}>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button btn-sm collapsed"
              onClick={handleButtonClick}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${meetingId}`}
              aria-expanded="true"
              aria-controls={meetingId}
            >
              {meet.title} - Date: {meet.date}, Time: {meet.time}
            </button>
            {/* <button> hello </button> */}
          </h2>
          <div
            id={meetingId}
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              {/* <strong>Meeting ID : {meet.meetingId}, Meeting Title : {meet.title}</strong>  */}
              <strong>
                Meeting ID : {meet.meetingId}, Meeting Title : {meet.title}
              </strong>
              <p>Time: {meet.time}</p>
              <p>Date: {meet.date}</p>
              <p>
                Attendee:
                <br />
                {Array.isArray(meet.attendee) ? (
                  meet.attendee.map((attendee, index) => (
                    <li key={index}>{attendee}</li>
                  ))
                ) : (
                  <li>{meet.attendee}</li>
                )}
                Mentor Branches:
                <br />
                <p>
                  {Array.isArray(meet.mentorBranches) ? (
                    meet.mentorBranches.map((branch, index) => (
                      // <li key={index}>{departmentOptions[branch]}</li>
                      <span key={index}>
                        {departmentOptions[branch]}
                        {index < meet.mentorBranches.length - 1 && ', '}
                      </span>
                    ))
                  ) : (
                    // <li>{meet.mentorBranches}</li>
                    <span>{meet.mentorBranches}</span>
                  )}
                </p>
              </p>

              <p>
                Description:
                <br />
                {meet.description}
              </p>

              <div className="mt-2">
                {!isPreviousMeeting && (
                  <button
                    className="btn btn-danger mx-2"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </button>
                )}
                {!isPreviousMeeting && (userDetails.id === meet.schedulerId) && (
                  <button
                    className="btn btn-primary mx-2"
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                )}
                  <button
                    className="btn btn-primary mx-2"
                    onClick={handleShowAttendance}
                  >
                    Take Attendance
                  </button>
                  
                  <button
                    className="btn btn-primary mx-2"
                    onClick={handleViewAttendance}
                  >
                    View Attendance
                  </button>

              </div>

            </div>
          </div>

          {isEditing && (
            <TakeMeetingDetails
              currmeeting={editedMeeting}
              handleClose={handleEditClose}
              handleSave={handleEditSave}
              handledate={handledate}
              handletime={handletime}
              handletitle={handletitle}
              handleattendees={handleattendees}
              handleDescription={handleDescription}
              handleBranch={handleBranch}
              handleAllBranchesChange={handleAllBranchesChange}
            />
          )}

          {showAttendance && (

            <Attendance
              handleClose={handleCloseAttendance}
              handleButtonSave = {handleSaveAttendance}
              meetingId = {meet.meetingId}
            />

          )}

          {viewAttendance && (

          <ViewAttendance
            handleClose={handleCloseViewAttendance}
            meetingId = {meet.meetingId}
          />

          )}

          {confirmdelete && (
            <div
              className="modal"
              style={{
                display: "block",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirmation</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={handleCancelDelete}
                      data-dismiss="modal"
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    Are you sure you want to delete{" "}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancelDelete}
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleConfirmDelete}
                      data-dismiss="modal"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
