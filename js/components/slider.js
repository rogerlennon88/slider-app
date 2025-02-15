import VideoPlayer from './video-player.js';

class Slider {
  constructor(container) {
    this.container = container;
    this.items = [];
    this.currentIndex = 0;
    this.videoPlayers = []; // Array para guardar los VideoPlayer
  }

  loadData(data) {
    this.items = data.items;
    this.render();
  }

  render() {
    this.container.innerHTML = '';
    this.container.classList.add('slider-container');
    this.videoPlayers = []; // Inicializar el array de VideoPlayers

    this.items.forEach(item => {
      const slide = document.createElement('div');
      slide.classList.add('slide');

      if (item.type === 'video') {
        const videoPlayer = new VideoPlayer(item, this);
        slide.appendChild(videoPlayer.render());
        this.videoPlayers.push(videoPlayer); // Añadir al array
      } else if (item.type === 'image') {
        const img = document.createElement('img');
        img.src = item.location;
        slide.appendChild(img);
      }

      this.container.appendChild(slide);
    });

    // Iniciar la reproducción del primer video
    if (this.videoPlayers.length > 0) {
      this.videoPlayers[0].play();
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.container.scrollTo({
      left: this.container.offsetWidth * this.currentIndex,
      behavior: 'smooth'
    });

    // Iniciar la reproducción del siguiente video
    if (this.videoPlayers.length > 0) {
      this.videoPlayers[this.currentIndex].play();
    }
  }
}

export default Slider;