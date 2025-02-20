class VideoPlayer {
  constructor(item, slider) {
    this.item = item;
    this.slider = slider;
    this.video = null;
  }

  render() {
    this.video = document.createElement('video');
    this.video.src = this.item.location;
    this.video.preload = 'metadata';
    this.video.muted = true;
    this.video.autoplay = true;

    this.video.addEventListener('ended', () => {
      this.slider.nextSlide();
    });

    return this.video;
  }

  play() {
    if (this.video) {
      const playPromise = this.video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Error de reproducción:", error);
        });
      }
    }
  }
}

export default VideoPlayer;