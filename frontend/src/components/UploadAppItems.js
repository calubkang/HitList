const UploadAppItems = (props) => {
  return (
    <div className="modal fade" id="upload-app-items" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">Upload Files</h5>
            <button type="button" className="btn btn-close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form action="/upload" method="POST" encType="multipart/form-data" className="container col-10 mt-4">
              <div className="mb-3">
                <label htmlFor="file" className="form-label custom-file-label">Upload Resume for this Role</label>
                <input className="form-control custom-file-input" type="file" name="file" id="file"/>
              </div>
              
              <div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <input type="submit" value="Submit" className="btn btn-primary" ></input>
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