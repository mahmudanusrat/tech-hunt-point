import React from 'react';

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: 'New Tech Product Launch: Product X',
      date: 'March 15, 2025',
      location: 'Virtual Event (Zoom)',
      link: '#',
    },
    {
      id: 2,
      title: 'Tech Talk: AI in Product Development',
      date: 'February 25, 2025',
      location: 'Online Webinar',
      link: '#',
    },
    // Add more events here
  ];

  return (
    <section className="py-10 bg-white" id="upcoming-events">
      <h2 className="text-3xl font-bold text-center mb-6">Upcoming Events & New Releases</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {events.map((event) => (
          <div key={event.id} className="card w-full bg-gray-100 shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold">{event.title}</h3>
            <p className="mt-2 text-lg text-gray-700">
              <strong>Event Date:</strong> {event.date}
            </p>
            <p className="mt-1 text-lg text-gray-700">
              <strong>Location:</strong> {event.location}
            </p>
            <a href={event.link} className="mt-4 inline-block text-cyan-500 hover:text-cyan-700 font-semibold">
              RSVP or Learn More
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;
