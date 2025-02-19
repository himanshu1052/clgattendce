import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Users, BookOpen, Award, ArrowRight } from 'lucide-react';

const Home = () => {
  const slides = [
    {
      image: "/api/placeholder/1920/600",
      title: "Welcome to ITS Ghaziabad",
      description: "Shaping Future Leaders Through Quality Education",
      buttonText: "Apply Now",
      buttonLink: "https://www.its.edu.in/Default.aspx"
    },
    {
      image: "/api/placeholder/1920/600",
      title: "World-Class Infrastructure",
      description: "State-of-the-art facilities for holistic development",
      buttonText: "Explore Campus",
      buttonLink: "https://www.its.edu.in/Default.aspx"
    },
    {
      image: "/api/placeholder/1920/600",
      title: "Industry-Ready Programs",
      description: "Programs designed to meet industry demands",
      buttonText: "View Programs",
      buttonLink: "https://www.its.edu.in/Default.aspx"
    }
  ];

  const featuredNews = [
    {
      date: "Feb 15, 2025",
      title: "Annual Tech Symposium",
      description: "Join us for the biggest tech event of the year",
      link: "/events/tech-symposium"
    },
    {
      date: "Feb 20, 2025",
      title: "Industry Partnership",
      description: "New collaboration with leading tech companies",
      link: "/news/partnership"
    },
    {
      date: "Mar 1, 2025",
      title: "Research Excellence",
      description: "Our students win national research competition",
      link: "/news/research-win"
    }
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <div className="relative h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ${
              currentSlide === index 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-full'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40">
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl text-white">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-xl mb-6">{slide.description}</p>
                  <Link
                    to={slide.buttonLink}
                    className="inline-flex items-center bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition duration-300"
                  >
                    {slide.buttonText}
                    <ChevronRight className="ml-2" size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="bg-red-700 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link to="/admission" className="flex items-center justify-center space-x-2 hover:bg-red-800 p-2 rounded transition duration-300">
              <span>Admissions Open</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/placements" className="flex items-center justify-center space-x-2 hover:bg-red-800 p-2 rounded transition duration-300">
              <span>Placements</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/facilities" className="flex items-center justify-center space-x-2 hover:bg-red-800 p-2 rounded transition duration-300">
              <span>Campus Facilities</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="flex items-center justify-center space-x-2 hover:bg-red-800 p-2 rounded transition duration-300">
              <span>Contact Us</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-700 mb-2">30+</div>
              <div className="text-gray-600">Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-700 mb-2">50,000+</div>
              <div className="text-gray-600">Alumni Network</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-700 mb-2">100%</div>
              <div className="text-gray-600">Placement Assistance</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-700 mb-2">200+</div>
              <div className="text-gray-600">Corporate Partners</div>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['PGDM', 'MCA', 'BCA', 'BBA'].map((program) => (
              <div key={program} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition duration-300">
                <h3 className="text-xl font-semibold mb-4">{program}</h3>
                <p className="text-gray-600 mb-4">
                  {program === 'PGDM' && 'Post Graduate Diploma in Management with specializations in various domains.'}
                  {program === 'MCA' && 'Master of Computer Applications focused on advanced computing.'}
                  {program === 'BCA' && 'Bachelor of Computer Applications providing strong foundation in IT.'}
                  {program === 'BBA' && 'Bachelor of Business Administration developing future business leaders.'}
                </p>
                <Link 
                  to={`https://www.its.edu.in/Default.aspx`}
                  className="text-red-700 font-medium flex items-center"
                >
                  Learn More <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* News & Updates */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest News & Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredNews.map((news, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition duration-300">
                <div className="text-sm text-gray-500 mb-2">{news.date}</div>
                <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
                <p className="text-gray-600 mb-4">{news.description}</p>
                <Link 
                  to={"https://www.its.edu.in/Default.aspx"}
                  className="text-red-700 font-medium flex items-center"
                >
                  Read More <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ITS?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start">
              <Users className="text-red-700 mr-4" size={24} />
              <div>
                <h3 className="text-xl font-semibold mb-2">Expert Faculty</h3>
                <p className="text-gray-600">
                  Learn from industry experts and experienced academicians who bring real-world knowledge to the classroom.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <BookOpen className="text-red-700 mr-4" size={24} />
              <div>
                <h3 className="text-xl font-semibold mb-2">Modern Curriculum</h3>
                <p className="text-gray-600">
                  Industry-aligned curriculum with regular updates to meet the evolving needs of the corporate world.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Award className="text-red-700 mr-4" size={24} />
              <div>
                <h3 className="text-xl font-semibold mb-2">Placement Success</h3>
                <p className="text-gray-600">
                  Strong industry connections ensuring excellent placement opportunities with leading companies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-xl mb-8">Take the first step towards a successful career with ITS Ghaziabad</p>
          <Link
            to="https://www.its.edu.in/AdmissionOpen.aspx?TagId=68"
            className="inline-flex items-center bg-white text-red-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            Apply Now
            <ChevronRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;