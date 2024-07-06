Bu proje, araç ürün yönetimi için bir API sağlar. NestJS kullanarak geliştirilmiş ve PostgreSQL veritabanıyla entegre edilmiştir. Swagger kullanılarak API dokümantasyonu oluşturulmuştur.

## Table of Contents

- [Installation](#installation)
- [Database Design](#database-design)
- [API Documentation](#api-documentation)
- [Notes](#Notes)

## Installation

### Requirements

- Node.js (v14+)
- NestJS CLI
- PostgreSQL

### Steps

1. **Clone project:**

   ```bash
   git clone https://github.com/HuseyinSoylu/supplier-platform.git
   cd supplier-platform
   ```

2. **Install dependencies with npm or yarn:**

```bash
npm install
```

3. Rename **.env.example** to **.env** and change connection infos according to your config

```js
TYPEORM_CONNECTION=postgres
TYPEORM_HOST=localhost
TYPEORM_PORT=5432
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=postgres
TYPEORM_DATABASE=vehicles_db
TYPEORM_SYNCHRONIZE=true
TYPEORM_ENTITIES=dist/**/*.entity{.ts,.js}
```

4. **Set up your PostgreSQL database**
5. **Start application in dev mode**

```bash
npm run start:dev
```

## Database Design

![DB Schema](https://github.com/HuseyinSoylu/supplier-platform/assets/24354858/e1d69cc6-c251-4ac0-8110-a2dddfc196a5)

### Architecture

Rationale: **Division into Three Tables**

1. **Vehicles Table:**
   Stores detailed information about each vehicle, including its origin, specifications, and production details etc.

2. **Suppliers Table:**
   Contains data about suppliers providing components or services related to vehicles.

3. **Products Table:**
   Links vehicles with specific products/components supplied by different suppliers.
   Facilitates tracking of which suppliers provide which components for each vehicle model.

**Why Separate Tables?**

**a. Normalization:** By dividing data into separate tables (Entities), we ensure each table stores information about a single entity type, reducing redundancy and improving data integrity.

**b. Relationship Management:** This structure allows for clear relationships between vehicles, their components, and the suppliers providing those components.

**c. Flexibility:** Enables efficient querying and management of data related to vehicles and their components.

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/api` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.

List of available routes:

**Vehicles routes:**\
`GET /vehicles` - get all vehicles\
`GET /vehicles/:vehicleId` - get a specific vehicle\
`POST /vehicles` - create a new vehicle\
`PUT /vehicles/:vehicleId` - update a specific vehicle\
`DELETE /vehicles/:vehicleId` - delete a specific vehicle

**Suppliers routes:**\
`GET /suppliers` - get all suppliers\
`GET /suppliers/:supplierId` - get a specific supplier\
`POST /suppliers` - create a new supplier\
`PUT /suppliers/:supplierId` - update a specific supplier\
`DELETE /suppliers/:supplierId` - delete a specific supplier\

**Products routes:**\
`GET /products` - get all products\
`GET /products/:productId` - get a specific product\
`POST /products` - create a new product\
`PUT /products/:productId` - update a specific product\
`DELETE /products/:productId` - delete a specific product
