import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const HomePage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const [navbarTransform, setNavbarTransform] = useState("translateY(0)");
  const [navbarOpacity, setNavbarOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const hideStartPoint = 200; // Start hiding at 200px scroll
      const hideEndPoint = 400; // Completely hidden at 400px scroll

      if (scrollY < hideStartPoint) {
        setNavbarTransform("translateY(0)");
        setNavbarOpacity(1);
      } else if (scrollY >= hideStartPoint && scrollY <= hideEndPoint) {
        const progress = (scrollY - hideStartPoint) / (hideEndPoint - hideStartPoint);
        const translateY = -120 * progress; // Move up 120px
        const opacity = 1 - progress;

        setNavbarTransform(`translateY(${translateY}px)`);
        setNavbarOpacity(opacity);
      } else {
        setNavbarTransform("translateY(-120px)");
        setNavbarOpacity(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Phone tilt effect states
  const [transform, setTransform] = useState("");
  const phoneRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!phoneRef.current) return;

      const rect = phoneRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Use screen dimensions for smoother effect
      const rotateX = (mouseY / window.innerHeight) * -30; // Tilt up/down
      const rotateY = (mouseX / window.innerWidth) * 30; // Tilt left/right

      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
    };

    const handleMouseLeave = () => {
      setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    };

    // Add event listeners to the entire document
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const faqData = [
    {
      question: "What is LinkBranch?",
      answer: "LinkBranch is a simple link-in-bio tool that helps you share everything you are in one simple link.",
    },
    {
      question: "How do I create my linkBranch?",
      answer: "Simply sign up for free, customize your page, and start adding your links and content.",
    },
    {
      question: "Is LinkBranch free to use?",
      answer: "Yes, we offer a free plan with basic features. Premium plans are available for advanced analytics and customization.",
    },
    {
      question: "Can I track my link performance?",
      answer: "Yes, our analytics dashboard lets you track clicks, engagement, and audience insights.",
    },
    {
      question: "How do I customize my page?",
      answer: "You can customize colors, themes, add your logo, and arrange your links exactly how you want them.",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-['Inknut_Antiqua'] relative">
      {/* Navigation Bar with Slide Up Effect */}
      <nav
        className="fixed top-12 left-24 right-24 z-50 bg-white shadow-md px-8 py-8 rounded-full transition-all duration-500 ease-out"
        style={{
          opacity: navbarOpacity,
          transform: navbarTransform,
        }}
      >
        <div className="flex justify-between items-center w-full h-10">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-black">Link Branch</div>
            <div>
              <img src="/logo.jpg" alt="LinkBranch Logo" className="ml-2 w-6 h-6 md:w-8 md:h-8 rounded-full object-cover" />
            </div>
            <div className="flex gap-6">
              <button className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors">Products</button>
              <button className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors">Templates</button>
              <button className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors">Marketplace</button>
              <button className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors">Learn</button>
              <button className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors">Pricing</button>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <button className="text-gray-600 hover:text-black bg-gray-100 px-8 py-6 rounded">Log in</button>
            <button className="text-white px-8 py-6 rounded-full transition-colors hover:opacity-90" style={{ backgroundColor: "#1E2330" }}>
              Sign up for free
            </button>
          </div>
        </div>
      </nav>
      {/* Hero Section */}

      <section className="min-h-screen flex items-center" style={{ backgroundColor: "#254F1A" }}>
        <div className="ml-24 mr-24 w-auto flex items-center justify-around flex-1">
          <div>
            <h1 className="text-7xl font-black mb-6" style={{ color: "#D2E823" }}>
              EveryThing you
              <br />
              are. In one,
              <br />
              simple link in bio
            </h1>
            <p className="text-white text-base mb-8 max-w-2xl">Join 70M+ people using LinkBranch for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
            <div className="flex gap-4">
              <div className="flex items-center bg-white rounded px-4 py-2 max-w-xs">
                <span className="text-gray-500">LinkBranch/</span>
                <input type="text" className="bg-transparent text-black outline-none flex-1 ml-1" />
              </div>
              <button className="text-black px-6 py-2 rounded-full hover:opacity-90 transition-colors" style={{ backgroundColor: "#E9C0E9" }}>
                Claim your linkBranch
              </button>
            </div>
          </div>
          <div>
            <img
              ref={phoneRef}
              src="/282.jpg"
              alt="Phone Screenshot"
              className="transition-transform duration-200 ease-out shadow-2xl rounded-lg"
              style={{
                transform,
                width: "auto",
                height: "500px", // Adjust this to match your screenshot height
              }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="h-[90vh] flex items-center" style={{ backgroundColor: "#E9C0E9" }}>
        <div className="max-w-6xl mx-auto flex items-center">
          <div className="flex-1">
            <div className="bg-black h-80 w-full rounded-lg flex items-center justify-center">
              <span className="text-white">Video/GIF Placeholder</span>
            </div>
          </div>
          <div className="flex-1 pl-12">
            <h2 className="text-3xl font-bold text-black mb-6">Create and customize your linkBranch in minutes</h2>
            <p className="text-black text-lg leading-relaxed">Connect your TikTok, Instagram, Twitter website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.</p>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="bg-yellow-200 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Analyse your audience and keep your followers engaged</h2>
            <p className="text-black text-lg max-w-2xl">Track your engagement over time, monitor revenue and learn what's converting your audience. Make informed updates on the fly to keep them coming back.</p>
            <button className="bg-gray-400 text-black px-8 py-3 rounded mt-6 hover:bg-gray-500">Get Started</button>
          </div>

          {/* Chart placeholders */}
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-gray-300 h-48 rounded-lg flex items-center justify-center">
              <span className="text-gray-600">Chart Placeholder 1</span>
            </div>
            <div className="bg-gray-300 h-48 rounded-lg flex items-center justify-center">
              <span className="text-gray-600">Chart Placeholder 2</span>
            </div>
            <div className="bg-gray-300 h-48 rounded-lg flex items-center justify-center">
              <span className="text-gray-600">Chart Placeholder 3</span>
            </div>
            <div className="bg-gray-300 h-48 rounded-lg flex items-center justify-center">
              <span className="text-gray-600">Chart Placeholder 4</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-red-800 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Got Questions</h2>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => toggleFAQ(index)} className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-300 transition-colors">
                  <span className="font-semibold text-black">{faq.question}</span>
                  {openFAQ === index ? <ChevronUp className="text-black" /> : <ChevronDown className="text-black" />}
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Jumpstart your corner of the internet today</h2>

          {/* Placeholder grid */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="bg-gray-200 h-32 rounded-lg"></div>
            ))}
          </div>

          {/* Bottom section with login/signup and social links */}
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <div className="bg-yellow-500 px-6 py-2 rounded text-black font-semibold">Login</div>
              <div className="bg-yellow-500 px-6 py-2 rounded text-black font-semibold">Sign Up</div>
            </div>

            <div className="flex gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-black w-8 h-8 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Community</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Feedback
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Trust</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 LinkBranch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
