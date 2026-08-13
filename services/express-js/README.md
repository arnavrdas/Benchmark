# Benchmark ー ExpressJS

## User Features
- *Authentication:* JWT access tokens

## Developer Features
- DX
  - *Static Typing:* TypeScript
  - *Request Validation:* Zod

## Project Structure
```
express-js
│
├── src/                              Containes all application source code
│   │
│   ├── server                        1. Creates Express App. Starts the server. Forwards requests to Routers.
│   │
│   ├── modules/
│   │   └── feature/
│   │       ├── *.router              2. Validates schemas and forwards request to it's respective controller.
│   │       ├── *.controller          3. Calls services, and sends back response.
│   │       ├── *.validator           4. Validates request data.
│   │       ├── *.service             5. Contains bussiness logic. Calls repositories for data oprations.
│   │       ├── *.repository          6. Handles data operations. Communicates with database using Models/ORM.
│   │       └── *.model               7. Defines database schemas & interacts with the database.
│   │
│   ├── config/                       Application configurations which depend on the environment
│   │
│   └── shared/                       Shared code reused across modules
│       ├── declarations/             Global TypeScript type definitions
│       ├── middlewares/
│       ├── types/                    TypeScript types
│       └── utils/                    Helper functions
│
├── tests/
│
├── .env
│
└── tsconfig.json                     TypeScript Configurations
```