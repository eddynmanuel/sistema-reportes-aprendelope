# Documentación de Endpoints

## Información Importante

Este documento contiene únicamente referencias generales para el desarrollo.

Las URLs reales, tokens de acceso, credenciales y configuraciones sensibles no deben almacenarse en el repositorio público.

---

# Configuración Base

```env
VITE_API_URL=<URL_API>
```

---

# Estructura Esperada

## Dashboard

Método:

```http
GET /dashboard
```

Descripción:

Obtiene los indicadores principales utilizados por el dashboard.

Respuesta esperada:

```json
{
  "ventas": 120,
  "interesados": 340,
  "negociacion": 85,
  "pagosPendientes": 25
}
```

---

## Autenticación

Método:

```http
POST /auth/login
```

Descripción:

Gestiona el proceso de autenticación del usuario.

---

# Buenas Prácticas

* No exponer credenciales.
* No almacenar tokens en el repositorio.
* Utilizar variables de entorno.
* Validar respuestas de la API.
* Manejar errores de conexión adecuadamente.

---

# Estado

Actualmente los endpoints se encuentran sujetos a definición por parte del equipo encargado de los servicios backend.
