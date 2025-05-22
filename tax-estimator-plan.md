# 📄 WHV Tax Refund Estimator Plan

*A simple, French-friendly tool for estimating Australian tax refunds for backpackers on Working Holiday Visas (WHV)*

---

## 🎯 Project Goal

Create a **static HTML/CSS/JS prototype** that:

* Lets WHV users enter their income and residency info
* Estimates their **tax refund** (or amount owed)
* Handles both **TFN (employee)** and **ABN (freelance)** income cases
* Outputs a refund estimate with a clear explanation in **French**
* Works locally in browser — **no hosting or backend needed yet**

---

## 🧑‍💼 Target Audience

* French Working Holiday Visa holders
* Backpackers aged 18–30 working casual or freelance jobs
* People unsure about how Australian taxes work

---

## 🔑 Inputs

All in French, with user-friendly UI:

| Question                          | Input Type                                    | Field ID           |
| --------------------------------- | --------------------------------------------- | ------------------ |
| Revenu TFN (AUD)                  | number input                                  | `income_tfn`       |
| As-tu aussi travaillé en ABN ?    | radio (Oui / Non)                             | `has_abn`          |
| Revenu ABN (AUD)                  | number input (shown only if above is Oui)     | `income_abn`       |
| As-tu un TFN ?                    | radio (Oui / Non)                             | `has_tfn`          |
| Combien de mois as-tu travaillé ? | number input (1–12)                           | `months`           |
| Ton statut fiscal ?               | select: Résident / Non-résident / Je sais pas | `residency_status` |

---

## 🔢 Tax Logic (Simplified)

### TFN Income Calculation

**Tax Withheld:**

```js
let withheld_tfn = has_tfn ? income_tfn * 0.15 : income_tfn * 0.45;
```

**Expected Tax (based on residency):**

```js
if (residency === 'resident') {
  let threshold = 18200;
  let taxable = Math.max(0, income_tfn - threshold);
  expected_tax = taxable * 0.19;
} else {
  expected_tax = income_tfn * 0.325;
}
```

**Refund Estimate:**

```js
let refund = withheld_tfn - expected_tax;
```

### ABN Income Warning Logic

```js
if (has_abn && income_abn > 0) {
  showWarning("Tu pourrais devoir environ 19–32% d'impôts sur ton revenu ABN si tu n’as rien payé.");
}
```

---

## 📋 Output Structure

Display after form submission:

* Estimated refund: `Tu pourrais récupérer environ $X AUD`
* Breakdown: `Tu as payé $Y via TFN, mais tu aurais dû payer $Z`
* ABN warning if needed
* Visual style: green highlight if refund > 0, red if negative

---

## 🖼️ UI Layout Plan

### `index.html`

* Simple French-language form with inputs above
* Submit button: **"Estimer mon remboursement"**
* Hidden `div` for result output, shown after submit

### `style.css`

* Mobile-friendly layout
* Readable fonts and spacing
* Color-coded result output (green = refund, red = warning)

### `script.js`

* Get form values
* Run tax logic based on inputs
* Display output in French
* Show/hide ABN field dynamically

---

## 🧠 Sample Codex Prompts

* "Create an HTML form in French to estimate tax refund with TFN and ABN inputs"
* "Write JavaScript that estimates refund based on TFN income and residency"
* "Show ABN income warning if income\_abn > 0"
* "Style result div as green if refund > 0, red if negative"

---

## 🔍 Testing Scenarios

| TFN Income | ABN Income | TFN? | Residency | Result                           |
| ---------- | ---------- | ---- | --------- | -------------------------------- |
| 22,000     | 0          | Yes  | Resident  | Refund expected                  |
| 10,000     | 6,000      | Yes  | Resident  | Refund + ABN warning             |
| 25,000     | 0          | No   | Non-res   | No refund (taxed at correct 45%) |

---

## 🚫 Not Included in Prototype

* No email capture
* No PDF download
* No hosted version
* No database or analytics

These can come **after** we get the working browser prototype.

---

## ✅ Next Step

Use this document as your reference. Start building in the order:

1. `index.html` form
2. `style.css` layout
3. `script.js` logic
4. Test manually in browser
5. Iterate

Then — share it, test it with real WHV users, and go from there.
