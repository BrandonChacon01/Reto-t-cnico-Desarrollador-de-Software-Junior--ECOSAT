# Sistema de Seguimiento de Incidencias (Helpdesk UI)

Aplicación web desarrollada como solución al reto técnico para Desarrollador de Software Junior.

## Demo en línea
[Enlace a la aplicación desplegada](https://retotecnico-pi.vercel.app/)

## Descripción y Arquitectura
La aplicación está diseñada bajo el concepto de un Helpdesk multinivel con una interfaz tipo cliente de correo electrónico (Outlook):
- **Capa 1 (Autoservicio / FAQ): Muestra problemas comunes desplegables para reducir la generación de tickets innecesarios. Incluye la opción de crear un ticket si el problema no se resuelve.
- Capa 2 y 3 (Gestión de Tickets): Visualización en bandeja de entrada codificada por colores según su estado (Nuevo - Azul, En progreso - Amarillo, Completado - Verde).
- Regla de Negocio: Se limita la atención a 1 sola incidencia en progreso de manera simultánea para simular la capacidad de atención en tiempo real.

## Tecnologías Utilizadas
- React + Vite
- Tailwind CSS
- LocalStorage (Persistencia de datos)
- Vercel (Hosting)

## Instrucciones para ejecutar en local
1. Clonar el repositorio:
   git clone (https://github.com/BrandonChacon01/Reto-t-cnico-Desarrollador-de-Software-Junior--ECOSAT)
2. Instalar dependencias en la terminal:
    npm i
3. Iniciar el servidor de desarrollo en la terminal:
    npm run dev

## Tiempo invertido y Decisiones
Tiempo aproximado: ~3 horas.

Herramientas de IA utilizadas: GitHub copilot (para acelerar la estructuración de componentes y maquetación).

Decisiones clave: Se optó por una arquitectura SPA con localStorage para garantizar un despliegue rápido, libre de errores de servidor.

## Mejoras futuras
Conexión a un backend real (Node.js/Express) con base de datos (PostgreSQL/MongoDB).
Sistema de autenticación de usuarios y roles reales.