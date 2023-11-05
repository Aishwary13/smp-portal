import Navbar from "../../common/Navbar";
import { useAuth } from "../../../../context/AuthContext";
import React, { useState, useEffect } from "react";
import deleteIcon from "../../../../images/delete_icon.png";
import MenteeProfile from "./MenteeProfile";
import menteeList from "../../../../data/menteeList.json";

const MenteesList = () => {
  // Dummy data (replace with actual data fetching)
  const { userDetails } = useAuth();
  const [mentees, setMentees] = useState(menteeList);
  const [searchTerm, setSearchTerm] = useState("");
  const [menteeToDelete, setMenteeToDelete] = useState(null);
  const [selectedMentee, setSelectedMentee] = useState(null);

  // State for controlling the "Add Mentee" pop-up
  const [addMenteeModalVisible, setAddMenteeModalVisible] = useState(false);

  // State for mentee form fields
  const [menteeForm, setMenteeForm] = useState({
    name: "",
    id: "",
    department: "",
    email: "",
    mentorName: "",
    mentorEmail: "",
  });
  // Define the fixed widths for the header columns
  const headerColumnWidths = {
    name: "30%",
    id: "20%",
    department: "30%",
    actions: "20%",
  };

  const headerColumns = [
    { label: "Name", key: "name" },
    { label: "Roll Number", key: "id" },
    { label: "Department", key: "department" },
    { label: "Actions", key: "actions" },
  ];

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

  // Function to handle the form submission when adding a mentee
  const handleAddMentee = () => {
    // Form validation
    if (
      !menteeForm.name || // Check if name is empty
      !menteeForm.id || // Check if roll number is empty
      !menteeForm.department || // Check if department is empty
      !menteeForm.email || // Check if email is empty
      !menteeForm.mentorName || // Check if mentor name is empty
      !menteeForm.mentorEmail // Check if mentor email is empty
    ) {
      // You can display an error message or handle validation as needed
      console.error("Please fill in all required fields.");
      return;
    }

    // Add the mentee to the list
    setMentees([...mentees, menteeForm]);

    // Clear the form and close the modal
    setMenteeForm({
      name: "",
      id: "",
      department: "",
      email: "",
      mentorName: "",
      mentorEmail: "",
    });
    setAddMenteeModalVisible(false);
  };

  return (
    <div>
      <Navbar className="fixed-top" />
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
        <button
          className="btn btn-primary mx-2"
          onClick={() => setAddMenteeModalVisible(true)}
        >
          Add Mentee
        </button>
        <div
          className={`modal ${addMenteeModalVisible ? "show" : ""}`}
          tabIndex="-1"
          role="dialog"
          style={{ display: addMenteeModalVisible ? "block" : "none" }}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Mentee</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setAddMenteeModalVisible(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Mentee Form */}
                <form onSubmit={handleAddMentee}>
                  <div className="form-group">
                    <label>Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={menteeForm.name}
                      onChange={(e) =>
                        setMenteeForm({ ...menteeForm, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Roll Number *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={menteeForm.id}
                      onChange={(e) =>
                        setMenteeForm({ ...menteeForm, id: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={menteeForm.email}
                      onChange={(e) =>
                        setMenteeForm({ ...menteeForm, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Department *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={menteeForm.department}
                      onChange={(e) =>
                        setMenteeForm({
                          ...menteeForm,
                          department: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Mentor Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={menteeForm.mentorName}
                      onChange={(e) =>
                        setMenteeForm({
                          ...menteeForm,
                          mentorName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Mentor Email</label>
                    <input
                      type="text"
                      className="form-control"
                      value={menteeForm.mentorEmail}
                      onChange={(e) =>
                        setMenteeForm({
                          ...menteeForm,
                          mentorEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* Add other form fields (Roll Number, Department, Email, Mentor Name, Mentor Email) here */}

                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-primary mx-2">Upload CSV</button>
        <div className="table-container text-left">
          <div className="table-headers">
            <table className="table mt-4 mx-2" border="1">
              <thead>
                <tr>
                  {headerColumns.map((column) => (
                    <th
                      key={column.key}
                      style={{ width: headerColumnWidths[column.key] }}
                    >
                      {column.label}
                    </th>
                  ))}
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
                      // onClick={() => openMenteeProfile(mentee)}
                      style={{ cursor: "pointer" }}
                    >
                      <td
                        style={{
                          width: headerColumnWidths["name"],
                        }}
                      >
                        <button
                          className="btn btn-link"
                          onClick={() => openMenteeProfile(mentee)}
                        >
                          {mentee.name}
                        </button>
                      </td>
                      <td
                        style={{
                          width: headerColumnWidths["id"],
                        }}
                      >
                        {mentee.id}
                      </td>
                      <td
                        style={{
                          width: headerColumnWidths["department"],
                        }}
                      >
                        {mentee.department}
                      </td>
                      <td
                        style={{
                          width: headerColumnWidths["actions"],
                        }}
                      >
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