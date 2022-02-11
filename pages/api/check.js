import axios from 'axios';
import { Sequelize } from 'sequelize';
import { Booking } from '../../model';

const canBookThoseDates = async (houseId, startDate, endDate) => {
  const results = await Booking.findAll({
    where: {
      houseId: houseId,
      startDate: {
        [Sequelize.Op.lte]: new Date(endDate)
      },
      endDate: {
        [Sequelize.Op.gte]: new Date(startDate)
      }
    }
  });
  return !(results.length > 0);
};

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end(); //Method Not Allowed
    return;
  }

  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const houseId = req.body.houseId;

  let message = 'free';
  if (!(await canBookThoseDates(houseId, startDate, endDate))) {
    message: busy;
  }
  res.json({
    status: success,
    message: message
  });

  const canReserve = async (houseId, startDate, endDate) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/houses/check',
        { houseId, startDate, endDate }
      );
      if (response.data.status === 'error') {
        alert(response.data.message);
        return;
      }

      if (response.data.message === 'busy') return false;
      return true;
    } catch (error) {
      console.error(error);
      return;
    }
  };
};
