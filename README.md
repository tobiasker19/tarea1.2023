# tarea1.2023
Sistema de caché

VIDEO DE LA TAREA: https://drive.google.com/drive/folders/1t72G6h-46G6C9V-9sPGNsxfezcffS8c8?usp=sharing

Iniciar Sistema de cache:
cd .\src\REST\
docker-compose up

Pruebas con REST:
cd .\src\REST\
node .\index.js
cd .\src\Mediciones\
node .\api_call.js

Pruebas con gRPC
cd .\src\gRPC\
node .\gRPC_Server.js
node .\gRPC_Client.js
cd .src\Mediciones\
node .\api_call.js
