import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function MembresiasForm({ onSubmit, initialData }) {
  const [membresia, setMembresia] = useState({
    cedula: '',
    inicio: '',
    fin: '',
    valor: '',
    tipo: ''
  });

  useEffect(() => {
    if (initialData) {
      setMembresia(initialData);
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMembresia(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit(membresia);
    }
  };

  const validateForm = () => {
    const { cedula, inicio, fin, valor } = membresia;
    const today = new Date().toISOString().split('T')[0];

    if (cedula.length !== 10) {
      alert('La cédula debe tener 10 números.');
      return false;
    }

    if (new Date(inicio) < new Date(today)) {
      alert('La fecha de inicio no puede ser menor al día actual.');
      return false;
    }

    if (new Date(fin) < new Date(inicio)) {
      alert('La fecha de fin no puede ser menor a la fecha de inicio.');
      return false;
    }

    if (parseFloat(valor) <= 0) {
      alert('El valor debe ser un número positivo.');
      return false;
    }

    return true;
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-3">
      <div className="mb-3">
        <label htmlFor="cedula" className="form-label">Cédula del Cliente</label>
        <input type="text" className="form-control" id="cedula" name="cedula" value={membresia.cedula} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="inicio" className="form-label">Inicio de la Membresía</label>
        <input type="date" className="form-control" id="inicio" name="inicio" value={membresia.inicio} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="fin" className="form-label">Fin de la Membresía</label>
        <input type="date" className="form-control" id="fin" name="fin" value={membresia.fin} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="valor" className="form-label">Valor Pagado</label>
        <input type="number" className="form-control" id="valor" name="valor" value={membresia.valor} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="tipo" className="form-label">Tipo de Membresía</label>
        <select className="form-control" id="tipo" name="tipo" value={membresia.tipo} onChange={handleChange} required>
          <option value="">Seleccione una opción</option>
          <option value="diaria">Diaria</option>
          <option value="mensual">Mensual</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
  );
}

MembresiasForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object
};

export default MembresiasForm;
