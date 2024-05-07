// Footer component for footer section
const Footer = () => {
    const year = new Date().getFullYear();
    return (
      <div className="footer">
        Created By
        <i className="fa-solid fa-heart"></i>
        <a href="https://www.linkedin.com/in/gopal-agarwal-777ms/" target="_blank" title="Chetan Nada's Linkedin Profile">
          Gopal Agarwal 
        </a>
        <i className="fa-solid fa-copyright"></i>
        {year}

      </div>
    );
  };
  
  export default Footer;
  