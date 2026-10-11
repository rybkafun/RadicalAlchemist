// The Radical Alchemist - Main Interactive Game Logic
// Neuroinclusive design: Task Chunking, Scaffolding, Non-punitive feedback, Dopamine loops

class RadicalAlchemistGame {
    constructor() {
        this.currentModule = 'A'; // 'A', 'B', 'C', 'D'
        this.essence = 0;
        this.spireLevel = 0;
        this.maxSpireLevel = 12;

        // Progress tracking for task chunking
        this.progress = {
            A: { currentStep: 0, completed: false },
            B: { currentStep: 0, completed: false },
            C: { currentStep: 0, completed: false },
            D: { currentStep: 0, completed: false }
        };

        // Module A Data (Intuition: Square area to side)
        this.moduleA_challenges = [
            { area: 9, expectedSide: 3, hint: "Jaki bok ma kwadrat o 9 polach?" },
            { area: 16, expectedSide: 4, hint: "Kwadrat z 16 kafelków." },
            { area: 25, expectedSide: 5, hint: "Klasyczny kwadrat alchemiczny: pole 25." },
            { area: 49, expectedSide: 7, hint: "Siedem razy siedem to...?" },
            { area: 100, expectedSide: 10, hint: "Dziesięć dziesiątek tworzy sto!" },
            { area: 144, expectedSide: 12, hint: "Tuzin do kwadratu: pole 144." }
        ];

        // Module B Data (Alchemical Cauldron: Operations)
        this.moduleB_challenges = [
            { type: 'multiply', a: 2, b: 8, product: 16, result: 4, expr: "\\sqrt{2} \\cdot \\sqrt{8}" },
            { type: 'multiply', a: 3, b: 27, product: 81, result: 9, expr: "\\sqrt{3} \\cdot \\sqrt{27}" },
            { type: 'multiply', a: 5, b: 20, product: 100, result: 10, expr: "\\sqrt{5} \\cdot \\sqrt{20}" },
            { type: 'divide', a: 50, b: 2, quotient: 25, result: 5, expr: "\\frac{\\sqrt{50}}{\\sqrt{2}}" },
            { type: 'divide', a: 72, b: 2, quotient: 36, result: 6, expr: "\\frac{\\sqrt{72}}{\\sqrt{2}}" },
            { type: 'divide', a: 48, b: 3, quotient: 16, result: 4, expr: "\\frac{\\sqrt{48}}{\\sqrt{3}}" }
        ];

        // Module C Data (Crystal Cracking: Factor extraction)
        this.moduleC_challenges = [
            {
                number: 12,
                pairs: [
                    { sq: 4, rem: 3, isSquare: true },
                    { sq: 6, rem: 2, isSquare: false }
                ],
                correctSq: 4,
                correctRem: 3,
                extracted: 2,
                finalExpr: "2\\sqrt{3}"
            },
            {
                number: 18,
                pairs: [
                    { sq: 9, rem: 2, isSquare: true },
                    { sq: 6, rem: 3, isSquare: false }
                ],
                correctSq: 9,
                correctRem: 2,
                extracted: 3,
                finalExpr: "3\\sqrt{2}"
            },
            {
                number: 8,
                pairs: [
                    { sq: 4, rem: 2, isSquare: true },
                    { sq: 8, rem: 1, isSquare: false }
                ],
                correctSq: 4,
                correctRem: 2,
                extracted: 2,
                finalExpr: "2\\sqrt{2}"
            },
            {
                number: 20,
                pairs: [
                    { sq: 4, rem: 5, isSquare: true },
                    { sq: 10, rem: 2, isSquare: false }
                ],
                correctSq: 4,
                correctRem: 5,
                extracted: 2,
                finalExpr: "2\\sqrt{5}"
            },
            {
                number: 32,
                pairs: [
                    { sq: 16, rem: 2, isSquare: true },
                    { sq: 8, rem: 4, isSquare: false } // 4 works but 16 is maximum
                ],
                correctSq: 16,
                correctRem: 2,
                extracted: 4,
                finalExpr: "4\\sqrt{2}"
            },
            {
                number: 50,
                pairs: [
                    { sq: 25, rem: 2, isSquare: true },
                    { sq: 10, rem: 5, isSquare: false }
                ],
                correctSq: 25,
                correctRem: 2,
                extracted: 5,
                finalExpr: "5\\sqrt{2}"
            },
            {
                number: 75,
                pairs: [
                    { sq: 25, rem: 3, isSquare: true },
                    { sq: 15, rem: 5, isSquare: false }
                ],
                correctSq: 25,
                correctRem: 3,
                extracted: 5,
                finalExpr: "5\\sqrt{3}"
            }
        ];

        // Module D Data (Resonance: Addition & Cubic roots)
        this.moduleD_challenges = [
            {
                type: 'addition',
                gem1: { coeff: 2, radical: 3 },
                gem2: { coeff: 5, radical: 3 },
                compatible: true,
                resultCoeff: 7,
                resultRadical: 3,
                prompt: "Połącz rezonujące kryształy: 2√3 oraz 5√3"
            },
            {
                type: 'addition-trap',
                gem1: { coeff: 3, radical: 2 },
                gem2: { coeff: 4, radical: 5 },
                compatible: false,
                prompt: "Czy te kryształy zreagują ze sobą? 3√2 oraz 4√5"
            },
            {
                type: 'cube-root',
                volume: 8,
                expectedEdge: 2,
                formula: "\\sqrt[3]{8} = 2",
                prompt: "Sześcienna Wieża: Objętość = 8. Jaka jest długość krawędzi (a ⋅ a ⋅ a = 8)?"
            },
            {
                type: 'cube-root',
                volume: 27,
                expectedEdge: 3,
                formula: "\\sqrt[3]{27} = 3",
                prompt: "Sześcienna Wieża: Objętość = 27. Jaka jest długość krawędzi?"
            },
            {
                type: 'cube-operation',
                a: 2,
                b: 4,
                product: 8,
                result: 2,
                prompt: "Fuzja sześcienna: \\sqrt[3]{2} \\cdot \\sqrt[3]{4} = \\sqrt[3]{8} = ?"
            }
        ];

        // State for active interactions
        this.moduleA_currentSide = 3;
        this.moduleA_xray = true;

        this.moduleB_selected = [];
        this.moduleB_stage = 'pick'; // 'pick', 'ready_to_fuse', 'fused'

        this.moduleC_stage = 'pick_pair'; // 'pick_pair', 'extract_ready', 'completed'
        this.moduleC_selectedPair = null;

        this.moduleD_step = 0;
    }

    init() {
        this.bindEvents();
        this.updateHUD();
        this.renderModuleNavigation();
        this.loadModule('A');
    }

    bindEvents() {
        // Sound toggle
        const soundBtn = document.getElementById('btn-sound-toggle');
        if (soundBtn) {
            soundBtn.addEventListener('click', () => {
                const isMuted = window.AlchemistAudio.toggleMute();
                soundBtn.innerHTML = isMuted ? '🔇' : '🔊';
                soundBtn.title = isMuted ? 'Dźwięk wyłączony' : 'Dźwięk włączony';
            });
        }

        // Trophy button (Grand Finale Preview)
        const trophyBtn = document.getElementById('btn-show-trophy');
        if (trophyBtn) {
            trophyBtn.addEventListener('click', () => {
                this.showGrandFinale();
            });
        }

        // Grimoire drawer toggle
        const grimoireBtn = document.getElementById('btn-open-grimoire');

        const grimoireClose = document.getElementById('btn-close-grimoire');
        const grimoireOverlay = document.getElementById('grimoire-overlay');
        const grimoireDrawer = document.getElementById('grimoire-drawer');

        const openGrimoire = () => {
            grimoireOverlay.classList.add('open');
            grimoireDrawer.classList.add('open');
            window.AlchemistAudio.playPop(1.2);
        };

        const closeGrimoire = () => {
            grimoireOverlay.classList.remove('open');
            grimoireDrawer.classList.remove('open');
            window.AlchemistAudio.playPop(0.9);
        };

        if (grimoireBtn) grimoireBtn.addEventListener('click', openGrimoire);
        if (grimoireClose) grimoireClose.addEventListener('click', closeGrimoire);
        if (grimoireOverlay) grimoireOverlay.addEventListener('click', closeGrimoire);

        // Alchemical Artifacts / Lifebuoy Listeners (Koła Ratunkowe)
        const artEye = document.getElementById('artifact-eye');
        const artSwap = document.getElementById('artifact-swap');
        const artCoop = document.getElementById('artifact-coop');
        const artStone = document.getElementById('artifact-stone');

        if (artEye) {
            artEye.addEventListener('click', (e) => {
                openGrimoire();
                if (window.AlchemistParticles) {
                    window.AlchemistParticles.burst(e.clientX, e.clientY, '#FBBF24', 22);
                    window.AlchemistParticles.runeFloat(e.clientX, e.clientY, '👁️ Oko Alchemika: Arkana Otwarte!');
                }
            });
        }

        if (artSwap) {
            artSwap.addEventListener('click', (e) => {
                this.useSwapArtifact(e);
            });
        }

        if (artCoop) {
            artCoop.addEventListener('click', (e) => {
                this.useCoopArtifact(e);
            });
        }

        if (artStone) {
            artStone.addEventListener('click', (e) => {
                this.useStoneArtifact(e);
            });
        }

        // Grimoire tabs
        document.querySelectorAll('.grimoire-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.grimoire-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const targetId = tab.dataset.target;
                document.querySelectorAll('.grimoire-tab-content').forEach(c => c.style.display = 'none');
                const targetContent = document.getElementById(targetId);
                if (targetContent) targetContent.style.display = 'block';
                window.AlchemistAudio.playPop(1.1);
            });
        });

        // Populate squares in Grimoire
        this.populateGrimoireData();
    }

    useSwapArtifact(event) {
        window.AlchemistAudio.playPop(1.4);
        if (window.AlchemistParticles) {
            window.AlchemistParticles.burst(event.clientX, event.clientY, '#60A5FA', 24);
            window.AlchemistParticles.runeFloat(event.clientX, event.clientY, '🔄 Zamiana Składnika!');
        }

        const mod = this.currentModule;
        const maxSteps = mod === 'A' ? this.moduleA_challenges.length :
                         mod === 'B' ? this.moduleB_challenges.length :
                         mod === 'C' ? this.moduleC_challenges.length :
                         this.moduleD_challenges.length;

        this.progress[mod].currentStep = (this.progress[mod].currentStep + 1) % maxSteps;
        this.loadModule(mod);
    }

    useCoopArtifact(event) {
        window.AlchemistAudio.playMerge();
        if (window.AlchemistParticles) {
            window.AlchemistParticles.burst(event.clientX, event.clientY, '#F472B6', 30);
            window.AlchemistParticles.shockwave(event.clientX, event.clientY, 'rgba(244, 114, 182, 0.6)');
            window.AlchemistParticles.runeFloat(event.clientX, event.clientY, '🤝 Sojusz Eliksirów! +25 💎');
        }

        this.addEssence(25, event.clientX, event.clientY);

        // Highlight HUD with hint
        const hud = document.getElementById('pinned-hud-card');
        if (hud) {
            hud.classList.add('highlight');
            setTimeout(() => hud.classList.remove('highlight'), 2000);
        }
    }

    useStoneArtifact(event) {
        window.AlchemistAudio.playTransmute();
        if (window.AlchemistParticles) {
            window.AlchemistParticles.burst(event.clientX, event.clientY, '#34D399', 30);
            window.AlchemistParticles.runeFloat(event.clientX, event.clientY, '💎 Kamień Błędu: +30 Esencji!');
        }
        this.addEssence(30, event.clientX, event.clientY);
    }


    populateGrimoireData() {
        const grid = document.getElementById('grimoire-squares-grid');
        if (!grid) return;
        grid.innerHTML = '';
        for (let i = 1; i <= 15; i++) {
            const card = document.createElement('div');
            card.className = 'square-card-helper';
            card.innerHTML = `
                <div class="sq-formula">${i}² = ${i}×${i}</div>
                <div class="sq-result">${i * i}</div>
            `;
            card.addEventListener('click', (e) => {
                window.AlchemistAudio.playPop(1.3);
                window.AlchemistParticles.runeFloat(e.clientX, e.clientY, `√${i*i}=${i}`);
            });
            grid.appendChild(card);
        }
    }

    addEssence(amount, x, y) {
        this.essence += amount;
        const essenceDisplay = document.getElementById('essence-count');
        if (essenceDisplay) {
            essenceDisplay.textContent = this.essence;
        }
        if (x !== undefined && y !== undefined) {
            window.AlchemistParticles.burst(x, y, '#FBBF24', 16);
            window.AlchemistParticles.runeFloat(x, y, `+${amount} ✨`);
        }
    }

    advanceSpire() {
        if (this.spireLevel < this.maxSpireLevel) {
            this.spireLevel++;
            const node = document.getElementById(`spire-node-${this.spireLevel}`);
            if (node) {
                node.classList.remove('active');
                node.classList.add('completed');
            }
            const nextNode = document.getElementById(`spire-node-${this.spireLevel + 1}`);
            if (nextNode) {
                nextNode.classList.add('active');
            }
        }
    }

    updateHUD() {
        const hudCard = document.getElementById('pinned-hud-card');
        const hudFormula = document.getElementById('hud-formula-display');
        const hudTip = document.getElementById('hud-tip-display');

        if (!hudFormula || !hudTip) return;

        if (this.currentModule === 'A') {
            hudFormula.innerHTML = `Pole Kwadratu = Bok² &nbsp;➔&nbsp; <span class="math-radical">√Pole = Bok</span>`;
            hudTip.textContent = "Pierwiastek szuka liczby, która pomnożona przez samą siebie daje pole.";
        } else if (this.currentModule === 'B') {
            hudFormula.innerHTML = `<span class="math-radical">√a · √b = √(a · b)</span> &nbsp;|&nbsp; <span class="math-radical">√a / √b = √(a / b)</span>`;
            hudTip.textContent = "Mnożenie i dzielenie: pierwiastki mogą wskoczyć pod jeden wspólny dach!";
        } else if (this.currentModule === 'C') {
            hudFormula.innerHTML = `<span class="math-radical">√(a² · b) = a√b</span> &nbsp; (np. √12 = √(4·3) = 2√3)`;
            hudTip.textContent = "Rozbij na czynniki, znajdź kwadrat (4, 9, 16...) i uwolnij go na zewnątrz!";
        } else if (this.currentModule === 'D') {
            hudFormula.innerHTML = `<span class="math-radical">a√x + b√x = (a+b)√x</span> &nbsp;|&nbsp; <span class="math-radical">∛(a·b) = ∛a · ∛b</span>`;
            hudTip.textContent = "Dodajemy tylko jednakowe pierwiastki. Pierwiastek sześcienny szuka sześcianu (a·a·a).";
        }
    }

    renderModuleNavigation() {
        const navContainer = document.getElementById('module-navigation-bar');
        if (!navContainer) return;

        const modules = [
            { id: 'A', name: 'Moduł A: Intuicja', shortName: '📐 Kwadrat', sub: 'Geometria Kwadratu', icon: '📐' },
            { id: 'B', name: 'Moduł B: Kociołek Działań', shortName: '⚗️ Kociołek', sub: 'Mnożenie i Dzielenie', icon: '⚗️' },
            { id: 'C', name: 'Moduł C: Rozbijanie Kamienia', shortName: '💎 Kamień', sub: 'Wyłączanie Czynnika', icon: '💎' },
            { id: 'D', name: 'Moduł D: Abstrakcja i Sześcian', shortName: '🔮 Sześcian', sub: 'Dodawanie i ∛x', icon: '🔮' }
        ];

        navContainer.innerHTML = '';
        modules.forEach(m => {
            const btn = document.createElement('button');
            btn.className = `module-nav-btn ${this.currentModule === m.id ? 'active' : ''}`;
            btn.innerHTML = `<span class="nav-icon">${m.icon}</span> <span class="nav-label-full">${m.name}</span><span class="nav-label-short">${m.shortName}</span>`;
            btn.addEventListener('click', () => {
                this.loadModule(m.id);
            });
            navContainer.appendChild(btn);
        });
    }

    loadModule(modId) {
        this.currentModule = modId;
        window.AlchemistAudio.playPop(1.0);
        this.renderModuleNavigation();
        this.updateHUD();

        const stage = document.getElementById('workbench-dynamic-content');
        if (!stage) return;

        if (modId === 'A') {
            this.renderModuleA(stage);
        } else if (modId === 'B') {
            this.renderModuleB(stage);
        } else if (modId === 'C') {
            this.renderModuleC(stage);
        } else if (modId === 'D') {
            this.renderModuleD(stage);
        }
    }

    // =========================================================================
    // MODUŁ A: INTUICJA - GEOMETRIA KWADRATU
    // =========================================================================
    // =========================================================================
    // MODUŁ A: INTUICJA - GEOMETRIA KWADRATU
    // =========================================================================
    renderModuleA(container) {
        const stepIdx = this.progress.A.currentStep;
        const challenge = this.moduleA_challenges[stepIdx] || this.moduleA_challenges[0];
        this.moduleA_currentSide = Math.max(1, challenge.expectedSide - 2);

        container.innerHTML = `
            <!-- Prominent Mission Hero Banner (Pytanie na pierwszym planie - ADHD) -->
            <div class="mission-hero-banner">
                <div class="mission-top-row">
                    <span class="mission-tag">🎯 TWOJA MISJA • Krok ${stepIdx + 1} z ${this.moduleA_challenges.length}</span>
                    <div class="micro-progress-pills" id="mod-a-pills"></div>
                </div>
                <h2 class="mission-main-question">Jaki bok musi mieć kwadrat o polu ${challenge.area}?</h2>
                <div class="mission-math-target">
                    <span>Szukana liczba:</span> <strong>√${challenge.area} = ?</strong> &nbsp; (Jaka liczba pomnożona przez samą siebie daje ${challenge.area}?)
                </div>
                <div class="mission-action-instruction">
                    👉 <span>Zmień bok poniżej przyciskami <strong>[−]</strong> i <strong>[+]</strong>, a potem kliknij wielki zielony przycisk <strong>PRZEMIEŃ I ZBADAJ BOK</strong>!</span>
                </div>
            </div>

            <div class="module-a-container">
                <div class="square-experiment-stage">
                    <div class="square-visual-box" id="square-box">
                        <div class="alchemical-square" id="visual-square">
                            <div class="ruler-bracket-top" id="ruler-top">a = ${this.moduleA_currentSide}</div>
                            <div class="ruler-bracket-left" id="ruler-left">a = ${this.moduleA_currentSide}</div>
                            <div class="square-grid-overlay" id="grid-overlay"></div>
                            <div class="square-area-badge">
                                <div class="badge-label">Aktualne Pole</div>
                                <div class="badge-value" id="current-area-val">${this.moduleA_currentSide * this.moduleA_currentSide}</div>
                            </div>
                        </div>
                    </div>

                    <div class="square-controls">
                        <div class="action-pointer-hint">
                            <span>👇</span> <span>KROK 1: USTAW DŁUGOŚĆ BOKU (a):</span>
                        </div>

                        <div class="side-stepper-box">
                            <button class="step-btn" id="btn-side-minus" title="Zmniejsz bok">−</button>
                            <div class="current-side-display">
                                <span class="label">Bok (a)</span>
                                <span class="val" id="side-val-display">${this.moduleA_currentSide}</span>
                            </div>
                            <button class="step-btn" id="btn-side-plus" title="Zwiększ bok">+</button>
                        </div>

                        <div style="display: flex; gap: 1rem; align-items: center; width: 100%; justify-content: center; flex-direction: column;">
                            <div class="action-pointer-hint" style="color: var(--mint-soft);">
                                <span>👇</span> <span>KROK 2: DOKONAJ PRZEMIANY:</span>
                            </div>

                            <button class="btn-action-primary" id="btn-check-square">
                                <span>✨</span> PRZEMIEŃ I ZBADAJ BOK!
                            </button>

                            <button class="toggle-xray-btn ${this.moduleA_xray ? 'active' : ''}" id="btn-toggle-xray">
                                <span>👁️</span> Rentgen Kafelków (Włącz/Wyłącz siatkę)
                            </button>
                        </div>

                        <div class="morph-equation-box" id="morph-equation">
                            √${challenge.area} = ? &nbsp; (bo ? · ? = ${challenge.area})
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.renderPills('mod-a-pills', this.moduleA_challenges.length, stepIdx);
        this.updateSquareVisuals(challenge);

        // Events
        document.getElementById('btn-side-minus').addEventListener('click', () => {
            if (this.moduleA_currentSide > 1) {
                this.moduleA_currentSide--;
                window.AlchemistAudio.playPop(0.9);
                this.updateSquareVisuals(challenge);
            }
        });

        document.getElementById('btn-side-plus').addEventListener('click', () => {
            if (this.moduleA_currentSide < 15) {
                this.moduleA_currentSide++;
                window.AlchemistAudio.playPop(1.1);
                this.updateSquareVisuals(challenge);
            }
        });

        document.getElementById('btn-toggle-xray').addEventListener('click', (e) => {
            this.moduleA_xray = !this.moduleA_xray;
            e.currentTarget.classList.toggle('active', this.moduleA_xray);
            window.AlchemistAudio.playPop(1.2);
            this.updateSquareVisuals(challenge);
        });

        document.getElementById('btn-check-square').addEventListener('click', (e) => {
            this.checkSquareAnswer(challenge, e);
        });
    }


    updateSquareVisuals(challenge) {
        const square = document.getElementById('visual-square');
        const sideVal = document.getElementById('side-val-display');
        const areaVal = document.getElementById('current-area-val');
        const rulerTop = document.getElementById('ruler-top');
        const rulerLeft = document.getElementById('ruler-left');
        const gridOverlay = document.getElementById('grid-overlay');

        if (!square) return;

        const side = this.moduleA_currentSide;
        sideVal.textContent = side;
        areaVal.textContent = side * side;
        rulerTop.textContent = `a = ${side}`;
        rulerLeft.textContent = `a = ${side}`;

        // Scale square visually inside box (max 220px)
        const sizePx = Math.min(220, Math.max(50, side * 16));
        square.style.width = `${sizePx}px`;
        square.style.height = `${sizePx}px`;

        // Render grid cells if X-Ray is enabled
        if (this.moduleA_xray) {
            gridOverlay.style.opacity = '0.65';
            gridOverlay.style.gridTemplateColumns = `repeat(${side}, 1fr)`;
            gridOverlay.style.gridTemplateRows = `repeat(${side}, 1fr)`;
            gridOverlay.innerHTML = '';
            for (let i = 0; i < side * side; i++) {
                const cell = document.createElement('div');
                cell.className = 'square-grid-cell';
                gridOverlay.appendChild(cell);
            }
        } else {
            gridOverlay.style.opacity = '0';
        }

        // Live color cue: if side matches expected, soft glow hint
        if (side === challenge.expectedSide) {
            square.classList.add('match');
        } else {
            square.classList.remove('match');
        }
    }

    checkSquareAnswer(challenge, event) {
        const side = this.moduleA_currentSide;
        const squareBox = document.getElementById('square-box');
        const morphEq = document.getElementById('morph-equation');

        if (side === challenge.expectedSide) {
            // Correct! Immediate Reward & Dopamine Loop
            window.AlchemistAudio.playTransmute();
            const rect = squareBox.getBoundingClientRect();
            window.AlchemistParticles.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, '#34D399', 35);
            window.AlchemistParticles.shockwave(rect.left + rect.width / 2, rect.top + rect.height / 2);

            this.addEssence(25, event.clientX, event.clientY);
            this.advanceSpire();

            morphEq.innerHTML = `🎉 <strong>√${challenge.area} = ${side}</strong>, bo ${side} · ${side} = ${challenge.area}!`;
            morphEq.style.borderColor = 'var(--mint-glow)';
            morphEq.style.color = 'var(--mint-soft)';

            // Next step after micro-delay
            setTimeout(() => {
                if (this.progress.A.currentStep < this.moduleA_challenges.length - 1) {
                    this.progress.A.currentStep++;
                    this.renderModuleA(document.getElementById('workbench-dynamic-content'));
                } else {
                    this.progress.A.completed = true;
                    this.showModuleSuccessModal('Moduł A Ukończony!', 'Wspaniale! Zrozumiałaś, że pierwiastek kwadratowy to po prostu bok kwadratu o danym polu.', () => {
                        this.loadModule('B');
                    });
                }
            }, 1200);

        } else {
            // Non-punitive feedback: Gentle bounce, helpful hint, zero red X!
            window.AlchemistAudio.playWobble();
            squareBox.classList.add('gentle-wobble');
            setTimeout(() => squareBox.classList.remove('gentle-wobble'), 500);

            const currArea = side * side;
            morphEq.innerHTML = `Bok <strong>${side}</strong> daje pole <strong>${currArea}</strong>. Szukamy pola <strong>${challenge.area}</strong>! ${currArea < challenge.area ? 'Spróbuj zwiększyć bok.' : 'Spróbuj zmniejszyć bok.'}`;
            morphEq.style.borderColor = 'var(--peach-gentle)';
            morphEq.style.color = 'var(--peach-gentle)';
        }
    }

    // =========================================================================
    // MODUŁ B: KOCIOŁEK ALCHEMICZNY (MNOŻENIE I DZIELENIE)
    // =========================================================================
    renderModuleB(container) {
        const stepIdx = this.progress.B.currentStep;
        const challenge = this.moduleB_challenges[stepIdx] || this.moduleB_challenges[0];
        this.moduleB_selected = [];
        this.moduleB_stage = 'pick';

        const isMul = challenge.type === 'multiply';
        const operationSymbol = isMul ? '·' : '÷';

        container.innerHTML = `
            <!-- Prominent Mission Hero Banner (Pytanie na pierwszym planie - ADHD) -->
            <div class="mission-hero-banner">
                <div class="mission-top-row">
                    <span class="mission-tag">🎯 TWOJA MISJA • Krok ${stepIdx + 1} z ${this.moduleB_challenges.length}</span>
                    <div class="micro-progress-pills" id="mod-b-pills"></div>
                </div>
                <h2 class="mission-main-question">Ile wynosi wynik fuzji: √${challenge.a} ${operationSymbol} √${challenge.b} ?</h2>
                <div class="mission-math-target">
                    <span>Reguła fuzji:</span> <strong>√${challenge.a} ${operationSymbol} √${challenge.b} = √(${challenge.a} ${operationSymbol} ${challenge.b})</strong>
                </div>
                <div class="mission-action-instruction" id="mod-b-instruction">
                    👉 <span>KROK 1: Kliknij na <strong>OBA WIELKIE FLAKONY</strong> poniżej, aby wrzucić składniki do kociołka!</span>
                </div>
            </div>

            <div class="module-b-container">
                <div class="cauldron-stage">
                    <div class="ingredients-shelf">
                        <div class="action-pointer-hint">
                            <span>👇</span> <span>KROK 1: KLIKNIJ W OBA FLAKONY:</span>
                        </div>
                        <div class="ingredient-items-row" id="flask-shelf">
                            <div class="alchemical-flask" id="flask-a" data-val="${challenge.a}">
                                <div class="flask-click-badge">👆 KLIKNIJ MNIE!</div>
                                <div class="flask-math">√${challenge.a}</div>
                                <div class="flask-sub">Składnik I</div>
                            </div>
                            <div style="font-size: 2.6rem; color: var(--gold-soft); font-weight: 800;">${operationSymbol}</div>
                            <div class="alchemical-flask" id="flask-b" data-val="${challenge.b}">
                                <div class="flask-click-badge">👆 KLIKNIJ MNIE!</div>
                                <div class="flask-math">√${challenge.b}</div>
                                <div class="flask-sub">Składnik II</div>
                            </div>
                        </div>
                    </div>

                    <div class="cauldron-vessel" id="cauldron-vessel" title="Kociołek Alchemiczny">
                        <svg class="cauldron-svg" viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="100" cy="40" rx="75" ry="20" fill="#2D2A4A" stroke="#A78BFA" stroke-width="4"/>
                            <path d="M25 40 C 25 150, 175 150, 175 40" fill="#1E1C33" stroke="#A78BFA" stroke-width="4"/>
                            <ellipse cx="100" cy="42" rx="65" ry="14" fill="#34D399" opacity="0.6"/>
                            <!-- Bubbles -->
                            <circle cx="85" cy="40" r="5" fill="#A7F3D0" opacity="0.8"/>
                            <circle cx="115" cy="42" r="7" fill="#A7F3D0" opacity="0.8"/>
                            <circle cx="100" cy="38" r="4" fill="#A7F3D0" opacity="0.8"/>
                        </svg>
                        <div class="cauldron-content-zone" id="cauldron-content-zone">
                            <div class="cauldron-drop-hint" id="cauldron-hint">Kliknij na buteleczki ze składnikami!</div>
                        </div>
                    </div>
                </div>

                <div id="cauldron-action-zone" style="min-height: 80px; display: flex; justify-content: center; align-items: center; width: 100%;">
                    <!-- Action buttons injected here -->
                </div>
            </div>
        `;

        this.renderPills('mod-b-pills', this.moduleB_challenges.length, stepIdx);

        // Bind flask clicks
        const flaskA = document.getElementById('flask-a');
        const flaskB = document.getElementById('flask-b');

        const addFlask = (flask, name, val) => {
            if (this.moduleB_selected.includes(name)) return;
            this.moduleB_selected.push(name);
            flask.classList.add('in-cauldron');
            window.AlchemistAudio.playPop(1.1);

            const rect = document.getElementById('cauldron-vessel').getBoundingClientRect();
            window.AlchemistParticles.burst(rect.left + rect.width / 2, rect.top + 40, '#A78BFA', 16);

            this.updateCauldronState(challenge);
        };

        flaskA.addEventListener('click', () => addFlask(flaskA, 'A', challenge.a));
        flaskB.addEventListener('click', () => addFlask(flaskB, 'B', challenge.b));
    }

    updateCauldronState(challenge) {
        const hint = document.getElementById('cauldron-hint');
        const actionZone = document.getElementById('cauldron-action-zone');
        const vessel = document.getElementById('cauldron-vessel');
        const contentZone = document.getElementById('cauldron-content-zone');
        const isMul = challenge.type === 'multiply';
        const operationSymbol = isMul ? '·' : '÷';

        if (this.moduleB_selected.length === 1) {
            hint.textContent = "Pierwszy składnik w kociołku! Kliknij drugą butelkę!";
            const instr = document.getElementById('mod-b-instruction');
            if (instr) instr.innerHTML = `👉 <span>Świetnie! Teraz kliknij <strong>DRUGI FLAKON</strong>!</span>`;
        } else if (this.moduleB_selected.length === 2 && this.moduleB_stage === 'pick') {
            this.moduleB_stage = 'ready_to_fuse';
            window.AlchemistAudio.playMerge();
            vessel.classList.add('boiling');

            const instr = document.getElementById('mod-b-instruction');
            if (instr) instr.innerHTML = `👉 <span>KROK 2: Kliknij poniżej wielki przycisk <strong>POŁĄCZ POD JEDNYM PIERWIASTKIEM</strong>!</span>`;

            const insideExpr = isMul ? `${challenge.a} · ${challenge.b}` : `${challenge.a} / ${challenge.b}`;
            contentZone.innerHTML = `
                <div style="font-family: var(--font-heading); font-size: 1.8rem; color: #fff; font-weight: 800; text-shadow: 0 0 15px rgba(167, 139, 250, 0.8);">
                    √(${insideExpr})
                </div>
            `;

            actionZone.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; gap: 0.6rem; width: 100%;">
                    <div class="action-pointer-hint" style="color: var(--mint-soft);">
                        <span>👇</span> <span>KROK 2: DOKONAJ FUZJI W KOCIOŁKU:</span>
                    </div>
                    <button class="btn-action-primary" id="btn-fuse-cauldron">
                        <span>🔥</span> POŁĄCZ W KOCIOŁKU: √(${insideExpr})!
                    </button>
                </div>
            `;

            document.getElementById('btn-fuse-cauldron').addEventListener('click', () => {
                this.fuseCauldron(challenge);
            });
        }
    }

    fuseCauldron(challenge) {
        const isMul = challenge.type === 'multiply';
        const intermediateVal = isMul ? challenge.product : challenge.quotient;
        const contentZone = document.getElementById('cauldron-content-zone');
        const actionZone = document.getElementById('cauldron-action-zone');

        window.AlchemistAudio.playCrack();
        const vessel = document.getElementById('cauldron-vessel');
        const rect = vessel.getBoundingClientRect();
        window.AlchemistParticles.burst(rect.left + rect.width / 2, rect.top + 40, '#FBBF24', 28);

        contentZone.innerHTML = `
            <div style="font-family: var(--font-heading); font-size: 2.2rem; color: var(--gold-soft); font-weight: 800; text-shadow: 0 0 20px rgba(251, 191, 36, 0.9);">
                √${intermediateVal}
            </div>
        `;

        const instr = document.getElementById('mod-b-instruction');
        if (instr) instr.innerHTML = `👉 <span>KROK 3: Ostatni krok! Kliknij <strong>WYCIĄGNIJ PIERWIASTEK</strong>, aby zakończyć przemianę!</span>`;

        actionZone.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.6rem; width: 100%;">
                <div class="action-pointer-hint" style="color: var(--gold-soft);">
                    <span>👇</span> <span>KROK 3: WYCIĄGNIJ OSTATECZNĄ WARTOŚĆ:</span>
                </div>
                <button class="btn-action-primary" id="btn-transmute-pure">
                    <span>✨</span> OSTATECZNA PRZEMIANA: OBLICZ √${intermediateVal}!
                </button>
            </div>
        `;

        document.getElementById('btn-transmute-pure').addEventListener('click', (e) => {
            window.AlchemistAudio.playTransmute();
            window.AlchemistParticles.burst(rect.left + rect.width / 2, rect.top + 40, '#34D399', 40);
            window.AlchemistParticles.shockwave(rect.left + rect.width / 2, rect.top + 40);

            this.addEssence(30, e.clientX, e.clientY);
            this.advanceSpire();

            actionZone.innerHTML = `
                <div class="transmute-result-card">
                    <div>
                        <div style="font-size: 0.85rem; color: var(--mint-soft); text-transform: uppercase;">Czyste Złoto Alchemiczne!</div>
                        <div style="font-size: 1.25rem; color: #fff;">${isMul ? `√${challenge.a} · √${challenge.b} = √${intermediateVal}` : `√${challenge.a} / √${challenge.b} = √${intermediateVal}`} =</div>
                    </div>
                    <div class="result-pure-val">${challenge.result}</div>
                </div>
            `;

            setTimeout(() => {
                if (this.progress.B.currentStep < this.moduleB_challenges.length - 1) {
                    this.progress.B.currentStep++;
                    this.renderModuleB(document.getElementById('workbench-dynamic-content'));
                } else {
                    this.progress.B.completed = true;
                    this.showModuleSuccessModal('Moduł B Ukończony!', 'Wspaniale opanowałaś łączenie i dzielenie pierwiastków w kociołku alchemicznym!', () => {
                        this.loadModule('C');
                    });
                }
            }, 1800);
        });
    }

    // =========================================================================
    // MODUŁ C: TRANSFORMACJA (ROZBIJANIE KAMIENIA - WYŁĄCZANIE CZYNNIKA)
    // =========================================================================
    renderModuleC(container) {
        const stepIdx = this.progress.C.currentStep;
        const challenge = this.moduleC_challenges[stepIdx] || this.moduleC_challenges[0];
        this.moduleC_stage = 'pick_pair';
        this.moduleC_selectedPair = null;

        container.innerHTML = `
            <!-- Prominent Mission Hero Banner (Pytanie na pierwszym planie - ADHD) -->
            <div class="mission-hero-banner">
                <div class="mission-top-row">
                    <span class="mission-tag">🎯 TWOJA MISJA • Krok ${stepIdx + 1} z ${this.moduleC_challenges.length}</span>
                    <div class="micro-progress-pills" id="mod-c-pills"></div>
                </div>
                <h2 class="mission-main-question">Jak wyłączyć czynnik przed pierwiastek √${challenge.number}?</h2>
                <div class="mission-math-target">
                    <span>Szukamy:</span> <strong>√${challenge.number} = ? · √?</strong> &nbsp; (Rozbij liczbę ${challenge.number} na iloczyn z kwadratem: 4, 9, 16...)
                </div>
                <div class="mission-action-instruction" id="mod-c-instruction">
                    👉 <span>KROK 1: Wybierz i kliknij poniżej <strong>wielki przycisk z parą liczb</strong> z kwadratem!</span>
                </div>
            </div>

            <div class="module-c-container">
                <div class="radical-stone-arena">
                    <div class="alchemical-crystal-stone" id="crystal-stone">
                        <span id="stone-radical-symbol">√</span>
                        <span id="stone-inner-content">${challenge.number}</span>
                    </div>

                    <div class="factor-selection-stage" id="factor-stage">
                        <div class="action-pointer-hint" style="font-size: 1.15rem; margin-bottom: 0.8rem;">
                            <span>👇</span> <span>KROK 1: WYBIERZ ROZBICIE LICZBY ${challenge.number}:</span>
                        </div>
                        <div class="factor-options-row" id="factor-options-row"></div>
                    </div>

                    <div id="extraction-interactive-zone" style="min-height: 80px; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%;"></div>
                </div>
            </div>
        `;

        this.renderPills('mod-c-pills', this.moduleC_challenges.length, stepIdx);

        // Render factor options
        const optionsRow = document.getElementById('factor-options-row');
        // Shuffle pairs slightly so correct isn't always first
        const shuffledPairs = [...challenge.pairs].sort(() => Math.random() - 0.5);

        shuffledPairs.forEach(pair => {
            const btn = document.createElement('button');
            btn.className = 'factor-pair-btn';
            btn.innerHTML = `<span style="font-size: 1.8rem;">🔨</span> <span>${pair.sq} · ${pair.rem}</span>`;
            btn.addEventListener('click', (e) => {
                this.selectFactorPair(challenge, pair, e);
            });
            optionsRow.appendChild(btn);
        });
    }

    selectFactorPair(challenge, pair, event) {
        const stone = document.getElementById('crystal-stone');
        const innerContent = document.getElementById('stone-inner-content');
        const factorStage = document.getElementById('factor-stage');
        const extractionZone = document.getElementById('extraction-interactive-zone');

        if (pair.sq === challenge.correctSq && pair.rem === challenge.correctRem) {
            // Correct square factor found!
            window.AlchemistAudio.playCrack();
            stone.classList.add('cracked');

            const rect = stone.getBoundingClientRect();
            window.AlchemistParticles.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, '#34D399', 28);

            innerContent.innerHTML = `
                <span class="extractable-factor-pill" id="square-pill" title="Kliknij, aby wyciągnąć!">
                    <span class="flask-click-badge" style="top: -15px;">👆 KLIKNIJ!</span>
                    ${pair.sq}
                </span> · ${pair.rem}
            `;

            factorStage.style.display = 'none';

            const instr = document.getElementById('mod-c-instruction');
            if (instr) {
                instr.innerHTML = `👉 <span>KROK 2: Brawo! Teraz <strong>KLIKNIJ ZŁOTĄ LICZBĘ [ ${pair.sq} ]</strong> w kamieniu, aby wyciągnąć pierwiastek!</span>`;
            }

            extractionZone.innerHTML = `
                <div style="text-align: center; margin-top: 1rem;">
                    <div class="action-pointer-hint" style="color: var(--gold-soft); font-size: 1.3rem;">
                        <span>👇</span> <span>KLIKNIJ NA ZŁOTĄ LICZBĘ [ ${pair.sq} ] W KAMIENIU POWYŻEJ!</span>
                    </div>
                </div>
            `;

            document.getElementById('square-pill').addEventListener('click', (e) => {
                this.executeFactorExtraction(challenge, pair, e);
            });

        } else {
            // Non-punitive feedback: Gentle wobble, reminder to check Grimoire squares
            window.AlchemistAudio.playWobble();
            stone.classList.add('gentle-wobble');
            setTimeout(() => stone.classList.remove('gentle-wobble'), 500);

            // Highlight pinned HUD
            const hud = document.getElementById('pinned-hud-card');
            hud.classList.add('highlight');
            setTimeout(() => hud.classList.remove('highlight'), 1500);

            const promptText = document.createElement('div');
            promptText.style.color = 'var(--peach-gentle)';
            promptText.style.fontSize = '0.9rem';
            promptText.style.marginTop = '0.5rem';
            promptText.textContent = `Ani ${pair.sq}, ani ${pair.rem} nie jest kwadratem liczby naturalnej! Zobacz do Grimuaru na kwadraty: 4, 9, 16, 25...`;
            
            // Temporary note
            factorStage.appendChild(promptText);
            setTimeout(() => promptText.remove(), 2500);
        }
    }

    executeFactorExtraction(challenge, pair, event) {
        const pill = document.getElementById('square-pill');
        const stone = document.getElementById('crystal-stone');
        const extractionZone = document.getElementById('extraction-interactive-zone');

        pill.classList.add('hopping-out');
        window.AlchemistAudio.playTransmute();

        const rect = stone.getBoundingClientRect();
        window.AlchemistParticles.burst(rect.left + 50, rect.top + 20, '#FBBF24', 30);
        window.AlchemistParticles.runeFloat(rect.left + 40, rect.top, `√${pair.sq} = ${challenge.extracted}`);

        this.addEssence(35, event.clientX, event.clientY);
        this.advanceSpire();

        setTimeout(() => {
            stone.innerHTML = `
                <span style="color: var(--gold-soft); font-size: 2.8rem; margin-right: 6px;">${challenge.extracted}</span><span style="color: var(--mint-soft);">√</span>${pair.rem}
            `;
            stone.style.borderColor = 'var(--mint-glow)';

            extractionZone.innerHTML = `
                <div style="text-align: center; animation: scale-in-bounce 0.4s ease;">
                    <div style="font-size: 1.25rem; font-family: var(--font-heading); color: var(--mint-soft); font-weight: 700;">
                        ✨ Sukces: √${challenge.number} = ${challenge.extracted}√${pair.rem}
                    </div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.3rem;">
                        Bo √( ${pair.sq} · ${pair.rem} ) = √${pair.sq} · √${pair.rem} = ${challenge.extracted}√${pair.rem}
                    </div>
                </div>
            `;

            setTimeout(() => {
                if (this.progress.C.currentStep < this.moduleC_challenges.length - 1) {
                    this.progress.C.currentStep++;
                    this.renderModuleC(document.getElementById('workbench-dynamic-content'));
                } else {
                    this.progress.C.completed = true;
                    this.showModuleSuccessModal('Moduł C Ukończony!', 'Opanowałaś wyłączanie czynnika przed znak pierwiastka! To jedna z najważniejszych umiejętności w klasie 8.', () => {
                        this.loadModule('D');
                    });
                }
            }, 2000);
        }, 700);
    }

    // =========================================================================
    // MODUŁ D: ABSTRAKCJA (DODAWANIE PIERWIASTKÓW & PIERWIASTEK SZEŚCIENNY)
    // =========================================================================
    renderModuleD(container) {
        const stepIdx = this.progress.D.currentStep;
        const challenge = this.moduleD_challenges[stepIdx] || this.moduleD_challenges[0];

        container.innerHTML = `
            <div class="module-d-container" id="mod-d-workspace">
                <!-- Injected based on challenge type -->
            </div>
        `;

        const ws = document.getElementById('mod-d-workspace');

        if (challenge.type === 'addition') {
            this.renderD_Addition(ws, challenge);
        } else if (challenge.type === 'addition-trap') {
            this.renderD_AdditionTrap(ws, challenge);
        } else if (challenge.type === 'cube-root') {
            this.renderD_CubeRoot(ws, challenge);
        } else if (challenge.type === 'cube-operation') {
            this.renderD_CubeOperation(ws, challenge);
        }
    }

    renderD_Addition(container, challenge) {
        const stepIdx = this.progress.D.currentStep;
        container.innerHTML = `
            <!-- Prominent Mission Hero Banner (Pytanie na pierwszym planie - ADHD) -->
            <div class="mission-hero-banner">
                <div class="mission-top-row">
                    <span class="mission-tag">🎯 TWOJA MISJA • Krok ${stepIdx + 1} z ${this.moduleD_challenges.length}</span>
                    <div class="micro-progress-pills" id="mod-d-pills"></div>
                </div>
                <h2 class="mission-main-question">Ile wynosi suma: ${challenge.gem1.coeff}√${challenge.gem1.radical} + ${challenge.gem2.coeff}√${challenge.gem2.radical} ?</h2>
                <div class="mission-math-target">
                    <span>Reguła:</span> <strong>a√x + b√x = (a + b)√x</strong> &nbsp; (Dodajemy liczby przed pierwiastkiem!)
                </div>
                <div class="mission-action-instruction">
                    👉 <span>Kliknij wielki zielony przycisk poniżej, aby połączyć jednakowe kryształy!</span>
                </div>
            </div>

            <div class="resonance-arena">
                <div class="gem-cluster-row">
                    <div class="alchemical-gem gem-green" id="gem-1">
                        <span>💎</span> <span>${challenge.gem1.coeff}√${challenge.gem1.radical}</span>
                    </div>
                    <div style="font-size: 2.8rem; color: var(--mint-soft); font-weight: 800;">+</div>
                    <div class="alchemical-gem gem-green" id="gem-2">
                        <span>💎</span> <span>${challenge.gem2.coeff}√${challenge.gem2.radical}</span>
                    </div>
                </div>

                <div id="resonance-action-zone" style="margin-top: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.6rem; width: 100%;">
                    <div class="action-pointer-hint" style="color: var(--mint-soft);">
                        <span>👇</span> <span>KLIKNIJ PRZYCISK AKCJI:</span>
                    </div>
                    <button class="btn-action-primary" id="btn-merge-gems">
                        <span>⚡</span> POŁĄCZ KRYSZTAŁY: (${challenge.gem1.coeff} + ${challenge.gem2.coeff})√${challenge.gem1.radical}!
                    </button>
                </div>
            </div>
        `;

        this.renderPills('mod-d-pills', this.moduleD_challenges.length, stepIdx);

        document.getElementById('btn-merge-gems').addEventListener('click', (e) => {
            window.AlchemistAudio.playTransmute();
            const rect = document.getElementById('gem-1').getBoundingClientRect();
            window.AlchemistParticles.burst(rect.left + 100, rect.top + 20, '#34D399', 30);
            window.AlchemistParticles.shockwave(rect.left + 100, rect.top + 20);

            this.addEssence(35, e.clientX, e.clientY);
            this.advanceSpire();

            container.innerHTML = `
                <div class="transmute-result-card" style="margin: 1.5rem auto;">
                    <div>
                        <div style="font-size: 0.85rem; color: var(--mint-soft); text-transform: uppercase;">Jednakowe Pierwiastki!</div>
                        <div style="font-size: 1.25rem; color: #fff;">(${challenge.gem1.coeff} + ${challenge.gem2.coeff})√${challenge.gem1.radical} =</div>
                    </div>
                    <div class="result-pure-val">${challenge.resultCoeff}√${challenge.resultRadical}</div>
                </div>
            `;

            setTimeout(() => this.nextDStep(), 1800);
        });
    }

    renderD_AdditionTrap(container, challenge) {
        const stepIdx = this.progress.D.currentStep;
        container.innerHTML = `
            <!-- Prominent Mission Hero Banner (Pytanie na pierwszym planie - ADHD) -->
            <div class="mission-hero-banner" style="border-color: var(--rose-glow);">
                <div class="mission-top-row">
                    <span class="mission-tag" style="background: rgba(244, 114, 182, 0.22); border-color: var(--rose-glow); color: var(--rose-soft);">⚠️ PUŁAPKA ALCHEMICZNA • Krok ${stepIdx + 1} z ${this.moduleD_challenges.length}</span>
                    <div class="micro-progress-pills" id="mod-d-pills"></div>
                </div>
                <h2 class="mission-main-question">Czy można dodać do siebie: ${challenge.gem1.coeff}√${challenge.gem1.radical} + ${challenge.gem2.coeff}√${challenge.gem2.radical} ?</h2>
                <div class="mission-math-target">
                    <span>Zwróć uwagę:</span> <strong>√${challenge.gem1.radical} oraz √${challenge.gem2.radical}</strong> &nbsp; (Czy liczby pod pierwiastkami są takie same?)
                </div>
                <div class="mission-action-instruction">
                    👉 <span>Wybierz właściwą odpowiedź poniżej: czy te kryształy można połączyć?</span>
                </div>
            </div>

            <div class="resonance-arena">
                <div class="gem-cluster-row">
                    <div class="alchemical-gem gem-green" id="trap-gem-1">
                        <span>💎</span> <span>${challenge.gem1.coeff}√${challenge.gem1.radical}</span>
                    </div>
                    <div style="font-size: 2.8rem; color: var(--violet-soft); font-weight: 800;">+</div>
                    <div class="alchemical-gem gem-purple" id="trap-gem-2">
                        <span>🔮</span> <span>${challenge.gem2.coeff}√${challenge.gem2.radical}</span>
                    </div>
                </div>

                <div id="trap-action-zone" style="margin-top: 1.5rem; display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center; width: 100%;">
                    <button class="factor-pair-btn" id="btn-trap-merge" style="border-color: rgba(239, 68, 68, 0.6);">
                        <span>❌</span> Połącz w jeden pierwiastek
                    </button>
                    <button class="btn-action-primary" id="btn-trap-separate">
                        <span>🛡️</span> NIE DA SIĘ POŁĄCZYĆ! (Różne pierwiastki)
                    </button>
                </div>
            </div>
        `;

        this.renderPills('mod-d-pills', this.moduleD_challenges.length, stepIdx);

        document.getElementById('btn-trap-merge').addEventListener('click', () => {
            window.AlchemistAudio.playWobble();
            const g1 = document.getElementById('trap-gem-1');
            const g2 = document.getElementById('trap-gem-2');
            g1.classList.add('gentle-wobble');
            g2.classList.add('gentle-wobble');
            setTimeout(() => {
                g1.classList.remove('gentle-wobble');
                g2.classList.remove('gentle-wobble');
            }, 500);

            // Educational feedback
            const tip = document.createElement('div');
            tip.style.color = 'var(--peach-gentle)';
            tip.style.marginTop = '1rem';
            tip.style.fontSize = '1.05rem';
            tip.style.fontWeight = '700';
            tip.textContent = "Odpychanie magnetyczne! √2 i √5 to różne pierwiastki. Dodawać możemy tylko jednakowe pierwiastki (np. 3√2 + 4√2).";
            container.appendChild(tip);
            setTimeout(() => tip.remove(), 2500);
        });

        document.getElementById('btn-trap-separate').addEventListener('click', (e) => {
            window.AlchemistAudio.playTransmute();
            this.addEssence(40, e.clientX, e.clientY);
            this.advanceSpire();

            container.innerHTML = `
                <div class="transmute-result-card" style="margin: 1.5rem auto;">
                    <div>
                        <div style="font-size: 0.85rem; color: var(--gold-soft); text-transform: uppercase;">Mądrość Alchemiczki!</div>
                        <div style="font-size: 1.25rem; color: #fff;">3√2 + 4√5 NIE da się zwinąć w jeden pierwiastek. Wyrażenie jest już w najprostszej postaci!</div>
                    </div>
                </div>
            `;

            setTimeout(() => this.nextDStep(), 2000);
        });
    }

    renderD_CubeRoot(container, challenge) {
        const stepIdx = this.progress.D.currentStep;
        let currentEdge = 1;

        container.innerHTML = `
            <!-- Prominent Mission Hero Banner (Pytanie na pierwszym planie - ADHD) -->
            <div class="mission-hero-banner">
                <div class="mission-top-row">
                    <span class="mission-tag">🎯 SZEŚCIENNA WIEŻA • Krok ${stepIdx + 1} z ${this.moduleD_challenges.length}</span>
                    <div class="micro-progress-pills" id="mod-d-pills"></div>
                </div>
                <h2 class="mission-main-question">Jaka krawędź daje sześcian o objętości V = ${challenge.volume}?</h2>
                <div class="mission-math-target">
                    <span>Szukana liczba:</span> <strong>∛${challenge.volume} = ?</strong> &nbsp; (Jaka liczba: a · a · a = ${challenge.volume}?)
                </div>
                <div class="mission-action-instruction">
                    👉 <span>KROK 1: Ustaw krawędź przyciskami <strong>[−]</strong> i <strong>[+]</strong>. 👉 KROK 2: Kliknij <strong>SPRAWDŹ PIERWIASTEK SZEŚCIENNY</strong>!</span>
                </div>
            </div>

            <div class="resonance-arena">
                <div class="cube-3d-stage">
                    <svg viewBox="0 0 160 160" width="160" height="160">
                        <!-- Isometric Cube Projection -->
                        <polygon points="80,20 135,50 80,80 25,50" fill="#F472B6" opacity="0.8" stroke="#FBCFE8" stroke-width="2"/>
                        <polygon points="25,50 80,80 80,140 25,110" fill="#DB2777" opacity="0.85" stroke="#FBCFE8" stroke-width="2"/>
                        <polygon points="80,80 135,50 135,110 80,140" fill="#9D174D" opacity="0.9" stroke="#FBCFE8" stroke-width="2"/>
                        <text x="80" y="85" text-anchor="middle" fill="#fff" font-family="'Outfit', sans-serif" font-weight="700" font-size="18">V = ${challenge.volume}</text>
                    </svg>
                </div>

                <div class="square-controls">
                    <div class="action-pointer-hint">
                        <span>👇</span> <span>KROK 1: USTAW DŁUGOŚĆ KRAWĘDZI (a):</span>
                    </div>

                    <div class="side-stepper-box">
                        <button class="step-btn" id="btn-cube-minus" title="Zmniejsz krawędź">−</button>
                        <div class="current-side-display">
                            <span class="label">Krawędź (a)</span>
                            <span class="val" id="cube-edge-val">${currentEdge}</span>
                        </div>
                        <button class="step-btn" id="btn-cube-plus" title="Zwiększ krawędź">+</button>
                    </div>

                    <div style="font-size: 1.15rem; color: var(--text-secondary); margin: 0.5rem 0;">
                        Obliczona Objętość: a · a · a = <span id="cube-calc-val" style="color: var(--gold-soft); font-weight: 800; font-size: 1.4rem;">${currentEdge * currentEdge * currentEdge}</span>
                    </div>

                    <div class="action-pointer-hint" style="color: var(--mint-soft);">
                        <span>👇</span> <span>KROK 2: DOKONAJ PRZEMIANY:</span>
                    </div>

                    <button class="btn-action-primary" id="btn-check-cube">
                        <span>🔮</span> SPRAWDŹ PIERWIASTEK SZEŚCIENNY (∛${challenge.volume})!
                    </button>
                </div>
            </div>
        `;

        this.renderPills('mod-d-pills', this.moduleD_challenges.length, stepIdx);

        const edgeValDisplay = document.getElementById('cube-edge-val');
        const calcValDisplay = document.getElementById('cube-calc-val');

        document.getElementById('btn-cube-minus').addEventListener('click', () => {
            if (currentEdge > 1) {
                currentEdge--;
                window.AlchemistAudio.playPop(0.9);
                edgeValDisplay.textContent = currentEdge;
                calcValDisplay.textContent = currentEdge * currentEdge * currentEdge;
            }
        });

        document.getElementById('btn-cube-plus').addEventListener('click', () => {
            if (currentEdge < 6) {
                currentEdge++;
                window.AlchemistAudio.playPop(1.1);
                edgeValDisplay.textContent = currentEdge;
                calcValDisplay.textContent = currentEdge * currentEdge * currentEdge;
            }
        });

        document.getElementById('btn-check-cube').addEventListener('click', (e) => {
            if (currentEdge === challenge.expectedEdge) {
                window.AlchemistAudio.playTransmute();
                this.addEssence(35, e.clientX, e.clientY);
                this.advanceSpire();

                container.innerHTML = `
                    <div class="transmute-result-card" style="margin: 1.5rem auto;">
                        <div>
                            <div style="font-size: 0.85rem; color: var(--rose-soft); text-transform: uppercase;">Pierwiastek Sześcienny!</div>
                            <div style="font-size: 1.25rem; color: #fff;">∛${challenge.volume} =</div>
                        </div>
                        <div class="result-pure-val" style="color: var(--rose-soft);">${challenge.expectedEdge}</div>
                    </div>
                `;

                setTimeout(() => this.nextDStep(), 1800);
            } else {
                window.AlchemistAudio.playWobble();
                calcValDisplay.style.color = 'var(--peach-gentle)';
            }
        });
    }

    renderD_CubeOperation(container, challenge) {
        const stepIdx = this.progress.D.currentStep;
        container.innerHTML = `
            <!-- Prominent Mission Hero Banner (Pytanie na pierwszym planie - ADHD) -->
            <div class="mission-hero-banner">
                <div class="mission-top-row">
                    <span class="mission-tag">🎯 MNOŻENIE SZEŚCIENNE • Krok ${stepIdx + 1} z ${this.moduleD_challenges.length}</span>
                    <div class="micro-progress-pills" id="mod-d-pills"></div>
                </div>
                <h2 class="mission-main-question">Ile wynosi iloczyn: ∛${challenge.a} · ∛${challenge.b} ?</h2>
                <div class="mission-math-target">
                    <span>Reguła:</span> <strong>∛${challenge.a} · ∛${challenge.b} = ∛(${challenge.a} · ${challenge.b}) = ∛${challenge.product}</strong>
                </div>
                <div class="mission-action-instruction">
                    👉 <span>Kliknij wielki przycisk poniżej, aby połączyć pierwiastki i wyliczyć wynik!</span>
                </div>
            </div>

            <div class="resonance-arena">
                <div class="gem-cluster-row">
                    <div class="alchemical-gem gem-cube">
                        <span>🔮</span> <span>∛${challenge.a}</span>
                    </div>
                    <div style="font-size: 2.8rem; color: var(--rose-soft); font-weight: 800;">·</div>
                    <div class="alchemical-gem gem-cube">
                        <span>🔮</span> <span>∛${challenge.b}</span>
                    </div>
                </div>

                <div style="margin-top: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.6rem; width: 100%;">
                    <div class="action-pointer-hint" style="color: var(--mint-soft);">
                        <span>👇</span> <span>KLIKNIJ PRZYCISK AKCJI:</span>
                    </div>
                    <button class="btn-action-primary" id="btn-fuse-cubes">
                        <span>✨</span> POŁĄCZ W ∛(${challenge.a} · ${challenge.b}) I OBLICZ!
                    </button>
                </div>
            </div>
        `;

        this.renderPills('mod-d-pills', this.moduleD_challenges.length, stepIdx);

        document.getElementById('btn-fuse-cubes').addEventListener('click', (e) => {
            window.AlchemistAudio.playTransmute();
            this.addEssence(40, e.clientX, e.clientY);
            this.advanceSpire();

            container.innerHTML = `
                <div class="transmute-result-card" style="margin: 1.5rem auto;">
                    <div>
                        <div style="font-size: 0.85rem; color: var(--rose-soft); text-transform: uppercase;">Mnożenie Pierwiastków 3. Stopnia!</div>
                        <div style="font-size: 1.25rem; color: #fff;">∛2 · ∛4 = ∛8 =</div>
                    </div>
                    <div class="result-pure-val" style="color: var(--rose-soft);">${challenge.result}</div>
                </div>
            `;

            setTimeout(() => this.nextDStep(), 2000);
        });
    }

    nextDStep() {
        if (this.progress.D.currentStep < this.moduleD_challenges.length - 1) {
            this.progress.D.currentStep++;
            this.renderModuleD(document.getElementById('workbench-dynamic-content'));
        } else {
            this.progress.D.completed = true;
            this.showGrandFinale();
        }
    }

    // Grand Finale Screen with Majestic Golden Trophy, Huge Congratulations, and Continuous Fireworks!
    showGrandFinale() {
        // Start triumphal audio and continuous fireworks spectacle
        if (window.AlchemistAudio) {
            window.AlchemistAudio.playGrandFanfare();
        }
        if (window.AlchemistParticles) {
            window.AlchemistParticles.startFireworksShow();
        }

        const overlay = document.createElement('div');
        overlay.className = 'grand-finale-overlay';
        overlay.id = 'grand-finale-screen';

        overlay.innerHTML = `
            <div class="grand-finale-card">
                <!-- Rotating rays & Majestic Trophy Cup -->
                <div class="trophy-stage">
                    <div class="trophy-rays-backdrop"></div>
                    <svg class="trophy-svg-icon" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="gold-cup" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#FFFBEB"/>
                                <stop offset="35%" stop-color="#FBBF24"/>
                                <stop offset="70%" stop-color="#F59E0B"/>
                                <stop offset="100%" stop-color="#B45309"/>
                            </linearGradient>
                            <linearGradient id="gold-handles" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#FDE68A"/>
                                <stop offset="100%" stop-color="#D97706"/>
                            </linearGradient>
                            <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="8" result="blur"/>
                                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                            </filter>
                        </defs>
                        <!-- Handles -->
                        <path d="M 45 65 C 15 65, 15 115, 60 115" stroke="url(#gold-handles)" stroke-width="12" stroke-linecap="round" fill="none"/>
                        <path d="M 155 65 C 185 65, 185 115, 140 115" stroke="url(#gold-handles)" stroke-width="12" stroke-linecap="round" fill="none"/>
                        <!-- Pedestal Base -->
                        <ellipse cx="100" cy="175" rx="55" ry="14" fill="#78350F"/>
                        <path d="M 60 170 L 75 140 L 125 140 L 140 170 Z" fill="url(#gold-cup)"/>
                        <rect x="90" y="125" width="20" height="20" rx="3" fill="#D97706"/>
                        <!-- Cup Bowl -->
                        <path d="M 50 45 C 50 120, 150 120, 150 45 Z" fill="url(#gold-cup)" filter="url(#glow-gold)"/>
                        <ellipse cx="100" cy="45" rx="50" ry="12" fill="#FEF3C7"/>
                        <!-- Runic Star on Trophy -->
                        <circle cx="100" cy="80" r="14" fill="#1E1B4B" stroke="#FDE68A" stroke-width="2"/>
                        <text x="100" y="85" text-anchor="middle" fill="#FDE68A" font-size="14" font-weight="bold" font-family="'Outfit', sans-serif">√</text>
                        <!-- Sparkles -->
                        <path d="M 155 35 Q 160 45 170 45 Q 160 45 155 55 Q 150 45 140 45 Q 150 45 155 35 Z" fill="#FFF"/>
                        <path d="M 40 40 Q 45 47 52 47 Q 45 47 40 54 Q 35 47 28 47 Q 35 47 40 40 Z" fill="#FDE68A"/>
                    </svg>
                </div>

                <div class="finale-congrats-tag">✨ ARCY-MISTRZYNI PIERWIASTKÓW ✨</div>
                <h1 class="finale-title">WIELKIE GRATULACJE!</h1>
                <p class="finale-subtitle">
                    Opanowałaś wszystkie tajniki pierwiastków dla klasy 8!<br>
                    Twój alchemiczny umysł potrafi teraz transformować liczby, rozbijać kamienie i budować sześciany!
                </p>

                <!-- 4 Badges of Mastery -->
                <div class="finale-badges-grid">
                    <div class="finale-badge-card">
                        <div class="badge-icon-box">📐</div>
                        <div>
                            <div class="badge-info-name">Mistrzyni Kwadratu</div>
                            <div class="badge-info-desc">Zrozumiałaś, że √Pole = Bok kwadratu</div>
                        </div>
                    </div>
                    <div class="finale-badge-card">
                        <div class="badge-icon-box">⚗️</div>
                        <div>
                            <div class="badge-info-name">Władczyni Kociołka</div>
                            <div class="badge-info-desc">Fuzja i dzielenie pod jednym pierwiastkiem</div>
                        </div>
                    </div>
                    <div class="finale-badge-card">
                        <div class="badge-icon-box">💎</div>
                        <div>
                            <div class="badge-info-name">Łamaczka Kamieni</div>
                            <div class="badge-info-desc">Wyłączanie czynnika przed znak pierwiastka</div>
                        </div>
                    </div>
                    <div class="finale-badge-card">
                        <div class="badge-icon-box">🔮</div>
                        <div>
                            <div class="badge-info-name">Pani Sześcianu</div>
                            <div class="badge-info-desc">Rezonans runiczny i pierwiastek ∛V = a</div>
                        </div>
                    </div>
                </div>

                <!-- Stats summary -->
                <div class="finale-stats-bar">
                    <div>Esencja: <strong style="color: var(--gold-soft);">💎 ${this.essence}</strong></div>
                    <div>Wieża Alchemika: <strong style="color: var(--mint-soft);">12/12 Pięter 🏰</strong></div>
                    <div>Ranga: <strong style="color: var(--rose-soft);">Arc-Alchemist 🌟</strong></div>
                </div>

                <!-- Action Buttons -->
                <div class="finale-actions-row">
                    <button class="btn-fireworks-salvo" id="btn-more-fireworks">
                        <span>🎆</span> Wystrzel Salwę Fajerwerków!
                    </button>
                    <button class="btn-action-primary" id="btn-finale-restart">
                        <span>🔄</span> Zagraj Ponownie
                    </button>
                    <button class="btn-grimoire-trigger" id="btn-finale-grimoire" style="font-size: 1rem; padding: 0.8rem 1.4rem;">
                        <span>📖</span> Otwórz Grimuar
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Fireworks salvo button
        document.getElementById('btn-more-fireworks').addEventListener('click', () => {
            if (window.AlchemistParticles) {
                window.AlchemistParticles.launchFirework(null, null, '#FBBF24');
                setTimeout(() => window.AlchemistParticles.launchFirework(null, null, '#F472B6'), 150);
                setTimeout(() => window.AlchemistParticles.launchFirework(null, null, '#34D399'), 300);
                setTimeout(() => window.AlchemistParticles.launchFirework(null, null, '#60A5FA'), 450);
            }
        });

        // Restart button
        document.getElementById('btn-finale-restart').addEventListener('click', () => {
            if (window.AlchemistParticles) {
                window.AlchemistParticles.stopFireworksShow();
            }
            overlay.remove();
            this.progress.A.currentStep = 0;
            this.progress.B.currentStep = 0;
            this.progress.C.currentStep = 0;
            this.progress.D.currentStep = 0;
            this.loadModule('A');
        });

        // Grimoire button
        document.getElementById('btn-finale-grimoire').addEventListener('click', () => {
            const grimoireDrawer = document.getElementById('grimoire-drawer');
            const grimoireOverlay = document.getElementById('grimoire-overlay');
            if (grimoireDrawer && grimoireOverlay) {
                grimoireOverlay.classList.add('open');
                grimoireDrawer.classList.add('open');
            }
        });
    }

    // Helper: Micro-progress pills
    renderPills(containerId, count, activeIdx) {
        const c = document.getElementById(containerId);
        if (!c) return;
        c.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const pill = document.createElement('div');
            pill.className = `micro-pill ${i < activeIdx ? 'done' : ''} ${i === activeIdx ? 'active' : ''}`;
            c.appendChild(pill);
        }
    }

    // Encouraging Modal without anxiety
    showModuleSuccessModal(title, message, onProceed) {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0, 0, 0, 0.75)';
        modal.style.backdropFilter = 'blur(8px)';
        modal.style.display = 'grid';
        modal.style.placeItems = 'center';
        modal.style.zIndex = '1000';
        modal.style.animation = 'scale-in-bounce 0.4s ease';

        modal.innerHTML = `
            <div style="background: #1C1E30; border: 2px solid var(--gold-glow); border-radius: var(--radius-lg); padding: 2.2rem; max-width: 480px; text-align: center; box-shadow: 0 0 50px rgba(251, 191, 36, 0.4);">
                <div style="font-size: 3.5rem; margin-bottom: 0.8rem;">🏆</div>
                <h2 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--gold-soft); margin-bottom: 0.6rem;">${title}</h2>
                <p style="color: var(--text-primary); font-size: 1rem; line-height: 1.5; margin-bottom: 1.6rem;">${message}</p>
                <button class="btn-action-primary" id="btn-modal-continue" style="font-size: 1.1rem; padding: 0.9rem 2rem;">
                    <span>🚀</span> Kontynuuj Przygodę!
                </button>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('btn-modal-continue').addEventListener('click', () => {
            modal.remove();
            if (onProceed) onProceed();
        });
    }
}


// Start application when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('fx-canvas');
    if (canvas && window.AlchemistParticles) {
        window.AlchemistParticles.init(canvas);
    }
    window.game = new RadicalAlchemistGame();
    window.game.init();
});
