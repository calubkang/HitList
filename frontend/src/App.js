import { useState, useEffect } from 'react'
import FileBase64 from 'react-file-base64'
import listService from './services/list'
import Row from './components/Row'
import NewItemForm from './components/NewItemForm'



function App() {

  // --------------------------------------------------
  // STATE HOOKS
  // --------------------------------------------------

  const [listItems, setListItems] = useState([])
  const [newCompName, setCompName] = useState('')
  const [newPos, setPos] = useState('')
  const [newContactName, setContactName] = useState('')
  const [newEmail, setEmail] = useState('')
  const [resume, setResume] = useState('')

  // --------------------------------------------------
  // ON PAGE LOAD
  // --------------------------------------------------

  const hook = () => {
    listService.getAll()
      .then(hitList => setListItems(hitList))
  }

  useEffect(hook, [])


  // --------------------------------------------------
  // FILTERING BY STATUS
  // --------------------------------------------------

  const firstList = listItems.filter(hit => !hit.reachedOut)
  const reachedList = listItems.filter(hit => hit.reachedOut && !hit.interviewScheduled && !hit.interviewFinished)
  const interviewList = listItems.filter(hit => hit.interviewScheduled && !hit.interviewFinished)
  const finishedList = listItems.filter(hit => hit.interviewFinished)

  // --------------------------------------------------
  // AXIOS REQUESTS
  // --------------------------------------------------

  const resetForm = () => {
    setCompName('')
    setPos('')
    setContactName('')
    setEmail('')
  }

  const addHit = (event) => {
    event.preventDefault()
    const newHit = {
      company: newCompName,
      position: newPos,
      contact: newContactName,
      email: newEmail,
      reachedOut: false,
      interviewScheduled: false,
      interviewFinished: false,
    }
    listService.createHit(newHit)
      .then(newItem => {
        setListItems(listItems.concat(newItem))
        resetForm()
      })
  }

  const deleteHit = (hit) => {
    listService.deleteHit(hit)
      .then(deletedHit => {
        setListItems(listItems.filter(hit => hit.id !== deletedHit.id))
      })
  }

  const toggleReach = (hit) => {
    const updatedHit = { ...hit, reachedOut: !hit.reachedOut }
    listService.updateHit(hit, updatedHit)
      .then(updatedHit => {
        setListItems(listItems.map(hit => hit.id !== updatedHit.id ? hit : updatedHit))
      })
  }

  const toggleInterview = (hit) => {
    const updatedHit = { ...hit, interviewScheduled: !hit.interviewScheduled }
    listService.updateHit(hit, updatedHit)
      .then(updatedHit => {
        setListItems(listItems.map(hit => hit.id !== updatedHit.id ? hit : updatedHit))
      })
  }

  const finishInterview = (hit) => {
    const updatedHit = { ...hit, interviewFinished: !hit.interviewFinished }
    listService.updateHit(hit, updatedHit)
      .then(updatedHit => {
        setListItems(listItems.map(hit => hit.id !== updatedHit.id ? hit : updatedHit))
      })
  }

  const addResume = (hit) => {
    const updatedHit = { ...hit, resume: resume, reachedOut: !hit.reachedOut }
    listService.updateHit(hit, updatedHit)
      .then(updatedHit => {
        setListItems(listItems.map(hit => hit.id !== updatedHit.id ? hit : updatedHit))
      })
  }

  // --------------------------------------------------
  // FORM HANDLERS
  // --------------------------------------------------

  const handleCompChange = (event) => {
    setCompName(event.target.value)
  }
  const handlePosChange = (event) => {
    setPos(event.target.value)
  }
  const handleContactChange = (event) => {
    setContactName(event.target.value)
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const handleResumeChange = (event) => {
    setResume(event.target.value)
  }

  // --------------------------------------------------
  // APP LAYOUT
  // --------------------------------------------------

  return (
    <div className="container">

      <h1 className='container mt-3 text-center display-2'>HitList</h1>

      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Need to Apply
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <table className='container'>
                <tbody>
                  <tr className='header-row'>
                    <td>Company</td>
                    <td>Position</td>
                    <td>Contact</td>
                    <td>Email</td>
                    <td>Resume</td>
                    <td>Actions</td>
                  </tr>
                  {firstList.map(hit =>
                    <Row
                      key={hit.id}
                      hit={hit}
                      onDelete={() => deleteHit(hit)}
                      updateButtonLabel='Reached Out!'
                      onUpdate={() => toggleReach(hit)}
                      className='need-to-reach-out'
                      onSubmit={() => addResume(hit)}
                      resume={resume}
                      handleResumeChange={handleResumeChange}
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Waiting to hear back
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <table className='container'>
                <tbody>
                  <tr className='header-row'>
                    <td>Company</td>
                    <td>Position</td>
                    <td>Contact</td>
                    <td>Email</td>
                    <td>Resume</td>
                    <td>Actions</td>
                  </tr>
                  {reachedList.map(hit =>
                    <Row
                      key={hit.id}
                      hit={hit}
                      onDelete={() => deleteHit(hit)}
                      updateButtonLabel='Got an interview!'
                      onUpdate={() => toggleInterview(hit)}
                      className='reached-out'
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Interview Prep
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <table className='container'>
                <tbody>
                  <tr className='header-row'>
                    <td>Company</td>
                    <td>Position</td>
                    <td>Contact</td>
                    <td>Email</td>
                    <td>Resume</td>
                    <td>Actions</td>
                  </tr>
                  {interviewList.map(hit =>
                    <Row
                      key={hit.id}
                      hit={hit}
                      onDelete={() => deleteHit(hit)}
                      updateButtonLabel='Finished interviews!'
                      onUpdate={() => finishInterview(hit)}
                      className='landed-interview'
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
              Waiting for Final Decision
            </button>
          </h2>
          <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <table className='container'>
                <tbody>
                  <tr className='header-row'>
                    <td>Company</td>
                    <td>Position</td>
                    <td>Contact</td>
                    <td>Email</td>
                    <td>Resume</td>
                    <td>Actions</td>
                  </tr>
                  {finishedList.map(hit =>
                    <Row
                      key={hit.id}
                      hit={hit}
                      onDelete={() => deleteHit(hit)}
                      className='finished-interview'
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <NewItemForm
        onSubmit={addHit}
        newCompName={newCompName}
        handleCompChange={handleCompChange}
        newPos={newPos}
        handlePosChange={handlePosChange}
        newContactName={newContactName}
        handleContactChange={handleContactChange}
        newEmail={newEmail}
        handleEmailChange={handleEmailChange}
      />


    </div>
  );
}

export default App;
