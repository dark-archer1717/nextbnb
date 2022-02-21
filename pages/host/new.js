import { useState } from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';

const NewHouse = () => {
  const [title, setTitle] = useState('');
  const [town, setTown] = useState('');
  const [price, setPrice] = useState('');
  const [picture, setpicture] = useState('');
  const [description, setDescription] = useState('');
  const [guests, setGuests] = useState(0);
  const [bedrooms, setBedrooms] = useState();
  const [bed, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [wifi, setWifi] = useState(false);
  const [kitchen, setKitchen] = useState(false);
  const [heating, setHeating] = useState(false);
  const [freeParking, setFreeParking] = useState(false);
  const [entirePlace, setEntirePlace] = useState(false);
  const [type, setType] = useState('Entire house');

  const houseType = ['Entire house', 'Room'];

  return (
    <Layout
      content={
        <div>
          <Head>
            <title>Add a new house</title>
          </Head>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              try {
                const response = await axios.post('/api/host/new', {
                  house: {
                    title,
                    town,
                    price,
                    picture,
                    description,
                    guests,
                    bedrooms,
                    bed,
                    baths,
                    wifi,
                    kitchen,
                    heating,
                    freeParking,
                    entirePlace,
                    type
                  }
                });
                if (response.data.status === 'error') {
                  alert(response.data.message);
                  return;
                }

                console.log(response);
                goto('/host');
              } catch (error) {
                alert(error.response.data.message);
                return;
              }
            }}
          >
            <input
              id="title"
              type="text"
              placeholder="House title"
              onChange={(event) => setTitle(event.target.value)}
            />
            <button>Add house</button>
          </form>

          <style jsx>{``}</style>
        </div>
      }
    />
  );
};

export default NewHouse;
