// src/utils/audio.js

class SoundController {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.heartbeatTimer = null;
    this.flatlineTimer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Click suave de seleção
  playSelect() {
    if (this.muted) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  // Som harmônico de acerto
  playSuccess() {
    if (this.muted) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + idx * 0.08);
      osc.stop(this.ctx.currentTime + idx * 0.08 + 0.28);
    });
  }

  // Som de erro
  playError() {
    if (this.muted) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.22);

    gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.22);
  }

  // Pulso duplo orgânico (B1 e B2)
  playHeartbeat() {
    if (this.muted) return;
    this.init();

    const triggerThump = (timeOffset, freqStart, duration, volume) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(130, this.ctx.currentTime + timeOffset);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqStart, this.ctx.currentTime + timeOffset);
      osc.frequency.exponentialRampToValueAtTime(28, this.ctx.currentTime + timeOffset + duration);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + timeOffset + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + timeOffset);
      osc.stop(this.ctx.currentTime + timeOffset + duration);
    };

    triggerThump(0, 85, 0.11, 0.32);
    triggerThump(0.13, 70, 0.08, 0.2);
  }

  // Inicia ou ajusta a cadência do batimento dinamicamente
  startHeartbeatLoop(bpmInterval) {
    this.stopHeartbeatLoop();
    if (this.muted || !bpmInterval) return;

    this.playHeartbeat();
    this.heartbeatTimer = setInterval(() => {
      this.playHeartbeat();
    }, bpmInterval);
  }

  // Para o batimento
  stopHeartbeatLoop() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  // Flatline (Linha reta / 'Piiii' agudo de monitor de UTI)
  playFlatline(durationSeconds = 2.5) {
    if (this.muted) return;
    this.stopHeartbeatLoop();
    this.init();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime); // 880Hz tom clássico hospitalar

    // Começa no volume padrão e vai sumindo suavemente no último meio segundo
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime + durationSeconds - 0.5);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + durationSeconds);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + durationSeconds);
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      this.stopHeartbeatLoop();
    }
    return this.muted;
  }
}

export const soundManager = new SoundController();