import { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'

const HouseForm = (props) => {
  const id = (props.house && props.house.id) || null

  const [title, setTitle] = useState((props.house && props.house.title) || '')
  const [town, setTown] = useState((props.house && props.house.town) || '')
  const [price, setPrice] = useState((props.house && props.house.price) || 0)
  const [picture, setPicture] = useState(
    (props.house && props.house.picture) || ''
  )
  const [description, setDescription] = useState(
    (props.house && props.house.description) || ''
  )
  const [guests, setGuests] = useState((props.house && props.house.guests) || 0)
  const [bedrooms, setBedrooms] = useState(
    (props.house && props.house.bedrooms) || 0
  )
  const [beds, setBeds] = useState((props.house && props.house.beds) || 0)
  const [baths, setBaths] = useState((props.house && props.house.baths) || 0)
  const [wifi, setWifi] = useState((props.house && props.house.wifi) || false)
  const [kitchen, setKitchen] = useState(
    (props.house && props.house.kitchen) || false
  )
  const [heating, setHeating] = useState(
    (props.house && props.house.heating) || false
  )
  const [freeParking, setFreeParking] = useState(
    (props.house && props.house.freeParking) || false
  )
  const [entirePlace, setEntirePlace] = useState(
    (props.house && props.house.entirePlace) || false
  )
  const [type, setType] = useState(
    (props.house && props.house.type) || 'Entire house'
  )

  const houseTypes = ['Entire house', 'Room']

  return (
    <div>
      <form
        onSubmit={async event => {
          event.preventDefault()
          try {
            const response = await axios.post(`/api/host/${props.edit ? 'edit' : 'new'}`, {
              house: {
                id: props.edit ? id : null,
                title,
                town,
                price,
                picture,
                description,
                guests,
                bedrooms,
                beds,
                baths,
                wifi,
                kitchen,
                heating,
                freeParking,
                entirePlace,
                type
              }
            })
            if (response.data.status == 'error') {
              alert(response.data.message)
              return
            }
            Router.push('/host')
          } catch (error) {
            alert(error.response.data.message)
            return
          }
        }}
      >
        <p>
          <label>House Title</label>
          <input
            type="text"
            required
            onChange={event => setTitle(event.target.value)}
            placeholder="house title"
            value={title} />
        </p>
        <p>
          <label>Town</label>
          <input
            required
            onChange={event => setTown(event.target.value)}
            type='text'
            placeholder='Town'
            value={town}
          />
        </p>
        <p>
          <label>Price per night</label>
          <input
            required
            onChange={event => setPrice(event.target.value)}
            type='number'
            placeholder='Price per night'
            value={price}
          />
        </p>
        <p>
          <label>House picture URL</label>
          <input
            required
            onChange={event => setPicture(event.target.value)}
            type='text'
            placeholder='House picture URL'
            value={picture}
          />
        </p>
        <p>
          <label>House description</label>
          <textarea
            required
            onChange={event => setDescription(event.target.value)}
            value={description}></textarea>
        </p>
      </form>
    </div>
  )
}