import Image from 'next/image';

const Footer = () => {
  const footer = {
    title: `D’Marquee`,
    desc1: `Downtown East`,
    desc2: `1 Pasir Ris Cl, Singapore 519599`,
    desc3: `More event spaces:`,
    desc4: `
    <li><a href="https://www.arandaclub.org.sg/" target="_blank">Aranda Country Club</a></li>
    <li><a href="https://www.orchidclub.com/" target="_blank">Orchid Country Club</a></li>
    <li><a href="https://www.downtowneast.com.sg/plan-event-holder/plan-an-event/event-venues/view-all-venues/details/begonia-ballroom" target="_blank">Begonia Pavilion</a></li>
    <li><a href="https://www.ntucclub.com/our-brands/lifestyle/ntuc-club-clubhouses" target="_blank">NTUC Club Clubhouses</a></li>
    `,
    desc5: 'Connect with us:',
    desc6: `
      <span>Copyright 2024</span>
      <span>D'Marquee</span>
      <span>All rights reserved</span>
    `,
    desc7: `Privacy Policy`,
  };

  return (
    <footer className="footer-section">
      <a
        href="https://api.whatsapp.com/send/?phone=6590212844&text&app_absent=0"
        className="whatsapp-link"
        target="_blank"
      >
        <img src="/assets/images/whatsapp-img.png" />
      </a>
      <div className="center-wrapper">
        <div className="top-footer">
          <div className="left-footer">
            <div className="title-footer">
              <div className="image-item">
                <Image
                  src="/assets/images/location-pin.gif"
                  layout="responsive"
                  width={72}
                  height={72}
                  alt="Family information"
                />
              </div>
              <h1>{footer.title}</h1>
            </div>
            <p>{footer.desc1}</p>
            <p>{footer.desc2}</p>
            <div className="left-footer-btn-group">
              <a href="https://maps.app.goo.gl/1Yf5bzKWnKXxjR3e8" target="_blank">
                <button className="footer-btn">GOOGLE MAP</button>
              </a>
              <a href="https://f003.cdn.net.in/file/agencies/ntuc/how-to-get-there.pdf" target="_blank">
                <button className="footer-btn">HOW TO GET HERE</button>
              </a>
            </div>
          </div>

          <div className="right-footer">
            <h3>{footer.desc3}</h3>
            <ul dangerouslySetInnerHTML={{ __html: footer.desc4 }} />

            <h3>{footer.desc5}</h3>
            <div className="logo-group">
              <div className="social-icon-wrapper">
                <a href="https://www.facebook.com/share/ieue2JreKLQJ2AKt/?mibextid=LQQJ4d" target="_blank">
                  <img src="/assets/images/social-icons/facebook.png" />
                </a>
              </div>
              <div className="social-icon-wrapper">
                <a href="https://www.linkedin.com/company/uplay-sg/" target="_blank">
                  <img src="/assets/images/social-icons/linkedin.png" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="center-wrapper">
        <div className="bottom-footer">
          <div className="text" dangerouslySetInnerHTML={{ __html: footer.desc6 }} />
          <a className="privacy-policy" href="https://www.ntucclub.com/privacy-policy/" target="_blank">
            {footer.desc7}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
