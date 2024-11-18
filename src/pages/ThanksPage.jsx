import { useEffect, useState } from "react";
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/data"); // API Anda
      const result = await response.json();
      setData(result); // Simpan data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="homepage">
      <header
        className="w-100 min-vh-100 d-flex align-items-center"
        id="header-section"
      >
        <Container>
          <Row className="header-box d-flex align-items-center">
            <Col lg="6">
              <h1 className="mb-4">
                Thank you
                <br /> <span>for</span> <br />
                visited this website.
              </h1>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </Col>
          </Row>
          <Row>
            {data.map((item, index) => (
              <Col key={index}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </header>
      <Tabs
        defaultActiveKey="thanks"
        className="thx "
        id="uncontrolled-tab-example"
      >
        <Tab eventKey="home" className="thx " title="Home">
          <p>Content for Home</p>
        </Tab>
        <Tab eventKey="profile" className="thx" title="Profile">
          <p>Content for Profile</p>
        </Tab>
      </Tabs>
    </div>
  );
};

export default App;
