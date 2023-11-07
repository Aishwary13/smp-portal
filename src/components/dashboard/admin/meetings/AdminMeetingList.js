import React, { useState } from "react";
import Navbar from "../../common/Navbar";
import axios from 'axios'; // Import Axios
import { useAuth } from "../../../../context/AuthContext";
import SinlgeMeeting from "./SinlgeMeeting";
import ScheduleMeetingButton from "./ScheduleMeetingButton";

export default function AdminMeetingList() {
  const { userDetails } = useAuth();
  const [meetings, setmeetings] = useState([]);

  const deleteMeeting = (meetingId) => {
    // Send a request to delete the meeting on the backend
    axios
      .put("http://127.0.0.1:8000/editMeetings/", meetingId)
      .then((response) => {
        // If the backend successfully deletes the meeting, update your local state
        if (response.status === 200) {
          setmeetings((prevMeetings) =>
            prevMeetings.filter((meet) => meet.id !== meetingId)
          );
        }
      })
      .catch((error) => {
        console.error("Error deleting meeting:", error);
      });
  };
  const updateMeetingOnBackend = async (meeting) => {
    try {
      // Replace 'your_api_endpoint' with the actual endpoint where you want to update the meeting on the backend.
      await axios
        .put("http://127.0.0.1:8000/editMeetingById/", meeting)
        .then((response) => {
          // If the backend successfully updates the meeting, update your local state
          if (response.status === 200) {
            setmeetings(meeting);
            console.log("Meeting updated successfully on the backend");
          }
        });
    } catch (error) {
      console.error("Error updating meeting on the backend:", error);
      // Handle errors or display an error message to the user.
    }
  };

  const editMeeting = (meetingId, newValues) => {
    const updatedMeetings = meetings.map((meet) =>
      meet.id === meetingId ? { ...meet, ...newValues } : meet
    );
    updateMeetingOnBackend(updatedMeetings);
  };

  return (
    <div>
      <Navbar className="fixed-top" />
      <div className="container mt-4 text-center mb-4">
        <h1 className="font-weight-bold mb-4">Meeting Schedule</h1>
      </div>

      <div
        style={{
          display: "flex",
          height: "70vh",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div
          className="container"
          style={{
            marginLeft: "5px",
            marginRight: "0",
            width: "85%",
            overflowY: "auto",
          }}
        >
          {meetings.map((meet) => (
            <SinlgeMeeting
              userDetails={userDetails}
              meet={meet}
              key={meet.id}
              ondelete={deleteMeeting}
              editMeeting={editMeeting}
            />
          ))}
        </div>

        <div
          style={{
            position: "relative",
            width: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <ScheduleMeetingButton
            setmeetings={setmeetings}
            userDetails={userDetails}
          />
        </div>

        {/* <div style={{ position: 'fixed', bottom: '20px', right: '20px', border: '2px solid blue' }}>
          <ScheduleMeetingButton setmeetings = {setmeetings} ></ScheduleMeetingButton>
        </div> */}
      </div>
    </div>
  );
}
