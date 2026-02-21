# HomeOS – Contexto del Proyecto

## Descripción

Aplicación personal para la gestión del hogar (2 usuarios).
Objetivo doble: uso real en el día a día + aprendizaje de arquitectura avanzada.

El sistema está diseñado como **arquitectura de microservicios real**: cada bounded context es un servicio independiente, desplegable por separado, con su propio stack, su propia base de datos y sin dependencias directas de código con otros servicios.

## Bounded Contexts

| Servicio       | Stack               |
|----------------|---------------------|
| finance        | PHP + Symfony       |
| identity       | Node + NestJS       |
| shopping       | Python + FastAPI    |
| notifications  | Go                  |

Otros posibles dominios: planificación de menús, tareas de limpieza, inventario del hogar.

## Estructura del monorepo

```
HomeOS/
├── services/          # Un directorio por bounded context/servicio
├── frontends/         # Vue 3, React/Next.js
├── infrastructure/    # Docker, reverse proxy
├── contracts/         # Esquemas de eventos compartidos entre servicios
└── docs/
    └── openapi/       # Un spec por servicio: finance.yaml, identity.yaml…
```

## Estructura interna de cada servicio

Todos los servicios siguen la misma estructura de capas, adaptada al lenguaje:

```
src/
├── Domain/
│   ├── Model/           # Entidades, Aggregates, Value Objects
│   ├── Repository/      # Interfaces de repositorio (puertos)
│   └── Service/         # Servicios de dominio
├── Application/
│   ├── Command/         # Commands (operaciones de escritura)
│   ├── Query/           # Queries (operaciones de lectura)
│   └── Handler/         # Command Handlers y Query Handlers
└── Infrastructure/
    ├── Http/
    │   └── Controller/  # Controllers REST
    ├── Persistence/     # Implementaciones de repositorio, ORM
    └── Messaging/       # Publicación y consumo de eventos
```

**Regla estricta de dependencias:** `Domain` no depende de ninguna otra capa. `Application` solo depende de `Domain`. `Infrastructure` depende de ambas.

## Arquitectura

- DDD + Arquitectura Hexagonal (Puertos y Adaptadores)
- CQRS cuando aporte valor
- SOLID y Clean Architecture
- API-first: definir el contrato OpenAPI antes de implementar
- Comunicación HTTP sincrónica entre servicios
- Comunicación asíncrona mediante eventos con RabbitMQ

La base de datos y el framework se adaptan al dominio, no al revés.

## Infraestructura

- Docker: un contenedor por servicio
- Una instancia PostgreSQL con base de datos separada por servicio (`finance_db`, `identity_db`, etc.)
  - Cada servicio conecta exclusivamente a su propia BD, nunca a la de otro
  - Permite aislar esquemas, migraciones y modelos de datos por bounded context
  - Facilita migrar un servicio a otro motor (MongoDB, Redis…) sin afectar a los demás
- RabbitMQ para eventos

## Frontends

- Vue 3 y/o React/Next.js
- PWA + Capacitor (móvil, opcional)
- Todos consumen APIs REST del backend

## Testing

Enfoque por capa:

- **Domain**: Tests unitarios puros. Sin framework ni base de datos. Validan reglas de negocio e invariantes. Son los más importantes y los más rápidos.
- **Application**: Tests unitarios con repositorios mockeados (implementando las interfaces del dominio).
- **Infrastructure**: Tests de integración. Usan base de datos o HTTP reales. Son más lentos; opcionales en fases tempranas.

La arquitectura hexagonal facilita el testing porque el dominio es 100% testeable sin infraestructura.

## Orden de implementación

1. Definir alcance pequeño (un solo caso de uso)
2. Modelar el dominio (entidades, reglas, invariantes)
3. Implementar capa Domain + tests unitarios del dominio
4. Implementar capa Application + tests con mocks
5. Añadir Infrastructure (DB, controllers)
6. Documentar la API en `docs/openapi/<servicio>.yaml`
7. Frontend si es necesario

## Evitar siempre

- Diseño guiado por la base de datos
- Lógica de negocio en controllers o infraestructura
- Acoplamiento al framework en Domain o Application
- Compartir código entre servicios (solo contratos conceptuales)
- Acceder a la base de datos de otro servicio directamente
- Over-engineering: soluciones simples e incrementales
