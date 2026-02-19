console.log("App.js loaded successfully");

// Tabs
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.innerText.toLowerCase().includes(tabId));
    if (activeBtn) activeBtn.classList.add('active');
}

// Vasopressor Logic
// Vasopressor Logic
const VP_DRUGS = {
    norepi: { name: "Norepinephrine", conc: 1, unit: "mg", doseUnit: "mcg/kg/min", defBase: 250, defDrugAmt: 20 }, // 20mg (20mL)
    vaso: { name: "Vasopressin", conc: 20, unit: "units", doseUnit: "units/min", defBase: 100, defDrugAmt: 60 }, // 60U (3mL)
    epi: { name: "Epinephrine", conc: 1, unit: "mg", doseUnit: "mcg/kg/min", defBase: 250, defDrugAmt: 10 }, // 10mg (10mL)
    dopamine: { name: "Dopamine", conc: 40, unit: "mg", doseUnit: "mcg/kg/min", defBase: 480, defDrugAmt: 800 }, // 800mg (20mL)
    dobutamine: { name: "Dobutamine", conc: 50, unit: "mg", doseUnit: "mcg/kg/min", defBase: 240, defDrugAmt: 500 } // 500mg (10mL)
};

function vp_setDefaults() {
    vp_loadDrug();
}

function vp_loadDrug() {
    const key = document.getElementById('vp-drug').value;
    const data = VP_DRUGS[key];

    // Label updates
    document.getElementById('vp-drugAmtLabel').innerText = `Drug Amount (${data.unit})`;

    // Try to load saved state
    const saved = loadVpState(key);

    if (saved) {
        document.getElementById('vp-baseFluid').value = saved.base;
        document.getElementById('vp-totalVolume').value = saved.total;
        document.getElementById('vp-drugAmount').value = saved.drugAmt;
        document.getElementById('vp-drugVol').value = saved.drugVol;
        document.getElementById('vp-weight').value = saved.weight;
        document.getElementById('vp-rate').value = saved.rate;
    } else {
        // Default values
        document.getElementById('vp-baseFluid').value = data.defBase;
        document.getElementById('vp-drugAmount').value = data.defDrugAmt;

        // Trigger calculation chain for defaults
        vp_calcFromAmt();
        // Reset weight/rate to global defaults or specific if needed (keeping 60/null for now)
        // If we want to persist weight globally, that's another thing, but request said "per vasopressor".
        // Let's keep weight 60 as default if not saved.
        document.getElementById('vp-weight').value = 60;
        document.getElementById('vp-rate').value = '';
    }

    vp_calculateDose();
}

function saveVpState() {
    const key = document.getElementById('vp-drug').value;
    const state = {
        base: document.getElementById('vp-baseFluid').value,
        total: document.getElementById('vp-totalVolume').value,
        drugAmt: document.getElementById('vp-drugAmount').value,
        drugVol: document.getElementById('vp-drugVol').value,
        weight: document.getElementById('vp-weight').value,
        rate: document.getElementById('vp-rate').value
    };
    localStorage.setItem(`critcalc_vp_${key}`, JSON.stringify(state));
}

function loadVpState(key) {
    const json = localStorage.getItem(`critcalc_vp_${key}`);
    return json ? JSON.parse(json) : null;
}

function vp_resetDefaults() {
    const key = document.getElementById('vp-drug').value;
    localStorage.removeItem(`critcalc_vp_${key}`);
    vp_loadDrug(); // Reloads, which will fall back to defaults
}

// 1. Calculate Drug Volume from Drug Amount
function vp_calcFromAmt() {
    const key = document.getElementById('vp-drug').value;
    const data = VP_DRUGS[key];
    const amt = parseFloat(document.getElementById('vp-drugAmount').value);

    if (!isNaN(amt)) {
        const vol = amt / data.conc;
        document.getElementById('vp-drugVol').value = parseFloat(vol.toFixed(2));
        vp_updateTotal();
    }
}

// 2. Calculate Drug Amount from Drug Volume
function vp_calcFromVol() {
    const key = document.getElementById('vp-drug').value;
    const data = VP_DRUGS[key];
    const vol = parseFloat(document.getElementById('vp-drugVol').value);

    if (!isNaN(vol)) {
        const amt = vol * data.conc;
        document.getElementById('vp-drugAmount').value = parseFloat(amt.toFixed(2));
        vp_updateTotal();
    }
}

// 3. Update Total Volume (Base + Drug Vol)
function vp_calcFromBase() {
    vp_updateTotal();
}

function vp_updateTotal() {
    const base = parseFloat(document.getElementById('vp-baseFluid').value) || 0;
    const drugVol = parseFloat(document.getElementById('vp-drugVol').value) || 0;
    const total = base + drugVol;

    document.getElementById('vp-totalVolume').value = parseFloat(total.toFixed(2));
    vp_calculateDose();
}

// 4. Reverse Calc: Change Base Fluid when Total is modified
function vp_calcFromTotal() {
    const total = parseFloat(document.getElementById('vp-totalVolume').value);
    const drugVol = parseFloat(document.getElementById('vp-drugVol').value) || 0;

    if (!isNaN(total)) {
        const base = total - drugVol;
        document.getElementById('vp-baseFluid').value = parseFloat(Math.max(0, base).toFixed(2));
        vp_calculateDose();
    }
}

function vp_calculateDose() {
    const key = document.getElementById('vp-drug').value;
    const data = VP_DRUGS[key];

    const drugAmt = parseFloat(document.getElementById('vp-drugAmount').value);
    const totalVol = parseFloat(document.getElementById('vp-totalVolume').value);
    const weight = parseFloat(document.getElementById('vp-weight').value);
    const rate = parseFloat(document.getElementById('vp-rate').value);

    const resultEl = document.getElementById('vp-result');
    const concEl = document.getElementById('vp-conc-display');

    // Display Concentration
    if (drugAmt > 0 && totalVol > 0) {
        let finalConc = drugAmt / totalVol;
        concEl.innerText = `Final Concentration: ${finalConc.toFixed(3)} ${data.unit}/mL`;
    } else {
        concEl.innerText = "";
    }

    if (isNaN(drugAmt) || isNaN(totalVol) || isNaN(weight) || isNaN(rate) || totalVol <= 0 || weight <= 0) {
        resultEl.innerText = "---";
        resultEl.style.color = "var(--text-dim)";
        return;
    }

    resultEl.style.color = "var(--primary)";

    let dose = 0;
    const concentration = drugAmt / totalVol; // unit/mL or mg/mL

    if (key === "vaso") {
        // Units/min = (mL/hr * Units/mL) / 60
        dose = (rate * concentration) / 60;
        resultEl.innerHTML = `${dose.toFixed(4)} <small>${data.doseUnit}</small>`;
    } else {
        // mcg/kg/min = (mL/hr * mg/mL * 1000) / (60 * kg)
        dose = (rate * concentration * 1000) / (weight * 60);
        resultEl.innerHTML = `${dose.toFixed(3)} <small>${data.doseUnit}</small>`;
    }

    saveVpState();
}

// Antibiotics / CrCl Logic
function calculateCrCl() {
    const age = parseFloat(document.getElementById('cr-age').value);
    const weight = parseFloat(document.getElementById('cr-weight').value);
    const scr = parseFloat(document.getElementById('cr-scr').value);
    const sex = document.getElementById('cr-sex').value;

    if (!age || !weight || !scr) return;

    let crcl = ((140 - age) * weight) / (72 * scr);
    if (sex === "female") crcl *= 0.85;

    document.getElementById('crcl-value').innerText = crcl.toFixed(1);
    document.getElementById('anti-crcl').value = Math.round(crcl);
    updateAntibioticDose();
}

// Antibiotic Search Logic
let allAntibiotics = [];

function populateAntibiotics() {
    const input = document.getElementById('anti-drug-input');
    const hidden = document.getElementById('anti-drug');
    const list = document.getElementById('anti-drug-list');

    if (!input || !list || typeof antibioticData === 'undefined') return;

    // Flatten data for search
    allAntibiotics = [];
    if (antibioticData && Array.isArray(antibioticData)) {
        antibioticData.forEach((group, groupIdx) => {
            if (group.drugs) {
                group.drugs.forEach((drug, drugIdx) => {
                    allAntibiotics.push({
                        id: `${groupIdx}-${drugIdx}`,
                        name: drug.name,
                        category: group.category
                    });
                });
            }
        });
        console.log(`Loaded ${allAntibiotics.length} antibiotics.`);
    } else {
        console.error("antibioticData is missing or invalid.");
    }

    const clearBtn = document.getElementById('clear-input-btn');
    const backBtn = document.getElementById('search-back-btn');

    // Event Listeners
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent focus loss if possible, or handle it
            const container = document.querySelector('.dropdown-container');
            if (container) container.classList.remove('mobile-expanded');
            list.classList.remove('show');
            input.blur(); // Hide keyboard
        });
    }
    input.addEventListener('input', (e) => {
        const val = e.target.value;
        if (!val) {
            hidden.value = '';
            // Clear result explicitly
            const resultMain = document.querySelector('#anti-result .anti-dose-main');
            const resultSub = document.querySelector('#anti-result .anti-dose-sub');
            if (resultMain) resultMain.innerText = '---';
            if (resultSub) resultSub.innerText = 'Enter CrCl or select dialysis';
            document.getElementById('anti-summary').classList.add('hidden');

            clearBtn.classList.add('hidden');
        } else {
            clearBtn.classList.remove('hidden');
        }
        filterAntibiotics(val);
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            input.value = '';
            hidden.value = '';
            clearBtn.classList.add('hidden');
            input.focus();

            // Clear result explicitly
            const resultMain = document.querySelector('#anti-result .anti-dose-main');
            const resultSub = document.querySelector('#anti-result .anti-dose-sub');
            if (resultMain) resultMain.innerText = '---';
            if (resultSub) resultSub.innerText = 'Enter CrCl or select dialysis';
            document.getElementById('anti-summary').classList.add('hidden');


            filterAntibiotics('');
        });
    }

    // Unified Focus Handler
    // 입력창 클릭/포커스 시 무조건 전체 목록을 보여주고, 텍스트가 있다면 전체 선택
    const handleInputFocus = () => {
        console.log("Input focused/clicked - Showing all antibiotics");

        // 1. 텍스트가 있다면 전체 선택 (수정 용이성)
        if (input.value) {
            // hidden value가 있다면(이미 선택된 약) 초기화 로직 수행
            if (hidden.value) {
                hidden.value = ''; // 선택 해제
                // 결과창 초기화
                const resultMain = document.querySelector('#anti-result .anti-dose-main');
                const resultSub = document.querySelector('#anti-result .anti-dose-sub');
                if (resultMain) resultMain.innerText = '---';
                if (resultSub) resultSub.innerText = 'Select antibiotic...';
                document.getElementById('anti-summary').classList.add('hidden');
            }

            input.focus();
            setTimeout(() => {
                input.select();
            }, 50);
        }

        // 2. 목록은 무조건 '전체'를 보여줌 (검색어 무시하고 전체 렌더링)
        // filterAntibiotics('')를 호출하면 전체 목록이 렌더링됨
        // 단, input.value가 있어도 무시하고 전체를 보여줘야 하므로
        // filterAntibiotics 내부 로직에 의존하기보다 직접 전체 렌더링 호출

        renderAntibioticList(allAntibiotics, true); // true = groupByCategory

        // UI 상태 업데이트
        list.classList.add('show');
        const container = document.querySelector('.dropdown-container');
        if (container) {
            container.classList.add('mobile-expanded');
            // Ghost click 방지
            const wasHidden = !list.classList.contains('show'); // 이미 위에서 add해서 의미는 없지만 로직상
            // 항상 적용
            list.style.pointerEvents = 'none';
            setTimeout(() => {
                list.style.pointerEvents = 'auto';
            }, 400);
        }
    };

    input.addEventListener('focus', () => {
        // 이미 열려있지 않은 경우에만 전체 로직 수행? 
        // 아니면 항상 수행? -> 포커스 시 항상 전체 목록 보여주는게 요구사항인듯
        // 단, 타이핑 중에는 이 이벤트가 아니라 input 이벤트가 처리함
        handleInputFocus();
    });

    input.addEventListener('click', () => {
        // 클릭 시에도 동일
        handleInputFocus();
    });

    // Keyboard Navigation
    input.addEventListener('keydown', (e) => {
        if (!list.classList.contains('show')) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                filterAntibiotics(input.value);
            }
            return;
        }

        const items = Array.from(list.querySelectorAll('.dropdown-item:not(.close-item)'));
        let activeIndex = items.findIndex(item => item.classList.contains('active'));

        if (e.key === 'ArrowDown' || e.key === 'Tab') {
            e.preventDefault();
            if (activeIndex < items.length - 1) {
                if (activeIndex >= 0) items[activeIndex].classList.remove('active');
                items[activeIndex + 1].classList.add('active');
                items[activeIndex + 1].scrollIntoView({ block: 'nearest' });
            } else if (activeIndex === -1 && items.length > 0) {
                items[0].classList.add('active');
                items[0].scrollIntoView({ block: 'nearest' });
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (activeIndex > 0) {
                items[activeIndex].classList.remove('active');
                items[activeIndex - 1].classList.add('active');
                items[activeIndex - 1].scrollIntoView({ block: 'nearest' });
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex >= 0) {
                items[activeIndex].click();
            }
        } else if (e.key === 'Escape') {
            list.classList.remove('show');
            const container = document.querySelector('.dropdown-container');
            if (container) container.classList.remove('mobile-expanded');
            input.blur();
        }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-container')) {
            list.classList.remove('show');
            const container = document.querySelector('.dropdown-container');
            if (container) container.classList.remove('mobile-expanded');
        }
    });
}

function filterAntibiotics(query) {
    const list = document.getElementById('anti-drug-list');
    const container = document.querySelector('.dropdown-container'); // Find container
    const q = query.toLowerCase().trim();

    let filtered = allAntibiotics;
    if (q) {
        filtered = allAntibiotics.filter(item =>
            item.name.toLowerCase().includes(q)
        ).sort((a, b) => a.name.localeCompare(b.name));
    }

    renderAntibioticList(filtered, !q);

    // Check state before showing
    const wasHidden = !list.classList.contains('show');
    list.classList.add('show');

    // Expand container on mobile
    if (container) {
        const wasMobileExpanded = container.classList.contains('mobile-expanded');
        container.classList.add('mobile-expanded');

        // Prevent ghost clicks/immediate selection due to layout shift
        // If the list just appeared or mobile view just expanded, block interaction briefly
        if (wasHidden || !wasMobileExpanded) {
            list.style.pointerEvents = 'none';
            setTimeout(() => {
                list.style.pointerEvents = 'auto';
            }, 400); // 400ms delay to clear any pending click/tap
        }
    }
}

function renderAntibioticList(items, groupByCategory = false) {
    const list = document.getElementById('anti-drug-list');
    list.innerHTML = '';

    if (items.length === 0) {
        console.log("No items found");
        const noResult = document.createElement('div');
        noResult.className = 'dropdown-item';
        noResult.style.cursor = 'default';
        noResult.innerText = 'No matches found';
        list.appendChild(noResult);
    }

    if (items.length > 0) {
        // Add Close Button for Mobile (or general convenience)
        const closeBtn = document.createElement('div');
        closeBtn.className = 'dropdown-item close-item';
        closeBtn.innerText = 'Close / Cancel';
        closeBtn.style.textAlign = 'center';
        closeBtn.style.color = 'var(--text-dim)';
        closeBtn.style.position = 'sticky';
        closeBtn.style.bottom = '0';
        closeBtn.style.background = 'var(--card-bg)';
        closeBtn.style.borderTop = '1px solid var(--border)';
        closeBtn.onclick = (e) => {
            e.stopPropagation();
            list.classList.remove('show');
            const container = document.querySelector('.dropdown-container');
            if (container) container.classList.remove('mobile-expanded');
        };
        // We append it at the end, but with sticky it stays at bottom if needed, or just at top.
        // Actually sticky bottom is good for mobile.
        // Let's prepend it for easy access? No, bottom is standard for "Cancel" sheets.

        if (groupByCategory) {
            // Group by category logic for full list
            const groups = {};
            items.forEach(item => {
                if (!groups[item.category]) groups[item.category] = [];
                groups[item.category].push(item);
            });

            // Use original order from antibioticData to keep category order
            antibioticData.forEach(group => {
                if (groups[group.category]) {
                    const catHeader = document.createElement('div');
                    catHeader.className = 'dropdown-category';
                    catHeader.innerText = group.category;
                    list.appendChild(catHeader);

                    groups[group.category].forEach(item => {
                        list.appendChild(createAntibioticItem(item));
                    });
                }
            });
        } else {
            // Flat list for search results
            items.forEach(item => {
                list.appendChild(createAntibioticItem(item));
            });
        }

        // Append close button at the end
        list.appendChild(closeBtn);
    }
}

function createAntibioticItem(item) {
    const el = document.createElement('div');
    el.className = 'dropdown-item';
    el.innerText = item.name;
    el.onclick = () => selectAntibiotic(item);
    return el;
}

function selectAntibiotic(item) {
    const input = document.getElementById('anti-drug-input');
    const hidden = document.getElementById('anti-drug');
    const list = document.getElementById('anti-drug-list');
    const container = document.querySelector('.dropdown-container');

    input.value = item.name;
    hidden.value = item.id;
    list.classList.remove('show');
    if (container) container.classList.remove('mobile-expanded');

    const clearBtn = document.getElementById('clear-input-btn');
    if (clearBtn) clearBtn.classList.remove('hidden');

    updateAntibioticDose();

    // Explicitly blur to ensure next tap triggers focus again and hides keyboard
    input.blur();
}

// CrCl 입력창 및 버튼 표시/숨김 처리
function toggleDialysis(val) {
    const crclGroup = document.getElementById('crcl-group-container');
    const crclInput = document.getElementById('anti-crcl');

    if (val === 'crcl') {
        // Renal Impairment 선택 시에만 표시
        crclGroup.classList.remove('hidden');
        crclInput.disabled = false;
        // 애니메이션 효과
        crclGroup.style.animation = "fadeIn 0.3s ease-out";
    } else {
        // 그 외에는 숨김
        crclGroup.classList.add('hidden');
        crclInput.disabled = true;
    }
}

// Helper to format dose text with line breaks and terminology
function formatDoseText(str) {
    if (!str) return "";
    return str
        // Match Loading/Maintenance only if NOT enclosed in parentheses
        .replace(/(?<!\()\b(Loading dose|Loading|Load)\b(?!\)):?/gi, "<strong>Loading dose:</strong><br>")
        .replace(/(?<!\()(?:\bMaintenance dose\b|\bMaintenance\b|\bMaint\b|\bMain\.\b|\bMain(?!\w))\b(?!\)):?/gi, "<strong>Maintenance dose:</strong><br>")
        .replace(/;\s*/g, "<br>")
        .replace(/\n/g, "<br>");
}

function updateDialysisOptions(drugName) {
    const dialysisSelect = document.getElementById('anti-dialysis');
    if (!dialysisSelect) return;

    // Check if Vancomycin is selected
    const isVancomycin = drugName === "Vancomycin";

    // Check if current options are for Vancomycin (look for specific values)
    const hasVancoOptions = dialysisSelect.querySelector('option[value="HD (Low permeability)"]');

    // If state matches, do nothing
    if (isVancomycin === !!hasVancoOptions) return;

    // Save current selection if possible
    const currentVal = dialysisSelect.value;

    // Create necessary options
    const hdOption = document.createElement('option');
    hdOption.value = "HD";
    hdOption.innerText = "Hemodialysis (HD)";

    const hdLowOption = document.createElement('option');
    hdLowOption.value = "HD (Low permeability)";
    hdLowOption.innerText = "Hemodialysis (Low permeability)";

    const hdHighOption = document.createElement('option');
    hdHighOption.value = "HD (High permeability)";
    hdHighOption.innerText = "Hemodialysis (High permeability)";

    // Find insertion point (after crcl option)
    const crclOption = dialysisSelect.querySelector('option[value="crcl"]');

    // Remove existing HD options
    const existingHD = dialysisSelect.querySelector('option[value="HD"]');
    const existingLow = dialysisSelect.querySelector('option[value="HD (Low permeability)"]');
    const existingHigh = dialysisSelect.querySelector('option[value="HD (High permeability)"]');

    if (existingHD) existingHD.remove();
    if (existingLow) existingLow.remove();
    if (existingHigh) existingHigh.remove();

    // Insert new options
    if (isVancomycin) {
        crclOption.after(hdHighOption);
        crclOption.after(hdLowOption);
        // Order: Low, High
    } else {
        crclOption.after(hdOption);
    }

    // Restore selection if applicable, else default to 'normal' or keep 'crcl' etc.
    // If switching from HD to split or vice versa, reset to normal to force re-selection or valid state
    if (currentVal.startsWith("HD")) {
        dialysisSelect.value = "normal"; // Reset to avoid invalid selection
        toggleDialysis("normal");
    } else {
        dialysisSelect.value = currentVal;
    }
}

function updateAntibioticDose() {
    const select = document.getElementById('anti-drug');
    if (!select) return;
    const drugRef = select.value;
    const crclInput = document.getElementById('anti-crcl');
    let crcl = parseFloat(crclInput.value);
    const dialysisSelect = document.getElementById('anti-dialysis');
    let dialysis = dialysisSelect.value;
    const resultMain = document.querySelector('#anti-result .anti-dose-main');
    const resultSub = document.querySelector('#anti-result .anti-dose-sub');

    if (!drugRef || typeof antibioticData === 'undefined') return;
    const [groupIdx, drugIdx] = drugRef.split('-').map(Number);
    const drug = antibioticData[groupIdx].drugs[drugIdx];

    // Update Dialysis Options based on drug
    updateDialysisOptions(drug.name);

    // Re-fetch dialysis value in case it was reset by updateDialysisOptions
    dialysis = dialysisSelect.value;

    const formatDose = (doseText) => {
        if (doseText.toLowerCase().includes("no dosage adjustment") ||
            doseText.toLowerCase().includes("no adjustment")) {
            return `${formatDoseText(drug.normalDose)} <div style="font-size: 0.7em; opacity: 0.8; font-weight: 400;">(no dosage adjustment)</div>`;
        }
        return formatDoseText(doseText);
    };

    const checkAd = (text) => text && text.includes("AD") ? "<br>AD: After Diuresis" : "";

    if (dialysis === 'normal') {
        resultMain.innerHTML = formatDose(drug.normalDose);
        resultSub.innerHTML = "in Normal Renal Function" + checkAd(drug.normalDose);
        updateDosingSummary(drug);
        return;
    }

    if (dialysis !== 'crcl') {
        let displayDose = drug.dialysis[dialysis] || "No data";
        resultMain.innerHTML = formatDose(displayDose);
        resultSub.innerHTML = `${dialysis} Mode${checkAd(displayDose)}`;
        updateDosingSummary(drug);
        return;
    }

    // Renal Impairment (CrCl) mode
    if (isNaN(crcl)) {
        resultMain.innerHTML = "---";
        resultSub.innerHTML = "Enter CrCl or use calculator";
        return;
    }

    const dosing = drug.renalDose.find(r => crcl >= r.min && crcl <= r.max);
    if (dosing) {
        resultMain.innerHTML = formatDose(dosing.dose);
        resultSub.innerHTML = `CrCl ${crcl} mL/min${checkAd(dosing.dose)}`;
    } else {
        resultMain.innerHTML = formatDose(drug.normalDose);
        resultSub.innerHTML = "in Normal Renal Function" + checkAd(drug.normalDose);
    }

    updateDosingSummary(drug);
}

function updateDosingSummary(drug) {
    const summaryCard = document.getElementById('anti-summary');
    const tbody = document.querySelector('#summary-table tbody');

    if (!drug) {
        summaryCard.classList.add('hidden');
        return;
    }

    summaryCard.classList.remove('hidden');
    tbody.innerHTML = ''; // Clear existing rows

    // Normal Dose Row
    const normalRow = `<tr><td><strong>Normal Function</strong></td><td>${formatDoseText(drug.normalDose)}</td></tr>`;
    tbody.innerHTML += normalRow;

    // Renal Dose Rows
    drug.renalDose.forEach(r => {
        let situation = "";
        if (r.max >= 999) {
            situation = `CrCl >${r.min}`;
        } else if (r.min === 0) {
            situation = `CrCl <${r.max}`;
        } else {
            situation = `CrCl ${r.min}-${r.max}`;
        }
        tbody.innerHTML += `<tr><td>${situation}</td><td>${formatDoseText(r.dose)}</td></tr>`;
    });

    // Dialysis Rows
    Object.entries(drug.dialysis).forEach(([mode, dose]) => {
        tbody.innerHTML += `<tr><td><strong>${mode}</strong></td><td>${formatDoseText(dose)}</td></tr>`;
    });
}

function openModal() {
    document.getElementById('modal-overlay').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// PWA Install Logic
let deferredPrompt;

// Check if device is iOS
const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
// Check if running in Standalone mode (Installed)
const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || ('standalone' in window.navigator && window.navigator.standalone);

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('👍 beforeinstallprompt fired!');
    e.preventDefault();
    deferredPrompt = e;
    // Button will be shown by default logic below unless standalone
});

window.addEventListener('load', () => {
    const installBtn = document.getElementById('install-btn');
    if (installBtn) {
        // If already installed (Standalone), hide the button
        if (isInStandaloneMode) {
            installBtn.style.display = 'none';
        } else {
            // Otherwise show it (to provide instructions if prompt not available)
            installBtn.classList.remove('hidden');
            installBtn.classList.add('visible');
        }
    }
});

async function installPWA() {
    // 1. If we have the native prompt (Android/Desktop Chrome)
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPrompt = null;
        if (outcome === 'accepted') {
            const installBtn = document.getElementById('install-btn');
            if (installBtn) installBtn.style.display = 'none';
        }
        return;
    }

    // 2. iOS Instruction
    if (isIos) {
        alert('iOS 앱 설치 방법:\n\nSafari 브라우저 하단 [공유] 버튼\n↓\n[홈 화면에 추가] 선택');
        return;
    }

    // 3. Android/Others Manual Instruction
    alert('앱 설치 방법:\n\n브라우저 우측 상단 메뉴(⋮)\n↓\n[앱 설치] 또는 [홈 화면에 추가] 선택');
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then((reg) => {
                console.log('Service Worker registered.', reg);
            })
            .catch((err) => {
                console.log('Service Worker registration failed:', err);
            });
    });
}

// Init
window.onload = () => {
    vp_setDefaults();
    populateAntibiotics();
    toggleDialysis(document.getElementById('anti-dialysis').value);
    updateAntibioticDose();
};
