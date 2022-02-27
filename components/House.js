/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
import Link from 'next/link';

export default function House(props) {
  return (
    <Link
      //   style={{ display: 'grid' }}
      href="/houses/[id]"
      as={'/houses/' + props.id}
    >
      <a
        // style={{
        //   height: '92%',
        //   width: 'max-content',
        //   padding: '1.5em',
        //   margin: '1.2em'
        // }}
        style={{ display: 'grid', height: '100%' }}
      >
        <Image
          src={props.picture}
          width="1000"
          height="571"
          sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
          alt="House Picture"
          style={{
            position: 'relative',
            boxShadow: '0px 5px 5px rgba(0,0,0,0.4)'
          }}
        />
        <p>{props.title}</p>
        <p>
          {props.type} - {props.town}
        </p>
      </a>
    </Link>
  );
}
