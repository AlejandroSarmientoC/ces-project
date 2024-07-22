import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function PersonasList({ personas, onEdit, onDelete }) {
  return (
    <div className="container mt-3">
      <h2>Listado de Personas</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Talla</th>
            <th>Peso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personas.length > 0 ? (
            personas.map(persona => (
              <tr key={persona.cedula}>
                <td>{persona.cedula}</td>
                <td>{persona.nombre}</td>
                <td>{persona.apellido}</td>
                <td>{persona.talla}</td>
                <td>{persona.peso}</td>
                <td>
                  <Button variant="info" onClick={() => onEdit(persona)}>Editar</Button>
                  <Button variant="danger" onClick={() => onDelete(persona.cedula)}>Eliminar</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No hay personas registradas.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

PersonasList.propTypes = {
  personas: PropTypes.arrayOf(PropTypes.shape({
    cedula: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    apellido: PropTypes.string.isRequired,
    talla: PropTypes.number.isRequired,
    peso: PropTypes.number.isRequired
  })).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func.isRequired
};

export default PersonasList;
