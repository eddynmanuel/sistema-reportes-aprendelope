# Arquitectura del Sistema

## Descripción

El sistema adopta una arquitectura desacoplada basada en el consumo de APIs REST.

La aplicación frontend es responsable de la visualización y presentación de la información, mientras que la obtención y procesamiento de datos se realiza mediante servicios externos proporcionados por la empresa.

---

# Arquitectura General

Frontend (React + Vite)
│
▼
API REST
│
▼
Servicios de Datos de la Empresa

---

# Componentes Principales

## Frontend

Responsable de:

* Renderizado de dashboards.
* Visualización de KPIs.
* Aplicación de filtros.
* Gestión de navegación.
* Gestión de sesión del usuario.

## API

Responsable de:

* Exponer los datos necesarios para el dashboard.
* Proveer información consolidada para los indicadores.

---

# Tecnologías

## Frontend

* React
* Vite
* JavaScript
* Tailwind CSS
* Axios
* React Router DOM
* Recharts

## Integraciones

* Slack
* API REST corporativa

---

# Escalabilidad

La arquitectura permite:

* Incorporar nuevos dashboards.
* Agregar nuevos indicadores.
* Consumir múltiples endpoints.
* Integrar futuras funcionalidades sin afectar la estructura principal.
