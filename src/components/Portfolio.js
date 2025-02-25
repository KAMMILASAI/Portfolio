import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaBookOpen, FaGithub, FaFacebook, FaLinkedin, FaWhatsapp, FaDownload, FaExternalLinkAlt, FaInstagram } from "react-icons/fa";
import "../styles.css";
import emailjs from 'emailjs-com';

// Skills data
const skillsData = [
  { title: "JavaScript", icon: "fa-brands fa-js", percentage: 85 },
  { title: "React.js", icon: "fa-brands fa-react", percentage: 80 },
  { title: "Node.js", icon: "fa-brands fa-node", percentage: 75 },
  { title: "MongoDB", icon: "fa-solid fa-database", percentage: 70 },
  { title: "UI/UX Design", icon: "fa-solid fa-paint-brush", percentage: 90 },
];

// Services data
const services = [
  {
    title: "Web Development",
    description: "I build responsive and scalable websites using the MERN stack.",
    icon: "🌐",
  },
  {
    title: "UI/UX Design",
    description: "Creating visually appealing and user-friendly interfaces.",
    icon: "🎨",
  },
  {
    title: "Backend Development",
    description: "Building secure and optimized server-side applications.",
    icon: "⚙️",
  },
];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [text, setText] = useState("");
  const roles = ["Web Developer", "MERN Stack Developer", "Creative Coder"];
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect for roles
  useEffect(() => {
    const typingEffect = setTimeout(() => {
      const currentRole = roles[index];

      if (!isDeleting) {
        // Typing forward
        setText(currentRole.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        // If the full text is typed, start deleting
        if (charIndex === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
        }
      } else {
        // Deleting backward
        setText(currentRole.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        // If the text is fully deleted, move to the next role
        if (charIndex === 0) {
          setIsDeleting(false);
          setIndex((prevIndex) => (prevIndex + 1) % roles.length);
        }
      }
    }, isDeleting ? 10 : 15); // Speed of typing and deleting

    return () => clearTimeout(typingEffect);
  }, [index, charIndex, isDeleting, roles]);


  // Project list
  const projectList = [
    { name: "VIJAYCCTV CAMERA", tech: "Html,Css,Javascript", category: "Frontend", img: "/img/p0.png", link: "https://vijaycctv.netlify.app/",github:"#" },
    { name: "ITC-TAC-TOE", tech: "Html,Css,Javascript", category: "Frontend", img: "/img/p1.png", link: "https://varma-tic-tac-toe.netlify.app/",github:"#" },
    { name: "LANDING-PAGE", tech: "Html,Css,Javascript", category: "Frontend", img: "/img/p2.png", link: "https://varma-landing-page.netlify.app/",github:"#" },
    { name: "STOP-WATCH", tech: "Html,Css,Javascript", category: "Frontend", img: "/img/p3.png", link: "https://varma-stop-watch.netlify.app/",github:"#" },
  ];

  // Filtered projects
  const filteredProjects = filter === "All" ? projectList : projectList.filter((project) => project.category === filter);

  // Sidebar and popup states
  const [showSidebar, setShowSidebar] = useState(false);

  // Toggle sidebar
  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  // Education data
  const education = [
    {
      year: "2022 - 2026",
      degree: "CSE - 75%",
      institute: "Sri Vasavi Engineering College, Pedatadepalli, AP",
    },
    {
      year: "2020 - 2022",
      degree: "MPC - 71%",
      institute: "Sri Chaitanya Junior College, Tadepalligudem, AP",
    },
    {
      year: "2020",
      degree: "SSC - 84%",
      institute: "Z.P.H.S. School, Pippara, AP",
    },
  ];

  // Skills progress animation
  const [progress, setProgress] = useState(skillsData.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress.map((p, i) =>
          p < skillsData[i].percentage ? p + 1 : skillsData[i].percentage
        )
      );
    }, 20); // Speed of animation

    return () => clearInterval(interval);
  }, []);

  // Active navbar item
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (index) => {
    setActiveItem(index);
  };
  
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Toggle contact popup
  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  // Handle form submission with EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace these with your EmailJS credentials
    const serviceID = 'service_s1ahj07'; // Replace with your actual Service ID
    const templateID = 'template_expkure'; // Replace with your actual Template ID
    const userID = 'm_p9qHj2AiWd1F4og'; // Replace with your actual User ID

    // Send the email
    emailjs.sendForm(serviceID, templateID, e.target, userID)
  .then(
    (result) => {
      console.log("Email sent successfully:", result.text);
      setShowSuccess(true); // Show success message
    },
    (error) => {
      console.error("Failed to send email:", error.text);
      alert("Failed to send message");
    }
  );
  };
  const closeSidebar = () => {
    setShowSidebar(false); // Close the sidebar
  };
  
  // Add event listeners to all <li> elements inside the sidebar
  const sidebarItems = document.querySelectorAll(".sidebar li");
  sidebarItems.forEach((item) => {
    item.addEventListener("click", closeSidebar);
  });


  return (
    <div className="portfolio-container">
      {/* Navbar */}
      <nav className="navbar">
        {/* Sidebar */}
        <ul className={`sidebar ${showSidebar ? "show" : ""}`}>
          <li>
            <button>&times;</button>
          </li>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#services-container">Services</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
        </ul>
        {/* Main Navigation */}
        <ul className="nav-menu">
          <li
            className={activeItem === 0 ? "active" : ""}
            onClick={() => handleItemClick(0)}
          >
            <a href="./">
              <img src="./img/sai-logo-removebg-preview.png" alt="Logo" className="logo-image" />
            </a>
          </li>
          <li
            className={`hideOnMobile ${activeItem === 1 ? "active" : ""}`}
            onClick={() => handleItemClick(1)}
          >
            <a href="#home">Home</a>
          </li>
          <li
            className={`hideOnMobile ${activeItem === 2 ? "active" : ""}`}
            onClick={() => handleItemClick(2)}
          >
            <a href="#about">About</a>
          </li>
          <li
            className={`hideOnMobile ${activeItem === 3 ? "active" : ""}`}
            onClick={() => handleItemClick(3)}
          >
            <a href="#skills">Skills</a>
          </li>
          <li
            className={`hideOnMobile ${activeItem === 4 ? "active" : ""}`}
            onClick={() => handleItemClick(4)}
          >
            <a href="#services-container">Services</a>
          </li>
          <li
            className={`hideOnMobile ${activeItem === 5 ? "active" : ""}`}
            onClick={() => handleItemClick(5)}
          >
            <a href="#projects">Projects</a>
          </li>
          <li className="contact-btn-container">
            <button className="contact-btn" onClick={handlePopupToggle}>
              Contact
            </button>
          </li>
          <li className="menu-button" onClick={handleSidebarToggle}>
            <button>&#9776;</button>
          </li>
        </ul>
      </nav>

      {/* Contact Form Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <span className="close-btn" onClick={handlePopupToggle}>
              &times;
            </span>
            {showSuccess ? (
        <div className="success-message">
        <p>Email sent successfully!</p>

        <button className="ok-button" onClick={() => setShowPopup(false)}>
          OK
        </button>
        <h6>If you send again...refresh it!!</h6>
      </div>
      ) : (
        
        <form onSubmit={handleSubmit}>
          <h2 align='center'>Contact Me</h2>
          <label>Name:</label>
          <input type="text" name="name" placeholder="Enter your name" required />
          <label>Email:</label>
          <input type="email" name="email" placeholder="Enter your email" required />
          <label>Message:</label>
          <textarea name="message" placeholder="Your message..." required></textarea>
          <button type="submit">Send</button>
        </form>
      )}
          </div>
        </div>
      )}

      {/* Home Section */}
      <section id="home" className="home">
        <h1><span className="name">Sai Kammila</span></h1>
        <h2 className="web-dev">{text}</h2><br/><br/>
        <a href="/resume.pdf" download className="btn">Resume <FaDownload /></a>
        <div className="social-icons">
          <a href="https://github.com/KAMMILASAI"><FaGithub /></a>
          <a href="https://www.facebook.com/saikammila.kammila.9?mibextid=qi2Omg&rdid=p9DsvgZ7AShIUlHE&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FoVBtvutqgN6BEM3v%2F%3Fmibextid%3Dqi2Omg#"><FaFacebook /></a>
          <a href="https://www.instagram.com/"><FaInstagram /></a>
          <a href="https://www.linkedin.com/in/sai-kammila-64310229b/"><FaLinkedin /></a>
          <a href="https://api.whatsapp.com/send?phone=+918179077852"><FaWhatsapp /></a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="about-container">
          <br /><br /><br /><br />
          <h1 className="title" align="center">About Me</h1>
          <div className="about-wrapper">
            {/* Left: About Section */}
            <div className="about-content">
              <img src="/img/cartoon man.png" alt="Sai" className="profile-pic" />
              <div className="about-text">
                <p>
                  Hello! My name is <strong>Sai</strong>, a 19-year-old passionate about continuous learning and personal growth.
                  Originally from <strong>AP West Godavari</strong>, I currently live in Pippara.
                  I graduated from <strong>Sri Vasavi Engineering College</strong> with a solid foundation in Computer Science Engineering.
                </p>
                <p>
                  Growing up in a middle-class family of four, I've learned the value of hard work and perseverance.
                  My strengths lie in my ability to work under pressure, quickly grasp new concepts, and connect easily with others.
                </p>
                <p>
                  Beyond coding, I enjoy <strong>exploring new technologies, reading, and playing chess.</strong>
                </p>
              </div>
            </div>

            {/* Right: Education Section */}
            <div className="education-section">
              <h2 className="education-header">
                <FaBookOpen className="education-icon" /> Education
              </h2>
              <div className="education-timeline">
                {education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <div className="timeline-dot"></div>
                    <div className="education-details">
                      <h3 className="education-institute">{edu.institute}</h3>
                      <p className="education-year">{edu.year}</p>
                      <span className="education-degree">{edu.degree}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <h1 className="title">My Skills</h1>
        <div className="skills-container">
          {skillsData.map((skill, index) => (
            <div key={index} className="skill-card">
              <i className={`skill-icon ${skill.icon}`}></i>
              <h3 className="skill-title">{skill.title}</h3>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress[index]}%` }}
                ></div>
              </div>
              <span className="percentage-text">{progress[index]}%</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services-container" className="services-container">
        <br />
        <h1 className="title">My Services</h1>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <span className="service-icon">{service.icon}</span>
              <h2 className="service-title">{service.title}</h2>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="project-container">
          <br />
          <br />
          <h1 className="title">Our Projects</h1>
          <div className="filter-buttons">
            {['All', 'Frontend', 'Backend','Full Stack'].map((category) => (
              <button
                key={category}
                className={filter === category ? "active" : ""}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <br />
          <div className="project-grid">
            {filteredProjects.map((project, index) => (
              <div key={index} className="project-card">
                <img src={project.img} alt={project.name} />
                <h3>{project.name}</h3>
                <p>{project.tech}</p>
                <div className="project-links">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="icon-link">
                    <FaExternalLinkAlt />
                  </a>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="icon-link">
                    <FaGithub />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <div className="contact-us">
            <h2>Contact Us</h2>
            <p>
              <FaMapMarkerAlt /> <strong>Location:</strong> Pippara, West Godavari, AP
            </p>
            <p>
              <FaEnvelope /> <strong>Email:</strong>
              <a href="mailto:saikammila143@gmail.com"> saikammila143@gmail.com</a>
            </p>
            <p>
              <FaPhone /> <strong>Phone:</strong>
              <a href="tel:+918179077852"> +91 8179077852</a>
            </p>
          </div>

          <div className="footer-social">
            <h2>Follow us</h2>
            <a href="https://github.com/KAMMILASAI"><FaGithub />-Github</a>
            <a href="https://www.facebook.com/saikammila.kammila.9?mibextid=qi2Omg&rdid=p9DsvgZ7AShIUlHE&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FoVBtvutqgN6BEM3v%2F%3Fmibextid%3Dqi2Omg#"><FaFacebook />-Facebook</a>
            <a href="https://www.linkedin.com/in/sai-kammila-64310229b/"><FaLinkedin />-Linkedin</a>
            <a href="https://api.whatsapp.com/send?phone=+918179077852"><FaWhatsapp />-Whatsapp</a>
          </div>
          <div className="footer-services">
            <h2>Our Services</h2>
            <ul>
              <li>Web Development</li>
              <li>UI/UX Design</li>
            </ul>
          </div>
          <h3>&copy; {new Date().getFullYear()} Sai Kammila. All rights reserved.</h3>
        </div>
      </footer>
    </div>
  );
}