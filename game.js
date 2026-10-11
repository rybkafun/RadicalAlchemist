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
            D: { currentStep: 0, completed: false },
            E: { currentStep: 0, completed: false },
            F: { currentStep: 0, completed: false },
            G: { currentStep: 0, completed: false },
            H: { currentStep: 0, completed: false }
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

        // Advanced "Tajemnice" (E, F, G) - guided, step-by-step textbook tasks
        this.secretModules = this.buildSecretModules();
        this.secretState = {
            E: { mission: 0, step: 0, wrong: 0, locked: false, board: [] },
            F: { mission: 0, step: 0, wrong: 0, locked: false, board: [] },
            G: { mission: 0, step: 0, wrong: 0, locked: false, board: [] },
            H: { mission: 0, step: 0, wrong: 0, locked: false, board: [] }
        };

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

        // Secret missions are never skipped - the swap artifact opens the hint instead
        if (this.secretModules[mod]) {
            const hintBox = document.getElementById('secret-hint');
            if (hintBox) hintBox.classList.add('open');
            if (window.AlchemistParticles) {
                window.AlchemistParticles.runeFloat(event.clientX, event.clientY, '🔄 Zamiana: pokazuję Ci podpowiedź!');
            }
            return;
        }

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
        } else if (this.currentModule === 'E') {
            hudFormula.innerHTML = `<span class="math-radical">Pole = bok²</span> &nbsp;|&nbsp; <span class="math-radical">√(a·b) = √a · √b</span>`;
            hudTip.textContent = "Z pola kwadratu wyliczysz bok: bok = √pole.";
        } else if (this.currentModule === 'F') {
            hudFormula.innerHTML = `<span class="math-radical">√(a²·b) = a√b</span> &nbsp;|&nbsp; <span class="math-radical">a√x + b√x = (a+b)√x</span>`;
            hudTip.textContent = "Najpierw uprość pierwiastki, potem dodawaj jednakowe.";
        } else if (this.currentModule === 'G') {
            hudFormula.innerHTML = `<span class="math-radical">∛(a³·b) = a∛b</span> &nbsp;|&nbsp; <span class="math-radical">√(a²·b) = a√b</span>`;
            hudTip.textContent = "Sześciany: 8, 27, 64. Kwadraty: 4, 9, 16, 25. Różnych pierwiastków nie dodajemy.";
        } else if (this.currentModule === 'H') {
            hudFormula.innerHTML = `<span class="math-radical">√a = b, gdy b² = a i b ≥ 0</span> &nbsp;|&nbsp; <span class="math-radical">∛a = b, gdy b³ = a</span>`;
            hudTip.textContent = "√ tylko z liczb nieujemnych (wynik ≥ 0). ∛ można liczyć z KAŻDEJ liczby, także ujemnej!";
        }
    }

    renderModuleNavigation() {
        const navContainer = document.getElementById('module-navigation-bar');
        if (!navContainer) return;

        const modules = [
            { id: 'A', name: 'Moduł A: Intuicja', shortName: '📐 Kwadrat', sub: 'Geometria Kwadratu', icon: '📐' },
            { id: 'B', name: 'Moduł B: Kociołek Działań', shortName: '⚗️ Kociołek', sub: 'Mnożenie i Dzielenie', icon: '⚗️' },
            { id: 'C', name: 'Moduł C: Rozbijanie Kamienia', shortName: '💎 Kamień', sub: 'Wyłączanie Czynnika', icon: '💎' },
            { id: 'D', name: 'Moduł D: Abstrakcja i Sześcian', shortName: '🔮 Sześcian', sub: 'Dodawanie i ∛x', icon: '🔮' },
            { id: 'E', name: 'Tajemnica I: Bliźniacze Kwadraty', shortName: '🔲 Bliźniaki', sub: 'Zadanie z zeszytu', icon: '🔲' },
            { id: 'F', name: 'Tajemnica II: Zgodne Kryształy', shortName: '🧪 Kryształy', sub: 'Zadania z zeszytu', icon: '🧪' },
            { id: 'G', name: 'Tajemnica III: Dwa Światy', shortName: '🌗 Dwa Światy', sub: 'Zadanie z zeszytu', icon: '🌗' },
            { id: 'H', name: 'Tajemnica IV: Księga Definicji', shortName: '📜 Definicje', sub: 'Pierwiastki √ i ∛ (s. 25)', icon: '📜' }
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
        } else if (this.secretModules[modId]) {
            if (this.progress[modId].completed) {
                // Re-entering a finished mystery starts it fresh
                this.progress[modId].completed = false;
                this.secretState[modId] = { mission: 0, step: 0, wrong: 0, locked: false, board: [] };
            }
            this.renderSecretModule(stage, modId);
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
            this.showModuleSuccessModal('Moduł D Ukończony!', 'Teraz czas na prawdziwe wyzwania! Czekają na Ciebie 3 Tajemnice – zadania z Twojego zeszytu. Poprowadzę Cię przez nie krok po kroku, bez pośpiechu.', () => {
                this.loadModule('E');
            });
        }
    }

    // =========================================================================
    // TAJEMNICE E, F, G: ZADANIA Z ZESZYTU - KROK PO KROKU (ADHD-friendly)
    // One tiny decision per screen, visible question, hint always free,
    // wrong answers never cost anything, finished steps pile up on a "board".
    // =========================================================================
    buildSecretModules() {
        return {
            E: {
                title: 'Tajemnica I: Bliźniacze Kwadratury',
                missions: [
                    {
                        tag: 'Zadanie 1',
                        problem: 'Kwadrat ABCD ma pole dwa razy większe od pola kwadratu EFGH. Jaką długość ma bok mniejszego kwadratu?',
                        diagram: 'twin-squares',
                        resultLine: 'Bok mniejszego kwadratu: √18 = √9 · √2 = 3√2',
                        answerLabel: 'Odpowiedź C: 3√2',
                        steps: [
                            {
                                q: 'Ile wynosi pole DUŻEGO kwadratu ABCD?',
                                say: 'Bok ABCD = 6. Pole kwadratu = bok · bok.',
                                choices: ['12', '36', '24'], correct: 1,
                                hint: 'Pole = 6 · 6. Policz: sześć razy sześć.',
                                ok: 'Tak! 6 · 6 = 36.',
                                board: 'Pole ABCD = 6 · 6 = 36'
                            },
                            {
                                q: 'Ile wynosi pole MAŁEGO kwadratu EFGH?',
                                say: 'Pole ABCD jest 2 razy większe, więc pole EFGH = 36 : 2.',
                                choices: ['72', '18', '34'], correct: 1,
                                hint: '"2 razy większe" znaczy, że mały ma połowę pola dużego. Połowa z 36 to...?',
                                wrong: { 0: '72 to 36 · 2. Mały kwadrat jest MNIEJSZY, więc dzielimy, nie mnożymy.' },
                                ok: 'Super! Pole EFGH = 18.',
                                board: 'Pole EFGH = 36 : 2 = 18'
                            },
                            {
                                q: 'Jak rozbić 18, żeby wyciągnąć kwadrat?',
                                say: 'Bok = √pole = √18 (jak w Module A). Szukamy kwadratu: 4, 9, 16... który dzieli 18.',
                                choices: ['4 · 4,5', '9 · 2', '6 · 3'], correct: 1,
                                hint: 'Kwadraty to 1, 4, 9, 16... Który z nich mieści się w 18 równo? 9 · 2 = 18.',
                                wrong: { 0: '4,5 nie jest liczbą całkowitą – wygodniej rozbić tak, by wszystko było całkowite.', 2: 'Ani 6, ani 3 nie jest kwadratem. Szukamy 4, 9, 16...' },
                                ok: 'Dokładnie! 18 = 9 · 2.',
                                board: 'bok = √18 = √(9 · 2)'
                            },
                            {
                                q: 'Ile to jest √9 · √2 ?',
                                say: '√18 = √(9 · 2) = √9 · √2 = ? · √2',
                                choices: ['9√2', '3√2', '2√3'], correct: 1,
                                hint: '√9 to liczba, która razy siebie daje 9. To 3!',
                                wrong: { 0: '√9 to nie 9. Pierwiastek z 9 to 3, bo 3 · 3 = 9.' },
                                ok: 'Pięknie! √9 = 3, więc √18 = 3√2.',
                                board: '√18 = √9 · √2 = 3√2'
                            },
                            {
                                q: 'Zaznacz odpowiedź z zeszytu: jaką długość ma bok mniejszego kwadratu?',
                                say: 'Wynik masz już na tablicy powyżej. Wybierz pasującą literę!',
                                choices: ['A. 3', 'B. 4', 'C. 3√2', 'D. 2√3'], correct: 2,
                                hint: 'Na tablicy mamy: bok = 3√2.',
                                wrong: { 3: 'Prawie! 2√3 to coś innego niż 3√2. Zobacz, co stoi przed pierwiastkiem.' },
                                ok: 'Zadanie 1 rozwiązane: C!',
                                board: 'Odpowiedź: C. 3√2 ✔'
                            }
                        ]
                    },
                    {
                        tag: 'Trening 1',
                        problem: 'Kwadrat ABCD ma pole dwa razy większe od pola kwadratu EFGH. Bok ABCD = 4. Jaką długość ma bok kwadratu EFGH?',
                        diagram: 'twin-squares', diagramSide: 4,
                        resultLine: 'Bok mniejszego kwadratu: √8 = √4 · √2 = 2√2',
                        answerLabel: 'Odpowiedź B: 2√2',
                        steps: [
                            {
                                q: 'Ile wynosi pole DUŻEGO kwadratu ABCD?',
                                say: 'Bok ABCD = 4. Pole = bok · bok.',
                                choices: ['8', '16', '12'], correct: 1,
                                hint: 'Pole = 4 · 4. Cztery razy cztery.',
                                ok: 'Tak! 4 · 4 = 16.',
                                board: 'Pole ABCD = 4 · 4 = 16'
                            },
                            {
                                q: 'Ile wynosi pole MAŁEGO kwadratu EFGH?',
                                say: 'Pole ABCD jest 2 razy większe, więc pole EFGH = 16 : 2.',
                                choices: ['32', '8', '14'], correct: 1,
                                hint: 'Mały ma połowę pola dużego. Połowa z 16 to...?',
                                wrong: { 0: '32 to 16 · 2. Mały kwadrat jest MNIEJSZY, więc dzielimy.' },
                                ok: 'Super! Pole EFGH = 8.',
                                board: 'Pole EFGH = 16 : 2 = 8'
                            },
                            {
                                q: 'Jak rozbić 8, żeby wyciągnąć kwadrat?',
                                say: 'Bok = √8. Szukamy kwadratu (4, 9, 16...), który mieści się w 8.',
                                choices: ['4 · 2', '3 · 3', '6 · 2'], correct: 0,
                                hint: '4 to kwadrat (2 · 2), a 4 · 2 = 8.',
                                wrong: { 1: '3 · 3 = 9, a nie 8.', 2: '6 · 2 = 12, a nie 8.' },
                                ok: 'Dokładnie! 8 = 4 · 2.',
                                board: 'bok = √8 = √(4 · 2)'
                            },
                            {
                                q: 'Ile to jest √4 · √2 ?',
                                say: '√8 = √4 · √2 = ? · √2',
                                choices: ['4√2', '2√2', '2√4'], correct: 1,
                                hint: '√4 to 2, bo 2 · 2 = 4.',
                                wrong: { 0: '√4 to 2, nie 4.', 2: 'Pod pierwiastkiem ma zostać 2, a przed nim wynik z √4.' },
                                ok: 'Pięknie! √8 = 2√2.',
                                board: '√8 = √4 · √2 = 2√2'
                            },
                            {
                                q: 'Zaznacz odpowiedź: jaką długość ma bok mniejszego kwadratu?',
                                say: 'Wynik masz na tablicy. Wybierz pasującą literę!',
                                choices: ['A. 2', 'B. 2√2', 'C. 4', 'D. 8√2'], correct: 1,
                                hint: 'Na tablicy mamy: bok = 2√2.',
                                ok: 'Trening 1 rozwiązany: B!',
                                board: 'Odpowiedź: B. 2√2 ✔'
                            }
                        ]
                    },
                    {
                        tag: 'Trening 2',
                        problem: 'Kwadrat ABCD ma pole dwa razy większe od pola kwadratu EFGH. Bok ABCD = 8. Jaką długość ma bok kwadratu EFGH?',
                        diagram: 'twin-squares', diagramSide: 8,
                        resultLine: 'Bok mniejszego kwadratu: √32 = √16 · √2 = 4√2',
                        answerLabel: 'Odpowiedź B: 4√2',
                        steps: [
                            {
                                q: 'Ile wynosi pole DUŻEGO kwadratu ABCD?',
                                say: 'Bok ABCD = 8. Pole = bok · bok.',
                                choices: ['56', '64', '16'], correct: 1,
                                hint: 'Pole = 8 · 8. Osiem razy osiem.',
                                ok: 'Tak! 8 · 8 = 64.',
                                board: 'Pole ABCD = 8 · 8 = 64'
                            },
                            {
                                q: 'Ile wynosi pole MAŁEGO kwadratu EFGH?',
                                say: 'Pole ABCD jest 2 razy większe, więc pole EFGH = 64 : 2.',
                                choices: ['128', '32', '56'], correct: 1,
                                hint: 'Połowa z 64 to...?',
                                wrong: { 0: '128 to 64 · 2. Mały kwadrat ma MNIEJSZE pole, więc dzielimy.' },
                                ok: 'Super! Pole EFGH = 32.',
                                board: 'Pole EFGH = 64 : 2 = 32'
                            },
                            {
                                q: 'Jak rozbić 32, żeby wyciągnąć NAJWIĘKSZY kwadrat?',
                                say: 'Bok = √32. Kwadraty: 4, 9, 16, 25... Który z nich najwięcej "wyciągnie"?',
                                choices: ['16 · 2', '8 · 4', '10 · 3'], correct: 0,
                                hint: '16 = 4 · 4 to kwadrat, a 16 · 2 = 32.',
                                wrong: { 1: '8 · 4 = 32, ale zostanie √8, które jeszcze da się uprościć. Szukamy 16!', 2: '10 · 3 = 30, a nie 32.' },
                                ok: 'Dokładnie! 32 = 16 · 2.',
                                board: 'bok = √32 = √(16 · 2)'
                            },
                            {
                                q: 'Ile to jest √16 · √2 ?',
                                say: '√32 = √16 · √2 = ? · √2',
                                choices: ['16√2', '4√2', '2√4'], correct: 1,
                                hint: '√16 to 4, bo 4 · 4 = 16.',
                                wrong: { 0: '√16 to 4, nie 16.' },
                                ok: 'Pięknie! √32 = 4√2.',
                                board: '√32 = √16 · √2 = 4√2'
                            },
                            {
                                q: 'Zaznacz odpowiedź: jaką długość ma bok mniejszego kwadratu?',
                                say: 'Wynik masz na tablicy. Wybierz pasującą literę!',
                                choices: ['A. 4', 'B. 4√2', 'C. 8', 'D. 16√2'], correct: 1,
                                hint: 'Na tablicy mamy: bok = 4√2.',
                                ok: 'Trening 2 rozwiązany: B!',
                                board: 'Odpowiedź: B. 4√2 ✔'
                            }
                        ]
                    }
                ]
            },
            F: {
                title: 'Tajemnica II: Zgodne Kryształy',
                missions: [
                    {
                        tag: 'Zadanie 2',
                        problem: 'Liczbę 3√8 + 2√2 można zapisać w postaci:',
                        resultLine: '3√8 + 2√2 = 6√2 + 2√2 = 8√2',
                        answerLabel: 'Odpowiedź B: 8√2',
                        steps: [
                            {
                                q: 'Zacznij od √8. Jak go rozbić?',
                                say: 'Pierwiastki √8 i √2 są różne, więc najpierw uprościmy √8. Szukamy kwadratu w liczbie 8.',
                                choices: ['8 · 1', '4 · 2', '2 · 3'], correct: 1,
                                hint: 'Kwadrat 4 mieści się w 8: 4 · 2 = 8.',
                                wrong: { 0: '8 · 1 = 8 to prawda, ale nic nie wyciągniemy. Szukamy kwadratu: 4 albo 9.', 2: '2 · 3 = 6, a nie 8. Sprawdź mnożenie.' },
                                ok: 'Tak! 8 = 4 · 2.',
                                board: '√8 = √(4 · 2)'
                            },
                            {
                                q: 'Ile wynosi √8 po uproszczeniu?',
                                say: '√8 = √4 · √2 = ? · √2',
                                choices: ['4√2', '2√2', '8√2'], correct: 1,
                                hint: '√4 = 2, bo 2 · 2 = 4.',
                                wrong: { 0: '√4 to 2, nie 4. Sprawdź: 2 · 2 = 4.' },
                                ok: 'Brawo! √8 = 2√2.',
                                board: '√8 = 2√2'
                            },
                            {
                                q: 'Ile wynosi 3√8 ?',
                                say: 'Wstawiamy: 3√8 = 3 · 2√2 = ?',
                                choices: ['6√2', '5√2', '3√2'], correct: 0,
                                hint: 'Pomnóż liczby przed pierwiastkiem: 3 · 2.',
                                wrong: { 1: 'Przy mnożeniu 3 · 2 = 6, a nie 5 (to byłoby dodawanie).' },
                                ok: 'Świetnie! 3√8 = 6√2.',
                                board: '3√8 = 3 · 2√2 = 6√2'
                            },
                            {
                                q: 'Teraz dodaj: 6√2 + 2√2 = ?',
                                say: 'Pierwiastki są jednakowe (√2)! Dodajemy tylko liczby przed nimi – jak 6 jabłek + 2 jabłka.',
                                choices: ['12√2', '8√4', '8√2'], correct: 2,
                                hint: '6 + 2 = 8, a √2 zostaje bez zmian.',
                                wrong: { 0: 'Dodajemy (6 + 2), nie mnożymy.', 1: 'Pierwiastek √2 zostaje taki sam – nie zmieniamy liczby pod pierwiastkiem.' },
                                ok: 'Tak! 6√2 + 2√2 = 8√2.',
                                board: '6√2 + 2√2 = 8√2'
                            },
                            {
                                q: 'Zaznacz odpowiedź z zeszytu: 3√8 + 2√2 można zapisać w postaci:',
                                say: 'Wynik masz na tablicy. Znajdź go wśród liter!',
                                choices: ['A. 5√10', 'B. 8√2', 'C. 7√2', 'D. 14√2'], correct: 1,
                                hint: 'Na tablicy wyszło 8√2.',
                                ok: 'Zadanie 2 rozwiązane: B!',
                                board: 'Odpowiedź: B. 8√2 ✔'
                            }
                        ]
                    },
                    {
                        tag: 'Zadanie 3',
                        problem: 'Jeżeli 5√180 = a√5, to liczba a jest równa:',
                        resultLine: '5√180 = 5 · 6√5 = 30√5, więc a = 30',
                        answerLabel: 'Odpowiedź B: 30',
                        steps: [
                            {
                                q: 'Rozbij 180 tak, żeby zostało √5.',
                                say: 'Chcemy dostać √5, więc szukamy: 180 = (kwadrat) · 5.',
                                choices: ['4 · 45', '36 · 5', '9 · 20'], correct: 1,
                                hint: '36 · 5 = 180, a 36 = 6 · 6 jest kwadratem. I zostaje dokładnie 5!',
                                wrong: { 0: '4 · 45 = 180, ale zostaje √45, a my chcemy √5.', 2: '9 · 20 = 180, ale zostaje √20, a my chcemy √5.' },
                                ok: 'Tak! 180 = 36 · 5.',
                                board: '√180 = √(36 · 5)'
                            },
                            {
                                q: 'Ile to jest √36 · √5 ?',
                                say: '√180 = √36 · √5 = ? · √5',
                                choices: ['6√5', '36√5', '18√5'], correct: 0,
                                hint: '√36 to 6, bo 6 · 6 = 36.',
                                wrong: { 1: '√36 to 6, nie 36. Sprawdź: 6 · 6 = 36.' },
                                ok: 'Brawo! √180 = 6√5.',
                                board: '√180 = 6√5'
                            },
                            {
                                q: 'Ile wynosi 5√180 ?',
                                say: 'Wstawiamy: 5√180 = 5 · 6√5 = ?',
                                choices: ['11√5', '30√5', '180√5'], correct: 1,
                                hint: 'Pomnóż liczby przed pierwiastkiem: 5 · 6.',
                                wrong: { 0: 'Mnożymy 5 · 6, a nie dodajemy.' },
                                ok: 'Świetnie! 5√180 = 30√5.',
                                board: '5√180 = 5 · 6√5 = 30√5'
                            },
                            {
                                q: 'Porównaj: 30√5 = a√5. Ile wynosi a ?',
                                say: 'Po obu stronach jest √5, więc liczby przed pierwiastkiem muszą być równe.',
                                choices: ['5', '30', '6'], correct: 1,
                                hint: 'Z jednej strony 30√5, z drugiej a√5. Zatem a = 30.',
                                ok: 'Tak! a = 30.',
                                board: '30√5 = a√5  ➔  a = 30'
                            },
                            {
                                q: 'Zaznacz odpowiedź z zeszytu: liczba a jest równa:',
                                say: 'Wynik masz na tablicy. Znajdź go wśród liter!',
                                choices: ['A. 180', 'B. 30', 'C. 9', 'D. 6'], correct: 1,
                                hint: 'Na tablicy wyszło a = 30.',
                                ok: 'Zadanie 3 rozwiązane: B!',
                                board: 'Odpowiedź: B. 30 ✔'
                            }
                        ]
                    },
                    {
                        tag: 'Trening 3',
                        problem: 'Liczbę 2√12 + √3 można zapisać w postaci:',
                        resultLine: '2√12 + √3 = 4√3 + √3 = 5√3',
                        answerLabel: 'Odpowiedź B: 5√3',
                        steps: [
                            {
                                q: 'Zacznij od √12. Jak go rozbić?',
                                say: 'Chcemy dostać √3, więc szukamy kwadratu w 12.',
                                choices: ['4 · 3', '6 · 2', '12 · 1'], correct: 0,
                                hint: '4 = 2 · 2 to kwadrat, a 4 · 3 = 12.',
                                wrong: { 1: '6 · 2 = 12, ale ani 6, ani 2 nie jest kwadratem.', 2: '12 · 1 = 12, ale nic z tego nie wyciągniemy.' },
                                ok: 'Tak! 12 = 4 · 3.',
                                board: '√12 = √(4 · 3)'
                            },
                            {
                                q: 'Ile wynosi √12 po uproszczeniu?',
                                say: '√12 = √4 · √3 = ? · √3',
                                choices: ['4√3', '2√3', '12√3'], correct: 1,
                                hint: '√4 = 2, bo 2 · 2 = 4.',
                                wrong: { 0: '√4 to 2, nie 4.' },
                                ok: 'Brawo! √12 = 2√3.',
                                board: '√12 = 2√3'
                            },
                            {
                                q: 'Ile wynosi 2√12 ?',
                                say: 'Wstawiamy: 2√12 = 2 · 2√3 = ?',
                                choices: ['4√3', '5√3', '2√3'], correct: 0,
                                hint: 'Pomnóż liczby przed pierwiastkiem: 2 · 2.',
                                wrong: { 1: 'Przy mnożeniu 2 · 2 = 4 (to nie dodawanie).' },
                                ok: 'Świetnie! 2√12 = 4√3.',
                                board: '2√12 = 2 · 2√3 = 4√3'
                            },
                            {
                                q: 'Teraz dodaj: 4√3 + √3 = ?',
                                say: 'Pierwiastki są jednakowe! Pamiętaj: √3 to to samo co 1√3.',
                                choices: ['4√3', '5√3', '5√6'], correct: 1,
                                hint: '4 + 1 = 5, a √3 zostaje bez zmian.',
                                wrong: { 0: 'Prawie! Pamiętaj o dodaniu jednego √3: 4 + 1.', 2: 'Liczba pod pierwiastkiem zostaje 3 – nie zmieniamy jej.' },
                                ok: 'Tak! 4√3 + √3 = 5√3.',
                                board: '4√3 + √3 = 5√3'
                            },
                            {
                                q: 'Zaznacz odpowiedź: 2√12 + √3 można zapisać w postaci:',
                                say: 'Wynik masz na tablicy. Znajdź go wśród liter!',
                                choices: ['A. 3√3', 'B. 5√3', 'C. 5√6', 'D. 8√3'], correct: 1,
                                hint: 'Na tablicy wyszło 5√3.',
                                ok: 'Trening 3 rozwiązany: B!',
                                board: 'Odpowiedź: B. 5√3 ✔'
                            }
                        ]
                    },
                    {
                        tag: 'Trening 4',
                        problem: 'Liczbę √50 + 3√2 można zapisać w postaci:',
                        resultLine: '√50 + 3√2 = 5√2 + 3√2 = 8√2',
                        answerLabel: 'Odpowiedź A: 8√2',
                        steps: [
                            {
                                q: 'Zacznij od √50. Jak go rozbić?',
                                say: 'Chcemy dostać √2, więc szukamy kwadratu w 50.',
                                choices: ['25 · 2', '10 · 5', '20 · 3'], correct: 0,
                                hint: '25 = 5 · 5 to kwadrat, a 25 · 2 = 50.',
                                wrong: { 1: '10 · 5 = 50, ale ani 10, ani 5 nie jest kwadratem.', 2: '20 · 3 = 60, a nie 50.' },
                                ok: 'Tak! 50 = 25 · 2.',
                                board: '√50 = √(25 · 2)'
                            },
                            {
                                q: 'Ile to jest √25 · √2 ?',
                                say: '√50 = √25 · √2 = ? · √2',
                                choices: ['25√2', '5√2', '2√5'], correct: 1,
                                hint: '√25 to 5, bo 5 · 5 = 25.',
                                wrong: { 0: '√25 to 5, nie 25.' },
                                ok: 'Brawo! √50 = 5√2.',
                                board: '√50 = 5√2'
                            },
                            {
                                q: 'Teraz dodaj: 5√2 + 3√2 = ?',
                                say: 'Jednakowe pierwiastki – jak 5 jabłek + 3 jabłka.',
                                choices: ['15√2', '8√2', '8√4'], correct: 1,
                                hint: '5 + 3 = 8, a √2 zostaje bez zmian.',
                                wrong: { 0: 'Dodajemy (5 + 3), nie mnożymy.', 2: 'Pod pierwiastkiem zostaje 2.' },
                                ok: 'Tak! 5√2 + 3√2 = 8√2.',
                                board: '5√2 + 3√2 = 8√2'
                            },
                            {
                                q: 'Zaznacz odpowiedź: √50 + 3√2 można zapisać w postaci:',
                                say: 'Wynik masz na tablicy. Znajdź go wśród liter!',
                                choices: ['A. 8√2', 'B. 15√2', 'C. 8√5', 'D. 2√2'], correct: 0,
                                hint: 'Na tablicy wyszło 8√2.',
                                ok: 'Trening 4 rozwiązany: A!',
                                board: 'Odpowiedź: A. 8√2 ✔'
                            }
                        ]
                    },
                    {
                        tag: 'Trening 5',
                        problem: 'Jeżeli 3√75 = a√3, to liczba a jest równa:',
                        resultLine: '3√75 = 3 · 5√3 = 15√3, więc a = 15',
                        answerLabel: 'Odpowiedź C: 15',
                        steps: [
                            {
                                q: 'Rozbij 75 tak, żeby zostało √3.',
                                say: 'Szukamy: 75 = (kwadrat) · 3.',
                                choices: ['25 · 3', '15 · 5', '9 · 8'], correct: 0,
                                hint: '25 = 5 · 5 to kwadrat, a 25 · 3 = 75. Zostaje 3!',
                                wrong: { 1: '15 · 5 = 75, ale 15 nie jest kwadratem.', 2: '9 · 8 = 72, a nie 75.' },
                                ok: 'Tak! 75 = 25 · 3.',
                                board: '√75 = √(25 · 3)'
                            },
                            {
                                q: 'Ile to jest √25 · √3 ?',
                                say: '√75 = √25 · √3 = ? · √3',
                                choices: ['25√3', '5√3', '3√5'], correct: 1,
                                hint: '√25 to 5, bo 5 · 5 = 25.',
                                wrong: { 0: '√25 to 5, nie 25.' },
                                ok: 'Brawo! √75 = 5√3.',
                                board: '√75 = 5√3'
                            },
                            {
                                q: 'Ile wynosi 3√75 ?',
                                say: 'Wstawiamy: 3√75 = 3 · 5√3 = ?',
                                choices: ['8√3', '15√3', '75√3'], correct: 1,
                                hint: 'Pomnóż liczby przed pierwiastkiem: 3 · 5.',
                                wrong: { 0: 'Mnożymy 3 · 5, a nie dodajemy.' },
                                ok: 'Świetnie! 3√75 = 15√3.',
                                board: '3√75 = 3 · 5√3 = 15√3'
                            },
                            {
                                q: 'Porównaj: 15√3 = a√3. Ile wynosi a ?',
                                say: 'Po obu stronach jest √3, więc liczby przed pierwiastkiem muszą być równe.',
                                choices: ['3', '5', '15'], correct: 2,
                                hint: 'Z jednej strony 15√3, z drugiej a√3. Zatem a = 15.',
                                ok: 'Tak! a = 15.',
                                board: '15√3 = a√3  ➔  a = 15'
                            },
                            {
                                q: 'Zaznacz odpowiedź: liczba a jest równa:',
                                say: 'Wynik masz na tablicy. Znajdź go wśród liter!',
                                choices: ['A. 75', 'B. 25', 'C. 15', 'D. 5'], correct: 2,
                                hint: 'Na tablicy wyszło a = 15.',
                                ok: 'Trening 5 rozwiązany: C!',
                                board: 'Odpowiedź: C. 15 ✔'
                            }
                        ]
                    }
                ]
            },
            G: {
                title: 'Tajemnica III: Dwa Światy',
                missions: [
                    {
                        tag: 'Zadanie 4',
                        problem: 'Sumę ∛54 + √150 można zapisać w postaci:',
                        resultLine: '∛54 + √150 = 3∛2 + 5√6',
                        answerLabel: 'Odpowiedź A: 3∛2 + 5√6',
                        steps: [
                            {
                                q: 'Zacznij od ∛54. Rozbij 54 na sześcian · resztę.',
                                say: 'To pierwiastek 3. stopnia, więc szukamy SZEŚCIANU: 8, 27, 64...',
                                choices: ['9 · 6', '27 · 2', '18 · 3'], correct: 1,
                                hint: '27 = 3 · 3 · 3 to sześcian, a 27 · 2 = 54.',
                                wrong: { 0: '9 jest kwadratem, a przy ∛ potrzebny jest sześcian (8, 27, 64).', 2: '18 nie jest sześcianem. Sześciany to 8, 27, 64...' },
                                ok: 'Tak! 54 = 27 · 2.',
                                board: '∛54 = ∛(27 · 2)'
                            },
                            {
                                q: 'Ile to jest ∛27 · ∛2 ?',
                                say: '∛54 = ∛27 · ∛2 = ? · ∛2',
                                choices: ['9∛2', '3∛2', '2∛3'], correct: 1,
                                hint: '∛27 to liczba, która 3 razy pomnożona przez siebie daje 27. To 3!',
                                wrong: { 0: '9 to 3 · 3. Pierwiastek 3. stopnia z 27 to 3, bo 3 · 3 · 3 = 27.' },
                                ok: 'Brawo! ∛54 = 3∛2.',
                                board: '∛54 = 3∛2'
                            },
                            {
                                q: 'Teraz √150. Rozbij 150 na kwadrat · resztę.',
                                say: 'To pierwiastek 2. stopnia, więc szukamy KWADRATU: 4, 9, 16, 25, 36...',
                                choices: ['25 · 6', '10 · 15', '5 · 30'], correct: 0,
                                hint: '25 = 5 · 5 to kwadrat, a 25 · 6 = 150.',
                                wrong: { 1: '10 ani 15 nie jest kwadratem. Szukamy 4, 9, 16, 25...', 2: '5 ani 30 nie jest kwadratem. Szukamy 4, 9, 16, 25...' },
                                ok: 'Tak! 150 = 25 · 6.',
                                board: '√150 = √(25 · 6)'
                            },
                            {
                                q: 'Ile to jest √25 · √6 ?',
                                say: '√150 = √25 · √6 = ? · √6',
                                choices: ['25√6', '5√6', '6√5'], correct: 1,
                                hint: '√25 to 5, bo 5 · 5 = 25.',
                                wrong: { 0: '√25 to 5, nie 25. Sprawdź: 5 · 5 = 25.' },
                                ok: 'Świetnie! √150 = 5√6.',
                                board: '√150 = 5√6'
                            },
                            {
                                q: 'Mamy 3∛2 + 5√6. Czy można to dodać w jeden pierwiastek?',
                                say: '∛ (3. stopnia) i √ (2. stopnia) to różne gatunki – jak pułapka z Modułu D!',
                                choices: ['Tak: 8√8', 'Nie – suma zostaje 3∛2 + 5√6', 'Tak: 8∛6'], correct: 1,
                                hint: 'Dodawać można tylko JEDNAKOWE pierwiastki. Tutaj jest ∛2 i √6, więc zostawiamy sumę.',
                                ok: 'Mądra decyzja! Suma zostaje w tej postaci.',
                                board: '∛54 + √150 = 3∛2 + 5√6'
                            },
                            {
                                q: 'Zaznacz odpowiedź z zeszytu: sumę ∛54 + √150 można zapisać w postaci:',
                                say: 'Wynik masz na tablicy. Znajdź go wśród liter!',
                                choices: ['A. 3∛2 + 5√6', 'B. 3∛6 + 5√6', 'C. 3∛2 + 10√5', 'D. 5∛4 + 10√5'], correct: 0,
                                hint: 'Na tablicy wyszło 3∛2 + 5√6.',
                                ok: 'Zadanie 4 rozwiązane: A!',
                                board: 'Odpowiedź: A. 3∛2 + 5√6 ✔'
                            }
                        ]
                    },
                    {
                        tag: 'Trening 6',
                        problem: 'Sumę ∛16 + √12 można zapisać w postaci:',
                        resultLine: '∛16 + √12 = 2∛2 + 2√3',
                        answerLabel: 'Odpowiedź C: 2∛2 + 2√3',
                        steps: [
                            {
                                q: 'Zacznij od ∛16. Rozbij 16 na sześcian · resztę.',
                                say: 'Pierwiastek 3. stopnia – szukamy SZEŚCIANU: 8, 27, 64...',
                                choices: ['8 · 2', '4 · 4', '16 · 1'], correct: 0,
                                hint: '8 = 2 · 2 · 2 to sześcian, a 8 · 2 = 16.',
                                wrong: { 1: '4 nie jest sześcianem. Sześciany to 8, 27, 64...', 2: '16 · 1 – nic nie wyciągniemy.' },
                                ok: 'Tak! 16 = 8 · 2.',
                                board: '∛16 = ∛(8 · 2)'
                            },
                            {
                                q: 'Ile to jest ∛8 · ∛2 ?',
                                say: '∛16 = ∛8 · ∛2 = ? · ∛2',
                                choices: ['8∛2', '2∛2', '2√2'], correct: 1,
                                hint: '∛8 to 2, bo 2 · 2 · 2 = 8.',
                                wrong: { 0: '∛8 to 2, nie 8.', 2: 'To nadal pierwiastek 3. stopnia – zostaje ∛2.' },
                                ok: 'Brawo! ∛16 = 2∛2.',
                                board: '∛16 = 2∛2'
                            },
                            {
                                q: 'Teraz √12. Rozbij 12 na kwadrat · resztę.',
                                say: 'Pierwiastek 2. stopnia – szukamy KWADRATU: 4, 9, 16...',
                                choices: ['4 · 3', '6 · 2', '12 · 1'], correct: 0,
                                hint: '4 = 2 · 2 to kwadrat, a 4 · 3 = 12.',
                                wrong: { 1: '6 ani 2 nie jest kwadratem.', 2: '12 · 1 – nic nie wyciągniemy.' },
                                ok: 'Tak! 12 = 4 · 3.',
                                board: '√12 = √(4 · 3)'
                            },
                            {
                                q: 'Ile to jest √4 · √3 ?',
                                say: '√12 = √4 · √3 = ? · √3',
                                choices: ['4√3', '2√3', '3√2'], correct: 1,
                                hint: '√4 to 2, bo 2 · 2 = 4.',
                                wrong: { 0: '√4 to 2, nie 4.' },
                                ok: 'Świetnie! √12 = 2√3.',
                                board: '√12 = 2√3'
                            },
                            {
                                q: 'Mamy 2∛2 + 2√3. Czy można to dodać w jeden pierwiastek?',
                                say: '∛ i √ to różne gatunki – jak pułapka z Modułu D!',
                                choices: ['Tak: 4√2', 'Tak: 4∛3', 'Nie – suma zostaje 2∛2 + 2√3'], correct: 2,
                                hint: 'Dodawać można tylko JEDNAKOWE pierwiastki. Tu jest ∛2 i √3.',
                                ok: 'Mądra decyzja! Suma zostaje w tej postaci.',
                                board: '∛16 + √12 = 2∛2 + 2√3'
                            },
                            {
                                q: 'Zaznacz odpowiedź: sumę ∛16 + √12 można zapisać w postaci:',
                                say: 'Wynik masz na tablicy. Znajdź go wśród liter!',
                                choices: ['A. 4∛5', 'B. 2∛3 + 2√2', 'C. 2∛2 + 2√3', 'D. 2∛2 + 4√3'], correct: 2,
                                hint: 'Na tablicy wyszło 2∛2 + 2√3.',
                                ok: 'Trening 6 rozwiązany: C!',
                                board: 'Odpowiedź: C. 2∛2 + 2√3 ✔'
                            }
                        ]
                    },
                    {
                        tag: 'Trening 7',
                        problem: 'Sumę ∛24 + √8 można zapisać w postaci:',
                        resultLine: '∛24 + √8 = 2∛3 + 2√2',
                        answerLabel: 'Odpowiedź A: 2∛3 + 2√2',
                        steps: [
                            {
                                q: 'Zacznij od ∛24. Rozbij 24 na sześcian · resztę.',
                                say: 'Szukamy SZEŚCIANU: 8, 27, 64...',
                                choices: ['8 · 3', '4 · 6', '12 · 2'], correct: 0,
                                hint: '8 = 2 · 2 · 2 to sześcian, a 8 · 3 = 24.',
                                wrong: { 1: '4 nie jest sześcianem.', 2: '12 nie jest sześcianem.' },
                                ok: 'Tak! 24 = 8 · 3.',
                                board: '∛24 = ∛(8 · 3)'
                            },
                            {
                                q: 'Ile to jest ∛8 · ∛3 ?',
                                say: '∛24 = ∛8 · ∛3 = ? · ∛3',
                                choices: ['8∛3', '2∛3', '3∛2'], correct: 1,
                                hint: '∛8 to 2, bo 2 · 2 · 2 = 8.',
                                wrong: { 0: '∛8 to 2, nie 8.', 2: 'Zostaje ∛3, a przed nim stoi wynik z ∛8.' },
                                ok: 'Brawo! ∛24 = 2∛3.',
                                board: '∛24 = 2∛3'
                            },
                            {
                                q: 'Teraz √8. Rozbij 8 na kwadrat · resztę.',
                                say: 'Szukamy KWADRATU: 4, 9, 16...',
                                choices: ['4 · 2', '8 · 1', '3 · 3'], correct: 0,
                                hint: '4 = 2 · 2 to kwadrat, a 4 · 2 = 8.',
                                wrong: { 1: '8 · 1 – nic nie wyciągniemy.', 2: '3 · 3 = 9, a nie 8.' },
                                ok: 'Tak! 8 = 4 · 2.',
                                board: '√8 = √(4 · 2)'
                            },
                            {
                                q: 'Ile to jest √4 · √2 ?',
                                say: '√8 = √4 · √2 = ? · √2',
                                choices: ['4√2', '2√2', '2√4'], correct: 1,
                                hint: '√4 to 2, bo 2 · 2 = 4.',
                                wrong: { 0: '√4 to 2, nie 4.' },
                                ok: 'Świetnie! √8 = 2√2.',
                                board: '√8 = 2√2'
                            },
                            {
                                q: 'Mamy 2∛3 + 2√2. Czy można to dodać w jeden pierwiastek?',
                                say: 'Znów dwa różne gatunki: ∛ i √.',
                                choices: ['Tak: 4√6', 'Nie – suma zostaje 2∛3 + 2√2', 'Tak: 4∛5'], correct: 1,
                                hint: 'Dodajemy tylko JEDNAKOWE pierwiastki. Tu jest ∛3 i √2.',
                                ok: 'Mądra decyzja! Suma zostaje w tej postaci.',
                                board: '∛24 + √8 = 2∛3 + 2√2'
                            },
                            {
                                q: 'Zaznacz odpowiedź: sumę ∛24 + √8 można zapisać w postaci:',
                                say: 'Wynik masz na tablicy. Znajdź go wśród liter!',
                                choices: ['A. 2∛3 + 2√2', 'B. 2∛2 + 2√3', 'C. 4∛6', 'D. 2∛3 + 4√2'], correct: 0,
                                hint: 'Na tablicy wyszło 2∛3 + 2√2.',
                                ok: 'Trening 7 rozwiązany: A!',
                                board: 'Odpowiedź: A. 2∛3 + 2√2 ✔'
                            }
                        ]
                    }
                ]
            },
            H: {
                title: 'Tajemnica IV: Księga Definicji',
                missions: [
                    {
                        tag: 'Przykład 1 (√)',
                        problem: 'Pierwiastek kwadratowy z liczby nieujemnej a to taka liczba NIEUJEMNA, której kwadrat jest równy a. Jeżeli a ≥ 0, to √a = b, gdy b² = a i b ≥ 0. Na przykład: √64 = 8, bo 8² = 64 i 8 ≥ 0.',
                        resultLine: '√64 = 8, bo 8² = 64 i 8 ≥ 0',
                        answerLabel: 'Odpowiedź: √64 = 8',
                        steps: [
                            {
                                q: 'Jakiej liczby szukamy w √64?',
                                say: 'Pierwiastek kwadratowy to liczba b, która podniesiona do kwadratu (b · b) daje 64.',
                                choices: ['b, gdzie b · b = 64', 'b, gdzie b + b = 64', 'b, gdzie b · 2 = 64'], correct: 0,
                                hint: 'Kwadrat liczby to liczba razy ona sama: b² = b · b.',
                                wrong: { 1: 'b + b to podwojenie, a nie kwadrat.', 2: 'Kwadrat to b · b, a nie b · 2.' },
                                ok: 'Tak! Szukamy b, dla którego b² = 64.',
                                board: '√64 = b, gdy b² = 64'
                            },
                            {
                                q: 'Która liczba spełnia b² = 64 ?',
                                say: 'Sprawdź: 7 · 7 = 49, 8 · 8 = ?, 9 · 9 = 81.',
                                choices: ['7', '8', '32'], correct: 1,
                                hint: '8 · 8 = 64.',
                                wrong: { 0: '7 · 7 = 49, a nie 64.', 2: '32 to połowa z 64, a 32 · 32 jest o wiele za duże.' },
                                ok: 'Brawo! 8 · 8 = 64.',
                                board: '8² = 64'
                            },
                            {
                                q: 'Pierwiastek kwadratowy musi być nieujemny (b ≥ 0). Ile wynosi √64 ?',
                                say: 'Również (−8)² = 64, ale pierwiastek kwadratowy to ZAWSZE liczba ≥ 0.',
                                choices: ['−8', '8', '±8'], correct: 1,
                                hint: 'Z definicji b ≥ 0, więc wybieramy tylko dodatnią 8.',
                                wrong: { 0: '−8 jest ujemne, a pierwiastek kwadratowy nie może być ujemny.', 2: 'Symbol √ oznacza jedną liczbę – tę nieujemną.' },
                                ok: 'Dokładnie! √64 = 8, bo 8² = 64 i 8 ≥ 0.',
                                board: '√64 = 8, bo 8² = 64 i 8 ≥ 0'
                            }
                        ]
                    },
                    {
                        tag: 'Przykład 2 (√)',
                        problem: 'Oblicz √(2 7/9). Z zeszytu: √(2 7/9) = 5/3, bo (5/3)² = 25/9 = 2 7/9 i 5/3 ≥ 0.',
                        resultLine: '√(2 7/9) = √(25/9) = 5/3',
                        answerLabel: 'Odpowiedź: 5/3',
                        steps: [
                            {
                                q: 'Zamień 2 7/9 na ułamek niewłaściwy.',
                                say: '2 7/9 = (2 · 9 + 7) / 9 = ?',
                                choices: ['25/9', '14/9', '27/9'], correct: 0,
                                hint: '2 · 9 = 18, 18 + 7 = 25. Mianownik 9 zostaje.',
                                wrong: { 1: '14 to 2 · 7. Najpierw 2 · 9, potem dodaj 7.', 2: '27/9 to 3, a my mamy 2 7/9.' },
                                ok: 'Tak! 2 7/9 = 25/9.',
                                board: '2 7/9 = 25/9'
                            },
                            {
                                q: 'Ile to √(25/9) ?',
                                say: 'Pierwiastek z ułamka: liczymy osobno z licznika i z mianownika: √25 / √9.',
                                choices: ['5/3', '25/3', '5/9'], correct: 0,
                                hint: '√25 = 5, bo 5 · 5 = 25. √9 = 3, bo 3 · 3 = 9.',
                                wrong: { 1: 'Z licznika też trzeba wyciągnąć pierwiastek: √25 = 5.', 2: 'Z mianownika też: √9 = 3, a nie 9.' },
                                ok: 'Super! √(25/9) = 5/3.',
                                board: '√(25/9) = √25 / √9 = 5/3'
                            },
                            {
                                q: 'Sprawdźmy z definicji: ile wynosi (5/3)² ?',
                                say: '(5/3)² = (5 · 5) / (3 · 3) = ?',
                                choices: ['25/9', '10/6', '25/3'], correct: 0,
                                hint: 'Podnosimy do kwadratu i licznik, i mianownik.',
                                wrong: { 1: '10/6 to 5/3 · 2. Kwadrat to mnożenie przez samą siebie.', 2: 'Mianownik też podnosimy do kwadratu: 3 · 3 = 9.' },
                                ok: 'Zgadza się! (5/3)² = 25/9 = 2 7/9 i 5/3 ≥ 0.',
                                board: '(5/3)² = 25/9 = 2 7/9 ✔'
                            }
                        ]
                    },
                    {
                        tag: 'Przykład 3 (√)',
                        problem: 'Oblicz √1,44. Z zeszytu: √1,44 = 1,2, bo 1,2² = 1,44.',
                        resultLine: '√1,44 = 1,2, bo 1,2² = 1,44',
                        answerLabel: 'Odpowiedź: 1,2',
                        steps: [
                            {
                                q: 'Ile wynosi 1,2 · 1,2 ?',
                                say: 'Policz 12 · 12 = 144, a potem ustaw przecinek: każdy czynnik ma 1 cyfrę po przecinku, więc wynik ma 2 (1 + 1).',
                                choices: ['1,44', '14,4', '0,144'], correct: 0,
                                hint: '12 · 12 = 144. Obie liczby mają po 1 cyfrze po przecinku, więc wynik ma 2.',
                                wrong: { 1: 'Za duży wynik. 1,2 jest tylko trochę większe od 1.', 2: 'Za mały wynik. 1,2 · 1,2 jest więcej niż 1.' },
                                ok: 'Tak! 1,2 · 1,2 = 1,44.',
                                board: '1,2² = 1,44'
                            },
                            {
                                q: 'Ile więc wynosi √1,44 ?',
                                say: 'Skoro 1,2² = 1,44 i 1,2 ≥ 0, to...',
                                choices: ['0,12', '1,2', '12'], correct: 1,
                                hint: 'Szukamy liczby, która podniesiona do kwadratu daje 1,44. To 1,2.',
                                wrong: { 0: '0,12² = 0,0144, to za mało.', 2: '12² = 144, a nie 1,44.' },
                                ok: 'Brawo! √1,44 = 1,2.',
                                board: '√1,44 = 1,2, bo 1,2² = 1,44'
                            }
                        ]
                    },
                    {
                        tag: 'Przykład 4 (∛)',
                        problem: 'Pierwiastek sześcienny możemy obliczać z DOWOLNEJ liczby rzeczywistej. Dla dowolnej liczby a: ∛a = b, gdy b³ = a. Na przykład: ∛64 = 4, bo 4³ = 64.',
                        resultLine: '∛64 = 4, bo 4³ = 64',
                        answerLabel: 'Odpowiedź: ∛64 = 4',
                        steps: [
                            {
                                q: 'Jakiej liczby szukamy w ∛64?',
                                say: 'Pierwiastek sześcienny to liczba b, dla której b³ = b · b · b = 64.',
                                choices: ['b · b = 64', 'b · b · b = 64', 'b · 3 = 64'], correct: 1,
                                hint: 'Sześcian to TRZY razy ta sama liczba.',
                                wrong: { 0: 'b · b to kwadrat. Przy ∛ mnożymy trzy razy.', 2: 'b · 3 to nie sześcian.' },
                                ok: 'Tak! Szukamy b, dla którego b³ = 64.',
                                board: '∛64 = b, gdy b³ = 64'
                            },
                            {
                                q: 'Ile to jest 4³ ?',
                                say: '4³ = 4 · 4 · 4 = 16 · 4 = ?',
                                choices: ['12', '64', '16'], correct: 1,
                                hint: '4 · 4 = 16, a 16 · 4 = 64.',
                                wrong: { 0: '12 to 4 · 3. Sześcian to 4 · 4 · 4.', 2: '16 to tylko 4 · 4.' },
                                ok: 'Super! 4³ = 64.',
                                board: '4³ = 64'
                            },
                            {
                                q: 'Ile więc wynosi ∛64 ?',
                                say: 'Skoro 4³ = 64, to...',
                                choices: ['8', '4', '21'], correct: 1,
                                hint: 'Szukana liczba to ta, której sześcian wynosi 64.',
                                wrong: { 0: '√64 = 8, ale to pierwiastek KWADRATOWY. Przy ∛ liczba mnożona jest 3 razy.', 2: '64 : 3 to nie jest pierwiastek.' },
                                ok: 'Dokładnie! ∛64 = 4, bo 4³ = 64.',
                                board: '∛64 = 4, bo 4³ = 64'
                            }
                        ]
                    },
                    {
                        tag: 'Przykład 5 (∛ ujemny)',
                        problem: 'Oblicz ∛(−1/8). Z zeszytu: ∛(−1/8) = −1/2, bo (−1/2)³ = −1/8. Pierwiastek sześcienny może być ujemny!',
                        resultLine: '∛(−1/8) = −1/2, bo (−1/2)³ = −1/8',
                        answerLabel: 'Odpowiedź: −1/2',
                        steps: [
                            {
                                q: 'Czy ∛ można policzyć z liczby ujemnej?',
                                say: 'Przy √ liczba pod pierwiastkiem musi być ≥ 0. Jak jest przy ∛?',
                                choices: ['Nie, nigdy', 'Tak, z dowolnej liczby rzeczywistej', 'Tylko z −1'], correct: 1,
                                hint: 'Z zeszytu: „Pierwiastek sześcienny możemy obliczać z dowolnej liczby rzeczywistej”.',
                                wrong: { 0: 'To dotyczy √ (kwadratowego). ∛ działa także dla liczb ujemnych.', 2: 'Nie tylko z −1, ale z każdej liczby.' },
                                ok: 'Tak! ∛ działa dla każdej liczby.',
                                board: '∛a istnieje dla każdej liczby a'
                            },
                            {
                                q: 'Ile wynosi (−1/2)³ ?',
                                say: '(−1/2) · (−1/2) = 1/4 (minus razy minus to plus), a potem 1/4 · (−1/2) = ?',
                                choices: ['1/8', '−1/8', '−3/2'], correct: 1,
                                hint: 'Trzy minusy w iloczynie dają minus. 1 · 1 · 1 = 1 i 2 · 2 · 2 = 8.',
                                wrong: { 0: 'Prawie, ale trzy ujemne czynniki dają wynik UJEMNY.', 2: '−3/2 to −1/2 · 3. Sześcian to mnożenie trzy razy.' },
                                ok: 'Super! (−1/2)³ = −1/8.',
                                board: '(−1/2)³ = −1/8'
                            },
                            {
                                q: 'Ile więc wynosi ∛(−1/8) ?',
                                say: 'Skoro (−1/2)³ = −1/8, to...',
                                choices: ['1/2', '−1/2', '−1/4'], correct: 1,
                                hint: 'Szukana liczba to ta, której sześcian wynosi −1/8.',
                                wrong: { 0: '(1/2)³ = 1/8, a my mamy −1/8.', 2: '(−1/4)³ = −1/64, to za mało.' },
                                ok: 'Brawo! ∛(−1/8) = −1/2.',
                                board: '∛(−1/8) = −1/2, bo (−1/2)³ = −1/8'
                            }
                        ]
                    },
                    {
                        tag: 'Przykład 6 (∛)',
                        problem: 'Oblicz ∛(3 3/8). Z zeszytu: ∛(3 3/8) = 3/2, bo (3/2)³ = 27/8 = 3 3/8.',
                        resultLine: '∛(3 3/8) = ∛(27/8) = 3/2',
                        answerLabel: 'Odpowiedź: 3/2',
                        steps: [
                            {
                                q: 'Zamień 3 3/8 na ułamek niewłaściwy.',
                                say: '3 3/8 = (3 · 8 + 3) / 8 = ?',
                                choices: ['27/8', '9/8', '24/8'], correct: 0,
                                hint: '3 · 8 = 24, 24 + 3 = 27. Mianownik 8 zostaje.',
                                wrong: { 1: '9 to 3 · 3. Najpierw 3 · 8, potem dodaj 3.', 2: '24/8 to samo 3 – brakuje jeszcze 3/8.' },
                                ok: 'Tak! 3 3/8 = 27/8.',
                                board: '3 3/8 = 27/8'
                            },
                            {
                                q: 'Ile to ∛(27/8) ?',
                                say: 'Osobno z licznika i mianownika: ∛27 / ∛8.',
                                choices: ['9/4', '3/2', '27/2'], correct: 1,
                                hint: '∛27 = 3, bo 3 · 3 · 3 = 27. ∛8 = 2, bo 2 · 2 · 2 = 8.',
                                wrong: { 0: '9 i 4 to kwadraty (√), a my liczymy ∛.', 2: 'Z licznika też trzeba wyciągnąć ∛27 = 3.' },
                                ok: 'Brawo! ∛(27/8) = 3/2.',
                                board: '∛(27/8) = ∛27 / ∛8 = 3/2'
                            },
                            {
                                q: 'Sprawdź: ile wynosi (3/2)³ ?',
                                say: '(3/2)³ = (3 · 3 · 3) / (2 · 2 · 2) = ?',
                                choices: ['9/6', '27/8', '27/6'], correct: 1,
                                hint: 'Sześcian i licznika, i mianownika: 27 / 8.',
                                wrong: { 0: '9/6 to 3/2 · 3. Sześcian to mnożenie trzy razy.', 2: 'Mianownik też do sześcianu: 2 · 2 · 2 = 8.' },
                                ok: 'Zgadza się! (3/2)³ = 27/8 = 3 3/8.',
                                board: '(3/2)³ = 27/8 = 3 3/8 ✔'
                            }
                        ]
                    }
                ]
            }
        };
    }

    secretDiagramSVG(type, side = 6) {
        if (type !== 'twin-squares') return '';
        const lbl = 'fill="#FDE68A" font-size="13" font-weight="700" font-family="Outfit, sans-serif"';
        return `
            <svg class="secret-diagram" viewBox="0 0 270 155" role="img" aria-label="Dwa kwadraty: duży ABCD o boku ${side} i mniejszy EFGH">
                <rect x="22" y="16" width="120" height="120" rx="4" fill="rgba(167,139,250,0.28)" stroke="#A78BFA" stroke-width="3"/>
                <rect x="168" y="51" width="85" height="85" rx="4" fill="rgba(52,211,153,0.25)" stroke="#34D399" stroke-width="3"/>
                <text x="10" y="14" ${lbl}>D</text><text x="146" y="14" ${lbl}>C</text>
                <text x="10" y="150" ${lbl}>A</text><text x="146" y="150" ${lbl}>B</text>
                <text x="156" y="49" ${lbl}>H</text><text x="255" y="49" ${lbl}>G</text>
                <text x="156" y="150" ${lbl}>E</text><text x="255" y="150" ${lbl}>F</text>
                <text x="82" y="84" text-anchor="middle" fill="#fff" font-size="30" font-weight="800" font-family="Fredoka, Outfit, sans-serif">${side}</text>
                <text x="210" y="102" text-anchor="middle" fill="#fff" font-size="30" font-weight="800" font-family="Fredoka, Outfit, sans-serif">?</text>
            </svg>
        `;
    }

    renderSecretModule(container, modId) {
        const mod = this.secretModules[modId];
        const st = this.secretState[modId];
        const mission = mod.missions[st.mission];
        const step = mission.steps[st.step];
        st.wrong = 0;
        st.locked = false;

        const allShort = step.choices.every(c => c.length <= 8);
        const boardHtml = st.board.length
            ? st.board.map(line => `<div class="secret-board-line">✔ ${line}</div>`).join('')
            : `<div class="secret-board-empty">Tu pojawią się Twoje rozwiązane kroki ✨</div>`;

        container.innerHTML = `
            <div class="mission-hero-banner secret-hero">
                <div class="mission-top-row">
                    <span class="mission-tag">🕵️ ${mission.tag} • Krok ${st.step + 1} z ${mission.steps.length}</span>
                    <div class="micro-progress-pills" id="secret-pills"></div>
                </div>
                <h2 class="mission-main-question">${step.q}</h2>
                <div class="mission-math-target">${step.say}</div>
                <div class="mission-action-instruction">
                    👉 <span>Kliknij <strong>jedną</strong> odpowiedź poniżej. Pomyłka nic nie kosztuje!</span>
                </div>
            </div>

            <div class="secret-choices ${allShort ? 'short' : ''}" id="secret-choices"></div>

            <div class="secret-feedback" id="secret-feedback" aria-live="polite"></div>

            <button class="secret-hint-btn" id="secret-hint-btn">👁️ Pokaż podpowiedź</button>
            <div class="secret-hint" id="secret-hint">💡 ${step.hint}</div>

            <div class="secret-book-card">
                <div class="secret-book-title">📖 ${mission.tag} z zeszytu</div>
                <div class="secret-book-problem">${mission.problem}</div>
                ${this.secretDiagramSVG(mission.diagram, mission.diagramSide || 6)}
            </div>

            <div class="secret-board">
                <div class="secret-board-title">📜 Twoje rozwiązanie</div>
                ${boardHtml}
            </div>
        `;

        this.renderPills('secret-pills', mission.steps.length, st.step);

        const choicesEl = document.getElementById('secret-choices');
        step.choices.forEach((text, idx) => {
            const btn = document.createElement('button');
            btn.className = 'secret-choice-btn';
            btn.textContent = text;
            btn.addEventListener('click', (e) => this.handleSecretChoice(modId, idx, btn, e));
            choicesEl.appendChild(btn);
        });

        document.getElementById('secret-hint-btn').addEventListener('click', () => {
            document.getElementById('secret-hint').classList.toggle('open');
            window.AlchemistAudio.playPop(1.2);
        });
    }

    handleSecretChoice(modId, idx, btn, event) {
        const st = this.secretState[modId];
        if (st.locked) return;
        const mission = this.secretModules[modId].missions[st.mission];
        const step = mission.steps[st.step];
        const feedback = document.getElementById('secret-feedback');

        if (idx === step.correct) {
            st.locked = true;
            window.AlchemistAudio.playTransmute();
            btn.classList.add('correct');
            document.querySelectorAll('.secret-choice-btn').forEach(b => { if (b !== btn) b.classList.add('dim'); });
            const rect = btn.getBoundingClientRect();
            window.AlchemistParticles.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, '#34D399', 28);
            this.addEssence(20, event.clientX, event.clientY);

            feedback.className = 'secret-feedback good';
            feedback.textContent = `🎉 ${step.ok}`;
            st.board.push(step.board);

            const isLastStep = st.step === mission.steps.length - 1;
            setTimeout(() => {
                const stage = document.getElementById('workbench-dynamic-content');
                if (isLastStep) {
                    this.finishSecretMission(modId, stage);
                } else {
                    st.step++;
                    this.renderSecretModule(stage, modId);
                }
            }, 1500);
        } else {
            // Non-punitive: gentle wobble, kind explanation, option fades out
            window.AlchemistAudio.playWobble();
            btn.classList.add('dim', 'gentle-wobble');
            btn.disabled = true;
            st.wrong++;
            st.missionWrong = (st.missionWrong || 0) + 1;
            feedback.className = 'secret-feedback soft';
            feedback.textContent = '🌱 ' + ((step.wrong && step.wrong[idx]) || 'Prawie! Spróbuj inną odpowiedź. Zerknij na podpowiedź 👁️.');
            if (st.wrong >= 2) {
                document.getElementById('secret-hint').classList.add('open');
            }
        }
    }

    finishSecretMission(modId, stage) {
        const mod = this.secretModules[modId];
        const st = this.secretState[modId];
        const mission = mod.missions[st.mission];
        const isLastMission = st.mission === mod.missions.length - 1;

        window.AlchemistAudio.playGrandFanfare ? window.AlchemistAudio.playMerge() : null;
        this.addEssence(40);
        const perfect = !st.missionWrong;
        if (perfect) this.addEssence(30);
        st.missionWrong = 0;
        this.advanceSpire();
        const cx = window.innerWidth / 2;
        window.AlchemistParticles.burst(cx, window.innerHeight / 2, '#FBBF24', 45);
        window.AlchemistParticles.shockwave(cx, window.innerHeight / 2);

        stage.innerHTML = `
            <div class="secret-done-card">
                <div class="secret-done-trophy">🏆</div>
                <div class="secret-done-title">${mission.tag} rozwiązane!</div>
                <div class="secret-done-line">${perfect ? '🌟 Bez jednej pomyłki! Bonus +30 💎' : '💪 Dotarłaś do końca – to się liczy! +40 💎'} • Zadanie ${st.mission + 1} z ${mod.missions.length}</div>
                <div class="secret-done-line">${mission.resultLine}</div>
                <div class="secret-done-answer">${mission.answerLabel}</div>
                <div class="secret-board secret-board-final">
                    ${st.board.map(line => `<div class="secret-board-line">✔ ${line}</div>`).join('')}
                </div>
                <button class="btn-action-primary" id="btn-secret-next">
                    <span>🚀</span> ${isLastMission ? 'ZAKOŃCZ TAJEMNICĘ' : 'DALEJ: NASTĘPNE ZADANIE'}
                </button>
            </div>
        `;

        document.getElementById('btn-secret-next').addEventListener('click', () => {
            st.board = [];
            st.step = 0;
            if (!isLastMission) {
                st.mission++;
                this.renderSecretModule(stage, modId);
                return;
            }
            this.progress[modId].completed = true;
            st.mission = 0;
            if (modId === 'E') {
                this.showModuleSuccessModal('Tajemnica I rozwiązana!', 'Poradziłaś sobie z bliźniaczymi kwadratami! Pole, bok i pierwiastek – wszystko już łączysz.', () => this.loadModule('F'));
            } else if (modId === 'F') {
                this.showModuleSuccessModal('Tajemnica II rozwiązana!', 'Upraszczasz pierwiastki i dodajesz jednakowe kryształy. Czekają kolejne Tajemnice!', () => this.loadModule('G'));
            } else if (modId === 'G') {
                this.showModuleSuccessModal('Tajemnica III rozwiązana!', 'Rozróżniasz ∛ i √! Została ostatnia Tajemnica: Księga Definicji.', () => this.loadModule('H'));
            } else {
                this.showGrandFinale();
            }
        });
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
