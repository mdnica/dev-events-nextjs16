import {IEvent} from '@/database';
import {cacheLife} from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export default async function EventDetails({ slug}: {slug: string}) {
    'use cache';
    cacheLife('hours');

    const response = await fetch(`${BASE_URL}/api/events/${slug}`);
    const {event} = await repsonse.json();

    if(!event) return <p>Event not found.</p>

    return (
        <section>
            <h1 className='text-4xl font-bold mb-4'>{event.title}</h1>
            <p className='text-lg text-gray-300 mb-6>{event.description</p>

            <img
                src={event.image}
                alt={event.title}
                className='w-full max-w-2xl rounded-lg shadow mb-8' />

            <h3 className='text-xl font-semibold'>Agenda</h3>
            <ul className='list-disc pl-6'>
                {event.agenda.map((item: string) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>

            <div className='mt-6'>
                <strong>Date:</strong>{event.date} <br />
                <strong>Time:</strong>{event.time} <br />
                <strong>Venue:</strong>{event.venue} <br />
                <strong>Location:</strong>{event.location}

            </div>
        </section>
    );
    

}