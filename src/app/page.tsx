import React from 'react';
import userImg1 from '../../public/images/user1-128x128.jpg';
import userImg2 from '../../public/images/user2-160x160.jpg';
import Image from 'next/image';


const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gray-800 text-white py-4">
        <div className="container px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <nav>
              <ol className="flex space-x-2 text-sm">
                <li>
                  <a href="#" className="text-blue-300 hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <span className="text-gray-300">/</span>
                </li>
                <li className="text-gray-300">Dashboard</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <main className="container h-screen mx-auto px-4 py-6">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* New Orders */}
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-3xl font-bold">150</h3>
                  <p className="text-lg">New Orders</p>
                </div>
                <div className="text-4xl">
                  <i className="ion ion-bag"></i>
                </div>
              </div>
              <a href="#" className="mt-4 text-white flex items-center">
                More info <i className="fas fa-arrow-circle-right ml-2"></i>
              </a>
            </div>

            {/* Bounce Rate */}
            <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-3xl font-bold">
                    53<sup className="text-xl">%</sup>
                  </h3>
                  <p className="text-lg">Bounce Rate</p>
                </div>
                <div className="text-4xl">
                  <i className="ion ion-stats-bars"></i>
                </div>
              </div>
              <a href="#" className="mt-4 text-white flex items-center">
                More info <i className="fas fa-arrow-circle-right ml-2"></i>
              </a>
            </div>

            {/* User Registrations */}
            <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-3xl font-bold">44</h3>
                  <p className="text-lg">User Registrations</p>
                </div>
                <div className="text-4xl">
                  <i className="ion ion-person-add"></i>
                </div>
              </div>
              <a href="#" className="mt-4 text-white flex items-center">
                More info <i className="fas fa-arrow-circle-right ml-2"></i>
              </a>
            </div>

            {/* Unique Visitors */}
            <div className="bg-red-500 text-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-3xl font-bold">65</h3>
                  <p className="text-lg">Unique Visitors</p>
                </div>
                <div className="text-4xl">
                  <i className="ion ion-pie-graph"></i>
                </div>
              </div>
              <a href="#" className="mt-4 text-white flex items-center">
                More info <i className="fas fa-arrow-circle-right ml-2"></i>
              </a>
            </div>
          </div>
          <div className="card border border-gray-300 rounded-lg shadow-lg bg-white my-5">
            <div className="card-header flex justify-between items-center bg-blue-500 text-white p-4 rounded-t-lg">
              <h3 className="font-bold">Direct Chat</h3>
              <div className="card-tools flex gap-2">
                <span title="3 New Messages" className="badge bg-blue-600 text-white rounded px-2 py-1">3</span>
                <button
                  className="btn-tool text-white focus:outline-none"
                  title="Collapse"
                >
                  <i className="fas fa-minus"></i>
                </button>
                <button
                  className="btn-tool text-white focus:outline-none"
                  title="Contacts"
                >
                  <i className="fas fa-comments"></i>
                </button>
                <button
                  className="btn-tool text-white focus:outline-none"
                  title="Remove"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>

            <div className="card-body p-4">
              {/* Chat Messages */}
              <div className="direct-chat-messages space-y-4 h-64 overflow-auto">
                {/* Message Left */}
                <div className="flex items-start space-x-3">
                  <Image src={userImg1} width={40} alt='avatar' className="rounded-full" />

                  <div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span className="font-medium text-gray-800">Alexander Pierce</span>
                      <span>23 Jan 2:00 pm</span>
                    </div>
                    <p className="bg-gray-100 rounded-lg p-2">
                      Is this template really for free? That is unbelievable!
                    </p>
                  </div>
                </div>

                {/* Message Right */}
                <div className="flex items-start space-x-3 justify-end">
                  <div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>23 Jan 2:05 pm</span>
                      <span className="font-medium text-gray-800">Sarah Bullock</span>
                    </div>
                    <p className="bg-blue-500 text-white rounded-lg p-2">
                      You better believe it!
                    </p>
                  </div>
                  <Image src={userImg2} width={40} alt='avatar' className="rounded-full" />
                </div>

                {/* More Messages */}
                {/* Repeat similar structure for more messages */}
              </div>

              {/* Contacts */}
              <div className="direct-chat-contacts hidden">
                <ul className="space-y-4">
                  {/* Contact Item */}
                  <li className="flex items-center space-x-3">
                    <Image src={userImg1} width={40} alt='avatar' className="rounded-full" />
                    <div>
                      <span className="block font-medium text-gray-800">Count Dracula</span>
                      <small className="block text-gray-500">2/28/2015</small>
                      <p className="text-sm text-gray-400">How have you been? I was...</p>
                    </div>
                  </li>
                  {/* Repeat for more contacts */}
                </ul>
              </div>
            </div>

            <div className="card-footer border-t p-4 bg-gray-50">
              <form>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Type Message ..."
                    className="w-full border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none"
                  />
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <strong>&copy; 2014-2021</strong>{' '}
            <a href="https://adminlte.io" className="text-blue-300 hover:underline">
              AdminLTE.io
            </a>. All rights reserved.
          </div>
          <div className="text-sm">
            <b>Version</b> 3.1.0
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
