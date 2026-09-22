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
