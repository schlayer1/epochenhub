/**
 * WebAudio 16-Bit Chiptune & Sound-FX Synthesizer
 * Erzeugt dynamische Retro-Sounds direkt im Browser ohne externe Audio-Dateien
 */

class AudioService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isBgmPlaying: boolean = false;
  private bgmInterval: number | null = null;
  private noteIndex: number = 0;

  constructor() {
    // Check initial mute state from localStorage
    const savedMute = localStorage.getItem('epochenhub_muted');
    if (savedMute !== null) {
      this.isMuted = savedMute === 'true';
    }
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    localStorage.setItem('epochenhub_muted', String(muted));
    if (muted && this.isBgmPlaying) {
      this.stopBgm();
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    if (!this.isMuted) {
      this.playClickSound();
    }
    return this.isMuted;
  }

  public isBgmActive(): boolean {
    return this.isBgmPlaying;
  }

  /**
   * 8-Bit Click Beep
   */
  public playClickSound() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Audio not permitted yet
    }
  }

  /**
   * Subtiler Hover-Blip
   */
  public playHoverSound() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(660, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(720, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Ignore
    }
  }

  /**
   * 16-Bit Epochen-Modal Eröffnungs-Akkord
   */
  public playPortalChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [330, 440, 554.37, 659.25]; // E major chord
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.05, this.ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.05 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.05);
        osc.stop(this.ctx.currentTime + idx * 0.05 + 0.35);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Triumphale Fanfare für Stempel im Zeitreise-Pass
   */
  public playStampFanfare() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      // C5 -> E5 -> G5 -> C6 Arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.09);

        const duration = idx === notes.length - 1 ? 0.35 : 0.08;
        gain.gain.setValueAtTime(0.09, this.ctx.currentTime + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.09 + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.09);
        osc.stop(this.ctx.currentTime + idx * 0.09 + duration);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Prozeduraler, sanfter 8-Bit Chiptune Hintergrund-Soundtrack
   */
  public toggleBgm(): boolean {
    if (this.isBgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  private startBgm() {
    if (this.isMuted) {
      this.setMuted(false);
    }
    this.initCtx();
    this.isBgmPlaying = true;

    // Epochen-Thema (Pentatonische Tonleiter für antikes/episches Flair)
    const melody = [
      261.63, 329.63, 392.00, 523.25, 
      392.00, 329.63, 293.66, 329.63,
      349.23, 392.00, 440.00, 523.25,
      440.00, 392.00, 349.23, 293.66
    ];

    if (this.bgmInterval) window.clearInterval(this.bgmInterval);
    this.noteIndex = 0;

    this.bgmInterval = window.setInterval(() => {
      if (!this.ctx || this.isMuted || !this.isBgmPlaying) return;

      const freq = melody[this.noteIndex % melody.length];
      this.noteIndex++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.22);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.24);
    }, 250);
  }

  private stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      window.clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const audioService = new AudioService();
