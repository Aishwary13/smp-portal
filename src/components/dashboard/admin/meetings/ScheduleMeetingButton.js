import React, { useState } from 'react';
// import Formelement from './Formelement';
import TakeMeetingDetails from './TakeMeetingDetails';
import axios from 'axios'; // Import Axios

const ScheduleMeetingButton = ({ setmeetings, userDetails }) => {
  const [showModal, setShowModal] = useState(false);
  const [currmeeting, setcurrmeeting] = useState({
    id: null,
    schedulerId: userDetails.schedulerId,
    time: "",
    date: "",
    title: "",
    description: "",
    attendees: [],
  });

  const handleScheduleClick = () => {
    setcurrmeeting({
      id: null,
      time: "",
      schedulerId: userDetails.schedulerId,
      date: "",
      title: "",
      description: "",
      attendees: [],
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const addMeetingOnBackend = async (meeting) => {
    try {
      // Replace 'your_api_endpoint' with the actual endpoint where you want to update the meeting on the backend.
      await axios
        .put("http://127.0.0.1:8000/addMeeting/", meeting)
        .then((response) => {
          // If the backend successfully updates the meeting, update your local state
          if (response.status === 200) {
            setcurrmeeting(meeting); // Update the current meeting state
            setmeetings((prevMeetings) => [...prevMeetings, meeting]); // Add the new meeting to meetings
            setShowModal(false);
            console.log("Meeting added successfully on the backend");
          }
        });
    } catch (error) {
      console.error("Error adding meeting on the backend:", error);
      // Handle errors or display an error message to the user.
    }
  };

  const handleSaveModal = () => {
    const newMeeting = { ...currmeeting, id: Date.now() };
    addMeetingOnBackend(newMeeting);
  };

  const handletitle = (e) => {
    setcurrmeeting({
      ...currmeeting,
      title: e.target.value,
    });
  };

  const handledate = (e) => {
    setcurrmeeting({
      ...currmeeting,
      date: e.target.value,
    });
  };

  const handletime = (e) => {
    setcurrmeeting({
      ...currmeeting,
      time: e.target.value,
    });
  };

  const handleattendees = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setcurrmeeting((prevDetails) => {
      if (isChecked) {
        return {
          ...prevDetails,
          attendees: [...prevDetails.attendees, value],
        };
      } else {
        return {
          ...prevDetails,
          attendees: prevDetails.attendees.filter(
            (attendee) => attendee !== value
          ),
        };
      }
    });
  };

  const handleDescription = (e) => {
    setcurrmeeting({ ...currmeeting, description: e.target.value });
  };

  return (
    <div>
      {/* <i class="bi bi-plus-circle"></i> */}
      <button
        className="btn btn-primary btn-floating position-fixed d-flex justify-content-center align-items-center"
        style={{ bottom: "10%", fontSize: "40px !important" }}
        onClick={handleScheduleClick}
      >
        {/* Schedule Meeting */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="bi bi-plus-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      </button>

      {showModal && (
        <TakeMeetingDetails
          currmeeting={currmeeting}
          handleClose={handleCloseModal}
          handleSave={handleSaveModal}
          handleattendees={handleattendees}
          handledate={handledate}
          handletime={handletime}
          handletitle={handletitle}
          handleDescription={handleDescription}
        />
      )}
    </div>
  );
};

export default ScheduleMeetingButton;
