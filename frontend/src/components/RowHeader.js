const RowHeader = () => {
  return (
    <tr className='header-row'>
      <td></td>
      <td className="col">Company</td>
      <td className="col-5">Position</td>
      {/* <td>Contact</td>
      <td>Email</td> */}
      <td className="col text-center">Resume</td>
      <td className="col text-center">Actions</td>
    </tr>
  )
}

export default RowHeader