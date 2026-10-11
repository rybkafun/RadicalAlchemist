# ⚗️ The Radical Alchemist — Mistrzyni Pierwiastków

Interaktywna, fabularna gra edukacyjna wspierająca zrozumienie i opanowanie działań na pierwiastkach matematycznych (program klasy 8 szkoły podstawowej).

Gra została specjalnie zaprojektowana z myślą o neurodywersyjności i potrzebach nastoletniego umysłu ze zdiagnozowanym **ADHD** (obniżony próg wejścia, brak presji czasu, eliminacja lęku przed błędami, mikro-porcje wiedzy i natychmiastowe nagradzanie postępów).

---

## 🔮 Główne Moduły Dydaktyczne

1. **📐 Moduł A: Kwadrat Alchemika (Intuicja)**
   - Wizualizacja pierwiastka kwadratowego jako poszukiwania boku kwadratu o znanym polu.
   - Płynna manipulacja suwakiem i przyciskami krokowymi, natychmiastowy feedback geometryczny.
2. **⚗️ Moduł B: Kociołek Transformacji (Mnożenie i Dzielenie)**
   - Wlewanie zawartości kolb pod wspólny pierwiastek: $\sqrt{a} \cdot \sqrt{b} = \sqrt{a \cdot b}$.
   - Animacja łączenia substancji i warzenia eliksirów.
3. **💎 Moduł C: Kamień Filozoficzny (Wyłączanie Czynnika)**
   - Rozbijanie trudnych liczb pod pierwiastkiem na iloczyn z udziałem kwadratu idealnego (np. $\sqrt{20} = \sqrt{4 \cdot 5} = 2\sqrt{5}$).
   - System wyciągania pierwiastka z części kwadratowej przed znak pierwiastka.
4. **🔮 Moduł D: Skarbiec Pierwiastków (Dodawanie i Redukcja)**
   - Porządkowanie kryształów o tych samych korzeniach (np. $3\sqrt{2} + 2\sqrt{2} = 5\sqrt{2}$).
   - Wizualna metafora: dodajemy tylko klejnoty tego samego gatunku!

---

## 🛡️ Alchemiczne Koła Ratunkowe (Redukcja Stresu i RSD)

* **👁️ Oko Alchemika**: Legalne zajrzenie do alchemicznego zwoju zasad / ściągi bez kary punktowej.
* **🔄 Zamiana Składników**: Wymiana trudniejszego zadania na zadanie o łagodniejszym współczynniku.
* **🤝 Sojusz z Mistrzem**: Usunięcie błędnych ścieżek, pozostawiając tylko najbardziej prawdopodobne opcje.
* **💎 Klejnot Cierpliwości**: Ochrona serii sukcesów (passy) przed przerwaniem przy pomyłce.

---

## 📱 Optymalizacja Mobilna (iPhone 11 & Smartfony)

- **Widok 1-ekranowy**: Misja, pytanie alchemiczne, wizualizator oraz przyciski akcji mieszczą się w jednym polu widzenia bez scrollowania.
- **Segmented Control iOS**: 1-wierszowa nawigacja etapów (`📐 Kwadrat`, `⚗️ Kociołek`, `💎 Kamień`, `🔮 Sześcian`).
- **Touch Targets**: Wszystkie przyciski interaktywne mają wysokość minimum 52–58 px (optymalny zasięg kciuka).
- **Wsparcie Safe Area**: Pełna integracja z wycięciem ekranu (Notch / Dynamic Island) oraz dolnym paskiem gestów iOS.
- **Księga Alchemika (Grimoire)**: Płynnie wysuwany od dołu ekranu iOS Bottom-Sheet.

---

## 🚀 Jak uruchomić?

### 1. Bezpośrednio w przeglądarce
Otwórz plik `index.html` w dowolnej nowoczesnej przeglądarce internetowej (Safari, Chrome, Edge, Firefox).

### 2. Na lokalnym serwerze (zalecane)
```bash
# Python 3
python3 -m http.server 8080
```
Następnie wejdź na adres: `http://localhost:8080/`

### 3. GitHub Pages
Repozytorium jest w pełni przystosowane do natychmiastowego hostowania przez **GitHub Pages**:
1. Przejdź do **Settings** -> **Pages** w repozytorium GitHub.
2. W sekcji **Build and deployment** wybierz:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / `/ (root)`
3. Kliknij **Save**. Gra będzie dostępna pod adresem:
   `https://rybkafun.github.io/RadicalAlchemist/`
