import { CollectionConfig } from 'payload/types';

const Membresia: CollectionConfig = {
  slug: 'membresias',
  labels: {
    singular: 'Membresía',
    plural: 'Membresías',
  },
  access: {
    read: () => true, // Permite a cualquiera leer las membresías
    create: () => true, // Permite a cualquiera crear membresías
    update: () => true, // Permite a cualquiera actualizar membresías
    delete: () => true, // Permite a cualquiera eliminar membresías
  },
  fields: [
    {
      name: 'cedula',
      type: 'text',
      label: 'Cédula del Cliente',
      required: true,
    },
    {
      name: 'inicio',
      type: 'date',
      label: 'Inicio de la Membresía',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'fin',
      type: 'date',
      label: 'Fin de la Membresía',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'valor',
      type: 'number',
      label: 'Valor Pagado',
      required: true,
    },
    {
      name: 'tipo',
      type: 'select',
      label: 'Tipo de Membresía',
      required: true,
      options: [
        { label: 'Diaria', value: 'diaria' },
        { label: 'Mensual', value: 'mensual' },
      ],
    },
  ],
};

export default Membresia;
