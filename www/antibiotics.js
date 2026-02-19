const antibioticData =
  [
    {
      "category": "Carbapenems",
      "drugs": [
        {
          "name": "Ertapenem",
          "normalDose": "1 gm IV q24h",
          "renalDose": [
            { "min": 31, "max": 999, "dose": "No dosage adjustment" },
            { "min": 0, "max": 30, "dose": "0.5 gm q24h" }
          ],
          "dialysis": {
            "HD": "0.5 g q24h \n(+150 mg AD if given ≤6 hr before HD), \nOR 0.5 g 3x/wk AD",
            "CAPD": "0.5 g q24h",
            "CRRT": "0.5-1 gm q24h",
            "SLED": "1 gm q24h"
          }
        },
        {
          "name": "Imipenem-cilastatin",
          "normalDose": "Target 500 mg q6h",
          "renalDose": [
            { "min": 90, "max": 999, "dose": "Target 500 mg q6h: 500 mg q6h; Target 1 gm q8h (higher MIC): 1 gm q8h; Target 1 gm q6h (higher MIC): 1 gm q6h" },
            { "min": 60, "max": 89, "dose": "Target 500 mg q6h: 400 mg q6h; Target 1 gm q8h (higher MIC): 500 mg q6h; Target 1 gm q6h (higher MIC): 750 mg q8h" },
            { "min": 30, "max": 59, "dose": "Target 500 mg q6h: 300 mg q6h; Target 1 gm q8h (higher MIC): 500 mg q8h; Target 1 gm q6h (higher MIC): 500 mg q6h" },
            { "min": 15, "max": 29, "dose": "Target 500 mg q6h: 200 mg q6h; Target 1 gm q8h (higher MIC): 500 mg q12h; Target 1 gm q6h (higher MIC): 500 mg q12h" },
            { "min": 0, "max": 14, "dose": "See HD recommendations" }
          ],
          "dialysis": {
            "HD": "Target 500 mg q6h: 200 mg q6h (AD); Target 1 gm q8h: 500 mg q12h (AD); Target 1 gm q6h: 500 mg q12h (AD)",
            "CAPD": "No data",
            "CRRT": "0.5-1 gm q12h",
            "SLED": "No data"
          }
        },
        {
          "name": "Meropenem",
          "normalDose": "1 gm IV q8h",
          "renalDose": [
            { "min": 51, "max": 999, "dose": "No dosage adjustment" },
            { "min": 26, "max": 50, "dose": "1 gm q12h" },
            { "min": 10, "max": 25, "dose": "0.5 gm q12h" },
            { "min": 0, "max": 9, "dose": "0.5 gm q24h" }
          ],
          "dialysis": {
            "HD": "0.5 gm q24h\n(AD on dialysis days)",
            "CAPD": "0.5 gm q24h",
            "CRRT": "CVVH, CVVHD: 0.75-1 gm IV q8h",
            "SLED": "1 gm q8-12h"
          }
        },
        {
          "name": "Doripenem",
          "normalDose": "500 mg IV q8h",
          "renalDose": [
            { "min": 51, "max": 999, "dose": "No dosage adjustment" },
            { "min": 30, "max": 50, "dose": "250 mg q8h" },
            { "min": 10, "max": 29, "dose": "250 mg q12h" },
            { "min": 0, "max": 9, "dose": "No data" }
          ],
          "dialysis": {
            "HD": "No data",
            "CAPD": "No data",
            "CRRT": "500 mg q8h",
            "SLED": "No data"
          }
        }
      ]
    },
    {
      "category": "Cephalosporins (IV)",
      "drugs": [
        {
          "name": "Cefazolin",
          "normalDose": "1-2 gm IV q8h",
          "renalDose": [
            { "min": 51, "max": 999, "dose": "No dosage adjustment" },
            { "min": 10, "max": 50, "dose": "0.5-2 gm q8-12h" },
            { "min": 0, "max": 9, "dose": "0.5-1 gm q24h" }
          ],
          "dialysis": {
            "HD": "0.5-1 gm q24h\n(AD on dialysis days)\nor\n2 gm AD Mon/Wed,\n3 gm AD Fri",
            "CAPD": "0.5 gm q12h",
            "CRRT": "1-2 gm q12h",
            "SLED": "No data"
          }
        },
        {
          "name": "Cefotetan",
          "normalDose": "1-2 gm IV q12h",
          "renalDose": [
            { "min": 31, "max": 999, "dose": "No dosage adjustment" },
            { "min": 10, "max": 30, "dose": "1-2 gm q24h" },
            { "min": 0, "max": 9, "dose": "1-2 gm q48h" }
          ],
          "dialysis": {
            "HD": "1-2 gm q24h\n(+ extra 1 gm AD)",
            "CAPD": "1 gm q24h",
            "CRRT": "1-2 gm q24h",
            "SLED": "No data"
          }
        },
        {
          "name": "Cefoxitin",
          "normalDose": "2 gm IV q6-8h",
          "renalDose": [
            { "min": 51, "max": 999, "dose": "No dosage adjustment" },
            { "min": 30, "max": 50, "dose": "2 gm q8-12h" },
            { "min": 10, "max": 29, "dose": "2 gm q12-24h" },
            { "min": 0, "max": 9, "dose": "2 gm q24-48h" }
          ],
          "dialysis": {
            "HD": "2 gm q24-48h\n(+ extra 1 gm AD)",
            "CAPD": "1 gm q24h",
            "CRRT": "2 gm q8-12h",
            "SLED": "No data"
          }
        },
        {
          "name": "Cefotaxime",
          "normalDose": "1-2 gm IV q8h",
          "renalDose": [
            { "min": 91, "max": 999, "dose": "No dosage adjustment" },
            { "min": 50, "max": 90, "dose": "2 gm q8-12h" },
            { "min": 10, "max": 49, "dose": "2 gm q12-24h" },
            { "min": 0, "max": 9, "dose": "2 gm q24h" }
          ],
          "dialysis": {
            "HD": "2 gm q24h\n(+ extra 1 gm AD)",
            "CAPD": "0.5-1 gm q24h",
            "CRRT": "2 gm q12-24h",
            "SLED": "No data"
          }
        },
        {
          "name": "Ceftriaxone",
          "normalDose": "1-2 gm IV q12-24h",
          "renalDose": [
            { "min": 0, "max": 999, "dose": "No dosage adjustment for renal impairment" }
          ],
          "dialysis": {
            "HD": "No dosage adjustment",
            "CAPD": "No dosage adjustment",
            "CRRT": "No dosage adjustment",
            "SLED": "No data"
          }
        },
        {
          "name": "Cefepime",
          "normalDose": "1-2 gm IV q8-12h",
          "renalDose": [
            { "min": 61, "max": 999, "dose": "No dosage adjustment" },
            { "min": 30, "max": 60, "dose": "2 gm q12h" },
            { "min": 11, "max": 29, "dose": "2 gm q24h" },
            { "min": 0, "max": 10, "dose": "1 gm q24h" }
          ],
          "dialysis": {
            "HD": "1 gm q24h\n(q24h starting at end of dialysis)",
            "CAPD": "2 gm q48h",
            "CRRT": "Effluent rate 1L/h: 1 g q8h; Effluent rate 2L/h 이상: 1 g q6h",
            "SLED": "2 g loading -> 1 g q6h"
          }
        },
        {
          "name": "Cefoperazone-sulbactam",
          "normalDose": "2-4 gm/day (divided q12h)",
          "renalDose": [
            { "min": 31, "max": 999, "dose": "No dosage adjustment\n(Max sulbactam 4g/day)" },
            { "min": 15, "max": 30, "dose": "Sulbactam 1 gm q12h" },
            { "min": 0, "max": 14, "dose": "Sulbactam 500 mg q12h" }
          ],
          "dialysis": {
            "HD": "Sulbactam 500 mg q12h\n(AD on dialysis days)",
            "CAPD": "No data",
            "CRRT": "Sulbactam 1 gm q8h",
            "SLED": "No data"
          }
        },
        {
          "name": "Ceftazidime",
          "normalDose": "1-2 gm IV q8-12h",
          "renalDose": [
            { "min": 51, "max": 999, "dose": "No dosage adjustment" },
            { "min": 31, "max": 50, "dose": "1-2 gm q12-24h" },
            { "min": 0, "max": 30, "dose": "1-2 gm q24-48h" }
          ],
          "dialysis": {
            "HD": "0.5-1 gm q24h\n(AD on dialysis days)",
            "CAPD": "No data",
            "CRRT": "1-2 gm q8-12h",
            "SLED": "2 gm q12h"
          }
        },
        {
          "name": "Ceftazidime-avibactam",
          "normalDose": "2.5 gm IV q8h over 2-3h",
          "renalDose": [
            { "min": 51, "max": 999, "dose": "No dosage adjustment" },
            { "min": 31, "max": 50, "dose": "1.25 gm q8h" },
            { "min": 16, "max": 30, "dose": "0.94 gm q12h" },
            { "min": 6, "max": 15, "dose": "0.94 gm q24h" },
            { "min": 0, "max": 5, "dose": "0.94 gm q48h" }
          ],
          "dialysis": {
            "HD": "Use CrCl <=15 dosing\n(AD on dialysis days)",
            "CAPD": "No data",
            "CRRT": "2.5 gm q8h",
            "SLED": "No data"
          }
        },
        {
          "name": "Ceftolozane-tazobactam (IAI/UTI)",
          "normalDose": "1.5 gm IV q8h",
          "renalDose": [
            { "min": 51, "max": 999, "dose": "No dosage adjustment" },
            { "min": 30, "max": 50, "dose": "750 mg q8h" },
            { "min": 15, "max": 29, "dose": "375 mg q8h" },
            { "min": 0, "max": 14, "dose": "See HD recommendations" }
          ],
          "dialysis": {
            "HD": "750 mg (loading), 150 mg q8h (AD)",
            "CAPD": "No data",
            "CRRT": "CVVHDF: 3 gm x1, then 750 mg q8h",
            "SLED": "No data"
          }
        },
        {
          "name": "Ceftolozane-tazobactam (HAP/VAP)",
          "normalDose": "3 gm IV q8h",
          "renalDose": [
            { "min": 51, "max": 999, "dose": "No dosage adjustment" },
            { "min": 30, "max": 50, "dose": "1.5 gm q8h" },
            { "min": 15, "max": 29, "dose": "750 mg q8h" },
            { "min": 0, "max": 14, "dose": "See HD recommendations" }
          ],
          "dialysis": {
            "HD": "2.25 gm (loading), 450 mg q8h (AD)",
            "CAPD": "No data",
            "CRRT": "CVVHDF: 3 gm x1, then 750 mg q8h",
            "SLED": "No data"
          }
        },
        {
          "name": "Cefiderocol",
          "normalDose": "2 gm IV q8h over 3h",
          "renalDose": [
            { "min": 120, "max": 999, "dose": "2 gm q6h" },
            { "min": 60, "max": 119, "dose": "2 gm q8h" },
            { "min": 30, "max": 59, "dose": "1.5 gm q8h" },
            { "min": 15, "max": 29, "dose": "1 gm q8h" },
            { "min": 0, "max": 14, "dose": "0.75 gm q12h" }
          ],
          "dialysis": {
            "HD": "0.75 gm q12h (AD)",
            "CAPD": "No data",
            "CRRT": "Effluent rate <=2 L/hr: 1.5 gm q12h; 2.1 to 3 L/hr: 2 gm q12h; 3.1 to 4 L/hr: 1.5 gm q8h; >=4.1 L/hr: 2 gm q8h",
            "SLED": "No data"
          }
        }
      ]
    },
    {
      "category": "Cephalosporins (PO)",
      "drugs": [
        {
          "name": "Cefadroxil",
          "normalDose": "0.5-1 gm PO q12h",
          "renalDose": [
            { "min": 41, "max": 999, "dose": "500-1000 mg q12h (No adjustment)" },
            { "min": 20, "max": 39, "dose": "500 mg q12-24h" },
            { "min": 0, "max": 19, "dose": "500 mg q24-48h" }
          ],
          "dialysis": {
            "HD": "1 gm, then 1 gm AD\n(Give on dialysis days only)",
            "CAPD": "500 mg q24h",
            "CRRT": "No data",
            "SLED": "No data"
          }
        },
        {
          "name": "Cephalexin",
          "normalDose": "250-1000 mg PO q6h",
          "renalDose": [
            { "min": 51, "max": 999, "dose": "No dosage adjustment" },
            { "min": 10, "max": 50, "dose": "250-1000 mg q8-12h" },
            { "min": 0, "max": 9, "dose": "250-1000 mg q24-48h" }
          ],
          "dialysis": {
            "HD": "250-500 mg q12-24h\n(AD on dialysis days)",
            "CAPD": "250-500 mg q12-24h",
            "CRRT": "No data",
            "SLED": "No data"
          }
        },
        {
          "name": "Cefaclor",
          "normalDose": "500 mg PO q8h",
          "renalDose": [
            { "min": 10, "max": 999, "dose": "No dosage adjustment" },
            { "min": 0, "max": 9, "dose": "500 mg q12h" }
          ],
          "dialysis": {
            "HD": "500 mg q12h\n(give one of the dialysis day doses AD)",
            "CAPD": "500 mg q12h",
            "CRRT": "No data",
            "SLED": "No data"
          }
        },
        {
          "name": "Cefprozil",
          "normalDose": "500 mg PO q12h",
          "renalDose": [
            { "min": 51, "max": 999, "dose": "No dosage adjustment" },
            { "min": 10, "max": 50, "dose": "500 mg q24h" },
            { "min": 0, "max": 9, "dose": "250 mg q12h" }
          ],
          "dialysis": {
            "HD": "250 mg q12h\n(give one of the dialysis day doses AD)",
            "CAPD": "250 mg q24h",
            "CRRT": "No data",
            "SLED": "No data"
          }
        },
        {
          "name": "Cefuroxime axetil",
          "normalDose": "250-500 mg PO q12h",
          "renalDose": [
            { "min": 30, "max": 999, "dose": "No dosage adjustment" },
            { "min": 10, "max": 29, "dose": "250-500 mg q24-48h" },
            { "min": 0, "max": 9, "dose": "250-500 mg q48h" }
          ],
          "dialysis": {
            "HD": "250-500 mg q48h\n(give extra 250-500 mg AD)",
            "CAPD": "250-500 mg q24h",
            "CRRT": "No data",
            "SLED": "No data"
          }
        },
        {
          "name": "Cefdinir",
          "normalDose": "300 mg PO q12h",
          "renalDose": [
            { "min": 30, "max": 999, "dose": "No dosage adjustment" },
            { "min": 0, "max": 29, "dose": "300 mg q24h" }
          ],
          "dialysis": {
            "HD": "300 mg q48h\n(q24h starting at end of dialysis)",
            "CAPD": "No data",
            "CRRT": "No data",
            "SLED": "No data"
          }
        },
        {
          "name": "Cefditoren pivoxil",
          "normalDose": "400 mg PO q12h",
          "renalDose": [
            { "min": 51, "max": 999, "dose": "No dosage adjustment" },
            { "min": 10, "max": 50, "dose": "200 mg q12h" },
            { "min": 0, "max": 9, "dose": "200 mg q24h" }
          ],
          "dialysis": {
            "HD": "200 mg q24h\n(q24h starting at end of dialysis)",
            "CAPD": "200 mg q24h",
            "CRRT": "No data",
            "SLED": "No data"
          }
        },
        {
          "name": "Cefixime",
          "normalDose": "400 mg PO q24h",
          "renalDose": [
            { "min": 61, "max": 999, "dose": "No dosage adjustment" },
            { "min": 21, "max": 60, "dose": "260 mg q24h (use susp)" },
            { "min": 0, "max": 20, "dose": "200 mg q24h" }
          ],
          "dialysis": {
            "HD": "260 mg q24h\n(q24h starting at end of dialysis)",
            "CAPD": "200 mg q24h",
            "CRRT": "No data",
            "SLED": "No data"
          }
        },
        {
          "name": "Cefpodoxime proxetil",
          "normalDose": "200 mg PO q12h",
          "renalDose": [
            { "min": 30, "max": 999, "dose": "No dosage adjustment" },
            { "min": 0, "max": 29, "dose": "100-200 mg q24h" }
          ],
          "dialysis": {
            "HD": "100-200 mg on dialysis days only, post-dialysis",
            "CAPD": "200 mg q24h",
            "CRRT": "No data",
            "SLED": "No data"
          }
        }
      ]
    },
    {
      "category": "Monobactam",
      "drugs": [
        {
          "name": "Aztreonam",
          "normalDose": "2 g IV q6-8h",
          "renalDose": [
            { "min": 30, "max": 999, "dose": "No dosage adjustment" },
            { "min": 10, "max": 29, "dose": "2 g IV q12h" },
            { "min": 0, "max": 9, "dose": "1-2 gm q24h" }
          ],
          "dialysis": {
            "HD": "1-2 gm q24h\n(q24h starting at end of dialysis)",
            "CAPD": "2 gm q24h",
            "CRRT": "2 g loading, then CVVH: 1-2 gm q12h; CVVHD: 2 gm q12h; CVVHDF: 2 gm q12h",
            "SLED": "No data"
          }
        }
      ]
    },
    {
      "category": "Penicillins",
      "drugs": [
        {
          "name": "Penicillin G",
          "normalDose": "0.5-4 million U IV q4h",
          "renalDose": [
            { "min": 51, "max": 999, "dose": "No dosage adjustment" },
            { "min": 10, "max": 50, "dose": "0.5-4 million U q8h" },
            { "min": 0, "max": 9, "dose": "0.5-4 million U q12h" }
          ],
          "dialysis": {
            "HD": "0.5-4 million U q12h\n(give one of dialysis day doses post-dialysis)",
            "CAPD": "0.5-4 million U q12h",
            "CRRT": "1-4 million U q6-8h",
            "SLED": "3 million U q6h"
          }
        },
        {
          "name": "Amoxicillin (standard)",
          "normalDose": "500-1000 mg PO q8h",
          "renalDose": [
            { "min": 31, "max": 999, "dose": "No dosage adjustment" },
            { "min": 10, "max": 30, "dose": "500-1000 mg PO q12h" },
            { "min": 0, "max": 9, "dose": "500 mg PO q12-24h" }
          ],
          "dialysis": {
            "HD": "250-500 mg q24h\n(q24h starting at end of dialysis)",
            "CAPD": "250-500 mg q12h",
            "CRRT": "250-500 mg q8-12h",
            "SLED": "No data"
          }
        },
        {
          "name": "Amoxicillin-clavulanate (PO)",
          "normalDose": "500/125 mg PO q8h\nor\n875/125 mg PO q12h",
          "renalDose": [
            { "min": 31, "max": 999, "dose": "No dosage adjustment" },
            { "min": 10, "max": 30, "dose": "250-500 mg q12h\n(based on Amoxicillin)" },
            { "min": 0, "max": 9, "dose": "250-500 mg q12-24h\n(based on Amoxicillin)" }
          ],
          "dialysis": {
            "HD": "250-500 mg q24h\n(q24h starting at end of dialysis)\n(based on Amoxicillin)",
            "CAPD": "No data",
            "CRRT": "No data",
            "SLED": "No data"
          }
        },
        {
          "name": "Amoxicillin-clavulanate (IV)",
          "normalDose": "1000 mg/200 mg IV q8h",
          "renalDose": [
            { "min": 31, "max": 999, "dose": "No dosage adjustment" },
            { "min": 10, "max": 30, "dose": "1000 mg x1, then 500 mg q12h\n(based on Amoxicillin)" },
            { "min": 0, "max": 9, "dose": "1000 mg x1, then 500 mg q24h\n(based on Amoxicillin)" }
          ],
          "dialysis": {
            "HD": "1000 mg x1, then 500 mg q24h\n(q24h starting at end of dialysis)\n(based on Amoxicillin)",
            "CAPD": "No data",
            "CRRT": "No data",
            "SLED": "No data"
          }
        },
        {
          "name": "Ampicillin",
          "normalDose": "1-2 gm IV q4-6h",
          "renalDose": [
            { "min": 51, "max": 999, "dose": "No dosage adjustment" },
            { "min": 30, "max": 50, "dose": "1-2 gm q6-8h" },
            { "min": 10, "max": 30, "dose": "1-2 gm q8-12h" },
            { "min": 0, "max": 9, "dose": "1-2 gm q12-24h" }
          ],
          "dialysis": {
            "HD": "1-2 gm q12-24h",
            "CAPD": "1-2 gm q12h",
            "CRRT": "1-2 gm q8-12h",
            "SLED": "No data"
          }
        },
        {
          "name": "Ampicillin-sulbactam",
          "normalDose": "1.5-3 gm IV q6h",
          "renalDose": [
            { "min": 30, "max": 999, "dose": "No dosage adjustment" },
            { "min": 15, "max": 29, "dose": "1.5-3 gm q12h" },
            { "min": 5, "max": 14, "dose": "1.5-3 gm q24h" }
          ],
          "dialysis": {
            "HD": "1.5-3 gm q24h\n(q24h starting at end of dialysis)",
            "CAPD": "3 gm q 24h",
            "CRRT": "1.5-3 gm q8-12h",
            "SLED": "3 gm q12h"
          }
        },
        {
          "name": "Nafcillin",
          "normalDose": "2 gm IM/IV q4h",
          "renalDose": [
            { "min": 0, "max": 999, "dose": "No dosage adjustment for renal impairment" }
          ],
          "dialysis": {
            "HD": "No dosage adjustment",
            "CAPD": "No dosage adjustment",
            "CRRT": "No dosage adjustment",
            "SLED": "No data"
          }
        },
        {
          "name": "Piperacillin-Tazobactam\n(non-nosocomial P; low MIC)",
          "normalDose": "4.5 gm q8h (over 30 min)",
          "renalDose": [
            { "min": 41, "max": 999, "dose": "No dosage adjustment" },
            { "min": 20, "max": 40, "dose": "2.25 gm q6h" },
            { "min": 0, "max": 19, "dose": "2.25 gm q8h" }
          ],
          "dialysis": {
            "HD": "2.25 gm q12h\n(+ extra 0.75 gm AD)",
            "CAPD": "2.25 gm q12h",
            "CRRT": "4.5 gm q8h",
            "SLED": "4.5 g q8h"
          }
        },
        {
          "name": "Piperacillin-Tazobactam\n(nosocomial P; high MIC)",
          "normalDose": "4.5 gm q6h",
          "renalDose": [
            { "min": 41, "max": 999, "dose": "No dosage adjustment" },
            { "min": 20, "max": 40, "dose": "3.375 gm q6h" },
            { "min": 0, "max": 19, "dose": "2.25 gm q6h" }
          ],
          "dialysis": {
            "HD": "2.25 gm q8h\n(+ extra 0.75 gm AD)",
            "CAPD": "2.25 gm q8h",
            "CRRT": "4.5 gm q6h",
            "SLED": "4.5 g q8h"
          }
        },
        {
          "name": "Piperacillin-Tazobactam\n(extended infusion)",
          "normalDose": "4.5 g (over 30 min), then 3.375 g q8h (over 4 hr)",
          "renalDose": [
            { "min": 20, "max": 999, "dose": "No dosage adjustment" },
            { "min": 0, "max": 19, "dose": "4.5 gm (over 4 hr) q12h" }
          ],
          "dialysis": {
            "HD": "4.5 gm (over 4 hr) q12h",
            "CAPD": "No data",
            "CRRT": "4.5gm (over 4hr) q8h",
            "SLED": "No data"
          }
        }
      ]
    },
    {
      "category": "Quinolones",
      "drugs": [
        {
          "name": "Ciprofloxacin (po)",
          "normalDose": "250-750 mg PO q12h",
          "renalDose": [
            { "min": 51, "max": 999, "dose": "500-750 mg PO BID (No adjustment)" },
            { "min": 30, "max": 49, "dose": "250-500 mg PO BID" },
            { "min": 0, "max": 29, "dose": "500 mg PO QD" }
          ],
          "dialysis": {
            "HD": "250-500 mg q24h\n(q24h starting at end of dialysis)",
            "CAPD": "250-500 mg q24h",
            "CRRT": "250-500 mg q12h",
            "SLED": "No data"
          }
        },
        {
          "name": "Ciprofloxacin (IV)",
          "normalDose": "200-400 mg IV q8-12h",
          "renalDose": [
            { "min": 51, "max": 999, "dose": "400 mg IV q8-12h (No adjustment)" },
            { "min": 30, "max": 49, "dose": "400 mg IV q12-24h" },
            { "min": 0, "max": 29, "dose": "200-400 mg IV q24h" }
          ],
          "dialysis": {
            "HD": "200-400 mg q24h\n(q24h starting at end of dialysis)",
            "CAPD": "200-400 mg q24h",
            "CRRT": "200-400 mg q12h",
            "SLED": "No data"
          }
        },
        {
          "name": "Levofloxacin",
          "normalDose": "750 mg po/IV q24h",
          "renalDose": [
            { "min": 51, "max": 999, "dose": "No dosage adjustment" },
            { "min": 20, "max": 49, "dose": "750 mg q48h" },
            { "min": 0, "max": 19, "dose": "750 mg x1, then 500 mg q48h" }
          ],
          "dialysis": {
            "HD": "750 mg x1, then 500 mg q48h",
            "CAPD": "750 mg x1, then 500 mg q48h",
            "CRRT": "750 mg x1, then 500 mg q48h",
            "SLED": "No data"
          }
        },
        {
          "name": "Moxifloxacin",
          "normalDose": "400 mg po/IV q24h",
          "renalDose": [
            { "min": 0, "max": 999, "dose": "No dosage adjustment for renal impairment" }
          ],
          "dialysis": {
            "HD": "No dosage adjustment",
            "CAPD": "No dosage adjustment",
            "CRRT": "No dosage adjustment",
            "SLED": "No data"
          }
        }
      ]
    },
    {
      "category": "Glycopeptides, Lipoglycopeptides, Lipopeptides",
      "drugs": [
        {
          "name": "Daptomycin",
          "normalDose": "6-10 mg/kg IV q24h",
          "renalDose": [
            { "min": 31, "max": 999, "dose": "No dosage adjustment" },
            { "min": 0, "max": 30, "dose": "6-10 mg/kg q48h" }
          ],
          "dialysis": {
            "HD": "6-10 mg/kg q48h (AD); if next dialysis is 72 hrs away, give 9-15 mg/kg",
            "CAPD": "6-10 mg/kg q48h",
            "CRRT": "6-8 mg/kg q24h",
            "SLED": "6 mg/kg q24h; post-SLED\n(8-12 mg/kg for severe infection)"
          }
        },
        {
          "name": "Teicoplanin\n(Target Trough 15-30)",
          "normalDose": "Loading dose:(Day 1): 12 mg/kg q12h\n(Day 2-3): 12 mg/kg q24h\n\nMaintenance dose:6.0-6.7 mg/kg q24h",
          "renalDose": [
            { "min": 60, "max": 999, "dose": "No dosage adjustment" },
            { "min": 30, "max": 59, "dose": "Loading dose:(Day 1): 12 mg/kg q12h\n(Day 2): 10 mg/kg q24h\n(Day 3): 6.0-6.7 mg/kg q24h\n\nMaintenance dose:3.0-3.3 mg/kg q24h" },
            { "min": 0, "max": 29, "dose": "Loading dose:(Day 1): 12 mg/kg q12h\n(Day 2-3): 5 mg/kg q24h\n\nMaintenance dose:5 mg/kg q48h" }
          ],
          "dialysis": {
            "HD": "Loading dose:(Day 1): 12 mg/kg q12h\n(Day 2-3): 5 mg/kg q24h\n\nMaintenance dose:5 mg/kg q48h\n(Not removed by HD)",
            "CAPD": "No data",
            "CRRT": "Loading dose:(Day 1): 10 mg/kg q12h\n(Day 2-3): 10 mg/kg q24h\n\nMaintenance dose:3.0-3.3 mg/kg q24h",
            "SLED": "No data"
          }
        },
        {
          "name": "Teicoplanin\n(Target Trough 20-40)",
          "normalDose": "Loading dose:(Day 1-2): 12 mg/kg q12h\n(Day 3): 12 mg/kg q24h\n\nMaintenance dose:6.0-6.7 mg/kg q24h",
          "renalDose": [
            { "min": 60, "max": 999, "dose": "No dosage adjustment" },
            { "min": 30, "max": 59, "dose": "Loading dose:(Day 1): 12 mg/kg q12h\n(Day 2-3): 12 mg/kg q24h\n\nMaintenance dose:5 mg/kg q24h" },
            { "min": 0, "max": 29, "dose": "Loading dose:(Day 1): 12 mg/kg q12h\n(Day 2): 12 mg/kg q24h\n(Day 3): 6.0-6.7 mg/kg q24h\n\nMaintenance dose:3-3.3 mg/kg q24h" }
          ],
          "dialysis": {
            "HD": "Loading dose:(Day 1): 12 mg/kg q12h\n(Day 2): 12 mg/kg q24h\n(Day 3): 6.0-6.7 mg/kg q24h\n\nMaintenance dose:3-3.3 mg/kg q24h\n(Not removed by HD)",
            "CAPD": "No data",
            "CRRT": "Loading dose:(Day 1): 12 mg/kg q12h\n(Day 2-3): 12 mg/kg q24h\n\nMaintenance dose:3.0-3.3 mg/kg q24h",
            "SLED": "No data"
          }
        },
        {
          "name": "Vancomycin",
          "normalDose": "Loading dose: 25-30 mg/kg x1 (Max 3 gm)\n\nMaintenance dose: 15-20 mg/kg IV q8-12h",
          "renalDose": [
            { "min": 101, "max": 999, "dose": "No dosage adjustment" },
            { "min": 51, "max": 100, "dose": "15-20 mg/kg q12h" },
            { "min": 20, "max": 50, "dose": "15-20 mg/kg q24h" },
            { "min": 0, "max": 19, "dose": "15-20 mg/kg q48h" }
          ],
          "dialysis": {
            "HD\n(Low permeability)": "POST-HD:\nLoading dose: 25 mg/kg,\nMaint 7.5 mg/kg AD\n\nINTRADIALYTIC:\nLoading dose: 30 mg/kg,\nMaint 7.5-10 mg/kg",
            "HD\n(High permeability)": "POST-HD:\nLoading dose: 25 mg/kg,\nMaint 10 mg/kg AD\n\nINTRADIALYTIC:\nLoading dose: 35 mg/kg,\nMaint 10-15 mg/kg",
            "CAPD": "7.5 mg/kg q48-96h",
            "CRRT": "7.5-10 mg/kg q12h\n(effluent 20-25 mL/kg/hr)",
            "SLED": "Loading: 20-25 mg/kg; Maintenance: 15 mg/kg AD"
          }
        }
      ]
    },
    {
      "category": "Aminoglycosides",
      "drugs": [
        {
          "name": "Amikacin (conventional)",
          "normalDose": "7.5 mg/kg IV q12h",
          "renalDose": [
            { "min": 51, "max": 999, "dose": "No dosage adjustment" },
            { "min": 10, "max": 50, "dose": "7.5 mg/kg q24h\n(UpToDate에서는 CCr 40-50에선 q12h dosing 권고)" },
            { "min": 0, "max": 9, "dose": "7.5 mg/kg q48h" }
          ],
          "dialysis": {
            "HD": "7.5 mg/kg q48h\n(+ extra 3.75 mg/kg AD)",
            "CAPD": "For peritonitis only: 2 mg/kg IP once daily",
            "CRRT": "7.5 mg/kg q24h",
            "SLED": "No data"
          }
        },
        {
          "name": "Amikacin\n(extended interval)",
          "normalDose": "15-20 mg/kg q24h\n(Critically ill: 30 mg/kg 고려)",
          "renalDose": [
            { "min": 60, "max": 999, "dose": "15-20 mg/kg q24h" },
            { "min": 40, "max": 59, "dose": "15-20 mg/kg q36h" },
            { "min": 20, "max": 39, "dose": "15-20 mg/kg q48h" },
            { "min": 0, "max": 19, "dose": "금기, conventional dosing 사용" }
          ],
          "dialysis": {
            "HD": "No data",
            "CAPD": "No data",
            "CRRT": "CVVH, CVVHDF: 25 mg/kg q48h",
            "SLED": "No data"
          }
        },
        {
          "name": "Gentamicin (conventional)",
          "normalDose": "2.0 mg/kg IV x1, then 1.7-2.0 mg/kg IV q8h",
          "renalDose": [
            { "min": 61, "max": 999, "dose": "No adjustment" },
            { "min": 40, "max": 60, "dose": "1.7-2.0 mg/kg q12h" },
            { "min": 20, "max": 39, "dose": "1.7-2.0 mg/kg q24h" },
            { "min": 0, "max": 19, "dose": "1.7-2.0 mg/kg q36-48h" }
          ],
          "dialysis": {
            "HD": "1.7-2.0 mg/kg q48h\n(+ extra 0.85-1.0 mg/kg AD)",
            "CAPD": "For peritonitis only: 0.6 mg/kg IP once daily",
            "CRRT": "1.7-2.0 mg/kg q24h",
            "SLED": "6 mg/kg IV q48h\n(Begin 30 min before start of SLED)"
          }
        },
        {
          "name": "Gentamicin\n(extended interval)",
          "normalDose": "5-7 mg/kg q24h",
          "renalDose": [
            { "min": 60, "max": 999, "dose": "5-7 mg/kg q24h" },
            { "min": 40, "max": 59, "dose": "5-7 mg/kg q36h" },
            { "min": 20, "max": 39, "dose": "5-7 mg/kg q48h" },
            { "min": 0, "max": 19, "dose": "금기, conventional dosing 사용" }
          ],
          "dialysis": {
            "HD": "2 mg/kg q72h (AD)",
            "CAPD": "For peritonitis only: 0.6 mg/kg IP once daily",
            "CRRT": "No data",
            "SLED": "No data"
          }
        },
        {
          "name": "Gentamicin\n(synergy for gram positive)",
          "normalDose": "1 mg/kg IV q8h",
          "renalDose": [
            { "min": 60, "max": 999, "dose": "1 mg/kg q8h" },
            { "min": 40, "max": 59, "dose": "1 mg/kg q12h" },
            { "min": 20, "max": 39, "dose": "1 mg/kg q16h" },
            { "min": 0, "max": 19, "dose": "1 mg/kg q48h, conventional dosing의 보수적인 쪽으로 차용" }
          ],
          "dialysis": {
            "HD": "1 mg/kg q48-72h (AD)",
            "CAPD": "For peritonitis only: 0.6 mg/kg IP once daily",
            "CRRT": "No data",
            "SLED": "No data"
          }
        },
        {
          "name": "Tobramycin (conventional)",
          "normalDose": "2.0 mg/kg IV x1, then 1.7-2.0 mg/kg IV q8h",
          "renalDose": [
            { "min": 61, "max": 999, "dose": "No adjustment" },
            { "min": 40, "max": 60, "dose": "1.7-2.0 mg/kg q12h" },
            { "min": 10, "max": 39, "dose": "1.7-2.0 mg/kg q24h" },
            { "min": 0, "max": 9, "dose": "1.7-2.0 mg/kg q48h" }
          ],
          "dialysis": {
            "HD": "1.7-2.0 mg/kg q48h\n(+ extra 0.85-1.0 mg/kg AD)",
            "CAPD": "For peritonitis only: 0.6 mg/kg IP once daily",
            "CRRT": "1.7-2.0 mg/kg q24h",
            "SLED": "No data"
          }
        },
        {
          "name": "Tobramycin\n(extended interval)",
          "normalDose": "5-7 mg/kg q24h",
          "renalDose": [
            { "min": 60, "max": 999, "dose": "5-7 mg/kg q24h" },
            { "min": 40, "max": 59, "dose": "5-7 mg/kg q36h" },
            { "min": 20, "max": 39, "dose": "5-7 mg/kg q48h" },
            { "min": 0, "max": 19, "dose": "금기, conventional dosing 사용" }
          ],
          "dialysis": {
            "HD": "1.2-2.0 mg/kg q48-72h (AD)",
            "CAPD": "No data",
            "CRRT": "Loading dose: 2-3 mg/kg; Maintenance dose: 1.5-2.5 mg/kg q24-48h",
            "SLED": "No data"
          }
        }
      ]
    },
    {
      "category": "Macrolides",
      "drugs": [
        {
          "name": "Azithromycin",
          "normalDose": "250-500 mg IV/PO q24h",
          "renalDose": [
            { "min": 0, "max": 999, "dose": "No dosage adjustment for renal impairment" }
          ],
          "dialysis": {
            "HD": "No dosage adjustment for renal impairment",
            "CAPD": "No dosage adjustment for renal impairment",
            "CRRT": "No dosage adjustment for renal impairment",
            "SLED": "No data"
          }
        },
        {
          "name": "Clarithromycin",
          "normalDose": "500 mg PO q12h",
          "renalDose": [
            { "min": 51, "max": 999, "dose": "No dosage adjustment" },
            { "min": 10, "max": 50, "dose": "500 mg q12-24h" },
            { "min": 0, "max": 9, "dose": "500 mg q24h" }
          ],
          "dialysis": {
            "HD": "500 mg q24h\n(AD on dialysis days)",
            "CAPD": "500 mg q24h",
            "CRRT": "500 mg q12-24h",
            "SLED": "No data"
          }
        }
      ]
    },
    {
      "category": "Miscellaneous",
      "drugs": [
        {
          "name": "Clindamycin",
          "normalDose": "600 mg IV q8h; 150-450 mg PO q6h",
          "renalDose": [
            { "min": 0, "max": 999, "dose": "No dosage adjustment for renal impairment" }
          ],
          "dialysis": {
            "HD": "No dosage adjustment for renal impairment",
            "CAPD": "No dosage adjustment for renal impairment",
            "CRRT": "No dosage adjustment for renal impairment",
            "SLED": "No data"
          }
        },
        {
          "name": "Fosfomycin PO",
          "normalDose": "3 gm PO x1",
          "renalDose": [
            { "min": 11, "max": 999, "dose": "No dosage adjustment" },
            { "min": 0, "max": 10, "dose": "Avoid use\n(poor urinary excretion)" }
          ],
          "dialysis": {
            "HD": "No data",
            "CAPD": "No data",
            "CRRT": "No data",
            "SLED": "No data"
          }
        },
        {
          "name": "Nitrofurantoin",
          "normalDose": "50 mg PO q6h",
          "renalDose": [
            { "min": 31, "max": 999, "dose": "No dosage adjustment" },
            { "min": 0, "max": 30, "dose": "Avoid use" }
          ],
          "dialysis": {
            "HD": "Avoid use",
            "CAPD": "Avoid use",
            "CRRT": "Avoid use",
            "SLED": "No data"
          }
        },
        {
          "name": "Fusidic acid",
          "normalDose": "500 mg PO q8h",
          "renalDose": [
            { "min": 0, "max": 999, "dose": "No dosage adjustment for renal impairment" }
          ],
          "dialysis": {
            "HD": "No data",
            "CAPD": "No data",
            "CRRT": "No data",
            "SLED": "No data"
          }
        },
        {
          "name": "Metronidazole",
          "normalDose": "500 mg q6-8h",
          "renalDose": [
            { "min": 11, "max": 999, "dose": "No dosage adjustment" },
            { "min": 0, "max": 10, "dose": "500 mg q12h" }
          ],
          "dialysis": {
            "HD": "500 mg q12h (AD)",
            "CAPD": "No dosage adjustment",
            "CRRT": "No dosage adjustment",
            "SLED": "500mg q12h\n(1 dose immediately post-SLED)"
          }
        },
        {
          "name": "TMP-SMX",
          "normalDose": "Treatment: 5-20 mg/kg/day po/IV\n(div q6-12h); Prophylaxis: 1 DS tab PO q24h or 3x/week",
          "renalDose": [
            { "min": 31, "max": 999, "dose": "Treatment: 5-20 mg/kg/day po/IV\n(div q6-12h); Prophylaxis: 1 DS tab PO q24h or 3x/week" },
            { "min": 10, "max": 30, "dose": "Treatment: 5-10 mg/kg/day\n(div q12h); Prophylaxis: 1 DS tab PO q24h or 3x/week" },
            { "min": 0, "max": 9, "dose": "Treatment: Not recommended\n(if used: 5-10 mg/kg q24h); Prophylaxis: 1 DS tab PO q24h or 3x/week" }
          ],
          "dialysis": {
            "HD": "Treatment: Not recommended\n(if used: 5-10 mg/kg q24h, AD on dialysis days); Prophylaxis: No data",
            "CAPD": "Treatment: Not recommended\n(if used: 5-10 mg/kg q24h)",
            "CRRT": "Treatment: 5 mg/kg q8h",
            "SLED": "No data"
          }
        }
      ]
    },
    {
      "category": "Polymyxins",
      "drugs": [
        {
          "name": "Colistin (polymyxin E)",
          "normalDose": "Load: 4 x Bwt\n(based on the lesser of IBW or actual BW); Loading dose may exceed 300 mg.",
          "renalDose": [
            { "min": 90, "max": 999, "dose": "180 mg q12h" },
            { "min": 80, "max": 89, "dose": "170 mg q12h" },
            { "min": 70, "max": 79, "dose": "150 mg q12h" },
            { "min": 60, "max": 69, "dose": "137.5 mg q12h" },
            { "min": 50, "max": 59, "dose": "122.5 mg q12h" },
            { "min": 40, "max": 49, "dose": "110 mg q12h" },
            { "min": 30, "max": 39, "dose": "97.5 mg q12h" },
            { "min": 20, "max": 29, "dose": "87.5 mg q12h" },
            { "min": 10, "max": 19, "dose": "80 mg q12h" },
            { "min": 5, "max": 9, "dose": "72.5 mg q12h" },
            { "min": 0, "max": 4, "dose": "65 mg q12h" }
          ],
          "dialysis": {
            "HD": "On non-HD days, give 65 mg IV q12h; On HD days, add 40-50 mg to the daily dose after a 3-4 hr session; Give this supplement with the next regular dose after the dialysis has ended.",
            "CAPD": "No data",
            "CRRT": "220 mg IV q12h",
            "SLED": "Add 13 mg per hour of SLED to the baseline dose of 65 mg q12h"
          }
        }
      ]
    },
    {
      "category": "Tetracyclines, Glycylcyclines",
      "drugs": [
        {
          "name": "Doxycycline",
          "normalDose": "100 mg PO q12h",
          "renalDose": [
            { "min": 0, "max": 999, "dose": "No dosage adjustment for renal impairment" }
          ],
          "dialysis": {
            "HD": "No dosage adjustment",
            "CAPD": "No dosage adjustment",
            "CRRT": "No dosage adjustment",
            "SLED": "No data"
          }
        },
        {
          "name": "Minocycline",
          "normalDose": "200 mg PO loading x1, then 100 mg PO q12h",
          "renalDose": [
            { "min": 0, "max": 999, "dose": "No dosage adjustment for renal impairment" }
          ],
          "dialysis": {
            "HD": "No dosage adjustment",
            "CAPD": "No dosage adjustment",
            "CRRT": "No dosage adjustment",
            "SLED": "No data"
          }
        },
        {
          "name": "Tigecycline",
          "normalDose": "100 mg, then 50 mg IV q12h",
          "renalDose": [
            { "min": 0, "max": 999, "dose": "No dosage adjustment for renal impairment" }
          ],
          "dialysis": {
            "HD": "No dosage adjustment",
            "CAPD": "No dosage adjustment",
            "CRRT": "No dosage adjustment",
            "SLED": "No data"
          }
        }
      ]
    },
    {
      "category": "Antifungals",
      "drugs": [
        {
          "name": "Fluconazole",
          "normalDose": "100-400 mg IV/PO q24h",
          "renalDose": [
            { "min": 51, "max": 999, "dose": "No dosage adjustment" },
            { "min": 0, "max": 50, "dose": "50-200 mg q24h" }
          ],
          "dialysis": {
            "HD": "50-200 mg q24h on non-dialysis days; Give 100-400 mg (full dose) AD on dialysis days",
            "CAPD": "50-200 mg q24h",
            "CRRT": "At least 2x usual dose suggested",
            "SLED": "800 mg load then 400 mg q12h"
          }
        },
        {
          "name": "Voriconazole",
          "normalDose": "Loading dose: 6 mg/kg IV/PO q12h x2 doses; Maintenance dose: 4 mg/kg IV/PO q12h",
          "renalDose": [
            { "min": 50, "max": 999, "dose": "No dosage adjustment for renal impairment" },
            { "min": 0, "max": 49, "dose": "No dosage adjustment for renal impairment; Avoid IV if CrCl <50 due to vehicle" }
          ],
          "dialysis": {
            "HD": "No dosage adjustment",
            "CAPD": "No dosage adjustment",
            "CRRT": "No dosage adjustment",
            "SLED": "No data"
          }
        },
        {
          "name": "Posaconazole",
          "normalDose": "Loading: 300 mg bid for 2 doses; Maintenance: 300 mg qd",
          "renalDose": [
            { "min": 50, "max": 999, "dose": "No dosage adjustment for renal impairment" },
            { "min": 0, "max": 49, "dose": "No dosage adjustment for renal impairment; Avoid IV if CrCl <50 due to vehicle" }
          ],
          "dialysis": {
            "HD": "No dosage adjustment",
            "CAPD": "No dosage adjustment",
            "CRRT": "No dosage adjustment",
            "SLED": "No data"
          }
        },
        {
          "name": "Isavuconazole",
          "normalDose": "200 mg po/iv q24h",
          "renalDose": [
            { "min": 0, "max": 999, "dose": "No dosage adjustment for renal impairment" }
          ],
          "dialysis": {
            "HD": "No dosage adjustment",
            "CAPD": "No dosage adjustment",
            "CRRT": "No dosage adjustment",
            "SLED": "SLED may ↓ plasma conc"
          }
        },
        {
          "name": "Caspofungin",
          "normalDose": "75 mg IV loading x1, then 50 mg IV q24h",
          "renalDose": [
            { "min": 0, "max": 999, "dose": "No dosage adjustment for renal impairment" }
          ],
          "dialysis": {
            "HD": "No dosage adjustment",
            "CAPD": "No dosage adjustment",
            "CRRT": "No dosage adjustment",
            "SLED": "No data"
          }
        },
        {
          "name": "Micafungin",
          "normalDose": "100 mg IV q24h",
          "renalDose": [
            { "min": 0, "max": 999, "dose": "No dosage adjustment for renal impairment" }
          ],
          "dialysis": {
            "HD": "No dosage adjustment",
            "CAPD": "No dosage adjustment",
            "CRRT": "Consider 150-200 mg q24h",
            "SLED": "No data"
          }
        },
        {
          "name": "Anidulafungin",
          "normalDose": "200 mg IV loading x1, then 100 mg IV q24h",
          "renalDose": [
            { "min": 0, "max": 999, "dose": "No dosage adjustment for renal impairment" }
          ],
          "dialysis": {
            "HD": "No dosage adjustment for renal impairment",
            "CAPD": "No dosage adjustment for renal impairment",
            "CRRT": "No dosage adjustment for renal impairment",
            "SLED": "No data",
          }
        },
        {
          "name": "Amphotericin B",
          "normalDose": "0.3-1.0 mg/kg/day (deoxycholate); 3-5 mg/kg/day (liposomal)",
          "renalDose": [
            { "min": 0, "max": 999, "dose": "No dosage adjustment for renal impairment" }
          ],
          "dialysis": {
            "HD": "No dosage adjustment for renal impairment",
            "CAPD": "No dosage adjustment for renal impairment",
            "CRRT": "No dosage adjustment for renal impairment",
            "SLED": "No dosage adjustment for renal impairment",
          }
        },
        {
          "name": "Flucytosine",
          "normalDose": "25 mg/kg PO q6h",
          "renalDose": [
            { "min": 41, "max": 999, "dose": "No dosage adjustment" },
            { "min": 21, "max": 40, "dose": "25 mg/kg q12h" },
            { "min": 10, "max": 20, "dose": "25 mg/kg q24h" },
            { "min": 0, "max": 9, "dose": "25 mg/kg q48h" }
          ],
          "dialysis": {
            "HD": "25-50 mg/kg q48-72h (AD)",
            "CAPD": "CCPD: 25 mg/kg q24h",
            "CRRT": "No data",
            "SLED": "No data"
          }
        }
      ]
    }
  ]
  ;
