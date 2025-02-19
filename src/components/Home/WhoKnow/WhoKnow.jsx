import React from 'react';

const WhoKnow = () => {
    return (
        <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#003a43]">The People Who Know Products</h2>
          <p className="mt-2 text-gray-600">Curating only the best in tech is literally what we do. All day. Every day. We're very good at it.</p>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="italic">“For me it is a great source of inspiration. I get ideas and feel very creative after browsing PH and also the newsletter is just fantastic. Great gift of the internet.”</p>
              <h4 className="mt-4 font-bold">Samin Chowdhury</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="italic">“Your newsletter is one of the very few that I read on a daily basis. It’s on one hand the copy, but above all the content and the quality of the apps you post (almost) e v e r y d a y !”</p>
              <h4 className="mt-4 font-bold">Creatif Comunicación</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="italic">“I tell everyone who I think would care about Product Hunt. It is literally the only daily or weekly or monthly newsletter that I check out regularly. And I save them if I can’t read them on the day of.”</p>
              <h4 className="mt-4 font-bold">Shelby Joy Scarbrough</h4>
            </div>
          </div>
        </div>
      </div>
    );
};

export default WhoKnow;