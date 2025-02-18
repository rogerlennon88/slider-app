import Slider from "./components/slider.js";
import VideoPlayer from "./components/video-player.js";

const cargarDatos = () => {
  // Usar arrow function aquí
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const sliderContainer = document.getElementById("slider-container");
      const slider = new Slider(sliderContainer, cargarDatos);
      slider.loadData(data);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  cargarDatos();

  const fullscreenButton = document.getElementById("fullscreen-button");

  fullscreenButton.addEventListener("click", () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.getElementById("slider-container").requestFullscreen();
    }
  });
});
