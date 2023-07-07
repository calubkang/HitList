import Row from "./Row"
import RowHeader from "./RowHeader"

const AccordionSection = ({ id, list, text, onDelete, updateButtonLabel, onUpdate, rowClass, onSubmit, resume, handleResumeChange, jobDescription, handleJobDescriptionChange, handleCloseModalFileUpload }) => {
  return (
    <div className="accordion-item">
      {/* Header */}
      <h2 className="accordion-header" id={id}>
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={'collapse' + id} aria-expanded="true" aria-controls="collapseOne">
          {text} <span className="badge text-bg-secondary m-2">{list.length}</span>
        </button>
      </h2>
      <div id={'collapse' + id} className="accordion-collapse collapse show" aria-labelledby={id} data-bs-parent="#accordionExample">
        <div className="accordion-body">
          <table className='container'>
            <tbody>
              <RowHeader />
              {list.map(hit =>
                <Row
                  key={hit.id}
                  hit={hit}
                  onDelete={()=>onDelete(hit)}
                  updateButtonLabel={updateButtonLabel}
                  onUpdate={() => onUpdate(hit)}
                  className={rowClass}
                  onSubmit={onSubmit(hit)}
                  resume={resume}
                  handleResumeChange={handleResumeChange}
                  jobDescription={jobDescription}
                  handleJobDescriptionChange={handleJobDescriptionChange}
                  handleCloseModal={handleCloseModalFileUpload}
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AccordionSection