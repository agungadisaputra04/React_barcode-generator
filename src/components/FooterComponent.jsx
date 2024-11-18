import {Container, Row, Col} from "react-bootstrap"
import { Link } from "react-router-dom"
const FooterComponent = () => {
  return (
    <div className="footer py-5">
     <Container>
      <Row className="d-flex justify-content-between">
        <Col lg="5">
        <h3 className="fw-bold">Brownsite.</h3>
        <p className="desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, voluptates!</p>
        <div className="no mb-1 mt-4">
          <Link className="text-decoration-none">
          <i className="fa-brands fa-whatsapp"></i>
            <p className="m-0 mt-0">+62 8231 3764 148</p>
           </Link>
        </div>
        <div className="mail">
          <Link className="text-decoration-none">
          <i className="fa-regular fa-envelope"></i>
            <p className="m-0 mt-">agungadisaputra05@gmail.com</p>
           </Link>
        </div>
        </Col>
        <Col className="d-flex flex-column col-lg-2 col mt-lg-0 mt-5">
        <h5 className="fw-bold">Menu</h5>
        <Link to="">Home</Link>
        <Link to="Thanks">Generate</Link>
        <Link to="">Faq</Link>
        </Col>
        <Col lg="4" className="mt-lg-0 mt-5">
        <h5 className="fw-bold mb-3">Subscribe untuk fitur lebih</h5>
        <div className="subs">
          <input type="text" placeholder="Subscribe.."/>
          <button className="btn btn-danger rounder-end rounded-0">Subscribe</button>
        </div>
        <div className="social mt-3">
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-twitter"></i>
          <i className="fa-brands fa-youtube"></i>
          <i className="fa-brands fa-instagram"></i>
        </div>
        </Col>
      </Row>
      <Row>
        <Col>
        <p className="text-center px-md-o px-3">&copy; Copyright {new Date().getFullYear()} by <span className="fw-bold"> Eligible Engine</span>, All Right Reserved</p>
        </Col>
      </Row>
     </Container>
    </div>
  )
}

export default FooterComponent
