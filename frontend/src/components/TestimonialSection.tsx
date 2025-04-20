import React from 'react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "FoodConnect helped me find resources when I didn't know where to turn. As a single parent, knowing where to get help feeding my family has been life-changing.",
    author: "Sarah L.",
    role: "Parent",
    image: "https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
  },
  {
    id: '2',
    quote: "After losing my job, I was hesitant to seek help. This platform made it easy to find resources discreetly and with dignity. I'm grateful for the support.",
    author: "Michael T.",
    role: "Community Member",
    image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
  },
  {
    id: '3',
    quote: "As a senior on a fixed income, finding affordable food has been challenging. The resources I found through this site have helped me eat healthier without breaking my budget.",
    author: "Eleanor R.",
    role: "Retiree",
    image: "https://images.pexels.com/photos/2050994/pexels-photo-2050994.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
  }
];

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-16 bg-green-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Making a Difference
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-green-100">
            Hear from people who have found the help they needed.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-lg shadow-xl p-6 transform transition duration-500 hover:scale-105"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0">
                  <svg className="h-12 w-12 text-green-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-700 leading-relaxed">{testimonial.quote}</p>
                  <div className="mt-4 flex items-center">
                    {testimonial.image && (
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={testimonial.image}
                          alt={testimonial.author}
                        />
                      </div>
                    )}
                    <div className={testimonial.image ? "ml-3" : ""}>
                      <p className="text-base font-medium text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/stories"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-green-700 bg-white hover:bg-green-50"
          >
            Read More Stories
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;