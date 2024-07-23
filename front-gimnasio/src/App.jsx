import { useState, useEffect } from 'react';
import './App.css';
import PersonasForm from './components/Personas/PersonasForm';
import PersonasList from './components/Personas/PersonasList';
import MembresiasForm from './components/Membresias/MembresiasForm';
import MembresiasList from './components/Membresias/MembresiasList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';

function App() {
  const [currentTab, setCurrentTab] = useState('personas');
  const [personas, setPersonas] = useState([]);
  const [membresias, setMembresias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchPersonas();
    fetchMembresias();
  }, []);

  const fetchPersonas = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/personas');
      const data = await response.json();
      setPersonas(Array.isArray(data.docs) ? data.docs : []);
    } catch (error) {
      console.error('Error fetching personas', error);
      setPersonas([]);
    }
  };

  const fetchMembresias = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/membresias');
      const data = await response.json();
      setMembresias(Array.isArray(data.docs) ? data.docs : []);
    } catch (error) {
      console.error('Error fetching membresias', error);
      setMembresias([]);
    }
  };

  const handleAddPersona = async persona => {
    try {
      const response = await fetch(`http://localhost:3000/api/personas${editItem ? `/${editItem._id}` : ''}`, {
        method: editItem ? 'PATCH' : 'POST',
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(persona),
      });
      if (response.ok) {
        fetchPersonas();
        handleCloseModal();
      } else {
        console.error('Error adding persona');
      }
    } catch (error) {
      console.error('Error adding persona', error);
    }
  };

  const handleDeletePersona = async cedula => {
    try {
      const response = await fetch(`http://localhost:3000/api/personas/cedula/${cedula}`, { method: 'DELETE' });
      if (response.ok) {
        fetchPersonas();
      } else {
        console.error('Error deleting persona');
      }
    } catch (error) {
      console.error('Error deleting persona', error);
    }
  };

  const handleAddMembresia = async membresia => {
    try {
      const response = await fetch(`http://localhost:3000/api/membresias${editItem ? `/${editItem._id}` : ''}`, {
        method: editItem ? 'PATCH' : 'POST',
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(membresia),
      });
      if (response.ok) {
        fetchMembresias();
        handleCloseModal();
      } else {
        console.error('Error adding membresia');
      }
    } catch (error) {
      console.error('Error adding membresia', error);
    }
  };

  const handleDeleteMembresia = async cedula => {
    try {
      const response = await fetch(`http://localhost:3000/api/membresias/cedula/${cedula}`, { method: 'DELETE' });
      if (response.ok) {
        fetchMembresias();
      } else {
        console.error('Error deleting membresia');
      }
    } catch (error) {
      console.error('Error deleting membresia', error);
    }
  };

  const handleEditItem = item => {
    setEditItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditItem(null);
    setShowModal(false);
  };

  const print = () => {
    console.log(personas);
    console.log(membresias);
  };

  return (
    <div className="App container-fluid grande">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Gestión de Gimnasio</a>
          <div className="navbar-nav">
            <button className={`nav-link ${currentTab === 'personas' ? 'active' : ''}`} onClick={() => setCurrentTab('personas')}>Personas</button>
            <button className={`nav-link ${currentTab === 'membresias' ? 'active' : ''}`} onClick={() => setCurrentTab('membresias')}>Membresías</button>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            {currentTab === 'personas' ? 
              <PersonasForm onSubmit={handleAddPersona} initialData={editItem} /> :
              <MembresiasForm onSubmit={handleAddMembresia} initialData={editItem} />}
          </div>
          <div className="col-md-6">
            {currentTab === 'personas' ? 
              <PersonasList personas={personas} onDelete={handleDeletePersona} onEdit={handleEditItem} /> :
              <MembresiasList membresias={membresias} onDelete={handleDeleteMembresia} onEdit={handleEditItem} />}
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar {currentTab === 'personas' ? 'Persona' : 'Membresía'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentTab === 'personas' ? 
            <PersonasForm onSubmit={handleAddPersona} initialData={editItem} /> :
            <MembresiasForm onSubmit={handleAddMembresia} initialData={editItem} />}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
