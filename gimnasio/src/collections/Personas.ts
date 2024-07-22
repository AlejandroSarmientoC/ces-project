import { CollectionConfig } from 'payload/types';

const Personas: CollectionConfig = {
  slug: 'personas',
  labels: {
    singular: 'Persona',
    plural: 'Personas',
  },
  access: {
    read: () => true, // Permite a cualquiera leer las personas
    create: () => true, // Permite a cualquiera crear personas
    update: () => true, // Permite a cualquiera actualizar personas
    delete: () => true, // Permite a cualquiera eliminar personas
  },
  fields: [
    {
      name: 'cedula',
      type: 'text',
      label: 'Cédula',
      required: true,
    },
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre',
      required: true,
    },
    {
      name: 'apellido',
      type: 'text',
      label: 'Apellido',
      required: true,
    },
    {
      name: 'talla',
      type: 'number',
      label: 'Talla',
      required: true,
    },
    {
      name: 'peso',
      type: 'number',
      label: 'Peso',
      required: true,
    },
  ],
};

export default Personas;
