# 🏠 HomeOS: Nuestro Hogar Digital

¡Bienvenido a **HomeOS**! Este es vuestro centro de control personal y doméstico, diseñado para gestionar el día a día de casa de forma privada, moderna y eficiente. 👫✨

## 🚀 Inicio Rápido

Para levantar todo el ecosistema en vuestro servidor (o en local) solo necesitas **Docker**:

1.  **Configurar Entorno**: Copia el archivo de plantilla a vuestro `.env`:
    ```bash
    cp .env.production.template .env
    ```
    *(Nota: Si estás en Windows, puedes hacerlo manual o con `copy .env.production.template .env`)*

2.  **Lanzar el Ecosistema**:
    ```bash
    docker compose up -d --build
    ```

3.  **¡Listo! Acceso**:
    - **Web**: [http://localhost:3001](http://localhost:3001)
    - **App Móvil (Expo)**: [http://localhost:8081](http://localhost:8081)

---

## 🏗️ Arquitectura de Microservicios

HomeOS está construido con una arquitectura de vanguardia para que cada parte de la casa sea independiente y escalable:

-   **🌐 Frontend Web**: [Next.js 15](https://nextjs.org/) con Tailwind 4.0 y una estética *premium* de cristal (Glassmorphism).
-   **📱 Mobile App**: [Expo / React Native](https://expo.dev/) para llevar la casa en el bolsillo (iOS/Android).
-   **👤 User Service**: Microservicio en [NestJS](https://nestjs.com/) (Node.js) para la gestión segura de perfiles y login.
-   **💰 Finance Service**: Microservicio en [Symfony](https://symfony.com/) (PHP) para el fondo común y ahorros.
-   **🐍 AI Shopping**: Módulo futuro en [Python](https://www.python.org/) para comparar precios y optimizar la compra.
-   **🗄️ Bases de Datos**: PostgreSQL para finanzas y MongoDB para usuarios.

---

## 🌍 Despliegue en Casa (Home Server)

Para que el frontend y el móvil conecten correctamente cuando estéis fuera de casa o usando WiFi:

1.  Asegúrate de editar el archivo `.env`.
2.  Cambia `localhost` por la **IP de vuestro PC servidor** (ej: `192.168.1.50`).
3.  Utiliza **Cloudflare Tunnel** para un acceso seguro y cifrado desde el exterior sin abrir puertos en el router.

---

## 🛠️ Servicios y Puertos

| Servicio | URL Local | Descripción |
| :--- | :--- | :--- |
| **Web** | `http://localhost:3001` | Interfaz principal de hogar |
| **Mobile** | `http://localhost:8081` | Servidor Metro (Expo Go) |
| **User API** | `http://localhost:3000` | Microservicio de usuarios |
| **Finance API** | `http://localhost:8000` | Microservicio de finanzas |
| **PgAdmin** | `http://localhost:5050` | Gestión de Base de Datos Postgres |
| **Mongo Express** | `http://localhost:8081` | Gestión de Base de Datos Mongo |

---

## ❤️ Personalización

Este proyecto no es una herramienta comercial, es **vuestro**. El tono, los mensajes y las funciones están diseñados para ser cercanos y domésticos. 🏡❤️

-   **Nuestro Hogar**: Panel de estado general.
-   **Shopping**: Gestión inteligente de la compra.
-   **Tareas**: Organización compartida de la casa.
-   **Finanzas**: Fondo común y planes de futuro.

---
*Hecho con ❤️ para un hogar más inteligente.*
