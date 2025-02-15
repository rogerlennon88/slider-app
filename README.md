# slideshow-app

## Descripción

Este proyecto consiste en una aplicación web desarrollada con HTML, CSS y JavaScript que permite mostrar presentaciones de diapositivas (slideshows) de imágenes PNG y videos WEBM en pantalla completa con una relación de aspecto de 9:16. La aplicación está diseñada para ser modular y fácil de mantener, utilizando componentes CSS y JavaScript, y permite la carga dinámica de contenido desde carpetas específicas para cada vista.

## Características

*   **Slideshow de imágenes y videos**: Muestra imágenes PNG y videos WEBM en pantalla completa con relación de aspecto 9:16.
*   **Contenido dinámico**: Carga el contenido (imágenes y videos) desde carpetas específicas para cada vista, lo que permite actualizar el slideshow sin necesidad de modificar el código.
*   **Configuración mediante JSON**: Permite especificar las imágenes (nombre, ubicación), el tiempo de preproducción de los videos y el orden de los elementos en la secuencia del slideshow a través de archivos JSON para cada vista.
*   **Múltiples vistas**: Permite servir diferentes vistas del slideshow a través de enlaces como `/vista1`, `/vista2`, etc.
*   **Integración con Swiper JS**: Utiliza la biblioteca Swiper JS para la implementación del slideshow, con los archivos JS y CSS incluidos en las carpetas correspondientes.
*   **Diseño modular**: El código JavaScript está organizado de forma modular y los estilos CSS están divididos en componentes para facilitar el mantenimiento y la escalabilidad del proyecto.
*   **Rutas configurables**: Las rutas de las diferentes vistas son configurables mediante JSON.

## Tecnologías utilizadas

*   HTML
*   CSS
*   JavaScript
*   Swiper JS
*   JSON

## Instalación

1.  Clona este repositorio: `git clone https://github.com/tu-usuario/slideshow-app.git`
2.  Abre el proyecto en tu editor de código.
3.  Crea las carpetas `img` y `video` dentro de cada carpeta de vista (por ejemplo, `vista1`, `vista2`).
4.  Copia los archivos JS y CSS de Swiper JS a las carpetas correspondientes.
5.  Crea los archivos JSON de configuración para cada vista, siguiendo la estructura especificada en la sección "Estructura de los archivos JSON".

## Estructura del proyecto

slideshow-app/
├── src/
│   ├── views/
│   │   ├── vista1/
│   │   │   ├── img/
│   │   │   │   ├── imagen1.png
│   │   │   │   └── ...
│   │   │   ├── video/
│   │   │   │   ├── video1.webm
│   │   │   │   └── ...
│   │   │   └── config.json
│   │   ├── vista2/
│   │   │   ├── img/
│   │   │   │   ├── imagen2.png
│   │   │   │   └── ...
│   │   │   ├── video/
│   │   │   │   ├── video2.webm
│   │   │   │   └── ...
│   │   │   └── config.json
│   │   └── ...
│   ├── js/
│   │   ├── components/
│   │   │   ├── slideshow.js
│   │   │   └── ...
│   │   ├── utils.js
│   │   ├── app.js
│   │   └── swiper.js  // Archivos de Swiper JS
│   ├── css/
│   │   ├── components/
│   │   │   ├── slideshow.css
│   │   │   └── ...
│   │   ├── styles.css
│   │   └── swiper.css  // Archivos de Swiper CSS
│   └── index.html
├── .htaccess  // Para redirecciones amigables (opcional)
└── config.php  // Para configuración y rutas (opcional, si usas PHP)

## Estructura de los archivos JSON

Cada archivo JSON de configuración para una vista debe tener la siguiente estructura:

```json
{
  "ruta": "/vista1",
  "elementos": [
    {
      "tipo": "imagen",
      "src": "img/imagen1.png",
      "orden": 1
    },
    {
      "tipo": "video",
      "src": "video/video1.webm",
      "tiempo_preproduccion": 5,
      "orden": 2
    },
    {
      "tipo": "imagen",
      "src": "img/imagen2.png",
      "orden": 3
    }
  ]
}

## Recomendaciones adicionales

*   **DDEV**: Utiliza DDEV para crear un entorno de desarrollo local que simule el servidor de producción. Esto te permitirá probar la aplicación en un entorno similar al real antes de desplegarla.
*   **Ajax**: Implementa la carga dinámica de contenido mediante Ajax para que los cambios en las carpetas de imágenes y videos se reflejen en la vista sin necesidad de recargar la página.
*   **PHP o JavaScript**: Para la configuración de rutas, puedes utilizar tanto PHP como JavaScript. Si utilizas PHP, puedes leer los archivos JSON y generar las rutas dinámicamente. Si utilizas JavaScript, puedes utilizar la API Fetch para obtener los datos de los archivos JSON y configurar las rutas en el cliente.
*   **Optimización**: Optimiza las imágenes y videos para reducir el tiempo de carga de la página.
*   **Accesibilidad**: Asegúrate de que la aplicación sea accesible para personas con discapacidades.