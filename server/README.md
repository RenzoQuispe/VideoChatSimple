### Backend
#### mkcert
Dentro de VideoChatSimple/certs
> mkcert -install
> mkcert localhost 127.0.0.1 videochat.local miapp.local
instalar el certificado raíz (CA) en los otros dispositivos.
La conexión HTTPS sigue siendo cifrada y segura en cuanto a la encriptación: los datos viajan cifrados entre cliente y servidor.
Sin embargo, el navegador no confía en el certificado porque no reconoce la CA que lo firmó (mkcert genera una CA local y privada).