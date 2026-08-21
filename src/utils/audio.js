// src/utils/audio.js

class SoundController {
  constructor() {
    this.ctx = null;
    this.muted = typeof window !== 'undefined' 
      ? localStorage.getItem('dpoc_sound_muted') === 'true' 
      : false;
    this.heartbeatTimer = null;
  }

  ensureContext() {
    if (typeof window === 'undefined') return false;
    try {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return true;
    } catch (e) {
      console.warn("Áudio não pôde ser iniciado:", e);
      return false;
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('dpoc_sound_muted', String(this.muted));
    }
    if (this.muted) {
      this.stopHeartbeatLoop();
    }
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  // Toque / Seleção de Tile
  playSelect() {
    if (this.muted || !this.ensureContext()) return;

    try {
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
    } catch (e) {}
  }

  // Acerto de Grupo
  playSuccess() {
    if (this.muted || !this.ensureContext()) return;

    try {
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
    } catch (e) {}
  }

  // Erro de Seleção
  playError() {
    if (this.muted || !this.ensureContext()) return;

    try {
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
    } catch (e) {}
  }

  // Batimento Cardíaco (B1 e B2)
  playHeartbeat() {
    if (this.muted || !this.ensureContext()) return;

    try {
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
    } catch (e) {}
  }

  startHeartbeatLoop(bpmInterval) {
    this.stopHeartbeatLoop();
    if (this.muted || !bpmInterval) return;

    this.playHeartbeat();
    this.heartbeatTimer = setInterval(() => {
      this.playHeartbeat();
    }, bpmInterval);
  }

  stopHeartbeatLoop() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  // Flatline (Piiii do monitor cardíaco)
  playFlatline(durationSeconds = 2.5) {
    if (this.muted || !this.ensureContext()) return;
    this.stopHeartbeatLoop();

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime + durationSeconds - 0.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + durationSeconds);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + durationSeconds);
    } catch (e) {}
  }

  // Som de Fanfarra ao desbloquear Conquista
  playAchievement() {
    if (this.muted || !this.ensureContext()) return;

    try {
      const ctx = this.ctx;
      const now = ctx.currentTime;
      
      // Sequência harmônica ascendente (Dó5 -> Mi5 -> Sol5 -> Dó6)
      const notes = [
        { freq: 523.25, time: 0.00, duration: 0.15 },
        { freq: 659.25, time: 0.12, duration: 0.15 },
        { freq: 783.99, time: 0.24, duration: 0.18 },
        { freq: 1046.50, time: 0.40, duration: 0.50 },
      ];
      
      notes.forEach(({ freq, time, duration }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + time);
        
        gain.gain.setValueAtTime(0.0001, now + time);
        gain.gain.linearRampToValueAtTime(0.35, now + time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + time + duration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + time);
        osc.stop(now + time + duration);
      });
    } catch (e) {}
  }
}

export const soundManager = new SoundController();