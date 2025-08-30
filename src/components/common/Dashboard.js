import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <Container className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <Row>
        <Col md={4} sm={6} xs={12} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Total Shipments</Card.Title>
              <Card.Text>150</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={6} xs={12} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Pending</Card.Title>
              <Card.Text>45</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={6} xs={12} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Delivered</Card.Title>
              <Card.Text>105</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Placeholder for future chart */}
      <div className="chart-placeholder">Chart will be added here</div>
    </Container>
  );
};

export default Dashboard;