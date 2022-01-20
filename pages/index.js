import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
// houses data
import houses from '../houses';
import House from '../components/House';
import Layout from '../components/Layout';

const content = (
  <div>
    <h2 className="headline">Places to Stay, Feeling of Home</h2>
    <div className="houses">
      {houses.map((house, index) => {
        return <House key={index} {...house} />;
      })}
    </div>

    <style jsx>{`
      .houses {
        display: grid;
        grid-template-columns: 49% 49%;
        grid-template-rows: 300px 300px;
        grid-gap: 2%;
      }
      .headline {
        background-color: #061d33ba;
        padding: 1.5rem;
        border-radius: 0.76rem;
        text-align: center;
        font-size: 2rem;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.4);
        color: #d4cae2d1;
      }
    `}</style>
  </div>
);

export default function Home() {
  return <Layout content={content} />;
}
