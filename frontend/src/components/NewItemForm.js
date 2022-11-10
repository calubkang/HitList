const NewItemForm = ({ onSubmit, newCompName, handleCompChange, newPos, handlePosChange, newContactName, handleContactChange, newEmail, handleEmailChange, hook }) => {
  return (
    <div>
      <div className="d-grid justify-content-end">
        <button type="button" className="btn btn-primary mt-5" data-toggle="modal" data-target="#new-entry">
          New Entry
        </button>
      </div>

      <div className="modal fade" id="new-entry" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">New Entry</h5>
              <button type="button" className="btn btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit} className="container col-10 mt-4">
                <div className="form-floating mb-3">
                  <input className="form-control" id='company' placeholder=' ' value={newCompName} onChange={handleCompChange} />
                  <label htmlFor='company' >Company</label>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" id='position' placeholder=' ' value={newPos} onChange={handlePosChange} />
                  <label htmlFor='position' className="form-label">Position</label>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" id='contact' placeholder=' ' value={newContactName} onChange={handleContactChange} />
                  <label htmlFor='contact' className="form-label">Contact</label>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" id='email' placeholder=' ' value={newEmail} onChange={handleEmailChange} />
                  <label htmlFor='email' className="form-label">Email</label>
                </div>
                <div>
                  <div onClick={hook} className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" onClick={hook}>Save changes</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewItemForm
