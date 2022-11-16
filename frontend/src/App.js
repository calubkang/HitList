import { useState, useEffect } from 'react'
import listService from './services/list'
import Row from './components/Row'
import NewItemForm from './components/NewItemForm'
import RowHeader from './components/RowHeader'
import loginService from './services/login'



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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
  // LOGIN REQUESTS
  // --------------------------------------------------

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      
    }
  }

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
    if (window.confirm('Delete Position?')) {
      listService.deleteHit(hit)
        .then(deletedHit => {
          setListItems(listItems.filter(hit => hit.id !== deletedHit.id))
        })
    }
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

  const addResume = (hit) => (e) => {
    e.preventDefault()
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

      <form onSubmit={handleLogin}>
        <div>
          username: 
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password: 
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>

      <div className="accordion" id="accordionExample">
        {/* NEED TO APPLY */}
        <div className="accordion-item">
          {/* Header */}
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Need to Apply ({firstList.length})
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <table className='container'>
                <tbody>
                  <RowHeader />
                  {firstList.map(hit =>
                    <Row
                      key={hit.id}
                      hit={hit}
                      onDelete={() => deleteHit(hit)}
                      updateButtonLabel='Reached Out!'
                      onUpdate={() => toggleReach(hit)}
                      className='need-to-reach-out'
                      onSubmit={addResume(hit)}
                      resume={resume}
                      handleResumeChange={handleResumeChange}
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* WAITING TO HEAR BACK */}
        <div className="accordion-item">
          {/* Header */}
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Waiting to hear back ({reachedList.length})
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <table className='container'>
                <tbody>
                  <RowHeader />
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
        {/* INTERVIEW PREP */}
        <div className="accordion-item">
          {/* Header */}
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Interview Prep ({interviewList.length})
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <table className='container'>
                <tbody>
                  <RowHeader />
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
        {/* WAITING FOR FINAL DECISION */}
        <div className="accordion-item">
          {/* Header */}
          <h2 className="accordion-header" id="headingFour">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
              Waiting for Final Decision ({finishedList.length})
            </button>
          </h2>
          <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <table className='container'>
                <tbody>
                  <RowHeader />
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
