# Invera Frontend Challenge

Este repositorio contiene un servidor mock con una API para desarrollar el challenge de Frontend según el diseño proporcionado.

## Objetivo

Desarrollar una interfaz de usuario que consuma la API mock y represente los datos como se muestra en el diseño de referencia. La interfaz debe ser fiel al diseño y funcional.

El diseño debe seguir los lineamientos del diseño del Figma: https://www.figma.com/design/kLncsqFok4K3IDw5EV8FRT/Challenge-Frontend?node-id=0-1&t=4KH3YQAGs1sDispi-1

## Estructura del proyecto

El proyecto está organizado en dos carpetas principales:

- `/server` - Contiene la API mock
- `/client` - En este directorio crearas la solucion FrontEnd

## Cómo empezar

1. Hace un fork del repositorio para tu cuenta personal de GitHub
2. Cloná tu fork: `git clone https://github.com/TU_USUARIO/NOMBRE_REPO.git`
3. Entrá al directorio del proyecto: `cd NOMBRE_REPO`

### Configurar y ejecutar el servidor

1. Navega a la carpeta del servidor: `cd server`
2. Instala las dependencias: `npm install`
3. Inicia el servidor: `npm run dev`

### Desarrollar el cliente

1. Navega a la carpeta del cliente: `cd client`
2. Crea tu aplicación frontend usando las herramientas permitidas
3. Desarrolla la interfaz según el diseño proporcionado
4. Conecta tu aplicación con la API mock del servidor

### Requerimientos de entrega:
- Hacer un fork del proyecto y pushearlo en github.
- La solución debe correr correctamente.
- El Readme debe contener todas las instrucciones para poder levantar la aplicación, en caso de ser necesario, y explicar cómo se usa.

## Requisitos

### Obligatorios
- Implementar la vista de usuarios con todas las secciones mostradas en el diseño:
  - Estadísticas generales (Total Users, New Users, Top Users, Other Users)
  - Gráfico circular con estadísticas (Organic, Social, Direct)
  - Tabla de usuarios con paginación
- Consumir la API mock para obtener los datos de usuarios
- Implementar paginación en la tabla de usuarios
- Respetar el diseño visual proporcionado
- El código debe ser limpio y bien estructurado
- Responsive design (adaptable a diferentes dispositivos)

### Extras
- Agregar funcionalidad de búsqueda
- Agregar funcionalidad para agregar, editar y eliminar usuarios
- Implementar ordenamiento en las columnas de la tabla
- Añadir animaciones y transiciones
- Añadir pruebas unitarias y/o de integración
- Implementar modo oscuro/claro

## Herramientas recomendadas
- React.js
- TypeScript (recomendado)
- Next.js (opcional)
- CSS/SCSS, Tailwind CSS, Styled-components
- ShadCN, Material UI, Chakra UI u otras bibliotecas de componentes
- Jest, React Testing Library para pruebas

## API del servidor

La API está construida con json-server v0.17 y cuenta con los siguientes endpoints:

- `GET /users` - Obtiene la lista de usuarios (50 usuarios predefinidos)
  - Parámetros de consulta:
    - `_page=1&_limit=10` - Paginación
    - `q=texto` - Búsqueda global
    - `_sort=campo&_order=asc|desc` - Ordenamiento (ej: _sort=name&_order=desc)
    - `status=Online|Offline` - Filtro por estado

- `GET /users/:id` - Obtiene un usuario específico por ID
- `POST /users` - Crea un nuevo usuario
- `PUT /users/:id` - Actualiza un usuario existente
- `DELETE /users/:id` - Elimina un usuario

- `GET /statics` - Obtiene las estadísticas generales (totalUsers, newUsers, topUsers, otherUsers)
- `GET /userTypes` - Obtiene los datos para el gráfico circular (distribución de usuarios por tipo)


¡Buena suerte! 