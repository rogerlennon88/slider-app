class VideoPlayer {
  constructor(item, slider) {
    this.item = item;
    this.slider = slider;
    this.video = null; // Guardar la referencia al elemento video
  }

  render() {
    this.video = document.createElement('video');
    this.video.src = this.item.location;
    this.video.preload = 'metadata';
    this.video.autoplay = true;
    this.video.muted = true;

    this.video.addEventListener('ended', () => {
      this.slider.nextSlide();
    });

    setTimeout(() => {
      this.video.preload = 'auto';
    }, this.item.preloadTime);

    return this.video;
  }
  
  // Nueva función para iniciar la reproducción
  play() {
    if (this.video) {
      this.video.play();
    }
  }
}

export default VideoPlayer;