import React, { useState } from 'react';
import { Container, Table, Pagination, Form, Modal, Button, Row, Col } from 'react-bootstrap';
import { Search as SearchIcon } from 'react-feather';
import shipmentsData from '../../data/shipments.json';
import '../../styles/ShipmentTable.css';

const ShipmentTable = () => {
  const [shipments, setShipments] = useState(shipmentsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editShipment, setEditShipment] = useState(null);
  const [modalMode, setModalMode] = useState(null); // 'edit', 'add', 'delete'
  const [isEditing, setIsEditing] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const itemsPerPage = 10;

  // Sorting function
  const sortData = (data) => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const filteredShipments = shipments.filter(shipment =>
    (shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
     shipment.status.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === '' || shipment.status === statusFilter)
  );

  const sortedShipments = sortData(filteredShipments);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShipments = sortedShipments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredShipments.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const handleAdd = () => {
    setEditShipment({
      origin: '',
      destination: '',
      sender: '',
      receiver: '',
      weight: '',
      status: 'pending',
      expectedDelivery: ''
    });
    setModalMode('add');
    setIsEditing(true);
    setShowModal(true);
  };

  const handleEditClick = (e, shipment) => {
    e.stopPropagation();
    setEditShipment({ ...shipment });
    setModalMode('edit');
    setIsEditing(false);
    setShowModal(true);
  };

  const handleDeleteClick = (e, shipment) => {
    e.stopPropagation();
    setEditShipment(shipment); // Use editShipment for delete to avoid adding selectedShipment state
    setModalMode('delete');
    setIsEditing(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditShipment(null);
    setModalMode(null);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (modalMode === 'add') {
      const newShipment = { ...editShipment, trackingNumber: `SH00${shipments.length + 1}` };
      setShipments([...shipments, newShipment]);
      console.log('Shipment created:', newShipment);
    } else if (modalMode === 'edit') {
      setShipments(shipments.map(s => s.trackingNumber === editShipment.trackingNumber ? editShipment : s));
      console.log('Shipment updated:', editShipment);
    }
    handleCloseModal();
  };

  const handleDelete = (trackingNumber) => {
    setShipments(shipments.filter(s => s.trackingNumber !== trackingNumber));
    console.log('Shipment deleted:', trackingNumber);
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditShipment(prev => ({ ...prev, [name]: value }));
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return ' ↑↓';
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  const fieldsDisabled = modalMode === 'edit' && !isEditing;

  return (
    <Container className="shipment-table-container" role="region" aria-label="Shipment Tracking Table" style={{ maxWidth: '100%' }}>
      <div className="header-container">
        <h1 className="table-title">Shipment Tracking</h1>
        {!showFilterPanel && (
          <>
            <Button
              variant="outline-secondary"
              className="filter-toggle"
              onClick={() => setShowFilterPanel(true)}
            >
              <SearchIcon size={18} />
            </Button>
            <Button
              variant="primary"
              className="ms-2"
              onClick={handleAdd}
            >
              Add
            </Button>
          </>
        )}
      </div>
      {showFilterPanel && (
        <div className="filter-panel">
          <Row className="mb-3">
            <Col md={6} xs={12}>
              <Form.Control
                type="text"
                placeholder="Search by Tracking Number ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                aria-label="Search shipments"
              />
            </Col>
            <Col md={6} xs={12}>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="status-filter"
                aria-label="Filter by status"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-transit">In Transit</option>
                <option value="delivered">Delivered</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="d-flex justify-content-end align-items-end">
              <Button variant="outline-danger" onClick={() => { setSearchTerm(''); setStatusFilter(''); }} className="me-2 filter-button">Clear</Button>
              <Button variant="outline-secondary" onClick={() => { setShowFilterPanel(false); }} className="me-2 filter-button">Hide</Button>
            </Col>
          </Row>
        </div>
      )}
      <Table striped bordered hover className="shipment-table" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>S.No{getSortIndicator('sNo')}</th>
            <th onClick={() => requestSort('trackingNumber')}>Tracking Number{getSortIndicator('trackingNumber')}</th>
            <th onClick={() => requestSort('origin')}>Origin{getSortIndicator('origin')}</th>
            <th onClick={() => requestSort('destination')}>Destination{getSortIndicator('destination')}</th>
            <th onClick={() => requestSort('status')}>Status{getSortIndicator('status')}</th>
            <th onClick={() => requestSort('expectedDelivery')}>Expected Delivery{getSortIndicator('expectedDelivery')}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentShipments.map((shipment, index) => (
            <tr key={shipment.trackingNumber} className="shipment-row">
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{shipment.trackingNumber}</td>
              <td>{shipment.origin}</td>
              <td>{shipment.destination}</td>
              <td>{shipment.status}</td>
              <td>{shipment.expectedDelivery || 'N/A'}</td>
              <td>
                <Button variant="outline-primary" size="sm" onClick={(e) => handleEditClick(e, shipment)}>Edit</Button>{' '}
                <Button variant="outline-danger" size="sm" onClick={(e) => handleDeleteClick(e, shipment)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-end mt-4">
        <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
        {Array.from({ length: totalPages }, (_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={nextPage} disabled={currentPage === totalPages} />
      </Pagination>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg" className="shipment-modal">
        <Modal.Header closeButton style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
          <Modal.Title>
            {modalMode === 'add' ? 'Add Shipment' : modalMode === 'delete' ? 'Confirm Delete' : 'Edit Shipment'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalMode === 'delete' ? (
            <>
              <p>Are you sure you want to delete shipment {editShipment?.trackingNumber}?</p>
              <Button variant="danger" onClick={() => handleDelete(editShipment.trackingNumber)}>
                Yes
              </Button>{' '}
              <Button variant="secondary" onClick={handleCloseModal}>No</Button>
            </>
          ) : editShipment ? (
            <>
              <Form>
                <Row>
                  {modalMode !== 'add' && (
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Tracking Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="trackingNumber"
                          value={editShipment.trackingNumber}
                          onChange={handleInputChange}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Origin</Form.Label>
                      <Form.Control
                        type="text"
                        name="origin"
                        value={editShipment.origin}
                        onChange={handleInputChange}
                        disabled={fieldsDisabled}
                        placeholder="Enter origin city"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Destination</Form.Label>
                      <Form.Control
                        type="text"
                        name="destination"
                        value={editShipment.destination}
                        onChange={handleInputChange}
                        disabled={fieldsDisabled}
                        placeholder="Enter destination city"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        name="status"
                        value={editShipment.status}
                        onChange={handleInputChange}
                        disabled={fieldsDisabled}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-transit">In Transit</option>
                        <option value="delivered">Delivered</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Expected Delivery</Form.Label>
                      <Form.Control
                        type="date"
                        name="expectedDelivery"
                        value={editShipment.expectedDelivery || ''}
                        onChange={handleInputChange}
                        disabled={fieldsDisabled}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
              {fieldsDisabled ? (
                <>
                  <Button variant="primary" onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>{' '}
                  <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </>
              ) : (
                <>
                  <Button variant="primary" onClick={handleSave}>
                    {modalMode === 'add' ? 'Create' : 'Update'}
                  </Button>{' '}
                  <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                </>
              )}
            </>
          ) : null}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ShipmentTable;