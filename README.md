# Video Chat Simple | React + Node.js + PostgreSQL
Servidor web autoalojado en red local con resolución DNS personalizado
## Arquitectura
                    ┌─────────────────────┐
                    │  Dispositivos LAN   │
                    └─────────┬───────────┘
                              │  
                              │  DNS query: videochat.local
                              ▼
                    ┌─────────────────────┐
                    │  Servidor DNS local │◄────────────┐
                    │      (dnsmasq)      |             │
                    └─────────┬───────────┘             │
                              │                         |
                videochat.local → 192.168.1.10          │
                              ▼                         │
                ┌──────────────────────────┐            │
                │    Servidor web local    │            │
                │(Node, Apache, postgresql)│            │
                │      HTTPS(mkcert)       │            │
                └──────────────────────────┘            │
                                                        ▼
                                            ┌──────────────────────────┐
                                            │  CA instalada en clientes│
                                            │ (opcional para evitar    │
                                            │  advertencias HTTPS)     │
                                            └──────────────────────────┘
## Requerimientos
### mkcert setup
Primero crear "locally-trusted development certificates" con mkcert
```
git clone https://github.com/RenzoQuispe/VideoChat.git
mkdir certs
cd certs
mkcert videochat.local 192.168.1.10   # Ejemplo
```
Y renombrar los archivos creados de la siguiente forma:
```
└── VideoChat
    ├── certs
    │   ├── cert.pem
    │   └── key.pem
```
### .evn setup
- .env setup backend (cliente/.env)
    Ejemplo:
    ```
    PORT_SERVER=443
    DB_USER=admin_videochat
    DB_PASSWORD=123456789
    DB_HOST=db
    DB_PORT=5432
    DB_NAME=videochat
    JWT_SECRET=unallavesecretadificildedescifrar
    DB_RUTA_IMAGENES=/home/renzoquispe/Escritorio/Renzo/Proyectos/img/videochat/uploads
    VITE_API_URL=https://192.168.1.10/api
    ```

- .env setup frontend (server/.env)
    Ejemplo:
    ```
    VITE_API_URL=https://192.168.1.10/api
    ```

## Inicio Rapido con Docker
```
docker-compose up --build
```