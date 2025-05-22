(function(){
    const form = document.getElementById('taxForm');
    const resultDiv = document.getElementById('result');
    const abnSection = document.getElementById('abnSection');
    const hasAbnRadios = document.querySelectorAll('input[name="has_abn"]');

    function toggleAbnSection() {
        const hasAbn = document.querySelector('input[name="has_abn"]:checked').value === 'Oui';
        abnSection.style.display = hasAbn ? 'block' : 'none';
    }

    hasAbnRadios.forEach(r => r.addEventListener('change', toggleAbnSection));
    toggleAbnSection();

    function formatMoney(value) {
        return value.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' $AUD';
    }

    form.addEventListener('submit', function(event){
        event.preventDefault();

        const incomeTFN = parseFloat(document.getElementById('income_tfn').value) || 0;
        const hasABN = document.querySelector('input[name="has_abn"]:checked').value === 'Oui';
        const incomeABN = hasABN ? (parseFloat(document.getElementById('income_abn').value) || 0) : 0;
        const hasTFN = document.querySelector('input[name="has_tfn"]:checked').value === 'Oui';
        const months = parseInt(document.getElementById('months').value, 10) || 0;
        const residency = document.getElementById('residency_status').value;

        // Withheld tax
        const withheldTFN = hasTFN ? incomeTFN * 0.15 : incomeTFN * 0.45;

        // Expected tax
        let expectedTax = 0;
        const resident = residency === 'resident';
        if(resident){
            const threshold = 18200;
            const taxable = Math.max(0, incomeTFN - threshold);
            expectedTax = taxable * 0.19;
        } else {
            expectedTax = incomeTFN * 0.325;
        }

        const refund = withheldTFN - expectedTax;

        let output = `<p>Impôts prélevés via TFN: <strong>${formatMoney(withheldTFN)}</strong></p>`;
        output += `<p>Impôts attendus selon ton statut: <strong>${formatMoney(expectedTax)}</strong></p>`;
        output += `<p><strong>${refund >= 0 ? 'Remboursement estimé' : 'Montant dû' } : ${formatMoney(Math.abs(refund))}</strong></p>`;

        if(hasABN && incomeABN > 0){
            output += `<p class="warning">Attention: tu pourrais devoir environ 19–32% d'impôts sur ton revenu ABN de ${formatMoney(incomeABN)}.</p>`;
        }

        resultDiv.innerHTML = output;
        resultDiv.className = refund >= 0 ? 'positive' : 'negative';
        resultDiv.style.display = 'block';
    });
})();
