/**
 * WebAudio 16-Bit Chiptune & Sound-FX Synthesizer + HTML5 BGM Player
 * Dual-Engine: Spielt das epische 16-Bit Epochen-Thema (MP3) ab
 * und bietet einen autarken 3-Kanal Chiptune-Synthesizer als Fallback.
 */

type BgmListener = (isPlaying: boolean) => void;

class AudioService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isBgmPlaying: boolean = false;
  private bgmAudio: HTMLAudioElement | null = null;
  private synthInterval: number | null = null;
  private synthMasterGain: GainNode | null = null;
  private synthStepIndex: number = 0;
  private listeners: BgmListener[] = [];

  constructor() {
    const savedMute = localStorage.getItem('epochenhub_muted');
    if (savedMute !== null) {
      this.isMuted = savedMute === 'true';
    }
  }

  public subscribeBgm(listener: BgmListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyBgmChange() {
    this.listeners.forEach((cb) => cb(this.isBgmPlaying));
  }

  public async initCtx(): Promise<AudioContext | null> {
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }
      return this.ctx;
    } catch (err) {
      console.warn('AudioContext init error:', err);
      return null;
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    localStorage.setItem('epochenhub_muted', String(muted));

    if (this.bgmAudio) {
      this.bgmAudio.muted = muted;
    }

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
  public async playClickSound() {
    if (this.isMuted) return;
    try {
      const actx = await this.initCtx();
      if (!actx) return;

      const osc = actx.createOscillator();
      const gain = actx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(440, actx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, actx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.12, actx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(actx.destination);

      osc.start();
      osc.stop(actx.currentTime + 0.06);
    } catch {
      // Audio not permitted yet
    }
  }

  /**
   * Subtiler Hover-Blip
   */
  public async playHoverSound() {
    if (this.isMuted) return;
    try {
      const actx = await this.initCtx();
      if (!actx) return;

      const osc = actx.createOscillator();
      const gain = actx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, actx.currentTime);
      osc.frequency.linearRampToValueAtTime(740, actx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.06, actx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(actx.destination);

      osc.start();
      osc.stop(actx.currentTime + 0.04);
    } catch {
      // Ignore
    }
  }

  /**
   * 16-Bit Epochen-Modal Eröffnungs-Akkord
   */
  public async playPortalChime() {
    if (this.isMuted) return;
    try {
      const actx = await this.initCtx();
      if (!actx) return;

      const notes = [329.63, 440.0, 554.37, 659.25]; // E major chord
      notes.forEach((freq, idx) => {
        if (!actx) return;
        const osc = actx.createOscillator();
        const gain = actx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, actx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.08, actx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + idx * 0.05 + 0.35);

        osc.connect(gain);
        gain.connect(actx.destination);

        osc.start(actx.currentTime + idx * 0.05);
        osc.stop(actx.currentTime + idx * 0.05 + 0.35);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Triumphale Fanfare für Stempel im Zeitreise-Pass
   */
  public async playStampFanfare() {
    if (this.isMuted) return;
    try {
      const actx = await this.initCtx();
      if (!actx) return;

      // C5 -> E5 -> G5 -> C6 Arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        if (!actx) return;
        const osc = actx.createOscillator();
        const gain = actx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, actx.currentTime + idx * 0.09);

        const duration = idx === notes.length - 1 ? 0.4 : 0.08;
        gain.gain.setValueAtTime(0.12, actx.currentTime + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + idx * 0.09 + duration);

        osc.connect(gain);
        gain.connect(actx.destination);

        osc.start(actx.currentTime + idx * 0.09);
        osc.stop(actx.currentTime + idx * 0.09 + duration);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Hintergrundmusik starten / anhalten
   */
  public async toggleBgm(): Promise<boolean> {
    if (this.isBgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      await this.startBgm();
      return this.isBgmPlaying;
    }
  }

  public async startBgm(): Promise<void> {
    if (this.isMuted) {
      this.setMuted(false);
    }

    await this.initCtx();
    this.isBgmPlaying = true;
    this.notifyBgmChange();

    // 1. Primär: Versuche HTML5 Audio mit echter BGM-Datei
    try {
      if (!this.bgmAudio) {
        this.bgmAudio = new Audio('/assets/audio/bgm/epochen_theme.mp3');
        this.bgmAudio.loop = true;
        this.bgmAudio.volume = 0.32;
        this.bgmAudio.muted = this.isMuted;

        this.bgmAudio.addEventListener('error', (e) => {
          console.warn('BGM MP3 load failed, using WebAudio synth fallback', e);
          if (this.isBgmPlaying) {
            this.startSynthBgm();
          }
        });
      }

      this.bgmAudio.muted = false;
      this.bgmAudio.currentTime = 0;
      const playPromise = this.bgmAudio.play();
      if (playPromise !== undefined) {
        await playPromise;
      }
    } catch (err) {
      console.warn('HTML5 Audio play failed or blocked, starting WebAudio synth:', err);
      // Fallback: 16-Bit Chiptune Synth
      this.startSynthBgm();
    }
  }

  public stopBgm(): void {
    this.isBgmPlaying = false;
    this.notifyBgmChange();

    if (this.bgmAudio) {
      this.bgmAudio.pause();
    }
    this.stopSynthBgm();
  }

  /**
   * 16-Bit Chiptune Polyphonic Synthesizer Fallback
   */
  private startSynthBgm(): void {
    this.stopSynthBgm();
    if (!this.ctx) return;

    this.synthMasterGain = this.ctx.createGain();
    this.synthMasterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    this.synthMasterGain.connect(this.ctx.destination);

    // Epische antike Akkordfolge: C-Dur -> G-Dur -> a-Moll -> F-Dur
    const chords = [
      [261.63, 329.63, 392.0], // C
      [196.0, 246.94, 293.66], // G
      [220.0, 261.63, 329.63], // Am
      [174.61, 220.0, 261.63], // F
    ];

    const leadMelody = [523.25, 659.25, 587.33, 523.25, 392.0, 440.0, 523.25, 587.33];
    const stepDuration = 0.22;
    this.synthStepIndex = 0;

    this.synthInterval = window.setInterval(() => {
      if (!this.ctx || this.isMuted || !this.isBgmPlaying || !this.synthMasterGain) return;

      const actx = this.ctx;
      const now = actx.currentTime;
      const chordIdx = Math.floor(this.synthStepIndex / 4) % chords.length;
      const currentChord = chords[chordIdx];
      const arpNote = currentChord[this.synthStepIndex % 3];
      const leadNote = leadMelody[Math.floor(this.synthStepIndex / 2) % leadMelody.length];
      const bassNote = currentChord[0] / 2;

      // 1. Arpeggio Voice (Triangle)
      const arpOsc = actx.createOscillator();
      const arpGain = actx.createGain();
      arpOsc.type = 'triangle';
      arpOsc.frequency.setValueAtTime(arpNote, now);
      arpGain.gain.setValueAtTime(0.08, now);
      arpGain.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 0.9);
      arpOsc.connect(arpGain);
      arpGain.connect(this.synthMasterGain);
      arpOsc.start(now);
      arpOsc.stop(now + stepDuration);

      // 2. Bass Voice (Sine, every 4 steps)
      if (this.synthStepIndex % 4 === 0) {
        const bassOsc = actx.createOscillator();
        const bassGain = actx.createGain();
        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(bassNote, now);
        bassGain.gain.setValueAtTime(0.16, now);
        bassGain.gain.exponentialRampToValueAtTime(0.01, now + stepDuration * 3.8);
        bassOsc.connect(bassGain);
        bassGain.connect(this.synthMasterGain);
        bassOsc.start(now);
        bassOsc.stop(now + stepDuration * 4);
      }

      // 3. Lead Melody Voice (every 2 steps)
      if (this.synthStepIndex % 2 === 0) {
        const leadOsc = actx.createOscillator();
        const leadGain = actx.createGain();
        leadOsc.type = 'triangle';
        leadOsc.frequency.setValueAtTime(leadNote, now);
        leadGain.gain.setValueAtTime(0.08, now);
        leadGain.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 1.8);
        leadOsc.connect(leadGain);
        leadGain.connect(this.synthMasterGain);
        leadOsc.start(now);
        leadOsc.stop(now + stepDuration * 2);
      }

      this.synthStepIndex++;
    }, 220);
  }

  private stopSynthBgm(): void {
    if (this.synthInterval) {
      window.clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    if (this.synthMasterGain) {
      try {
        this.synthMasterGain.disconnect();
      } catch {
        // Ignore
      }
      this.synthMasterGain = null;
    }
  }
}

export const audioService = new AudioService();
