# Manual de Despliegue (sencillo)

Este documento explica de forma breve cómo desplegar localmente la aplicación LexiGuess (backend Java + frontend Angular). Está pensado para un despliegue rápido en entorno de desarrollo o para generar un `.jar` listo para producción.

## Requisitos
- Java 17+ (o JDK compatible)
- Maven (o usar `mvnw` / `mvnw.cmd` incluidos)
- Node.js (v16+) y npm
- Angular CLI opcional (para desarrollo)

---

## 1) Construir y ejecutar backend (Java / Spring Boot)

Desde la raíz del proyecto (donde está `pom.xml`):

Windows:
```powershell
cd "C:\Users\Enzo\Desktop\Proyecto Integrado\LexiGuess"
./mvnw.cmd clean package -DskipTests
java -jar target\LexiGuess-0.0.1-SNAPSHOT.jar
```

Linux / macOS:
```bash
cd /ruta/al/proyecto/LexiGuess
./mvnw clean package -DskipTests
java -jar target/LexiGuess-0.0.1-SNAPSHOT.jar
```

- El backend arrancará en el puerto configurado en `src/main/resources/application.properties` (por defecto 8080).
- Verifica en `http://localhost:8080` o en los endpoints REST (ej. `/api/...`).

---

## 2) Construir y ejecutar frontend (Angular)

Desde la carpeta del frontend:

```bash
cd src/main/frontend
npm install
npm run build -- --configuration production
```

- El build generará la carpeta `dist/` con los archivos estáticos.

Opciones para servir el frontend:
- Opción rápida (desarrollo):
```bash
npm run start
# o si tienes Angular CLI
ng serve --host 0.0.0.0 --port 4200
```
- Opción simple para producción (sirviendo estático con `http-server`):
```bash
npm install -g http-server
npx http-server dist/ -p 4200
```

---

## 3) Despliegue combinado (servir frontend desde el backend)

La forma más sencilla de desplegar todo junto es copiar los archivos generados por Angular a `src/main/resources/static` del proyecto Spring y volver a empaquetar:

1. Construir frontend:
```bash
cd src/main/frontend
npm install
npm run build -- --configuration production
```
2. Copiar los archivos al backend (desde la raíz del proyecto):
```bash
# Windows (PowerShell)
Remove-Item -Recurse -Force src\main\resources\static\*
Copy-Item -Recurse -Force src\main\frontend\dist\<nombre-app>\* src\main\resources\static\
```
```bash
# Linux/macOS
rm -rf src/main/resources/static/*
cp -R src/main/frontend/dist/<nombre-app>/* src/main/resources/static/
```
(Reemplaza `<nombre-app>` por el nombre de la carpeta generada en `dist`.)

3. Empaquetar backend y ejecutar:
```bash
./mvnw clean package -DskipTests
java -jar target/LexiGuess-0.0.1-SNAPSHOT.jar
```
- Ahora el backend sirve también los archivos estáticos en `/`.

---

## 4) Despliegue en un servidor (muy básico)

- Subir el `jar` (`target/*.jar`) a tu servidor.
- Asegúrate de tener Java instalado en el servidor.
- Ejecutar:
```bash
nohup java -jar LexiGuess-0.0.1-SNAPSHOT.jar > app.log 2>&1 &
```
- Configurar un proxy inverso (NGINX) para manejar TLS y redirigir `80/443` a `localhost:8080`.

---

## 5) Notas y recomendaciones
- Para producción, configura variables de entorno y seguridad (JWT secret, CORS, base de datos externa).
- Habilitar `-DskipTests` solo en despliegues; correr tests en CI antes de desplegar.
- Usar un servidor web (NGINX) frente al `jar` para TLS y cacheo de estáticos.
- Considerar contenedores Docker si quieres un despliegue reproducible.

---

## 6) Comandos útiles (resumen)

```bash
# Backend (build y run)
./mvnw clean package -DskipTests
java -jar target/LexiGuess-0.0.1-SNAPSHOT.jar

# Frontend (build)
cd src/main/frontend
npm install
npm run build -- --configuration production

# Copiar dist al backend (Linux)
cp -R src/main/frontend/dist/<app>/* src/main/resources/static/
```

---

¿Quieres que genere un `script` (PowerShell/Bash) que automatice estos pasos? Si sí, dime en qué sistema (Windows o Linux) lo prefieres y lo creo.