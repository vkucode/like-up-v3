'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPosts } from '@/_actions/postActions';

export default function DataDB() {
    const [data, setData] = useState([]);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        async function fetchData() {
            const result = await getPosts();
            if (result.errMsg) {
                setErrMsg(result.errMsg);
            } else {
                setData(result.data);
            }
        }
        fetchData();
    }, []);

    if (errMsg) return <h1>{errMsg}</h1>;

    return (
        <div className='flex flex-row justify-start items-start gap-3 mt-3 mx-3'>
            <Link href="/" className='text-black bg-blue-400 px-4 py-1 m-2 rounded-xl'>Back</Link>
            {data.map((item) => (
                <div key={item._id}>
                    <h1>{item.name_roue}</h1>
                    <h2>{item.localisation}</h2>
                    <p>{item.db_name_client}<br /></p>
                    {['gifts', 'points', 'social_media'].map((key) => (
                        <ul key={key}>
                            {item[key].map((detail, index) => (
                                <li key={index}>
                                    {Object.entries(detail).map(([subKey, value]) => (
                                        <span key={subKey}>{`${subKey}: ${value}, `}</span>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    ))}
                    <Link href={`/edit/${item._id}`} target="_blank" className='text-white bg-green-500 px-4 py-1 m-2 rounded-xl'>Edit</Link>
                </div>
            ))}
        </div>
    );
}
