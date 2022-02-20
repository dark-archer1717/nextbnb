import { Booking } from '../../model.js'

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end() //Method Not Allowed
    return
  }
  Booking.destroy({
    where: {
      paid: false
    }
  })

  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  res.end(
    JSON.stringify({
      status: 'success',
      message: 'ok'
    })
  )

  server.get('/api/host/list', async (req, res) => {
    if (!req.session.passport || !req.session.passport.user) {
      res.writeHead(403, {
        'Content-Type': 'application/json',
      })
      res.end(
        JSON.stringify({
          status: 'error',
          message: 'Unauthorized',
        })
      )

      return
    }

    const userEmail = req.session.passport.user
    const user = await User.findOne({ where: { email: userEmail } })

    const houses = await House.findAll({
      where: {
        host: user.id,
      },
    })
    const houseIds = houses.map((house) => house.dataValues.id)

    const bookingsData = await Booking.findAll({
      where: {
        paid: true,
        houseId: {
          [Op.in]: houseIds,
        },
        endDate: {
          [Op.gte]: new Date(),
        },
      },
      order: [['startDate', 'ASC']],
    })

    const bookings = await Promise.all(
      bookingsData.map(async (booking) => {
        return {
          booking: booking.dataValues,
          house: houses.filter(
            (house) => house.dataValues.id === booking.dataValues.houseId
          )[0].dataValues
        }
      })
    )

    res.writeHead(200, {
      'Content-Type': 'application/json',
    })
    res.end(
      JSON.stringify({
        bookings,
        houses,
      })
    )
  })
}