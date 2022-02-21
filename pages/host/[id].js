import axios from 'axios'
import Layout from '../../components/Layout'

const EditHouse = props => {
  return <Layout content={<div>{props.house.title}</div>} />
}

EditHouse.getInitialProps = async ({ query }) => {
  const { id } = query
  const response = await axios.get(`http://localhost:3000/api/houses/${id}`)

  return {
    house: response.data
  }
}

export default EditHouse