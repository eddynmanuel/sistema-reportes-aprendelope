# Sistema de Reportes - AprendeLoPE

Sistema web para la visualización y análisis de indicadores clave de desempeño (KPIs) relacionados con la gestión de canales digitales de la agencia de marketing AprendeLoPE.

## Descripción

El proyecto tiene como objetivo proporcionar una plataforma centralizada para el monitoreo y análisis de métricas comerciales y operativas, permitiendo una mejor toma de decisiones mediante dashboards interactivos y reportes dinámicos.

La aplicación consumirá información desde una API proporcionada por la empresa, evitando la conexión directa a la base de datos y manteniendo una arquitectura desacoplada.

## Objetivos

* Visualizar KPIs de gestión digital en tiempo real.
* Facilitar el seguimiento de ventas y negociaciones.
* Mejorar la toma de decisiones mediante dashboards interactivos.
* Permitir el filtrado dinámico de información.
* Integrarse con los servicios existentes de la empresa.

---

# Tecnologías Utilizadas

## Frontend

* React
* Vite
* JavaScript (ES6+)
* Tailwind CSS v4
* Axios
* React Router DOM
* Recharts
* Lucide React

## Herramientas de Desarrollo

* Visual Studio Code
* Git
* GitHub
* Postman

## Integraciones

* Slack (Autenticación)
* API REST proporcionada por AprendeLoPE

---

# Requerimientos Funcionales

### RF01

El sistema debe permitir el acceso mediante autenticación integrada con Slack.

### RF02

El sistema debe visualizar los principales indicadores de gestión digital.

### RF03

El sistema debe permitir aplicar filtros dinámicos a la información.

### RF04

El sistema debe ser accesible mediante navegador web.

---

# KPIs Principales

* Porcentaje de Ventas (%Venta)
* Cantidad de Ventas (Q Venta)
* Monto Total de Ventas ($ Venta)
* Promedio de Ventas
* Clientes Interesados
* Clientes en Negociación
* Pagos Pendientes
* Oportunidades Perdidas
* Promedio de Días para Venta
* Mensajes Atendidos por Intervalo de Tiempo
* Cambio de Estado por Intervalo de Tiempo

---

# Estructura del Proyecto

```text
sistema-reportes-aprendelope/
│
├── docs/                              # Documentación técnica del proyecto
│   ├── arquitectura.md                # Arquitectura general del sistema
│   ├── endpoints.md                   # Documentación de APIs consumidas
│   └── requerimientos.md              # Requerimientos funcionales y no funcionales
│
├── public/                            # Recursos públicos accesibles desde la aplicación
│
├── src/
│   │
│   ├── api/                           # Configuración y llamadas HTTP
│   │   ├── axiosClient.js             # Cliente Axios centralizado
│   │   ├── dashboardApi.js            # Endpoints relacionados al dashboard
│   │   └── authApi.js                 # Endpoints relacionados a autenticación
│   │
│   ├── assets/                        # Recursos estáticos
│   │   ├── images/                    # Imágenes del proyecto
│   │   └── icons/                     # Íconos personalizados
│   │
│   ├── components/                    # Componentes reutilizables
│   │   │
│   │   ├── common/                    # Componentes genéricos reutilizables
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── Modal.jsx
│   │   │
│   │   ├── dashboard/                 # Componentes específicos del dashboard
│   │   │   ├── KpiCard.jsx
│   │   │   ├── DashboardHeader.jsx
│   │   │   └── SummarySection.jsx
│   │   │
│   │   ├── charts/                    # Componentes de gráficos
│   │   │   ├── SalesChart.jsx
│   │   │   ├── FunnelChart.jsx
│   │   │   └── MessagesChart.jsx
│   │   │
│   │   └── filters/                   # Filtros reutilizables
│   │       ├── DateFilter.jsx
│   │       ├── ChannelFilter.jsx
│   │       └── AdvisorFilter.jsx
│   │
│   ├── pages/                         # Páginas principales
│   │   ├── LoginPage.jsx
│   │   │
│   │   ├── DashboardPage.jsx
│   │   │
│   │   └── NotFoundPage.jsx
│   │
│   ├── layouts/                       # Layouts reutilizables
│   │   ├── MainLayout.jsx
│   │   └── AuthLayout.jsx
│   │
│   ├── hooks/                         # Custom Hooks
│   │   ├── useDashboard.js
│   │   ├── useFilters.js
│   │   └── useAuth.js
│   │
│   ├── contexts/                      # Context API para estado global
│   │   ├── AuthContext.jsx
│   │   └── DashboardContext.jsx
│   │
│   ├── services/                      # Lógica de negocio
│   │   ├── dashboardService.js
│   │   └── authService.js
│   │
│   ├── utils/                         # Funciones auxiliares
│   │   ├── formatCurrency.js
│   │   ├── formatPercentage.js
│   │   ├── formatDate.js
│   │   └── calculateKpis.js
│   │
│   ├── constants/                     # Constantes globales
│   │   ├── routes.js
│   │   ├── apiEndpoints.js
│   │   └── dashboardConfig.js
│   │
│   ├── routes/                        # Configuración de rutas
│   │   └── AppRoutes.jsx
│   │
│   ├── styles/                        # Estilos globales
│   │   └── globals.css
│   │
│   ├── App.jsx                        # Componente raíz
│   ├── main.jsx                       # Punto de entrada de React
│   └── index.css                      # Configuración principal de Tailwind CSS
│
├── .env                               # Variables de entorno
├── .gitignore                         # Archivos ignorados por Git
├── README.md                          # Documentación principal
├── package.json                       # Dependencias y scripts
├── vite.config.js                     # Configuración de Vite
├── eslint.config.js                   # Configuración de ESLint
└── tailwind.config.js                 # Configuración de Tailwind CSS
```

---

# Instalación

## Clonar repositorio

```bash
git clone <url-del-repositorio>
```

## Ingresar al proyecto

```bash
cd sistema-reportes-aprendelope
```

## Instalar dependencias

```bash
npm install
```

---

# Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto.

```env
VITE_API_URL=http://localhost:3000/api
```

---

# Ejecutar Proyecto

Modo desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

---

# Generar Build de Producción

```bash
npm run build
```

---

# Vista Previa del Build

```bash
npm run preview
```

---

# Autor

Eddyn Manuel Cajavilca Chávez

Proyecto de Prácticas Profesionales - AprendeLoPE
