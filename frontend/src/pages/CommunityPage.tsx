import React from 'react';
import { MessageSquare, Share2, Calendar, Users, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CommunityPage: React.FC = () => {
  // Update document title
  React.useEffect(() => {
    document.title = 'Community | FoodConnect';
  }, []);

  const {t} = useTranslation()

  // Sample discussion topics
  const discussionTopics = [
    {
      id: 1,
      title: "Tips for first-time food bank visitors",
      author: "Maria S.",
      date: "June 12, 2025",
      replies: 24,
      category: "Resources"
    },
    {
      id: 2,
      title: "Healthy meal ideas on a tight budget",
      author: "Chris T.",
      date: "June 10, 2025",
      replies: 37,
      category: "Nutrition"
    },
    {
      id: 3,
      title: "Navigating SNAP benefits - advice needed",
      author: "Jamal K.",
      date: "June 7, 2025",
      replies: 19,
      category: "Benefits"
    },
    {
      id: 4,
      title: "Food pantry vs. food bank - what's the difference?",
      author: "Sarah L.",
      date: "June 5, 2025",
      replies: 12,
      category: "Resources"
    }
  ];

  // Sample upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Community Food Drive",
      date: "June 25, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Central Park, Anytown",
      description: "Join us for our monthly food drive to support local food banks."
    },
    {
      id: 2,
      title: "Cooking on a Budget Workshop",
      date: "July 3, 2025",
      time: "6:00 PM - 8:00 PM",
      location: "Community Center, Anytown",
      description: "Learn how to prepare healthy, affordable meals for the whole family."
    },
    {
      id: 3,
      title: "SNAP Application Assistance",
      date: "July 10, 2025",
      time: "9:00 AM - 12:00 PM",
      location: "Virtual Event",
      description: "Get help completing your SNAP application from trained volunteers."
    }
  ];

  // Sample success stories
  const successStories = [
    {
      id: 1,
      title: "From Struggle to Stability",
      excerpt: "After losing my job, FoodConnect helped me find resources that kept my family fed while I got back on my feet...",
      author: "Robert J.",
      image: "https://images.pexels.com/photos/6647035/pexels-photo-6647035.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
    },
    {
      id: 2,
      title: "Finding Community Through Food",
      excerpt: "As a senior living alone, I not only found food assistance but also made connections with wonderful people...",
      author: "Eleanor M.",
      image: "https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
    },
    {
      id: 3,
      title: "A College Student's Journey",
      excerpt: "Balancing studies and part-time work left little for groceries. The campus food pantry I discovered through this site changed everything...",
      author: "Aiden T.",
      image: "https://images.pexels.com/photos/6144100/pexels-photo-6144100.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section */}
      <div className="bg-green-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            {t('communityPage.title')}
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-green-100">
            {t('communityPage.subTitle')}
          </p>
        </div>
      </div>

      {/* Discussion Forums */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Discussion Forums</h2>
            <p className="mt-2 text-gray-600">
              Join conversations about food resources, nutrition, and more.
            </p>
          </div>
          <a 
            href="/community/forums" 
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            View All Forums
          </a>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {discussionTopics.map((topic) => (
              <li key={topic.id}>
                <a href={`/community/discussions/${topic.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MessageSquare className="h-5 w-5 text-green-600 mr-3" />
                        <p className="text-lg font-medium text-green-700 truncate">
                          {topic.title}
                        </p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {topic.category}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          Started by {topic.author} • {topic.date}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <Share2 className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>
                          {topic.replies} replies
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Real stories from community members who found help and hope.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {successStories.map((story) => (
              <div key={story.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-[1.02]">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{story.title}</h3>
                  <p className="mt-2 text-gray-600">{story.excerpt}</p>
                  <p className="mt-4 text-sm text-gray-500">By {story.author}</p>
                  <div className="mt-4">
                    <a 
                      href={`/community/stories/${story.id}`}
                      className="inline-flex items-center text-green-600 hover:text-green-700"
                    >
                      Read full story
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a 
              href="/community/stories" 
              className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
            >
              More Success Stories
            </a>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
            <p className="mt-2 text-gray-600">
              Workshops, food drives, and community gatherings near you.
            </p>
          </div>
          <a 
            href="/community/events" 
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            View All Events
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="bg-green-600 px-4 py-3 text-white">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{event.date} • {event.time}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Users className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                  <p>{event.location}</p>
                </div>
                <p className="mt-3 text-gray-600">{event.description}</p>
                <div className="mt-5 flex">
                  <a 
                    href={`/community/events/${event.id}`}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                  >
                    Event Details
                  </a>
                  <a 
                    href={`/community/events/${event.id}/register`}
                    className="ml-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Register
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join Community CTA */}
      <div className="bg-green-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Share Your Experience
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-green-100">
            Your story could help others find the resources they need. Join our community and share your journey.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="/community/join"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-green-700 bg-white hover:bg-green-50"
            >
              Join the Community
            </a>
            <a
              href="/community/share-story"
              className="ml-4 inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-green-800"
            >
              Share Your Story
            </a>
          </div>
        </div>
      </div>

      {/* Community Resources */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Community Resources</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Helpful guides and information for navigating food assistance programs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <a href="/resources/snap-guide" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900">SNAP Benefits Guide</h3>
            <p className="mt-2 text-gray-600">
              A comprehensive guide to understanding and applying for SNAP benefits.
            </p>
            <div className="mt-4 text-green-600 font-medium">Read guide →</div>
          </a>
          
          <a href="/resources/food-bank-tips" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900">Food Bank Tips</h3>
            <p className="mt-2 text-gray-600">
              What to know before visiting a food bank for the first time.
            </p>
            <div className="mt-4 text-green-600 font-medium">Read guide →</div>
          </a>
          
          <a href="/resources/budget-recipes" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900">Budget-Friendly Recipes</h3>
            <p className="mt-2 text-gray-600">
              Nutritious and affordable meal ideas for individuals and families.
            </p>
            <div className="mt-4 text-green-600 font-medium">View recipes →</div>
          </a>
          
          <a href="/resources/children-programs" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900">Children's Food Programs</h3>
            <p className="mt-2 text-gray-600">
              Information on programs like school meals, summer food service, and more.
            </p>
            <div className="mt-4 text-green-600 font-medium">Learn more →</div>
          </a>
          
          <a href="/resources/seniors-guide" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900">Senior Food Assistance</h3>
            <p className="mt-2 text-gray-600">
              Resources specifically for seniors, including meal delivery programs.
            </p>
            <div className="mt-4 text-green-600 font-medium">Read guide →</div>
          </a>
          
          <a href="/resources/all-guides" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900">All Resource Guides</h3>
            <p className="mt-2 text-gray-600">
              Browse our complete library of food assistance guides and information.
            </p>
            <div className="mt-4 text-green-600 font-medium">View all →</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;