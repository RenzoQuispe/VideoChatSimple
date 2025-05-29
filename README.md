### Video Chat Simple | React + Node.js + PostgreSQL
Servidor web autoalojado en red local con resolución DNS personalizado
#### Arquitectura
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
#### Requerimientos
- mkcert setup
```
└── VideoChatSimple
    ├── certs
    │   ├── cert.pem
    │   └── key.pem
```

- .env setup
```
    PORT_SERVER=
    DB_USER=
    DB_PASSWORD=
    DB_HOST=
    DB_PORT=
    DB_NAME=
```