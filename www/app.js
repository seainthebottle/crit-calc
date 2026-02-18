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
const vp_defaults = {
    norepi: { fluid: 270, drug: 20 },
    vaso: { fluid: 103, drug: 60 },
    epi: { fluid: 260, drug: 10 },
    dopamine: { fluid: 500, drug: 800 },
    dobutamine: { fluid: 250, drug: 500 }
};

function vp_setDefaults() {
    const drug = document.getElementById('vp-drug').value;
    document.getElementById('vp-fluidVolume').value = vp_defaults[drug].fluid;
    document.getElementById('vp-drugAmount').value = vp_defaults[drug].drug;
}

function vp_calculateDose() {
    const drug = document.getElementById('vp-drug').value;
    const fluid = parseFloat(document.getElementById('vp-fluidVolume').value);
    const drugAmount = parseFloat(document.getElementById('vp-drugAmount').value);
    const weight = parseFloat(document.getElementById('vp-weight').value);
    const rate = parseFloat(document.getElementById('vp-rate').value);

    const resultEl = document.getElementById('vp-result');

    if (isNaN(fluid) || isNaN(drugAmount) || isNaN(weight) || isNaN(rate) || fluid <= 0 || weight <= 0) {
        resultEl.innerText = "---";
        resultEl.style.color = "var(--text-dim)";
        return;
    }

    resultEl.style.color = "var(--primary)";
    if (drug === "vaso") {
        const concentration = drugAmount / fluid;
        const dose = (rate * concentration) / 60;
        resultEl.innerHTML = `${dose.toFixed(3)} <small>units/min</small>`;
    } else {
        const concentration = (drugAmount * 1000) / fluid;
        const dose = (rate * concentration) / (weight * 60);
        resultEl.innerHTML = `${dose.toFixed(3)} <small>mcg/kg/min</small>`;
    }
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

    // Event Listeners
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

    input.addEventListener('focus', () => {
        console.log("Input focused");
        filterAntibiotics(input.value);
    });

    input.addEventListener('click', () => {
        console.log("Input clicked");
        if (!list.classList.contains('show')) {
            filterAntibiotics(input.value);
        }
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
    list.classList.add('show');

    // Expand container on mobile
    if (container) container.classList.add('mobile-expanded');
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

    if (dialysis === 'normal') {
        resultMain.innerHTML = formatDose(drug.normalDose);
        resultSub.innerText = "in Normal Renal Function";
        updateDosingSummary(drug);
        return;
    }

    if (dialysis !== 'crcl') {
        let displayDose = drug.dialysis[dialysis] || "No data";
        resultMain.innerHTML = formatDose(displayDose);
        resultSub.innerText = `${dialysis} Mode`;
        updateDosingSummary(drug);
        return;
    }

    // Renal Impairment (CrCl) mode
    if (isNaN(crcl)) {
        resultMain.innerHTML = "---";
        resultSub.innerText = "Enter CrCl or use calculator";
        return;
    }

    const dosing = drug.renalDose.find(r => crcl >= r.min && crcl <= r.max);
    if (dosing) {
        resultMain.innerHTML = formatDose(dosing.dose);
        resultSub.innerText = `CrCl ${crcl} mL/min`;
    } else {
        resultMain.innerHTML = formatDose(drug.normalDose);
        resultSub.innerText = "in Normal Renal Function";
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
