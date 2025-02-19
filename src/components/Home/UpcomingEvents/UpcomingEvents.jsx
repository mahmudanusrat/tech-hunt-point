import React from 'react';

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: 'New Tech Product Launch: Product X',
      date: 'March 15, 2025',
      location: 'Virtual Event (Zoom)',
      link: '#',
      img: 'https://i.ibb.co.com/prLBH5vq/download1.png', // Replace with actual image URL
    },
    {
      id: 2,
      title: 'Tech Talk: AI in Product Development',
      date: 'February 25, 2025',
      location: 'Online Webinar',
      link: '#',
      img: 'https://i.ibb.co.com/0pc0n7Nm/download2.jpg',
    },
    {
      id: 3,
      title: 'Cybersecurity & AI Conference',
      date: 'April 10, 2025',
      location: 'San Francisco, CA',
      link: '#',
      img: 'https://i.ibb.co.com/d0q68zHg/download3.jpg',
    },
  ];

  return (
    <div className="container py-20 px-6 text-[#003a43] mx-auto">
      <div className="mb-12 space-y-3 text-center dark:text-white">
        <h1 className="text-5xl font-semibold tracking-wide">
          Upcoming Events & New Releases
        </h1>
        <p className="text-xl">
        The tech industry is set to unveil a range of innovative products and host several major events.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {events.map((event) => (
          <div key={event.id} className="bg-[#3a6d71] shadow-lg rounded-lg overflow-hidden">
            <img src={event.img} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-white">{event.title}</h3>
              <p className="mt-2 text-lg text-gray-200">
                <strong>Event Date:</strong> {event.date}
              </p>
              <p className="mt-1 text-lg text-gray-200">
                <strong>Location:</strong> {event.location}
              </p>
              <a href={event.link} className="mt-4 inline-block text-cyan-300 hover:text-cyan-500 font-semibold">
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
