const UploadAppItems = ({resume, handleResumeChange, onSubmit}) => {
  return (
    <div className="modal fade" id="upload-app-items" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">Upload Files</h5>
            <button type="button" className="btn btn-close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit} className="container col-10 mt-4">
              <div className="form-floating mb-3">
                <input className="form-control" id='resume' placeholder=' ' value={resume} onChange={handleResumeChange} />
                <label htmlFor='resume'>Resume/CV Link</label>
              </div>
              
              <div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadAppItems