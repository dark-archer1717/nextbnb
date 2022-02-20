import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import Cookies from 'cookies'
import { House, User } from '../../model.js'
import { useEffect } from 'react'
import { useStoreActions } from 'easy-peasy'

import Layout from '../../components/Layout'

export default function Host({ houses, nextbnb_session }) {
  const setLoggedIn = useStoreActions((actions) => actions.login.setLoggedIn)

  useEffect(() => {
    if (nextbnb_session) {
      setLoggedIn(true)
    }
  }, [])

  return (
    <Layout
      content={
        <div>
          <Head>
            <title>Your houses</title>
          </Head>
          <h2>Your houses</h2>

          <div className='houses'>
            {houses
              ? houses.map((house, index) => {
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
              })
              : ''}
          </div>

          <style jsx>{`
            .houses {
              display: grid;
              grid-template-columns: 100%;
              grid-gap: 40px;
            }

            .house {
              display: grid;
              grid-template-columns: 30% 70%;
              grid-gap: 40px;
            }

            .house img {
              width: 180px;
            }
          `}</style>
        </div>
      }
    />
  )
}

export async function getServerSideProps({ req, res, query }) {
  const cookies = new Cookies(req, res)
  const nextbnb_session = cookies.get('nextbnb_session')

  let houses
  if (!nextbnb_session) {
    {
      res.writeHead(301, {
        Location: '/'
      })
      res.end()
      return { props: {} }
    }
  }

  const user = await User.findOne({
    where: { session_token: nextbnb_session },
  })
  houses = await House.findAndCountAll({ where: { owner: user.id } })

  return {
    props: {
      houses: houses ? houses.rows.map((houses) => houses.dataValues) : null,
      nextbnb_session
    }
  }
}