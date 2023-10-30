import Navbar from "../../common/Navbar";
import { useAuth } from "../../../../context/AuthContext";
import React, { useState } from "react";
import deleteIcon from "../../../../images/delete_icon.png";
import MenteeProfile from "./MenteeProfile";

const MenteesList = () => {
  // Dummy data (replace with actual data fetching)
  const { userDetails } = useAuth();
  const dummyMenteesData = [
    { id: 1, name: "Mentee 1", email: "mentee1@example.com" },
    { id: 2, name: "Mentee 2", email: "mentee2@example.com" },
    { id: 3, name: "Mentee 3", email: "mentee3@example.com" },
    { id: 4, name: "Mentee 4", email: "mentee4@example.com" },
    { id: 5, name: "Mentee 5", email: "mentee5@example.com" },

    // Add more mentees as needed
  ];

  const [mentees, setMentees] = useState(dummyMenteesData); // Initialize with dummy data
  const [searchTerm, setSearchTerm] = useState("");
  const [menteeToDelete, setMenteeToDelete] = useState(null);
  const [selectedMentee, setSelectedMentee] = useState(null);

  const openMenteeProfile = (mentee) => {
    setSelectedMentee(mentee);
  };

  const closeMenteeProfile = () => {
    setSelectedMentee(null);
  };

  // Function to handle deletion confirmation
  const handleDeleteConfirmation = (mentee) => {
    setMenteeToDelete(mentee);
  };

  // Function to delete a mentee
  const handleDeleteMentee = () => {
    if (menteeToDelete) {
      // Perform mentee deletion logic (API call or other)
      // Update the mentees list after successful deletion
      setMentees((prevMentees) =>
        prevMentees.filter((mentee) => mentee.id !== menteeToDelete.id)
      );
      setMenteeToDelete(null); // Clear the mentee to delete
    }
  };

  // Function to cancel the mentee deletion
  const handleCancelDelete = () => {
    setMenteeToDelete(null); // Clear the mentee to delete
  };

  const editMenteeProfile = () => {
    console.log(`Edit Clicked for ${selectedMentee.name}`);
  };

  return (
    <div>
      <Navbar userDetails={userDetails} />
      <div className="container">
        <div className="text-center my-3">
          <h4>Mentees List</h4>
        </div>
        <div className="input-group my-3">
          <input
            type="text"
            className="form-control mx-2"
            placeholder="Search Mentees"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="input-group-append mx-2">
            <button className="btn btn-outline-secondary" type="button">
              Search
            </button>
          </div>
        </div>
        <button className="btn btn-primary mx-2">Add Mentee</button>
        <button className="btn btn-primary mx-2">Upload CSV</button>
        <div className="table-container">
          <div className="table-headers">
            <table className="table mt-4 mx-2" border="1">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
            </table>
          </div>
          <div
            className="table-body"
            style={{ maxHeight: "250px", overflowY: "scroll" }}
          >
            <table className="table table-hover mb-4 mx-2" border="1">
              <tbody>
                {mentees
                  .filter((mentee) =>
                    mentee.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((mentee) => (
                    <tr
                      className=""
                      key={mentee.id}
                      onClick={() => openMenteeProfile(mentee)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>
                        {/* <button
                          className="btn btn-link"
                          onClick={() => openMenteeProfile(mentee)}
                        > */}
                        {mentee.name}
                        {/* </button> */}
                      </td>
                      <td>{mentee.email}</td>
                      <td>
                        <button
                          className="btn btn-sm"
                          onClick={() => handleDeleteConfirmation(mentee)}
                        >
                          <img
                            src={deleteIcon}
                            alt="Delete"
                            style={{ width: "20px", height: "20px" }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* Mentee Profile Popup */}
            {selectedMentee && (
              <div
                className="modal fade show"
                style={{ display: "block" }}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="menteeProfilePopup"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <MenteeProfile
                    mentee={selectedMentee}
                    onClose={closeMenteeProfile}
                    onEdit={editMenteeProfile}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="modal"
          style={{ display: menteeToDelete ? "block" : "none" }}
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
                {menteeToDelete ? menteeToDelete.name : ""}?
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
                  onClick={handleDeleteMentee}
                  data-dismiss="modal"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteesList;
