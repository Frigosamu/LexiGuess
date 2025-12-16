# 📖 Manual de Usuario - LexiGuess

## Bienvenido a LexiGuess

**LexiGuess** es un juego de palabras desafiante e interactivo inspirado en Wordle, donde deberás adivinar palabras en 6 intentos. El juego ofrece un sistema de puntuaciones, logros y ranking para competir con otros jugadores.

---

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Primeros Pasos](#primeros-pasos)
3. [Cómo Jugar](#cómo-jugar)
4. [Perfil de Usuario](#perfil-de-usuario)
5. [Sistema de Logros](#sistema-de-logros)
6. [Ranking](#ranking)
7. [Panel de Administración](#panel-de-administración)
8. [Preguntas Frecuentes](#preguntas-frecuentes)
9. [Solución de Problemas](#solución-de-problemas)

---

## Introducción

LexiGuess es un juego donde:
- **Adivinas palabras** en 6 intentos o menos
- **Ganas puntos** según tu desempeño
- **Desbloqueas logros** completando desafíos
- **Compites globalmente** en el ranking de jugadores
- **Aprendes** nuevas palabras y sus significados

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a Internet
- Una cuenta de usuario (gratuita)

---

## Primeros Pasos

### 1. Acceder a LexiGuess

1. Abre tu navegador y ve a la dirección de LexiGuess
2. Verás la pantalla de **Inicio** con el formulario de login

### 2. Crear una Cuenta (Registro)

Si es tu **primera vez** usando LexiGuess:

1. En la pantalla de Inicio, haz clic en **"¿No tienes cuenta? Registrate ahora"**
2. Se abrirá el formulario de registro. Completa los siguientes campos:
   - **Usuario**: Tu nombre de usuario (máximo 50 caracteres)
   - **Email**: Tu correo electrónico válido
   - **Contraseña**: Una contraseña segura (mínimo 6 caracteres)

3. Haz clic en **"Registrarse"**
4. Verás un mensaje de confirmación y serás redirigido al login
5. Ya puedes iniciar sesión con tus credenciales

⚠️ **Importante**: 
- Guarda tu usuario y contraseña en un lugar seguro
- No compartas tu contraseña con otros
- El email debe ser válido

### 3. Iniciar Sesión

1. En la pantalla de Inicio, ingresa:
   - **Usuario**: Tu nombre de usuario
   - **Contraseña**: Tu contraseña
2. Haz clic en **"Iniciar Sesión"**
3. Si las credenciales son correctas, accederás al menú principal
4. Verás el botón **"Vamos a jugar!"** - haz clic para comenzar

💡 **Consejo**: Marca la página en favoritos para acceso rápido

---

## Cómo Jugar

### Pantalla del Juego

Cuando accedes a una partida, verás:
- **Tablero de 6×5**: 6 filas (intentos) y 5 columnas (letras)
- **Palabra a adivinar**: Una palabra de 5 letras oculta
- **Descripción de la palabra**: Se mostrará al terminar la partida
- **Botones de control**: Para nueva partida o pausar

### Mecánica del Juego

1. **Ingresa letras**: Escribe una letra en cada celda
   - Puedes usar el teclado o tocar las celdas
   - Las letras se convertirán automáticamente a mayúsculas
   - Máximo 1 letra por celda

2. **Presiona Enter** para validar la fila completa
   - Si es una palabra válida, recibirás feedback visual
   - Si no es válida, verás un error

3. **Interpreta los colores**:
   - 🟩 **Verde**: Letra CORRECTA en posición CORRECTA
   - 🟨 **Amarillo**: Letra CORRECTA en posición INCORRECTA (está en otra parte)
   - ⬜ **Gris**: Letra NO existe en la palabra

4. **Objetivo**: Adivina la palabra en 6 intentos o menos

### Ejemplo de Juego

```
Palabra a adivinar: PIANO

Intento 1: ADIOS
Resultado:
- A: Gris (no está en PIANO)
- D: Gris (no está en PIANO)
- I: Verde (posición 2, correcta)
- O: Amarillo (está en PIANO, pero no en posición 4)
- S: Gris (no está en PIANO)

Intento 2: TIGRE
Resultado:
- T: Gris
- I: Verde (posición 2, correcta)
- G: Gris
- R: Gris
- E: Gris

Intento 3: PINO (falta una letra, error)
→ Debes completar 5 letras

Intento 3: PINAO
Resultado:
- P: Verde
- I: Verde
- N: Verde
- A: Verde
- O: Verde
→ ¡GANASTE! 3 intentos, 150 puntos
```

### Sistema de Puntuación

Tu puntuación depende de:
- **Número de intentos usados**:
  - 1 intento: 200 puntos
  - 2 intentos: 180 puntos
  - 3 intentos: 160 puntos
  - 4 intentos: 140 puntos
  - 5 intentos: 120 puntos
  - 6 intentos: 100 puntos
  - Perder: 0 puntos

- **Racha ganadora**: Bonus adicional por ganar partidas consecutivas

### Controles del Teclado

| Acción | Tecla |
|--------|-------|
| Escribir letra | A-Z |
| Mover a la derecha | Flecha derecha |
| Mover a la izquierda | Flecha izquierda |
| Mover hacia arriba | Flecha arriba |
| Mover hacia abajo | Flecha abajo |
| Borrar última letra | Backspace |
| Validar fila | Enter |

### Después de Terminar

- Si **GANAS**: 
  - Recibirás tus puntos
  - Se mostrará la descripción de la palabra
  - Se verificarán logros desbloqueados
  - Podrás jugar una nueva partida

- Si **PIERDES**: 
  - Se revelará la palabra correcta
  - Recibirás 0 puntos (pero es una oportunidad de aprender)
  - Podrás intentar una nueva partida

---

## Perfil de Usuario

### Acceder a tu Perfil

1. Haz clic en el **menú de navegación** (arriba a la izquierda)
2. Selecciona **"Mi Perfil"** o **"Usuario"**
3. Se abrirá tu página de perfil

### Información del Perfil

Tu perfil muestra:
- **Nombre de usuario**: Tu identificador único
- **Email**: Tu correo registrado
- **Fecha de Registro**: Cuándo te uniste a LexiGuess

### Historial de Partidas

Podrás ver todas tus partidas jugadas en una tabla que incluye:

| Columna | Descripción |
|---------|-------------|
| **Palabra** | La palabra que jugaste |
| **Intentos** | Cuántos intentos usaste (1-6) |
| **Resultado** | "Ganada" o "Perdida" |
| **Fecha** | Cuándo jugaste |
| **Puntuación** | Puntos obtenidos |

### Navegación del Historial

- **Paginación**: El historial se divide en páginas de 10 partidas
- **Botones**: Anterior/Siguiente para navegar
- **Indicador**: "Página X de Y" muestra tu posición

💡 **Consejo**: Revisa tu historial para analizar tus mejores desempeños

---

## Sistema de Logros

### ¿Qué son los Logros?

Los logros son **badges especiales** que desbloqueas completando desafíos específicos:
- Primera partida ganada
- Ganar 5 partidas
- Ganar 10 partidas
- Ganar en el primer intento
- Racha de 3 victorias consecutivas
- Y más...

### Ver tus Logros

1. Haz clic en el **menú de navegación**
2. Selecciona **"Mis Logros"**
3. Verás una lista con:
   - **Nombre del logro**: Qué es lo que lograste
   - **Fecha**: Cuándo lo desbloqueaste
   - **Descripción**: Detalles del logro

### Logros Disponibles

| Logro | Descripción | Cómo Desbloquearlo |
|-------|-------------|-------------------|
| 🎮 Primer Juego | Juega tu primera partida | Completa 1 partida |
| 🏆 Primera Victoria | Gana tu primera partida | Gana 1 partida |
| ⚡ Relampago | Gana en 1 intento | Adivina la palabra a la primera |
| 🔥 En Fuego | Gana 3 partidas consecutivas | Mantén racha de 3 victorias |
| 💯 Experto | Gana 50 partidas | Acumula 50 victorias |
| 🧠 Maestro de Palabras | Gana 100 partidas | Acumula 100 victorias |

---

## Ranking

### ¿Qué es el Ranking?

El **Ranking global** es una clasificación de todos los jugadores de LexiGuess ordenados por **puntuación total acumulada**.

### Ver el Ranking

El ranking está **siempre visible** en la barra lateral derecha de la aplicación:
- Muestra el top 10 jugadores
- Actualiza en tiempo real
- Incluye: Posición, nombre usuario, puntuación total

### Tu Posición

- 🥇 **1er lugar**: Jugador con más puntos
- 🥈 **2do lugar**: Segundo mayor puntuación
- 🥉 **3er lugar**: Tercera mayor puntuación
- **Resto**: Ordenados descendentemente

### Información de Contacto

En la barra lateral también encontrarás:
- **Email del desarrollador**: Para reportar bugs o sugerencias
- **Teléfono de contacto**: Para consultas urgentes

💡 **Consejo**: Juega regularmente para subir en el ranking. ¡Compite con amigos!

---

## Panel de Administración

*(Esta sección es solo para usuarios con rol de Administrador)*

### Acceder al Panel Admin

1. Inicia sesión con tu cuenta de administrador
2. En el **menú de navegación**, haz clic en **"Administración"**
3. Se abrirá un menú desplegable con opciones

### Gestionar Palabras

#### ➕ Crear Nueva Palabra

1. En Administración, selecciona **"Nueva Palabra"**
2. Completa el formulario:
   - **Palabra**: La palabra de 5 letras (mayúsculas)
   - **Descripción**: Significado o pista sobre la palabra
   - **Categoría**: Categoría (ej: Animales, Acciones, Objetos)
3. Haz clic en **"Crear Palabra"**
4. Recibirás confirmación de creación exitosa

#### 📋 Ver y Editar Palabras

1. En Administración, selecciona **"Lista de Palabras"**
2. Verás una tabla con todas las palabras creadas

**Funciones disponibles**:
- 🔍 **Buscar**: Usa el campo de búsqueda para encontrar palabras
- 🏷️ **Filtrar por Categoría**: Filtra palabras por categoría
- ✏️ **Editar**: Haz clic en el botón Editar para modificar
- 🗑️ **Eliminar**: Haz clic en Eliminar (con confirmación)

#### ✏️ Editar Palabra

1. En "Lista de Palabras", haz clic en **"Editar"** de la palabra
2. Se abrirá el formulario con los datos actuales
3. Modifica los campos necesarios
4. Haz clic en **"Guardar Cambios"**

### Gestionar Usuarios

#### 📊 Ver Lista de Usuarios

1. En Administración, selecciona **"Lista de Usuarios"**
2. Verás una tabla con todos los usuarios registrados

**Columnas**:
- Usuario
- Email
- Fecha de Registro
- Rol (usuario/admin)
- Acciones

#### 🔍 Buscar Usuarios

1. Usa el campo de **Búsqueda** en la esquina superior
2. Escribe parte del nombre de usuario
3. La lista se filtrará en tiempo real

#### ✏️ Editar Usuario

1. Haz clic en **"Editar"** junto al usuario
2. Podrás modificar:
   - Nombre
   - Email
   - Rol (usuario → admin o vice versa)
3. Haz clic en **"Guardar Cambios"**

#### 🗑️ Eliminar Usuario

1. Haz clic en **"Eliminar"** junto al usuario
2. Se mostrará una confirmación
3. Confirma para eliminar (acción irreversible)

⚠️ **Advertencia**: Eliminar un usuario eliminará todas sus partidas y logros

---

## Preguntas Frecuentes (FAQ)

### Cuenta y Seguridad

**P: ¿Qué hago si olvido mi contraseña?**
A: Actualmente no hay opción de recuperación. Por favor, contacta al administrador en el email proporcionado en el ranking.

**P: ¿Puedo cambiar mi nombre de usuario?**
A: En esta versión no, pero el administrador puede editarlo desde el panel admin.

**P: ¿Es seguro mi email?**
A: Sí, tu email se encripta y solo lo usa LexiGuess para identificarte.

### Juego

**P: ¿Cuál es el tiempo máximo para jugar una partida?**
A: No hay límite de tiempo. Puedes tomarte lo que necesites.

**P: ¿Puedo jugar la misma palabra dos veces?**
A: Sí, el sistema puede sortear la misma palabra, pero tus intentos se registran por separado.

**P: ¿Cómo se calcula mi puntuación en el ranking?**
A: Tu puntuación es la **suma total** de puntos de todas tus partidas ganadas.

**P: ¿Qué pasa si me desconecto durante una partida?**
A: La partida se pierde. Deberás comenzar una nueva al volver a conectarte.

### Logros

**P: ¿Cómo veo todos los logros disponibles?**
A: Algunos logros son ocultos hasta que los desbloquees. Vé a "Mis Logros" para ver los disponibles.

**P: ¿Puedo perder un logro?**
A: No, una vez desbloqueado, el logro es tuyo permanentemente.

### Ranking

**P: ¿Con qué frecuencia se actualiza el ranking?**
A: El ranking se actualiza en **tiempo real** después de cada partida.

**P: ¿Cómo subo en el ranking?**
A: Juega partidas y gana lo máximo de puntos posible. Cuantos más puntos acumules, más alto subirás.

---

## Solución de Problemas

### Problemas de Acceso

**Problema**: "Error al iniciar sesión"
- **Solución**: Verifica que tu usuario y contraseña sean correctos. Recuerda que distingue mayúsculas/minúsculas.

**Problema**: "No puedo crear una cuenta"
- **Solución**: Asegúrate de llenar todos los campos. El usuario y email no pueden estar duplicados.

**Problema**: Pantalla en blanco después de login
- **Solución**: Intenta refrescar la página (F5 o Ctrl+R). Si persiste, limpia el caché del navegador.

### Problemas en el Juego

**Problema**: Las letras no aparecen
- **Solución**: Asegúrate de que el campo está enfocado (con borde azul). Haz clic en la primera celda.

**Problema**: "Palabra no válida" al presionar Enter
- **Solución**: La palabra que ingresaste no existe en la base de datos. Intenta otra combinación.

**Problema**: Los colores no se muestran correctamente
- **Solución**: Recarga la página. Puede ser un problema de caché. Si persiste, intenta otro navegador.

**Problema**: La puntuación no se guardó
- **Solución**: Asegúrate de que presionaste Enter para completar la fila. Verifica tu perfil en el historial.

### Problemas Técnicos Generales

**Problema**: "Conexión perdida" o "Error del servidor"
- **Solución**: Comprueba tu conexión a Internet. Intenta recargar la página. Si sigue fallando, el servidor puede estar en mantenimiento.

**Problema**: La página es muy lenta
- **Solución**: 
  - Cierra pestañas innecesarias
  - Limpia caché y cookies del navegador
  - Intenta con un navegador diferente
  - Comprueba tu conexión de Internet

**Problema**: Los botones no funcionan
- **Solución**: Intenta refrescar la página. Si algunos botones siguen sin funcionar, puede ser un navegador antiguo. Actualiza tu navegador.

### Contacto de Soporte

Si los problemas persisten:
- 📧 **Email**: Consulta el ranking para el email de soporte
- 📱 **Teléfono**: Disponible en el ranking
- 🐛 **Reportar bug**: Describe el problema detalladamente incluyendo:
  - Navegador y versión
  - Pasos para reproducir el problema
  - Mensajes de error exactos

---

## Consejos y Trucos

### 🎯 Estrategia de Juego

1. **Comienza con palabras comunes**: CUERO, TARDE, MENTE
2. **Elimina letras**: Usa tus intentos para descartar letras
3. **Observa patrones**: Nota qué letras son más frecuentes
4. **Piensa en contexto**: Palabras que tengan sentido

### 💡 Maximiza tu Puntuación

- **Objetivo**: Ganar en 1-2 intentos para máxima puntuación
- **Racha**: Intenta ganar partidas consecutivas para bonus
- **Diaria**: Juega una partida cada día para aumentar puntuación total

### 🏆 Sube en el Ranking

- Juega **regularmente**
- Intenta **minimizar intentos**
- Participa en **desafíos especiales** (cuando estén disponibles)
- **Comparte** el juego con amigos para más competencia

### 📚 Aprende Palabras Nuevas

- Lee la **descripción** después de cada partida
- Mantén un **cuaderno** de palabras nuevas
- Busca **sinónimos** para mejorar estrategia

---

## Actualizaciones y Cambios

**Versión Actual**: 1.0

### Próximas Funciones (Planificadas)

- 🏅 Más categorías de palabras
- 📈 Estadísticas detalladas del jugador
- 👥 Modo multijugador en tiempo real
- 🎨 Temas personalizables
- 🌍 Soporte multiidioma

---

## Términos de Uso

Al usar LexiGuess, aceptas:
- No compartir credenciales de otros usuarios
- No intentar acceder a datos de administración sin autorización
- Respetar a otros jugadores en el ranking
- Reportar bugs de forma responsable

---

## Créditos

**LexiGuess** fue desarrollado por el equipo de Proyecto Integrado.

Gracias por jugar. ¡Que disfrutes el juego! 🎮

---

**Última actualización**: Diciembre 2025

Para más información o preguntas, contacta al equipo de soporte a través de los datos proporcionados en el ranking.
