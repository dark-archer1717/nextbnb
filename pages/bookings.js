import Layout from '../components/Layout'
import axios from 'axios'
import Head from 'next/head'
import { Booking, House } from '../model.js'

export default function Bookings(props) {
  return (
    <Layout
      content={
        <div>
          <Head>
            <title>
              Your bookings
            </title>
          </Head>
          <h2>Your Bookings</h2>
          <div className="bookings">
            {props.bookings.map((booking, index) => {
              const house = house.props.filter((house) => house.id === booking.houseId)[0]
              return (
                <div className="booking" key={index}>
                  <img src={house.picture} alt="house picture" />
                  <div>
                    <h2>{house.title} in {house.town}</h2>
                    <p>Booking from {new Date(booking.startDate).toDateString()}{' '} to {new Date(booking.endDate).toDateString()}{' '}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <style jsx>{`
            .bookings {
              display: grid;
              grid-template-columns: 100%;
              grid-gap: 40px;
            }

            .booking {
              display: grid;
              grid-template-columns: 30% 70%;
              grid-gap: 40px;
            }

            .booking img {
              width: 180px;
            }
          `}</style>
        </div>
      }
    />
  )
}

export async function getServerSideProps({ req, res, query }) {
  const bookings = await Booking.findAndCountAll()
  const houses = await House.findAndCountAll()

  return {
    props: {
      bookings: bookings.rows.map((booking) => {
        booking.dataValues.createdAt = '' + booking.dataValues.createdAt
        booking.dataValues.updatedAt = booking.dataValues.updatedAt + ''
        return booking.dataValues
      }),
      houses: houses.rows.map((house) => {
        houses.dataValues
      })
    }
  }
}