import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const [navbarTransform, setNavbarTransform] = useState("translateY(0)");
  const [navbarOpacity, setNavbarOpacity] = useState(1);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const images = ["001.jpg", "/002.jpg", "/003.jpg", "/004.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out
      setIsVisible(false);

      // After fade out completes, change image and fade in
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        setIsVisible(true);
      }, 300); // 300ms fade out duration
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

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
      question: "Why do I need a link in bio tool?",
      answer: "Right now, every time you've got something new to share, you have to go to every single one of your channels to change the link in each of your bios. It's time-consuming and complicated – making it so much harder to keep everything up to date. ",
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
              {/* Products Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors flex items-center gap-1">
                  Products <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Link in Bio
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      QR Codes
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Short Links
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Analytics
                    </a>
                  </div>
                </div>
              </div>

              {/* Templates Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors flex items-center gap-1">
                  Templates <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Creator
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Business
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Influencer
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Artist
                    </a>
                  </div>
                </div>
              </div>

              {/* Marketplace Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors flex items-center gap-1">
                  Marketplace <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Themes
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Widgets
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Integrations
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Apps
                    </a>
                  </div>
                </div>
              </div>

              {/* Learn Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors flex items-center gap-1">
                  Learn <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Blog
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Tutorials
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Best Practices
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Case Studies
                    </a>
                  </div>
                </div>
              </div>

              <button className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors">Pricing</button>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <Link to="/login" className="text-gray-600 hover:text-black bg-gray-100 px-8 py-6 rounded">
              Log in
            </Link>
            <Link to="/register" className="text-white px-8 py-6 rounded-full transition-colors hover:opacity-90" style={{ backgroundColor: "#1E2330" }}>
              Sign up for free
            </Link>
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
              <Link to="/login" className="text-black px-6 py-2 rounded-full hover:opacity-90 transition-colors" style={{ backgroundColor: "#E9C0E9" }}>
                Claim your linkBranch
              </Link>
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
        <div className="ml-24 mr-24 w-full flex items-center justify-around">
          <div className="flex justify-start">
            <div className="relative h-[700px] w-96 rounded-lg overflow-hidden">
              <img src={images[currentImageIndex]} alt="LinkBranch Feature" className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`} />
            </div>
          </div>
          <div className="flex justify-end max-w-4xl">
            <div>
              <h2 className="text-6xl font-black mb-6" style={{ color: "#502274" }}>
                Create and customize
                <br />
                your linkBranch in minutes
              </h2>
              <p className="text-black text-lg leading-relaxed mb-8">Connect your TikTok, Instagram, Twitter website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.</p>
              <Link to="/login" className="px-8 py-4 rounded-full font-semibold text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: "#502274" }}>
                Get Started for Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="h-[100vh] flex items-center px-6 py-20" style={{ backgroundColor: "#E8EFD6" }}>
        <div className="ml-24 mr-24 w-full flex items-center justify-around">
          <div className="flex justify-start">
            <div className="max-w-3xl h-[600px] flex items-center justify-center">
              <img src="/Welovroi_-_Tao_De_La_Torre-removebg-preview.png" alt="Analytics Dashboard" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex justify-end max-w-4xl">
            <div>
              <h2 className="text-5xl font-black text-black mb-6">
                Analyze your audience
                <br />
                and keep your
                <br />
                followers engaged
              </h2>

              <p className="text-black text-lg leading-relaxed mb-8 max-w-xl">Track your engagement over time, monitor revenue and learn what's converting your audience. Make informed updates on the fly to keep them coming back.</p>
              <Link to="/login" className="px-8 py-4 rounded-full font-semibold text-black hover:opacity-90 transition-opacity" style={{ backgroundColor: "#E9C0E9" }}>
                Get started for free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-20 min-h-screen" style={{ backgroundColor: "#770A15" }}>
        <div className="max-w-4xl mx-auto flex flex-col justify-center">
          <h2 className="text-6xl font-bold  text-center mb-20" style={{ color: "#E9C0E9" }}>
            Got Questions
          </h2>

          <div className="space-y-8">
            {faqData.map((faq, index) => (
              <div key={index} className="rounded-3xl overflow-hidden" style={{ backgroundColor: "#51040E" }}>
                <button onClick={() => toggleFAQ(index)} className="w-full px-12 py-10 text-left flex justify-between items-center hover:opacity-90 transition-all duration-300 ease-in-out">
                  <span className="font-bold text-3xl" style={{ color: "#E9C0E9" }}>
                    {faq.question}
                  </span>
                  <div className="transform transition-transform duration-300 ease-in-out" style={{ transform: openFAQ === index ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <ChevronDown className="text-3xl" style={{ color: "#E9C0E9" }} />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFAQ === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="px-12 pb-10">
                    <p className="text-2xl leading-relaxed" style={{ color: "#E9C0E9" }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#502274" }}>
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full animate-pulse" style={{ backgroundColor: "#E9C0E9" }}></div>
          <div className="absolute top-40 right-20 w-24 h-24 rounded-full animate-bounce delay-300" style={{ backgroundColor: "#E9C0E9" }}></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full animate-pulse delay-700" style={{ backgroundColor: "#E9C0E9" }}></div>
          <div className="absolute bottom-40 right-1/3 w-16 h-16 rounded-full animate-bounce delay-500" style={{ backgroundColor: "#E9C0E9" }}></div>
        </div>

        <div className="relative px-6 py-24">
          <div className="max-w-6xl mx-auto text-center">
            {/* Main CTA */}
            <div className="mb-16">
              <h2 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent leading-tight">Jumpstart Your Digital</h2>
              <h2 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-200 via-white to-purple-200 bg-clip-text text-transparent leading-tight">Presence Today</h2>
              <p className="text-2xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed">Join thousands of creators building their corner of the internet with powerful, beautiful tools</p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="group p-6 rounded-2xl transform transition-all duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: "#6A2C91" }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "#E9C0E9", color: "#502274" }}>
                  🚀
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: "#E9C0E9" }}>
                  Fast Setup
                </h3>
                <p className="text-sm opacity-80" style={{ color: "#E9C0E9" }}>
                  Go live in minutes
                </p>
              </div>

              <div className="group p-6 rounded-2xl transform transition-all duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: "#6A2C91" }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "#E9C0E9", color: "#502274" }}>
                  🎨
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: "#E9C0E9" }}>
                  Beautiful Design
                </h3>
                <p className="text-sm opacity-80" style={{ color: "#E9C0E9" }}>
                  Stunning templates
                </p>
              </div>

              <div className="group p-6 rounded-2xl transform transition-all duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: "#6A2C91" }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "#E9C0E9", color: "#502274" }}>
                  📊
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: "#E9C0E9" }}>
                  Analytics
                </h3>
                <p className="text-sm opacity-80" style={{ color: "#E9C0E9" }}>
                  Track your growth
                </p>
              </div>

              <div className="group p-6 rounded-2xl transform transition-all duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: "#6A2C91" }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "#E9C0E9", color: "#502274" }}>
                  🔗
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: "#E9C0E9" }}>
                  Link Management
                </h3>
                <p className="text-sm opacity-80" style={{ color: "#E9C0E9" }}>
                  Organize everything
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button className="group relative px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer" style={{ backgroundColor: "#E9C0E9", color: "#502274" }}>
                <Link to="/login" className="relative z-10">
                  Get Started For Free
                </Link>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundColor: "#ffffff" }}></div>
              </button>
            </div>

            {/* Social Proof */}
            <div className="text-center">
              <p className="text-purple-200 mb-6">Join 50,000+ creators worldwide</p>
              <div className="flex justify-center gap-8 items-center opacity-60">
                <div className="text-purple-200">★★★★★ 4.9/5</div>
                <div className="w-px h-6" style={{ backgroundColor: "#E9C0E9" }}></div>
                <div className="text-purple-200">Trusted by professionals</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#1A1A1A" }}>
        <div className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
              {/* Brand Column */}
              <div className="md:col-span-2">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold mb-4" style={{ color: "#E9C0E9" }}>
                    LinkBranch
                  </h3>
                  <p className="text-lg leading-relaxed opacity-80" style={{ color: "#E9C0E9" }}>
                    Empowering creators to build their digital presence with beautiful, powerful tools that grow with your ambitions.
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  <div className="group w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer" style={{ backgroundColor: "#502274" }}>
                    <span className="text-xl group-hover:scale-110 transition-transform duration-300" style={{ color: "#E9C0E9" }}>
                      𝕏
                    </span>
                  </div>
                  <div className="group w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer" style={{ backgroundColor: "#502274" }}>
                    <span className="text-xl group-hover:scale-110 transition-transform duration-300" style={{ color: "#E9C0E9" }}>
                      📘
                    </span>
                  </div>
                  <div className="group w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer" style={{ backgroundColor: "#502274" }}>
                    <span className="text-xl group-hover:scale-110 transition-transform duration-300" style={{ color: "#E9C0E9" }}>
                      📸
                    </span>
                  </div>
                  <div className="group w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer" style={{ backgroundColor: "#502274" }}>
                    <span className="text-xl group-hover:scale-110 transition-transform duration-300" style={{ color: "#E9C0E9" }}>
                      🎮
                    </span>
                  </div>
                </div>
              </div>

              {/* Company Links */}
              <div>
                <h4 className="font-bold text-lg mb-6" style={{ color: "#E9C0E9" }}>
                  Company
                </h4>
                <ul className="space-y-4">
                  {["About Us", "Careers", "Press", "Blog"].map((item) => (
                    <li key={item}>
                      <span className="text-base opacity-80 hover:opacity-100 transition-all duration-300 hover:translate-x-1 inline-block cursor-pointer" style={{ color: "#E9C0E9" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Community Links */}
              <div>
                <h4 className="font-bold text-lg mb-6" style={{ color: "#E9C0E9" }}>
                  Community
                </h4>
                <ul className="space-y-4">
                  {["Discord", "Twitter", "Instagram", "YouTube"].map((item) => (
                    <li key={item}>
                      <span className="text-base opacity-80 hover:opacity-100 transition-all duration-300 hover:translate-x-1 inline-block cursor-pointer" style={{ color: "#E9C0E9" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h4 className="font-bold text-lg mb-6" style={{ color: "#E9C0E9" }}>
                  Support
                </h4>
                <ul className="space-y-4">
                  {["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"].map((item) => (
                    <li key={item}>
                      <span className="text-base opacity-80 hover:opacity-100 transition-all duration-300 hover:translate-x-1 inline-block cursor-pointer" style={{ color: "#E9C0E9" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-6" style={{ borderColor: "#502274" }}>
              <p className="text-base opacity-60" style={{ color: "#E9C0E9" }}>
                © 2025 LinkBranch. All rights reserved.
              </p>

              <div className="flex items-center gap-6">
                <span className="text-sm opacity-60" style={{ color: "#E9C0E9" }}>
                  Made with ❤️ for creators
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
