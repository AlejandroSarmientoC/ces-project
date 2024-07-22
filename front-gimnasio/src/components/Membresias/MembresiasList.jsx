import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const MembresiasList = ({ membresias, onDelete, onEdit }) => {
  if (!Array.isArray(membresias)) {
    console.error("Expected an array but got:", membresias);
    return null;
  }

  return (
    <div>
      <h2>Listado de Membresías</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {membresias.map(membresia => (
            <tr key={membresia.cedula}>
              <td>{membresia.cedula}</td>
              <td>{new Date(membresia.inicio).toLocaleDateString()}</td>
              <td>{new Date(membresia.fin).toLocaleDateString()}</td>
              <td>{membresia.valor}</td>
              <td>{membresia.tipo}</td>
              <td>
                <Button variant="primary" onClick={() => onEdit(membresia)}>Editar</Button>
                <Button variant="danger" onClick={() => onDelete(membresia.cedula)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

MembresiasList.propTypes = {
  membresias: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default MembresiasList;
