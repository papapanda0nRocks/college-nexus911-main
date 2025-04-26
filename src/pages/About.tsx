import React from "react";

const About = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Main Content */}
      <div className="md:col-span-2 flex flex-col items-center text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold">About CollegeNet</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Connecting students with opportunities to grow professionally and personally.
        </p>
      </div>

      <div className="md:col-span-2 max-w-4xl mx-auto flex flex-col md:flex-row justify-center items-stretch gap-12 mb-8">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="mb-4">
            CollegeNet aims to bridge the gap between academic learning and professional development by 
            connecting students with events, workshops, and networking opportunities that enhance their skills 
            and expand their professional network.
          </p>
          <p>
            We believe that education extends beyond the classroom, and real-world experiences are 
            crucial for students to thrive in their careers. By making these opportunities more accessible, 
            we help students build a foundation for their future success.
          </p>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="mb-4">
            We envision a world where every student has equal access to career development opportunities, 
            regardless of their background or institution. CollegeNet strives to be the bridge that connects 
            students to valuable experiences that shape their professional journey.
          </p>
          <p>
            Through our platform, we aim to create a community where students, alumni, and industry professionals 
            can connect, collaborate, and grow together.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="md:col-span-2">
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm text-center">
              <div className="w-24 h-24 rounded-full bg-collegenet-100 dark:bg-collegenet-900 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-1">Khilesh Sah</h3>
              <p className="text-sm text-muted-foreground mb-3">Co-Founder & CEO</p>
              <p className="text-sm">Strategic thinker with a Resilient mindset. Focused on growth, innovation, and making networking smarter.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm text-center">
              <div className="w-24 h-24 rounded-full bg-collegenet-100 dark:bg-collegenet-900 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-1">Ishant Gupta</h3>
              <p className="text-sm text-muted-foreground mb-3">Co-Founder & CTO</p>
              <p className="text-sm">Turns ideas into tech with clean, scalable code and sharp product instincts.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border dark:border-gray-700">
          <p className="mb-6 text-center">
            Have questions or want to partner with us? We'd love to hear from you!
          </p>
          <div className="space-y-4 text-center">
            <p>
              <span className="font-semibold">Email:</span> info@collegenet.com
            </p>
            <p>
              <span className="font-semibold">Phone:</span> +91 Likho 98....
            </p>
            <p>
              <span className="font-semibold">Address:</span> Where the WiFi connects automatically
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;