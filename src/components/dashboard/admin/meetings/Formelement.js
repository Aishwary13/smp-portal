import React from 'react'

export default function Formelement({currmeeting, handletitle,handledate, handletime,handleattendees,handleDescription,formValid,handleBranch}) {

  const handleButtonClick = (e) => {
    e.stopPropagation();
  };

  const Departments = {
    "B-CSB": "CSB (B.Tech.)",
    "B-CSSS": "CSSS (B.Tech.)",
    "B-CSD": "CSD (B.Tech.)",
    "B-CSE": "CSE (B.Tech.)",
    "B-CSAI": "CSAI (B.Tech.)",
    "B-CSAM": "CSAM (B.Tech.)",
    "B-ECE": "ECE (B.Tech.)",
    "B-EVE": "EVE (B.Tech.)",
    "M-CSE": "CSE (M.Tech.)",
    "M-ECE": "ECE (M.Tech.)",
    "M-CB": "CB (M.Tech.)",
  };

  return (
    <div>
      <div className="modal-body">
        {formValid ? null : <div className="alert alert-danger">Please fill out all the details!</div>}
        <div className="form-group">
            <label htmlFor="meetingTitle">Title</label>
            <input type="text" value = {currmeeting.title} onChange={handletitle} className="form-control" id="meetingTitle" placeholder="Enter meeting title" />
        </div>
        <div className="form-group">
            <label htmlFor="meetingDate">Date</label>
            <input type="date" value = {currmeeting.date} onChange={handledate} min={new Date().toISOString().split('T')[0]} className="form-control" id="meetingDate" />
        </div>
        <div className="form-group mb-3">
            <label htmlFor="meetingTime">Time</label>
            <input type="time" value = {currmeeting.time} onChange = {handletime} min={new Date().toTimeString().slice(0, 5)} className="form-control" id="meetingTime" />
        </div>

        <div className="accordion mb-2" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button btn-sm collapsed" onClick = {handleButtonClick} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Attendees
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body" >
                <div className="form-check">
                  <input className="form-check-input" onChange = {handleattendees} checked = {currmeeting.attendee.includes('Mentors')} type="checkbox" value="Mentors" id="mentorCheck" />
                  <label className="form-check-label" htmlFor="mentorCheck">
                    Mentors
                  </label>
                </div>

                {currmeeting.attendee.includes('Mentors') && (
                  <div className="form-group">
                    <label>Mentor Branches</label>
                    <div>
                      {Object.entries(Departments).map(([key, label]) => (
                        <div key={key} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={key}
                            id={`${key}Check`}
                            checked={currmeeting.mentorBranches.includes(key)}
                            onChange={handleBranch}
                          />
                          <label className="form-check-label" htmlFor={`${key}Check`}>
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="form-check">
                  <input className="form-check-input" onChange={handleattendees} checked = {currmeeting.attendee.includes('Mentees')} type="checkbox" value="Mentees" id="menteeCheck" />
                  <label className="form-check-label" htmlFor="menteeCheck">
                    Mentees
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group">
            <label htmlFor="Description">Description</label>
            <textarea type="text" style={{height: "100px"}} value = {currmeeting.description} onChange = {handleDescription} className="form-control" id="meetDescription" placeholder="Enter meeting Details" />
        </div>

      </div>
    </div>
  )
}
