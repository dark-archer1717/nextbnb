import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'

const Host = (props) => {
  return (
    <Layout
      content={
        <div>
          <Head>
            <title>Your houses</title>
          </Head>
          <div className='container'>
            <div className='houses'>
              <h2>Your houses</h2>

              <div className='list'>
                {props.houses.map((house, index) => {
                  return (
                    <div className='house' key={index}>
                      <img src={house.picture} alt='House picture' />
                      <div>
                        <h2>
                          {house.title} in {house.town}
                        </h2>
                        <p>
                          <Link href={`/houses/${house.id}`}>
                            <a>View house page</a>
                          </Link>
                        </p>
                        <p>
                          <Link href={`/host/${house.id}`}>
                            <a>Edit house details</a>
                          </Link>
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='bookings'>
              <h2>Your bookings</h2>

              <div className='list'>
                {props.bookings.map((booking, index) => {
                  return (
                    <div className='booking' key={index}>
                      <div>
                        <h2>
                          {booking.house.title} in {booking.house.town}
                        </h2>
                        <p>
                          Booked from{' '}
                          {new Date(booking.booking.startDate).toDateString()}{' '}
                          to {new Date(booking.booking.endDate).toDateString()}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <style jsx>{`
            .container {
              display: grid;
              grid-template-columns: 60% 40%;
              grid-gap: 50px;
            }

            .list {
              display: grid;
              grid-template-columns: 100%;
              grid-gap: 40px;
              margin-top: 60px;
            }

            .house {
              display: grid;
              grid-template-columns: 30% 70%;
              grid-gap: 40px;
            }

            .house img {
              width: 100px;
            }
          `}</style>
        </div>
      }
    />
  )
}

Host.getInitialProps = async (ctx) => {
  const response = await axios({
    method: 'get',
    url: 'http://localhost:3000/api/host/list',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
  })

  return {
    houses: response.data.houses,
    bookings: response.data.bookings,
  }
}

export default Host