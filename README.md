# Lucky_Blocks

# 🎲 Lucky Block Simulator

Un simulador interactivo de "Lucky Blocks" tipo web SPA (Single Page Application) diseñado para recrear la emoción del "enganche" y la apertura de cajas con un sistema de probabilidades matemáticamente preciso. 

Este proyecto está construido íntegramente con tecnologías web nativas y utilizando vite para correr todo de manera rapido y eficiente, enfocándose en la manipulación del DOM, gestión del estado global y persistencia de datos en el navegador, sin depender de frameworks externos.

## 🚀 Características Principales

* **Sistema de Probabilidades (RNG):** Motor de aleatoriedad ponderada que maneja 7 niveles de rareza, desde *Common* hasta el ultra-raro *Omnisciente*.
* **Economía y Progresión:** Sistema de monedas (Coins) que permite comprar cajas de diferentes tiers (Básica y Premium) y vender objetos duplicados.
* **Sistema de "Pity" (Jackpot):** Mecánica de retención donde la energía acumulada garantiza un drop de alta rareza (Legendary+) al llegar al 100%.
* **Gestión de Inventario y Colección:** Interfaz visual para apilar objetos idénticos y una enciclopedia para rastrear los descubrimientos únicos.
* **Misiones e Intercambio:** Tareas dinámicas para ganar recompensas adicionales y un panel de tradeo de objetos.
* **Perfil y Estadísticas:** Sistema de niveles basado en experiencia (XP) y registro estadístico del jugador (bloques abiertos, mayor rareza obtenida).
* **Persistencia Local:** Uso de `localStorage` para guardar automáticamente el progreso, inventario, monedas y estado de misiones entre sesiones.

## 📊 Sistema de Rarezas y Pesos

El motor del juego utiliza el siguiente balance de probabilidades para las Cajas Básicas:

| Rareza | Probabilidad | Brillo Visual | Ejemplo de Ítem |
| :--- | :--- | :--- | :--- |
| ⚪ Common | 49.99% | Blanco/Gris | Wooden Sword |
| 🟢 Uncommon | 25.00% | Verde | Slime Potion |
| 🔵 Rare | 15.00% | Azul | Magic Ring |
| 🟣 Epic | 7.00% | Morado | Plasma Blade |
| 🟡 Legendary | 2.50% | Dorado | Golden Crown |
| 🔴 Mythic | 0.50% | Rojo Profundo | Vampire Armor |
| ⚫ Omnisciente | 0.01% | Blanco/Morado Neón | Cosmic Artifact |


*El porcentaje puede variar dependiendo de las mejoras que compres*

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura semántica de la SPA.
* **CSS3:** Variables CSS para la tematización, Grid/Flexbox para el diseño responsivo, y animaciones nativas (`@keyframes`) para el *shake* de las cajas y los resplandores de neón.
* **JavaScript (ES6+):** Lógica del RNG, manipulación asíncrona del DOM, gestión del estado global (`gameState`) y almacenamiento local.

## ⚙️ Instalación y Uso

Como el proyecto utiliza tecnologías web nativas, no requiere de un entorno de ejecución complejo (como Node.js) ni procesos de compilación.

1. Clona este repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/lucky-block-simulator.git](https://github.com/tu-usuario/lucky-block-simulator.git)

## 🛜 Sistema de multijugador en tiempo real

Esta es la arquitectura estandar que utilizan "Juegos" como Slither.io o Agar.io.

**Como funciona** Se crea un servidor Node.js ligero que gestiona las redes en tiempo real.
**Mecánicas posibles:**
* 💬 Chat Global y Lista de Jugadores Conectados: Ver quién está en línea y chatear en directo.
* 👑 Tag de jugador: Todos los jugadores verán el tag o rol del jugador en el chat global.
* 🤝 Sistema de Intercambio (Trade System): Puedes pedirle a otro jugador intercambiar un ítem Omnisciente por 10 Leyendas en tiempo real.

## 🚧🚧 Próximamente
* ⚔️ Carreras / Duelos de Lucky Blocks: Entrar a una sala con un amigo, presionar "EMPEZAR" y ver en pantalla dividida quién saca los mejores drops en 30 segundos.
* 🖌️ Sistema de personalización de perfil
* 📁 Fotos para diferenciar de mejor manera los objetos

*Secreto para el rol Owner 👀*

# NUEVO
## 🚀 Nuevas Funcionalidades y Mecánicas de Juego

### ☁️ 1. Sistema de Cuentas y Guardado en la Nube (Cloud Save & Auth)
* **Registro e Inicio de Sesión Persistente:** Autenticación segura mediante contraseñas encriptadas (SHA-256) y gestión de tokens de sesión.
* **Sincronización Automática:** El nivel, las monedas, los ítems del inventario, skins y multiplicadores se guardan automáticamente en el servidor (`users_db.json`).
* **Multi-dispositivo e Incógnito:** Accede a tu progreso desde cualquier navegador o ventana privada sin perder tu avance.

### 🎲 2. Mecánica "Risk It" (Doble o Nada)
* **Apuesta tu Último Hallazgo:** Opción de arriesgar el valor del último ítem obtenido directamente desde el panel de revelado.
* **Multiplicadores Dinámicos:** Multiplica el valor de venta del ítem ($x1.5$, $x2.0$, etc.) si tienes suerte.
* **Desapilado Inteligente:** Si posees múltiples copias de un objeto, el sistema desapilará una sola unidad de forma segura para arriesgarla sin comprometer el resto de tu inventario.

### 🌀 3. Sistema de Prestigio (Renacer / Rebirth)
* **Reinicio de Progreso Estratégico:** Al alcanzar el nivel máximo requerido, puedes realizar un Prestigio para reiniciar tus monedas y nivel.
* **Bonificaciones Permanentes:** Otorga multiplicadores permanentes acumulativos de Suerte (+%), Ganancia de XP (+%) y Precio de Venta (+%).
* **Preservación de Ítems Secretos:** Los objetos de rareza *Secret* conservan su permanencia tras cada renacimiento.

### ⚔️ 4. Luck Battles (Batallas de Suerte 1v1 en Tiempo Real)
* **Desafíos Multijugador:** Reta a cualquier jugador en línea a una batalla rápida por una apuesta de monedas.
* **Competencia de 30 Segundos:** Durante 30 segundos, ambos jugadores abren cajas sin costo para acumular la mayor cantidad de puntos de valor.
* **Premio al Ganador:** El jugador con el mayor puntaje se lleva el pozo de monedas.

### ⭐ 5. Eventos Globales Aleatorios
* **Eventos en Tiempo Real:** El servidor activa automáticamente eventos aleatorios para todos los jugadores conectados:
  * 🍀 **Lucky Hour:** +50% de probabilidad de suerte global.
  * 💰 **Lluvia Dorada:** Inyección instantánea de monedas gratis a todos los jugadores.
  * ☠️ **Hora Maldita:** Reducción temporal de suerte con recompensas de alto riesgo.
  * 🎁 **Lluvia de Cajas:** Cajas gratis durante el periodo del evento.

### 📖 6. Sistema de Colección Enciclopédica
* **Registro de Descubrimiento:** Registro visual de todos los ítems descubiertos en la Loot Table del juego.
* **Bonus por Completitud:** Desbloquear nuevos ítems otorga bonificaciones pasivas permanentes a la Suerte, al Precio de Venta y a la XP recibida.
* **Ocultamiento de Secretos:** Los objetos secretos permanecen ocultos en la enciclopedia hasta ser descubiertos por primera vez.

### 🔥 7. Racha de Suerte (Luck Streak)
* **Multiplicador Progresivo:** Al abrir cajas consecutivamente, acumulas una racha de suerte que incrementa ligeramente las probabilidades de rareza.
* **Reinicio Dinámico:** La racha se reinicia al obtener un ítem de rareza alta (*Legendary*, *Mythic* o *Omnisciente*).

### 🤝 8. Sistema de Intercambios Estilo "Adopt Me"
* **Intercambio Seguro de 4 Slots:** Comercio en vivo con otros jugadores mediante WebSockets.
* **Conteo de Seguridad de 5 Segundos:** Temporizador de bloqueo obligatorio al aceptar una oferta para prevenir estafas o cambios de último segundo.
* **Sincronización de Inventarios:** Transferencia automática e inmediata de ítems al confirmar la transacción.

### 📢 9. Feed Global de Hallazgos y Notificaciones
* **Transmisión en Vivo:** Anuncios automáticos en el chat y feed global cuando un jugador obtiene ítems de rareza *Mythic*, *Omnisciente* o realiza un Prestigio.
* **Indicador de Estado de Servidor:** Badge visual interactivo (`🟢 Online` / `🔴 Offline`) con contador de usuarios conectados en tiempo real.
