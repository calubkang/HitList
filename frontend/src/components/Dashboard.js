import Row from './Row'

const Dashboard = ({ list, onClick }) => {
  return (
    <table>
      <tbody>
        <tr className='header-row'>
          <td>Company</td>
          <td>Position</td>
          <td>Contact</td>
          <td>Email</td>
        </tr>
        {list.map(item =>
          <Row key={item.id} item={item} onClick={onClick}/>
        )}
      </tbody>

    </table>
  )
}

export default Dashboard