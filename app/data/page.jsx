import React from 'react'
import { getPosts } from '@/_actions/postActions';
import Link from 'next/link';

export default async function DataDB() {

    const { data, errMsg } = await getPosts();

    if (errMsg) return <h1>{errMsg}</h1>;
  
    const res = await getPosts();
    console.log(res);

  return (
    <>
    <div className='flex flex-col justify-start items-start mt-3 mx-3'>
    <Link href="/" className='text-black bg-blue-400 px-4 py-1 m-2 rounded-xl' >Back</Link>
    {data.map((item) => (
        <div key={item._id}>
          <h1>{item.name_roue}</h1>
          <h2>{item.localisation}</h2>
          <p>
            {item.db_name_client}
            <br />
          </p>
          <ul>
            {/* Iterează prin array-ul `gifts` și pentru fiecare `gift` afișează toate cheile și valorile */}
            {item.gifts.map((gift, index) => (
              <li key={index}>
                {Object.entries(gift).map(([key, value]) => (
                  <span key={key}>{`${key}: ${value}, `}</span>
                ))}
              </li>
            ))}
          </ul>
          <ul>
            {/* Iterează prin array-ul `gifts` și pentru fiecare `gift` afișează toate cheile și valorile */}
            {item.points.map((point, index) => (
              <li key={index}>
                {Object.entries(point).map(([key, value]) => (
                  <span key={key}>{`${key}: ${value}, `}</span>
                ))}
              </li>
            ))}
          </ul>
          <ul>
            {/* Iterează prin array-ul `gifts` și pentru fiecare `gift` afișează toate cheile și valorile */}
            {item.social_media.map((social_media, index) => (
              <li key={index}>
                {Object.entries(social_media).map(([key, value]) => (
                  <span key={key}>{`${key}: ${value}, `}</span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      ))}
      </div>
      </>
  )
}