import { useState, useEffect } from 'react'
import Row from './components/Row'
import NewItemForm from './components/NewItemForm'
import UploadAppItems from './components/UploadAppItems'
import RowHeader from './components/RowHeader'
import NavItem from './components/NavItem'
import listService from './services/list'
import loginService from './services/login'
import userService from './services/users'



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
  const [jobDescription, setJobDescription] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [spreadSheetView, setSpreadSheetView] = useState(false)

  // --------------------------------------------------
  // ON PAGE LOAD
  // --------------------------------------------------

  const hook = () => {
    listService.getAll()
      .then(hitList => setListItems(hitList))
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedHitListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      listService.setToken(user.token)
      hook()
    }
  }, [])

  // --------------------------------------------------
  // NAVIGATION
  // --------------------------------------------------

  const toggleSpreadSheet = () => {
    setSpreadSheetView(!spreadSheetView)
  }

  // --------------------------------------------------
  // FILTERING BY STATUS
  // --------------------------------------------------

  const firstList = listItems.filter(hit => !hit.reachedOut)
  const reachedList = listItems.filter(hit => hit.reachedOut && !hit.interviewScheduled && !hit.interviewFinished)
  const interviewList = listItems.filter(hit => hit.interviewScheduled && !hit.interviewFinished)
  const finishedList = listItems.filter(hit => hit.interviewFinished)

  // --------------------------------------------------
  // LOGIN/SIGNUP REQUESTS
  // --------------------------------------------------

  const handleSignUp = async (event) => {
    event.preventDefault()
    try {
      const user = await userService.createUser({ name, username, password })
      window.localStorage.setItem(
        'loggedHitListUser', JSON.stringify(user)
      )
      listService.setToken(user.token)
      setUser(user)
      setName('')
      setUsername('')
      setPassword('')
      hook()
    } catch {

    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedHitListUser', JSON.stringify(user)
      )
      listService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      hook()
    } catch {

    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedHitListUser')
    window.location.reload(false)
  }

  const loginForm = () => (
    <>
      <h1 className='container mt-3 text-center display-2'>HitList</h1>
      <div className="d-flex justify-content-center">
        <div className="card" style={{ width: 400 }}>
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <h3 className='mb-3'>Login</h3>
              <div className='input-group mb-3'>
                <input
                  placeholder='username'
                  type="text"
                  value={username}
                  name="Username"
                  onChange={({ target }) => setUsername(target.value)}
                />
              </div>
              <div className='input-group mb-3'>
                <input
                  placeholder='password'
                  type="password"
                  value={password}
                  name="Password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <div className='mb-3'>
                <button className='btn-primary btn mr-5' type="submit">login</button>
              </div>

            </form>
            <p>Don't have an Account? <span className='blue' data-bs-toggle="modal" data-bs-target="#signUpModal">Sign Up</span></p>
          </div>
        </div>
      </div>


      <div className="modal fade" id="signUpModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Sign Up</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSignUp}>
                <div className='input-group mb-3'>
                  <input
                    placeholder='name'
                    type="text"
                    value={name}
                    name="Name"
                    onChange={({ target }) => setName(target.value)}
                  />
                </div>
                <div className='input-group mb-3'>                  
                  <input
                    placeholder='username'
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                  />
                </div>
                <div className='input-group mb-3'>
                  <input
                  placeholder='password'
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary" onClick={handleCloseModalSignUp}>Save changes</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>

    </>
  )

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
    const updatedHit = { ...hit, resume: resume, reachedOut: !hit.reachedOut, jobDescription: jobDescription }
    listService.updateHit(hit, updatedHit)
      .then(updatedHit => {
        setListItems(listItems.map(hit => hit.id !== updatedHit.id ? hit : updatedHit))
      });
    setResume('')
    setJobDescription('')
    return false
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
  const handleJobDescriptionChange = (event) => {
    setJobDescription(event.target.value)
  }
  function handleCloseModalFileUpload() {
    document.getElementById("upload-app-items").classList.remove("show", "d-block");
    document.querySelectorAll(".modal-backdrop")
      .forEach(el => el.classList.remove("modal-backdrop"));
  }
  function handleCloseModalNewEntry() {
    document.getElementById("new-entry").classList.remove("show", "d-block");
    document.querySelectorAll(".modal-backdrop")
      .forEach(el => el.classList.remove("modal-backdrop"));
  }
  function handleCloseModalSignUp() {
    document.getElementById("signUpModal").classList.remove("show", "d-block");
    document.querySelectorAll(".modal-backdrop")
      .forEach(el => el.classList.remove("modal-backdrop"));
  }

  // --------------------------------------------------
  // APP LAYOUT
  // --------------------------------------------------

  const accordionLayout = () => (
    <>
      <ul className="nav justify-content-end">
        <NavItem
          link='link'
          onClick={toggleSpreadSheet}
          text='Spread Sheet View'
        />
        <NavItem
          link='link'
          onClick={handleLogout}
          text='Log Out'
        />
        <NavItem 
          style={{ color: "black" }}
          text={'Hello ' + user.name}
        />
      </ul>
      <h1 className='container mt-2 text-center display-2'>HitList</h1>
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
        handleCloseModal={handleCloseModalNewEntry}
      />
      <div className="accordion mt-4" id="accordionExample">
        {/* NEED TO APPLY */}
        <div className="accordion-item">
          {/* Header */}
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Need to Apply <span class="badge text-bg-secondary m-2">{firstList.length}</span>
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
        {/* WAITING TO HEAR BACK */}
        <div className="accordion-item">
          {/* Header */}
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Waiting to hear back <span class="badge text-bg-secondary m-2">{reachedList.length}</span>
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
              Interview Prep <span class="badge text-bg-secondary m-2">{interviewList.length}</span>
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
              Waiting for Final Decision <span class="badge text-bg-secondary m-2">{finishedList.length}</span>
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
    </>
  )

  // --------------------------------------------------
  // SPREADSHEET LAYOUT
  // --------------------------------------------------

  const spreadSheetLayout = () => (
    <>
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <span className="nav-link active link" aria-current="page" onClick={toggleSpreadSheet}>Home</span>
        </li>
      </ul>
      <table className="table">
        <thead>
          <tr>

            <th scope="col">Company</th>
            <th scope="col">Position</th>
            <th scope="col">Contact</th>
            <th scope="col">Contact Email</th>
            <th scope="col">Resume</th>
            <th scope="col">Job Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {firstList.map(hit => (
            <tr className='firstList'>
              <td>{hit.company}</td>
              <td>{hit.position}</td>
              <td>{hit.contact}</td>
              <td>{hit.email}</td>
              <td className='text-center'><i className="fa-regular fa-file"></i></td>
              <td className='text-center'><i className="fa-regular fa-file"></i></td>
              <td>
                <td className='text-center'>
                  <button type="button" className="btn btn-success" data-toggle="modal" data-target="#upload-app-items">
                    Apply to Position
                  </button>
                </td>
                <UploadAppItems
                  onSubmit={addResume(hit)}
                  handleResumeChange={handleResumeChange}
                  resume={resume}
                  handleJobDescriptionChange={handleJobDescriptionChange}
                  jobDescription={jobDescription}
                  handleCloseModal={handleCloseModalFileUpload}
                /></td>
            </tr>
          ))}
          {reachedList.map(hit => {
            let bsTarget = `#q${hit.id}`
            let id = `q${hit.id}`
            return (
              <tr className='reachedList'>
                <td>{hit.company}</td>
                <td>{hit.position}</td>
                <td>{hit.contact}</td>
                <td>{hit.email}</td>
                <td className='text-center'>
                  <a href={hit.resume} rel="noreferrer" target="_blank"><i className="fas fa-file"></i></a>
                </td>
                <td className='text-center'>
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={bsTarget}>
                    view
                  </button>
                  <div class="modal modal-lg fade" id={id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">Job Description</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body css-fix">
                          {hit.jobDescription.replace(/\n\n/g, "\n").replace(/\n/g, "\n-")}
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td><button onClick={() => toggleInterview(hit)} className="btn btn-primary">Got and Interview!</button></td>
              </tr>
            )
          })}
          {interviewList.map(hit => {
            let bsTarget = `#q${hit.id}`
            let id = `q${hit.id}`
            return (
              <tr className='interviewList'>
                <td>{hit.company}</td>
                <td>{hit.position}</td>
                <td>{hit.contact}</td>
                <td>{hit.email}</td>
                <td className='text-center'>
                  <a href={hit.resume} rel="noreferrer" target="_blank"><i className="fas fa-file"></i></a>
                </td>
                <td className='text-center'>
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={bsTarget}>
                    view
                  </button>
                  <div class="modal modal-lg fade" id={id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">Job Description</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body css-fix">
                          {hit.jobDescription.replace(/\n\n/g, "\n").replace(/\n/g, "\n-")}
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td><button onClick={() => finishInterview(hit)} className="btn btn-primary">Finished Interviews!</button></td>
              </tr>
            )
          })}
          {finishedList.map(hit => {
            let bsTarget = `#q${hit.id}`
            let id = `q${hit.id}`
            return (
              <tr className='finishedList'>
                <td>{hit.company}</td>
                <td>{hit.position}</td>
                <td>{hit.contact}</td>
                <td>{hit.email}</td>
                <td className='text-center'>
                  <a href={hit.resume} rel="noreferrer" target="_blank"><i className="fas fa-file"></i></a>
                </td>
                <td className='text-center'>
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={bsTarget}>
                    view
                  </button>
                  <div class="modal modal-lg fade" id={id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">Job Description</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body css-fix">
                          {hit.jobDescription.replace(/\n\n/g, "\n").replace(/\n/g, "\n-")}
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#gotTheJob">
                  GOT THE JOB
                </button>

                  <div class="modal fade" id="gotTheJob" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">Congratulations</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          You did it. You got the job. Don't mess this up.
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div></td>
              </tr>
            )
          })}
        </tbody>
      </table>
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
        handleCloseModal={handleCloseModalNewEntry}
      />
    </>
  )

  // --------------------------------------------------
  // APP 
  // --------------------------------------------------

  return (
    <div className="container">


      {user === null ?
        loginForm() :
        spreadSheetView ? spreadSheetLayout() : accordionLayout()
      }

    </div>
  );
}

export default App;
