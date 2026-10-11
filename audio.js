// Audio Engine using Web Audio API for The Radical Alchemist
// Pure procedural synthesis - no external MP3s required, works 100% offline

class AlchemistAudio {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.masterVolume = 0.25; // Gentle, non-startling volume
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
            this.initialized = true;
        } catch (e) {
            console.warn("Web Audio not supported", e);
        }
    }

    resume() {
        this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    }

    // Gentle bubble pop on clicks & selections
    playPop(pitchMultiplier = 1) {
        if (this.muted) return;
        this.resume();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        const startFreq = 480 * pitchMultiplier;
        const endFreq = 220 * pitchMultiplier;

        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.08);

        gain.gain.setValueAtTime(this.masterVolume * 0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.09);
    }

    // Crisp crystal crack when breaking a stone/radical into factors
    playCrack() {
        if (this.muted) return;
        this.resume();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;

        // High crystal snap
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(350, now + 0.12);

        gain.gain.setValueAtTime(this.masterVolume * 0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.13);

        // Low resonant thump
        const subOsc = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(180, now);
        subOsc.frequency.exponentialRampToValueAtTime(60, now + 0.18);

        subGain.gain.setValueAtTime(this.masterVolume * 0.6, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        subOsc.connect(subGain);
        subGain.connect(this.ctx.destination);

        subOsc.start(now);
        subOsc.stop(now + 0.19);
    }

    // Harmonious chord when ingredients merge in cauldron
    playMerge() {
        if (this.muted) return;
        this.resume();
        if (!this.ctx) return;

        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
        const now = this.ctx.currentTime;

        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.04);

            gain.gain.setValueAtTime(0.001, now + idx * 0.04);
            gain.gain.linearRampToValueAtTime(this.masterVolume * 0.5, now + idx * 0.04 + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.35);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + idx * 0.04);
            osc.stop(now + idx * 0.04 + 0.36);
        });
    }

    // Shimmering celestial arpeggio on transmutation / simplification
    playTransmute() {
        if (this.muted) return;
        this.resume();
        if (!this.ctx) return;

        // Ethereal pentatonic chord: C5, D5, E5, G5, A5, C6
        const arpeggio = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
        const now = this.ctx.currentTime;

        arpeggio.forEach((freq, i) => {
            const time = now + i * 0.06;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, time);

            gain.gain.setValueAtTime(0.001, time);
            gain.gain.linearRampToValueAtTime(this.masterVolume * 0.7, time + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(time);
            osc.stop(time + 0.52);
        });
    }

    // Gentle, non-punitive marimba wobble on mismatch (never harsh!)
    playWobble() {
        if (this.muted) return;
        this.resume();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        // Cute bouncy pitch bend: 220 -> 260 -> 210
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(260, now + 0.09);
        osc.frequency.linearRampToValueAtTime(200, now + 0.22);

        gain.gain.setValueAtTime(this.masterVolume * 0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.26);
    }

    // Triumph fanfare when completing a challenge / leveling up Spire
    playTriumph() {
        if (this.muted) return;
        this.resume();
        if (!this.ctx) return;

        const chord = [392.00, 523.25, 659.25, 783.99, 1046.50]; // G4, C5, E5, G5, C6
        const now = this.ctx.currentTime;

        chord.forEach((freq) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(this.masterVolume * 0.8, now + 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 1.25);
        });
    }

    // Firework launch rocket whistle
    playFireworkWhistle() {
        if (this.muted) return;
        this.resume();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(300 + Math.random() * 80, now);
        osc.frequency.exponentialRampToValueAtTime(1100 + Math.random() * 300, now + 0.45);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(this.masterVolume * 0.25, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.5);
    }

    // Firework explosion burst
    playFireworkExplode() {
        if (this.muted) return;
        this.resume();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;

        // Sub bass thump
        const subOsc = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(120, now);
        subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.35);

        subGain.gain.setValueAtTime(this.masterVolume * 0.7, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        subOsc.connect(subGain);
        subGain.connect(this.ctx.destination);
        subOsc.start(now);
        subOsc.stop(now + 0.36);

        // Sparkle chord
        const notes = [659.25, 783.99, 1046.50, 1318.51];
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq * (1 + (Math.random() - 0.5) * 0.05), now + 0.02 * idx);

            gain.gain.setValueAtTime(this.masterVolume * 0.28, now + 0.02 * idx);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4 + 0.03 * idx);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + 0.02 * idx);
            osc.stop(now + 0.5);
        });
    }

    // Extended Grand Finale Fanfare
    playGrandFanfare() {
        if (this.muted) return;
        this.resume();
        if (!this.ctx) return;

        // Timed fanfare arpeggio: C4, G4, C5, E5, G5, C6 with sustain
        const melody = [
            { note: 261.63, time: 0.0, dur: 0.25 }, // C4
            { note: 392.00, time: 0.22, dur: 0.25 }, // G4
            { note: 523.25, time: 0.44, dur: 0.35 }, // C5
            { note: 659.25, time: 0.72, dur: 0.35 }, // E5
            { note: 783.99, time: 1.0, dur: 0.45 }, // G5
            { note: 1046.50, time: 1.35, dur: 1.8 }  // High C6
        ];

        const now = this.ctx.currentTime;
        melody.forEach(item => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(item.note, now + item.time);

            gain.gain.setValueAtTime(0.001, now + item.time);
            gain.gain.linearRampToValueAtTime(this.masterVolume * 0.85, now + item.time + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + item.time + item.dur);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + item.time);
            osc.stop(now + item.time + item.dur + 0.05);
        });
    }
}

window.AlchemistAudio = new AlchemistAudio();

