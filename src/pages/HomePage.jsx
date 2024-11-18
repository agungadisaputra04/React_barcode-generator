import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap";
import { QRCode } from "react-qrcode-logo";
import axios from "axios";
import { BrowserMultiFormatReader } from "@zxing/library";

const HomePage = () => {
  const [link, setLink] = useState("https://sample-link.com");
  const [qrCodeValue, setQRCodeValue] = useState("https://sample-link.com");
  const [showBarcodeText, setShowBarcodeText] = useState(true);
  const inputBarcodeRef = useRef(null);
  const qrRef = useRef(null);
  const [activeKey, setActiveKey] = useState("home");
  const webcamRef = useRef(null);
  const [barcode, setBarcode] = useState("Not Found");
  const [scanning, setScanning] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);

  const generateQRCode = async () => {
    try {
      setQRCodeValue(link);
      setShowBarcodeText(true);
      await axios.post("http://localhost:3001/api/add", { name_link: link });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const focusInputBarcode = () => {
    if (inputBarcodeRef.current) {
      inputBarcodeRef.current.focus();
    }
  };

  const focusInputScan = () => {
    setActiveKey("scan");
  };

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr_code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  useEffect(() => {
    if (!cameraOpen) return;

    const codeReader = new BrowserMultiFormatReader();

    const captureImage = () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
          console.log("No screenshot available.");
          requestAnimationFrame(captureImage);
          return;
        }

        const img = new Image();
        img.src = imageSrc;

        img.onload = () => {
          codeReader
            .decodeFromImage(img)
            .then((result) => {
              console.log("Barcode found:", result.text);
              setBarcode(result.text);
              setScanning(false);
            })
            .catch((err) => {
              console.error("Barcode not found or error:", err);
              requestAnimationFrame(captureImage);
            });
        };
      }
    };

    if (scanning) {
      requestAnimationFrame(captureImage);
    }

    return () => {
      setScanning(false);
      codeReader.reset();
    };
  }, [cameraOpen, scanning]);

  const handleOpenCamera = () => {
    setCameraOpen(true);
    setScanning(true);
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
                Lakukan sesuatu
                <br /> <span>Lebih Mudah</span> <br />
                Bersama kami.
              </h1>
              <p className="mb-4">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias
                voluptas vel aliquam expedita ipsa incidunt quidem rerum, rem
                odit optio commodi inventore eius. Id ducimus, vitae ipsa quam
                sunt fuga.
              </p>
              <button
                className="btn btn-danger btn-lg rounded-1 me-2 mb-xs-0 mb-2"
                onClick={focusInputBarcode}
              >
                Generate
              </button>
              <button
                className="btn btn-outline-danger btn-lg rounded-1 mb-xs-0 mb-2"
                onClick={focusInputScan}
              >
                Scan
              </button>
            </Col>
          </Row>
        </Container>
      </header>

      <Container className="tabs mt-3">
        <Tabs
          id="uncontrolled-tab-example"
          activeKey={activeKey}
          className="mb-5 mt-5"
          onSelect={(k) => setActiveKey(k)}
        >
          <Tab eventKey="home" title="Generate" className="gen1">
            <Container>
              <Row>
                <Col className="rate">
                  <div className="half-width-input fw-bold mt-3">
                    <h5 className="gene fw-bold mb-4">URL</h5>
                    <div className="input-box mt-3">
                      <input
                        type="text"
                        className="input"
                        placeholder="Enter your text here..."
                        ref={inputBarcodeRef}
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="text-left mt-4 mb-3">
                    <button
                      className="btn btn-danger rounded-5"
                      onClick={generateQRCode}
                    >
                      Generate QR
                    </button>
                  </div>
                </Col>
                <Col>
                  {showBarcodeText && (
                    <div>
                      <p className="text-center fw-bold mt-3">
                        Your Barcode Here
                      </p>
                    </div>
                  )}
                  {qrCodeValue && (
                    <div className="text-center mt-3 mb-3" ref={qrRef}>
                      <QRCode
                        value={qrCodeValue}
                        size={256}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        quietZone={10}
                      />
                      <div className="text-center mt-3">
                        <button
                          className="btn btn-outline-primary"
                          onClick={downloadQRCode}
                        >
                          Download QR
                        </button>
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            </Container>
          </Tab>
          <Tab eventKey="scan" title="Scan">
            <Container>
              <Row>
                <Col className="scan">
                  {cameraOpen ? (
                    <div>
                      <div
                        className="mt-0"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "70vh",
                        }}
                      >
                        <Webcam
                          audio={false}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          width={400}
                          height={310}
                          style={{
                            border: "5px solid black",
                            borderRadius: "10px",
                            marginBottom: "10px",
                          }} // Menambahkan marginBottom
                        />
                        <div className="text-center fw-bold mt-0">
                          <p>Barcode: </p>
                          <a href={barcode}>{barcode}</a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center mb-5">
                      <p style={{ fontWeight: "bold" }}>
                        Open Camera bellow for Scanner
                      </p>

                      <button
                        className="btn btn-outline-primary"
                        onClick={handleOpenCamera}
                      >
                        Open Camera
                      </button>
                    </div>
                  )}
                </Col>
              </Row>
            </Container>
          </Tab>
          <Tab eventKey="broadcast" title="Broadcast">
            <Container>
              <Row>
                <Col className="rate">
                  <p>Broadcast is coming soon.</p>
                </Col>
              </Row>
            </Container>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default HomePage;
