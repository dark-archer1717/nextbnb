/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from 'cookies';
import { useStoreActions } from 'easy-peasy';
import { useEffect } from 'react';
import houses from '../houses.js';
import House from '../components/House';
import Layout from '../components/Layout';
import { House as HouseModel } from '../model.js';

const content = (
  <div>
    <h2>Places to Stay</h2>

    <div className="houses">
      {houses.map((house, index) => {
        return <House key={index} {...house} />;
      })}
    </div>

    <style jsx>{`
      .houses {
        position: relative;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 300px 300px;
        grid-gap: 2%;
        height: 90vh;
        width: auto;
      }
    `}</style>
  </div>
);

export default function Home(nextbnb_session, houses) {
  const setLoggedIn = useStoreActions((actions) => actions.login.setLoggedIn);

  useEffect(() => {
    if (nextbnb_session) {
      setLoggedIn(true);
    }
  }, []);

  return <Layout content={content} />;
}

export async function getServerSideProps({ req, res, query }) {
  const cookies = new Cookies(req, res);
  const houses = await HouseModel.findAndCountAll();
  const nextbnb_session = cookies.get('nextbnb_session');

  return {
    props: {
      nextbnb_session: nextbnb_session || null,
      houses: houses.rows.map((house) => house.dataValues)
    }
  };
}
