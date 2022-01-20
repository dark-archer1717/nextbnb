/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';

export default function House(props) {
  return (
    <Link href="/houses/[id]" as={'/houses/' + props.id}>
      <a>
        <img
          src={props.picture}
          width="100%"
          alt="House Picture"
          style={{ boxShadow: '0px 5px 5px rgba(0,0,0,0.4)' }}
        />
        <p>
          {props.type} - {props.town}
        </p>
        <p>{props.title}</p>
      </a>
    </Link>
  );
}
