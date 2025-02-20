import VideoPlayer from './video-player.js';

class Slider {
  constructor(container, cargarDatos) {
    this.container = container;
    this.videoNames = []; // Inicializar videoNames como un array vacío
    this.currentIndex = 0;
    this.videoPlayers = [];
    this.reproductionCounter = 0;
    this.maxReproductions = 0;
    this.cargarDatos = cargarDatos;
  }

  loadData(data) {
    this.videoNames = data.videos || []; // Asignar un array vacío si data.videos no existe
    this.maxReproductions = data.maxReproductions || 3;
    this.render();
  }

  render() {
    this.container.innerHTML = '';
    this.container.classList.add('slider-container');
    this.videoPlayers = [];

    if (this.videoNames.length === 0) return; // Salir si no hay videos

    this.videoNames.forEach(videoName => {
      const slide = document.createElement('div');
      slide.classList.add('slide');

      const videoPlayer = new VideoPlayer({ location: `videos/${videoName}` }, this);
      slide.appendChild(videoPlayer.render());
      this.videoPlayers.push(videoPlayer);
      this.container.appendChild(slide);
    });

    setTimeout(() => {
      if (this.videoPlayers.length > 0) {
        this.videoPlayers[0].play();
      }
    }, 500);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.videoNames.length;
    const nextVideoPlayer = this.videoPlayers[this.currentIndex];

    if (nextVideoPlayer && nextVideoPlayer.video) {
      const playPromise = nextVideoPlayer.video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.container.scrollTo({
            left: this.container.offsetWidth * this.currentIndex,
            behavior: 'smooth'
          });
        }).catch(error => {
          console.error("Error de reproducción:", error);
          this.container.scrollTo({
            left: this.container.offsetWidth * this.currentIndex,
            behavior: 'smooth'
          });
        });
      } else {
        this.container.scrollTo({
          left: this.container.offsetWidth * this.currentIndex,
          behavior: 'smooth'
        });
      }
    } else {
      this.container.scrollTo({
        left: this.container.offsetWidth * this.currentIndex,
        behavior: 'smooth'
      });
    }

    if (this.currentIndex === 0) {
      this.reproductionCounter++;
      console.log("Contador de reproducciones:", this.reproductionCounter);
      if (this.reproductionCounter >= this.maxReproductions) {
        this.reproductionCounter = 0;
        this.cargarNuevosDatos();
      }
    }
  }

  cargarNuevosDatos() {
    fetch('data.json')
      .then(response => response.json())
      .then(newData => {
        this.videoNames = newData.videos || []; // Asignar un array vacío si newData.videos no existe
        this.maxReproductions = newData.maxReproductions || 3;

        const lastVideoPlayer = this.videoPlayers[this.videoPlayers.length - 1];

        if (lastVideoPlayer && lastVideoPlayer.video) {
          lastVideoPlayer.video.addEventListener('ended', () => {
            this.render();
          }, { once: true });
        } else {
          this.render();
        }
      });
  }
}

export default Slider;