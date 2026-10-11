// Particle & Visual FX Canvas Engine for The Radical Alchemist
class AlchemistParticles {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.active = false;
        this.lastTime = 0;
    }

    init(canvasElement) {
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    burst(x, y, color = '#34D399', count = 28) {
        if (!this.canvas) return;
        const colors = [
            color,
            '#FBBF24', // Warm gold
            '#A78BFA', // Mystical violet
            '#6EE7B7', // Soft mint
            '#FFFFFF'  // Pure light
        ];

        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
            const speed = 2 + Math.random() * 5.5;
            this.particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 3 + Math.random() * 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                decay: 0.015 + Math.random() * 0.02,
                type: Math.random() > 0.4 ? 'circle' : 'star'
            });
        }

        if (!this.active) {
            this.active = true;
            requestAnimationFrame((t) => this.loop(t));
        }
    }

    // Sparkle rune symbols floating upward
    runeFloat(x, y, text = '✨') {
        if (!this.canvas) return;
        this.particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -2 - Math.random() * 2,
            size: 18 + Math.random() * 6,
            text,
            alpha: 1,
            decay: 0.02,
            type: 'rune'
        });

        if (!this.active) {
            this.active = true;
            requestAnimationFrame((t) => this.loop(t));
        }
    }

    // Gentle ripple wave expanding from a center point
    shockwave(x, y, color = 'rgba(52, 211, 153, 0.6)') {
        if (!this.canvas) return;
        this.particles.push({
            x,
            y,
            radius: 5,
            maxRadius: 80,
            growth: 4.5,
            color,
            alpha: 0.8,
            decay: 0.035,
            type: 'wave'
        });

        if (!this.active) {
            this.active = true;
            requestAnimationFrame((t) => this.loop(t));
        }
    }

    loop(timestamp) {
        if (!this.ctx || !this.canvas) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            if (p.type === 'circle') {
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.95;
                p.vy *= 0.95;
                p.alpha -= p.decay;

                if (p.alpha <= 0) {
                    this.particles.splice(i, 1);
                    continue;
                }

                this.ctx.save();
                this.ctx.globalAlpha = Math.max(0, p.alpha);
                this.ctx.fillStyle = p.color;
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = p.color;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();

            } else if (p.type === 'star') {
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.95;
                p.vy *= 0.95;
                p.alpha -= p.decay;

                if (p.alpha <= 0) {
                    this.particles.splice(i, 1);
                    continue;
                }

                this.ctx.save();
                this.ctx.globalAlpha = Math.max(0, p.alpha);
                this.ctx.fillStyle = p.color;
                this.ctx.shadowBlur = 12;
                this.ctx.shadowColor = p.color;
                
                // Draw 4-point star
                this.drawStar(p.x, p.y, p.size, p.size * 0.4);
                this.ctx.restore();

            } else if (p.type === 'rune') {
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= p.decay;

                if (p.alpha <= 0) {
                    this.particles.splice(i, 1);
                    continue;
                }

                this.ctx.save();
                this.ctx.globalAlpha = Math.max(0, p.alpha);
                this.ctx.font = `${p.size}px 'Outfit', sans-serif`;
                this.ctx.fillStyle = '#FBBF24';
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = '#FBBF24';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(p.text, p.x, p.y);
                this.ctx.restore();

            } else if (p.type === 'wave') {
                p.radius += p.growth;
                p.alpha -= p.decay;

                if (p.alpha <= 0 || p.radius >= p.maxRadius) {
                    this.particles.splice(i, 1);
                    continue;
                }

                this.ctx.save();
                this.ctx.globalAlpha = Math.max(0, p.alpha);
                this.ctx.strokeStyle = p.color;
                this.ctx.lineWidth = 3;
                this.ctx.shadowBlur = 12;
                this.ctx.shadowColor = p.color;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.restore();

            } else if (p.type === 'rocket') {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.05; // slight deceleration

                // Spawn smoke/spark trail behind rocket
                if (Math.random() < 0.6) {
                    this.particles.push({
                        x: p.x + (Math.random() - 0.5) * 4,
                        y: p.y + 8,
                        vx: (Math.random() - 0.5) * 1,
                        vy: 1 + Math.random() * 2,
                        size: 2 + Math.random() * 2,
                        color: p.color,
                        alpha: 0.8,
                        decay: 0.05,
                        type: 'circle'
                    });
                }

                // Check if reached target height or apex
                if (p.y <= p.targetY || p.vy >= -1) {
                    this.particles.splice(i, 1);
                    this.burstFirework(p.x, p.y, p.color);
                    continue;
                }

                // Draw rocket head
                this.ctx.save();
                this.ctx.fillStyle = '#FFFFFF';
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = p.color;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();

            } else if (p.type === 'firework_spark') {
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.96; // air resistance
                p.vy *= 0.96;
                p.vy += 0.08; // gravity
                p.alpha -= p.decay;

                if (p.alpha <= 0) {
                    this.particles.splice(i, 1);
                    continue;
                }

                this.ctx.save();
                this.ctx.globalAlpha = Math.max(0, p.alpha);
                this.ctx.fillStyle = p.color;
                this.ctx.shadowBlur = 14;
                this.ctx.shadowColor = p.color;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
            }
        }

        if (this.particles.length > 0) {
            requestAnimationFrame((t) => this.loop(t));
        } else {
            this.active = false;
        }
    }

    launchFirework(x = null, targetY = null, color = null) {
        if (!this.canvas) return;
        const w = this.canvas.width;
        const h = this.canvas.height;

        const startX = x !== null ? x : w * 0.15 + Math.random() * (w * 0.7);
        const apexY = targetY !== null ? targetY : h * 0.12 + Math.random() * (h * 0.35);

        const palette = ['#FBBF24', '#F472B6', '#34D399', '#60A5FA', '#A78BFA', '#F87171', '#38BDF8'];
        const chosenColor = color || palette[Math.floor(Math.random() * palette.length)];

        const speed = 12 + Math.random() * 4;
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.25;

        this.particles.push({
            x: startX,
            y: h,
            vx: Math.cos(angle) * speed * 0.3,
            vy: -speed,
            targetY: apexY,
            color: chosenColor,
            type: 'rocket'
        });

        if (window.AlchemistAudio) {
            window.AlchemistAudio.playFireworkWhistle();
        }

        if (!this.active) {
            this.active = true;
            requestAnimationFrame((t) => this.loop(t));
        }
    }

    burstFirework(x, y, baseColor) {
        if (!this.canvas) return;

        const palette = [
            baseColor,
            '#FBBF24', // Gold
            '#FFFFFF', // White sparks
            '#F472B6', // Rose
            '#34D399', // Mint
            '#A78BFA'  // Violet
        ];

        const count = 75 + Math.floor(Math.random() * 35);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.5 + Math.random() * 7.5;
            this.particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 2 + Math.random() * 3.5,
                color: palette[Math.floor(Math.random() * palette.length)],
                alpha: 1,
                decay: 0.012 + Math.random() * 0.018,
                type: 'firework_spark'
            });
        }

        if (window.AlchemistAudio) {
            window.AlchemistAudio.playFireworkExplode();
        }
    }

    startFireworksShow() {
        if (this.fireworksInterval) return;

        // Immediately launch 2
        this.launchFirework();
        setTimeout(() => this.launchFirework(), 250);

        this.fireworksInterval = setInterval(() => {
            this.launchFirework();
            if (Math.random() > 0.4) {
                setTimeout(() => this.launchFirework(), 300);
            }
        }, 750);
    }

    stopFireworksShow() {
        if (this.fireworksInterval) {
            clearInterval(this.fireworksInterval);
            this.fireworksInterval = null;
        }
    }

    drawStar(cx, cy, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / 4;

        this.ctx.beginPath();
        this.ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < 4; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            this.ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            this.ctx.lineTo(x, y);
            rot += step;
        }
        this.ctx.lineTo(cx, cy - outerRadius);
        this.ctx.closePath();
        this.ctx.fill();
    }
}

window.AlchemistParticles = new AlchemistParticles();

