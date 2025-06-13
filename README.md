Calculadora de Luz - Edificio Paola T. 🏢💡
¡Divide los costos de luz y aseo como todo un crack!Bienvenido a CalculadoraLuz, una aplicación web moderna, responsiva y súper práctica construida con Next.js y TypeScript para dividir los costos de electricidad y aseo entre los inquilinos de un edificio. Diseñada específicamente para el Edificio Paola T., esta app te permite calcular cuánto debe pagar cada inquilino según su consumo eléctrico y el número total de apartamentos, y luego compartir los resultados por WhatsApp con un solo clic. ¡Es rápida, intuitiva y está lista para hacerte la vida más fácil! 🚀

🎯 Características

Interfaz Intuitiva: Diseño limpio y optimizado para móviles, con un layout responsivo que se adapta a celulares, tablets y computadoras.
Gestión Dinámica de Inquilinos: Agrega o elimina apartamentos con un clic, con cálculos actualizados al instante.
División Flexible del Aseo: Ingresa el número total de apartamentos en el edificio para dividir el costo de aseo de manera justa, incluso si solo calculas algunos inquilinos.
Cálculos en Tiempo Real: Los resultados se actualizan automáticamente al ingresar los datos del recibo, aseo, consumo y lecturas de medidores.
Integración con WhatsApp: Genera un mensaje formateado con el detalle de costos y compártelo directamente en WhatsApp.
Código Seguro con TypeScript: Desarrollado con TypeScript para garantizar un código robusto y sin errores.
Formato Localizado: Muestra los valores en pesos colombianos (es-CO) con separadores de miles y decimales claros.
Validación de Entradas: Maneja entradas inválidas con elegancia, asegurando cálculos fiables incluso con datos incompletos.
Feedback Visual: Resultados con códigos de color y un diseño moderno para entender los costos de un vistazo.


🛠️ Tecnologías Utilizadas

Framework: Next.js 14 (App Router con 'use client')
Lenguaje: TypeScript para un desarrollo tipo-seguro
Estilos: Tailwind CSS (clases inline) para un diseño responsivo y moderno
Gestión de Estado: React useState y useEffect para actualizaciones dinámicas
Despliegue: Lista para Vercel o cualquier plataforma compatible con Node.js
Dependencias: Mínimas, solo react, next y TypeScript


🚀 Cómo Empezar
Sigue estos pasos para configurar y ejecutar CalculadoraLuz en tu máquina local.
Requisitos Previos

Node.js: Versión 18 o superior
npm o yarn: Para gestionar paquetes
Git: Para clonar el repositorio

Instalación

Clona el Repositorio:
git clone https://github.com/tu-repositorio/calculadora-luz.git
cd calculadora-luz


Instala las Dependencias:Con npm:
npm install

O con yarn:
yarn install


Ejecuta el Servidor de Desarrollo:
npm run dev

O:
yarn dev

Abre http://localhost:3000 en tu navegador para ver la app en acción.

Construye para Producción:
npm run build
npm run start

O:
yarn build
yarn start




📖 Cómo Usar

Ingresa los Datos Generales:

Total de la Luz: Escribe el valor total del recibo de electricidad (en COP).
Costo Aseo: Ingresa el costo total del aseo (en COP).
Consumo del Mes: Ingresa el consumo total de electricidad del período (en kWh).
Total Apartamentos: Ingresa el número total de apartamentos en el edificio (opcional; si no se ingresa, se usa el número de inquilinos calculados).


Gestiona los Inquilinos:

Haz clic en "Agregar Apartamento" para añadir un nuevo inquilino.
Para cada inquilino, ingresa:
Nombre del Inquilino: Nombre opcional (si no se ingresa, se usa "Inquilino X").
Lectura Mes Pasado: Lectura anterior del medidor (en kWh).
Lectura Este Mes: Lectura actual del medidor (en kWh).


Haz clic en "Eliminar" para quitar un inquilino (disponible si hay más de uno).


Revisa los Resultados:

La app calcula automáticamente el consumo, costo de electricidad, costo de aseo y total por inquilino.
Los resultados se muestran por inquilino y se resumen en un total general.


Comparte por WhatsApp:

Haz clic en "Enviar Cálculo por WhatsApp" para generar un mensaje formateado con todos los detalles y abrirlo en WhatsApp.




📸 Capturas de Pantalla



Vista Móvil
Vista Escritorio







Diseño compacto para pantallas pequeñas
Layout detallado para pantallas grandes


(Reemplaza los enlaces de las imágenes con capturas reales tras el despliegue.)

🧩 Estructura del Código
calculadora-luz/
├── pages/
│   └── index.tsx       # Componente principal de la app
├── public/            # Recursos estáticos (ej. favicon)
├── styles/            # Estilos globales (si es necesario)
├── tsconfig.json      # Configuración de TypeScript
├── package.json       # Dependencias y scripts del proyecto
└── README.md          # Este archivo


index.tsx: Contiene toda la lógica de la app, incluyendo gestión de estado, cálculos y UI responsiva.
Interfaces TypeScript: Inquilino y Resultado aseguran tipo-seguridad para los datos de inquilinos y resultados.
Funciones de Formato: formatearPeso y formatearDecimal manejan el formato de números para la localización colombiana.


🌟 Por Qué Es Increíble

Fácil de Usar: Diseñada para inquilinos y administradores, simplifica la división de costos de manera rápida y transparente.
Optimizada para Móviles: Totalmente responsiva, con layouts compactos para celulares y vistas expansivas para escritorios.
Feedback Instantáneo: Los cálculos se actualizan en tiempo real mientras escribes, sin necesidad de refrescar.
Integración con WhatsApp: Comparte resúmenes detallados y profesionales con un solo clic.
Robusta y Segura: TypeScript garantiza un código fiable, y la validación de entradas evita errores.
Personalizable: Fácil de adaptar para otros edificios cambiando el título o las reglas de formato.


🛠️ Notas de Desarrollo

TypeScript: Usa TypeScript estricto para prevenir errores en tiempo de ejecución y mejorar la mantenibilidad.
Diseño Responsivo: Las clases de Tailwind CSS aseguran que la app se vea genial en cualquier dispositivo, con optimizaciones móviles como etiquetas cortas y botones más grandes.
Manejo de Errores: La app maneja entradas inválidas (ej. campos vacíos o valores no numéricos) mostrando ceros cuando es necesario.
Localización: Los formatos de moneda y números usan la localización es-CO para pesos colombianos, pero se pueden ajustar para otras regiones.


🤝 Contribuir
¿Quieres hacer que CalculadoraLuz sea aún más épica? ¡Las contribuciones son bienvenidas!

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/funcionalidad-increible).
Realiza tus cambios y haz commit (git commit -m 'Añade funcionalidad increíble').
Sube la rama (git push origin feature/funcionalidad-increible).
Abre un Pull Request.

Asegúrate de que tu código siga las convenciones de TypeScript y Tailwind del proyecto.

📜 Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

🙌 Agradecimientos

Creado con cariño para los residentes y administradores del Edificio Paola T..
Potenciado por Next.js, TypeScript y Tailwind CSS.
Inspirado en la necesidad de dividir costos de forma justa, transparente y sin complicaciones.


💡 ¡Hagamos que dividir cuentas sea tan fácil como encender una bombilla!Para preguntas, problemas o sugerencias, abre un issue en GitHub o contacta al desarrollador en tu-correo@ejemplo.com.
