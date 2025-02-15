import Slider from './components/slider.js';
import VideoPlayer from './components/video-player.js';

function cargarDatos() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const sliderContainer = document.getElementById('slider-container');
      const slider = new Slider(sliderContainer);
      slider.loadData(data); // Pasar los datos directamente
    });
}

document.addEventListener('DOMContentLoaded', () => {
  cargarDatos(); // Cargar los datos inicialmente
  // Establecer un intervalo para recargar los datos (ejemplo: cada 5 segundos)
  setInterval(cargarDatos, 30000);
});