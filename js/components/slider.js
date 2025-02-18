import VideoPlayer from './video-player.js';

class Slider {
  constructor(container, cargarDatos) {
    this.container = container;
    this.items = [];
    this.currentIndex = 0;
    this.videoPlayers = [];
    this.reproductionCounter = 0;
    this.maxReproductions = 0;
    this.cargarDatos = cargarDatos; // Guardar la referencia a la función
  }

  loadData(data) {
    this.items = data.items;
    this.maxReproductions = data.maxReproductions || 3; // Valor predeterminado: 3
    this.render();
  }

  render() {
    this.container.innerHTML = ''; // Limpiar el contenedor
    this.container.classList.add('slider-container');
    this.videoPlayers = []; // Reiniciar el array de videoPlayers

    this.items.forEach(item => {
      const slide = document.createElement('div');
      slide.classList.add('slide');

      const videoPlayer = new VideoPlayer(item, this);
      slide.appendChild(videoPlayer.render());
      this.videoPlayers.push(videoPlayer);

      this.container.appendChild(slide);
    });

    // Iniciar la reproducción del primer video (si existe) después de un retardo
    setTimeout(() => {
      if (this.videoPlayers.length > 0) {
        this.videoPlayers[0].play();
      }
    }, 500); // Ajusta este retardo si es necesario
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    const nextItem = this.items[this.currentIndex];

    if (nextItem.type === 'video') {
      const nextVideoPlayer = this.videoPlayers.find(vp => vp.item === nextItem);
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
        // 1. Guardar los nuevos datos *temporalmente*
        this.nuevosDatos = newData.items;
        this.maxReproductions = newData.maxReproductions || 3;

        // 2. Esperar a que termine el último video *antes* de renderizar
        const lastVideoPlayer = this.videoPlayers[this.videoPlayers.length - 1];

        if (lastVideoPlayer && lastVideoPlayer.video) {
          lastVideoPlayer.video.addEventListener('ended', () => {
            this.items = this.nuevosDatos; // Asignar los nuevos datos *después* de que termine el video
            this.reproductionCounter = 0; // Reiniciar el contador *aquí*
            this.render(); // Renderizar el slider con los nuevos datos
          }, { once: true });
        } else {
          this.items = this.nuevosDatos; // Asignar los nuevos datos inmediatamente si no hay videos
          this.reproductionCounter = 0; // Reiniciar el contador *aquí*
          this.render(); // Renderizar el slider con los nuevos datos
        }
      });
  }
}

export default Slider;