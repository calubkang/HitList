import UploadAppItems from './UploadAppItems'
import HitModal from './HitModal'

const Row = (props) => {
  if (props.className === 'need-to-reach-out') {
    return (
      <tr className={props.className}>
        <HitModal hit={props.hit} />
        <td>{props.hit.company}</td>
        <td>{props.hit.position}</td>
        {/* <td>{props.hit.contact}</td>
        <td>{props.hit.email}</td> */}
        <td className='text-center'><i className="fa-regular fa-file"></i></td>
        <td className='text-center'>
          <button type="button" className="btn btn-success" data-toggle="modal" data-target="#upload-app-items">
            Apply to Position
          </button>
        </td>
        <td>
          <button onClick={props.onDelete} className="btn btn-close" aria-label="Close" />
        </td>
        <td>
          <UploadAppItems
            onSubmit={props.onSubmit}
            handleResumeChange={props.handleResumeChange}
            resume={props.resume}
            handleJobDescriptionChange={props.handleJobDescriptionChange}
            jobDescription={props.jobDescription}
            handleCloseModal={props.handleCloseModal}
          />
        </td>
      </tr>
    )
  } else if (props.onUpdate && props.updateButtonLabel) {
    return (
      <tr className={props.className}>
        <HitModal hit={props.hit} />
        <td>{props.hit.company}</td>
        <td>{props.hit.position}</td>
        {/* <td>{props.hit.contact}</td>
        <td>{props.hit.email}</td> */}
        <td className='text-center'><a href={props.hit.resume} rel="noreferrer" target="_blank"><i className="fas fa-file"></i></a></td>
        <td className='text-center'><button onClick={props.onUpdate} className="btn btn-primary">{props.updateButtonLabel}</button></td>
        <td><button onClick={props.onDelete} className="btn btn-close"
          aria-label="Close" /></td>
      </tr>
    )
  } else {
    return (
      <tr className={props.className}>
        <HitModal hit={props.hit} />
        <td>{props.hit.company}</td>
        <td>{props.hit.position}</td>
        {/* <td>{props.hit.contact}</td>
        <td>{props.hit.email}</td> */}
        <td className='text-center'><a href={props.hit.resume} rel="noreferrer" target="_blank"><i className="fas fa-file"></i></a></td>
        <td></td>
        <td><button onClick={props.onDelete} className="btn btn-close"
          aria-label="Close" /></td>
      </tr>
    )
  }
}

export default Row