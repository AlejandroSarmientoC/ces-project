import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function PersonasForm({ onSubmit, initialData }) {
  const [persona, setPersona] = useState({
    cedula: '',
    nombre: '',
    apellido: '',
    talla: '',
    peso: ''
  });

  useEffect(() => {
    if (initialData) {
      setPersona(initialData);
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPersona(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit(persona);
    }
  };

  const validateForm = () => {
    const { cedula, talla, peso } = persona;

    if (cedula.length !== 10) {
      alert('La cédula debe tener 10 números.');
      return false;
    }

    if (parseFloat(talla) <= 0 || parseFloat(talla) >= 10 || !/^\d+(\.\d{1,2})?$/.test(talla)) {
      alert('La talla debe ser un número positivo con hasta dos decimales.');
      return false;
    }

    if (parseFloat(peso) <= 0 || parseFloat(peso) > 600) {
      alert('El peso debe ser un número positivo y no mayor a 600.');
      return false;
    }

    return true;
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-3">
      <div className="mb-3">
        <label htmlFor="cedula" className="form-label">Cédula</label>
        <input type="text" className="form-control" id="cedula" name="cedula" value={persona.cedula} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input type="text" className="form-control" id="nombre" name="nombre" value={persona.nombre} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="apellido" className="form-label">Apellido</label>
        <input type="text" className="form-control" id="apellido" name="apellido" value={persona.apellido} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="talla" className="form-label">Talla</label>
        <input type="number" step="0.01" className="form-control" id="talla" name="talla" value={persona.talla} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="peso" className="form-label">Peso</label>
        <input type="number" className="form-control" id="peso" name="peso" value={persona.peso} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
  );
}

PersonasForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object
};

export default PersonasForm;
