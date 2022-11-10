import UploadAppItems from './UploadAppItems'
const Row = (props) => {
  if (props.className === 'need-to-reach-out') {
    return (
      <tr className={props.className}>
        <td>{props.hit.company}</td>
        <td>{props.hit.position}</td>
        <td>{props.hit.contact}</td>
        <td>{props.hit.email}</td>
        <td>
          <button  type="button" className="btn btn-success" data-toggle="modal" data-target="#upload-app-items">
            Apply to Position
          </button>
        </td>
        <td>
          <button onClick={props.onDelete}>
            delete
          </button>
        </td>
        <td><UploadAppItems onUpdate={props.onUpdate}/></td>
        
      </tr>
    )
  } else if (props.onUpdate && props.updateButtonLabel) {
    return (
      <tr className={props.className}>
        <td>{props.hit.company}</td>
        <td>{props.hit.position}</td>
        <td>{props.hit.contact}</td>
        <td>{props.hit.email}</td>
        <td><button onClick={props.onUpdate}>{props.updateButtonLabel}</button></td>
        <td><button onClick={props.onDelete}>delete</button></td>
      </tr>
    )
  } else {
    return (
      <tr className={props.className}>
        <td>{props.hit.company}</td>
        <td>{props.hit.position}</td>
        <td>{props.hit.contact}</td>
        <td>{props.hit.email}</td>
        <td><button onClick={props.onDelete}>delete</button></td>
      </tr>
    )
  }
}

export default Row