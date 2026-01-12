
# 🍪 Galleta de la Fortuna VTEX IO

Este proyecto es una app construida sobre el ecosistema **VTEX IO** que muestra frases de la fortuna de forma aleatoria en una página del Store Framework. Integra almacenamiento de frases personalizadas en **Master Data v1**, y expone resolvers GraphQL mediante un servicio Node.js para crear, buscar, actualizar y eliminar cookies.

---

## 🎬 Demostración

![Back Admin-App](./assets/screen-capture-_1_.gif)
![BackEnd Admin-GLQ-IDE](./assets/screen-capture-_2_.gif)

## 🧠 Stack Tecnológico

- **VTEX IO Store Framework**
- **VTEX IO Node Service (GraphQL + Master Data v1)**
- **React + Apollo Client**
- **GraphQL Schema propio**

---

## 🚀 Instalación y despliegue

```bash
git clone https://github.com/mamoraca/-vtexio-backend-grapql-valtech.git
cd vtexio-backend-grapql-valtech
vtex login valtech
vtex use mauricio
vtex link
```

Visita la ruta:
```
https://mauricio--valtech.myvtex.com/admin/cookie-aplication
```

---

## 📘 Documentación técnica

### 📦 Arquitectura general

- **React App (`/react`)**  
  Componente `FortuneCookieBlock` muestra una frase aleatoria del backend y permite regenerarla. Usa `Apollo Client` para consumir el resolver `getRandomCookieData`.

- **Node Service (`/node`)**  
  Backend GraphQL que expone 6 resolvers (`Query` y `Mutation`) conectados a **Master Data v1**, utilizando el cliente oficial `@vtex/api`.

---

### 🧠 Uso del Master Data

- **Data Entity**: `CF` (Cookies Fortunes)
- **Campos utilizados**:  
  - `id: ID` (autogenerado por VTEX)  
  - `CookieFortune: String` (frase de la fortuna)

---

# 🍪 VTEX IO - App "Galleta de la Fortuna"

Este proyecto implementa una app en VTEX IO que permite consultar, crear, actualizar y eliminar frases tipo “Galleta de la Fortuna” usando Master Data y GraphQL.

## 📦 Entidades

- **CF (Cookie Fortune)**: Data entity utilizada en Master Data para almacenar las frases de la fortuna.

---

## 📊 GraphQL Schema

```graphql
type CookieData {
  id: ID
  CookieFortune: String
}

type Mutation {
  createCookieData(CookieFortune: String!): CookieData
  updateCookieData(id: ID!, CookieFortune: String!): CookieData
  deleteCookieData(id: ID!): CookieData
}

type Query {
  getCookieData: [CookieData]
  getRandomCookieData: CookieData
  searchCookieData(CookieFortune: String!): CookieData
}
```

---

## 🚀 Resolvers

### 🔍 `Query`

#### `getCookieData`
Retorna todos los documentos de frases de la fortuna almacenadas en Master Data (`CF`), paginadas hasta 100 resultados.

#### `getRandomCookieData`
Obtiene una frase aleatoria del total disponible en la entidad `CF`. Ideal para mostrar una galleta sorpresa.

#### `searchCookieData(CookieFortune: String!)`
Busca una frase específica en base a su texto exacto. Devuelve el primer match encontrado.

---

### ✏️ `Mutation`

#### `createCookieData(CookieFortune: String!)`
Crea un nuevo documento con una frase de la fortuna en la entidad `CF`.

#### `updateCookieData(id: ID!, CookieFortune: String!)`
Actualiza una frase existente identificada por su `id` en la entidad `CF`.

#### `deleteCookieData(id: ID!)`
Elimina una frase de la fortuna basada en su `id`. Antes de borrar, consulta la frase para retornarla como confirmación.

---

## 📌 Queries y Mutations

```graphql
# Obtener todas las frases
query {
  getCookieData {
    id
    CookieFortune
  }
}

# Obtener una frase aleatoria
query {
  getRandomCookieData {
    id
    CookieFortune
  }
}

# Buscar una frase específica
query {
  searchCookieData(CookieFortune: "Quédate con tu esposa") {
    id
    CookieFortune
  }
}

# Crear una frase
mutation {
  createCookieData(CookieFortune: "Hoy tendrás suerte en el código") {
    id
    CookieFortune
  }
}

# Actualizar una frase
mutation {
  updateCookieData(id: "abc-123", CookieFortune: "Cambio importante en tu destino") {
    id
    CookieFortune
  }
}

# Eliminar una frase
mutation {
  deleteCookieData(id: "abc-123") {
    id
    CookieFortune
  }
}
```

---

## 📚 Stack Tecnológico

- VTEX IO
- Master Data v1
- GraphQL
- Node.js

---


## 🎨 Diseño y maquetación

- El bloque de frase se presenta con tipografía clara y espaciado amigable
- El botón "Nueva frase" permite reconsultar sin recargar la página

---

## 🔍 Buenas prácticas aplicadas

| Práctica                        | Implementación                                                      |
|-------------------------------|-----------------------------------------------------------------------|
| GraphQL con tipado fuerte      | Schema y resolvers validados                                         |
| Modularización                 | Carpeta `react` y `node` separadas, funciones aisladas               |
| Manejo de errores              | Todos los resolvers usan `try/catch` y validación de argumentos      |
| Reutilización de componentes   | `FortuneCookieBlock` app Store como Custom Block               |
| Control de estado en frontend  | Uso de `useQuery` y `refetch` desde Apollo Client                    |

---

## 🧪 Workspace de prueba

Puedes probar la app funcionando en el siguiente workspace:

```
https://mauricio--valtech.myvtex.com/valtechhome
```
---

