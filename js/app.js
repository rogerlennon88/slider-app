import Slider from './components/slider.js';
import VideoPlayer from './components/video-player.js';

document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.getElementById('slider-container');
  const slider = new Slider(sliderContainer);
  slider.loadData('data.json');
});