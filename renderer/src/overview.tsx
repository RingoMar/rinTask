import React from "react";
import "./theme.css";
import Top from "./scripts/top";
import Cpu from "./scripts/cpuTemp";
import 'bootstrap/dist/css/bootstrap.min.css';
import Net from "./scripts/network";
import Tsk from "./scripts/tasks";
import MAT from "./scripts/meta";
import Disk from "./scripts/disk";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function CenteredGrid() {
  return (
    <div className="">
      <Container fluid="lg">
        <Row>
          <Col sm={8} className="p-3">
            <Tsk />
            <h6 className="bg-secondary-m bg-secondary-text d-flex font-weight-bold justify-content-center text-dark rounded-bottom">TASK LIST</h6>
            <Row>
              <Col sm={6} className="">
                <Disk />
                <h6 className="bg-secondary-m bg-secondary-text d-flex font-weight-bold justify-content-around text-dark rounded-bottom">DISK USE<span className="diskPer"></span></h6>
              </Col>
              <Col sm={6} className="">
                <MAT />


              </Col>
            </Row>
          </Col>
          <Col sm={4} className="p-3 glanceGraph">
            <Top />
            <Cpu />
            <h6 className="bg-secondary-m bg-secondary-text d-flex font-weight-bold justify-content-around text-dark rounded-bottom">CPU TEMP <span className="tempCPU"></span></h6>
            <Net />
            <h6 className="bg-secondary-m bg-secondary-text d-flex font-weight-bold justify-content-center text-dark rounded-bottom">NETWORK | ▼<span className="Downl">0kb</span>▲<span className="Uppers">0kb</span></h6>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
