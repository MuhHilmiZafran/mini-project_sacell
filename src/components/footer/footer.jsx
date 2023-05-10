const Footer = () => {
  return (
    <div>
      <footer>
        <section className="footer">
          <div className="container py-5 d-flex justify-content-between align-content-center align-items-center">
            <div className="row d-flex mx-auto justify-content-between align-content-center">
              <div className="col-md-4">
                <h4>Surya Abadi Cell</h4>
                <p id="address">Jl. Kudus-Dawe (+- 600 m sebelah utara PLN TENGGELES) Hadipolo, Jekulo, Kudus</p>
                <br />
              </div>
              <div className="col-md-4">
                <h4>Social Media :</h4>
                <p>
                  Instagram :<a href="https://www.instagram.com/hilmiz._">@hilmiz._</a>
                </p>
              </div>
              <div className="col-md-4">
                <h4>Contact :</h4>
                <a href="tel:+6282213619770">+62 82213619770</a>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
};

export default Footer;
