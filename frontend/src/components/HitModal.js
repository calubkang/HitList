const HitModal = ({ hit }) => {
  let bsTarget = `#q${hit.id}`
  let id = `q${hit.id}`
  const email = 'no email'
  const jobDesc = hit.jobDescription.replace(/\n\n/g, "\n").replace(/\n/g, "\n-")

  return (
    <td>
      <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target={bsTarget}>
        <i className="fa-solid fa-arrow-up-right-from-square"></i>
      </button>


      <div className="modal modal-lg fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="exampleModalLabel">{hit.position}</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-8">
                  <h5>Job Description:</h5>
                  <div className="css-fix">{jobDesc}</div>
                </div>
                <div className="col">
                  <h5 className="">Company</h5>
                  <div>{hit.company}</div>
                  <h5 className="mt-4">Position</h5>
                  <div>{hit.position}</div>
                  <h5 className="mt-4">Contact</h5>
                  <div>{hit.contact}</div>
                  <div>{hit.email || email}</div>
                  <h5 className="mt-4">Resume</h5>
                  <h2><a href={hit.resume} target="_blank"><i className="fas fa-file"></i></a></h2>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </td>
  )
}

export default HitModal