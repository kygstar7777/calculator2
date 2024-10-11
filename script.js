document.getElementById('calculateButton').addEventListener('click', calculate);

function calculate() {
    const initialInvestment = parseFloat(document.getElementById('initialInvestment').value) * 10000;
    const dividendRate = parseFloat(document.getElementById('dividendRate').value) / 100;
    const dividendGrowthRate = parseFloat(document.getElementById('dividendGrowthRate').value) / 100;
    const stockGrowthRate = parseFloat(document.getElementById('stockGrowthRate').value) / 100;
    const monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value) * 10000;
    const monthlyInvestmentGrowth = parseFloat(document.getElementById('monthlyInvestmentGrowth').value) / 100;
    const dividendReinvestmentRate = parseFloat(document.getElementById('dividendReinvestmentRate').value) / 100;
    const dividendTaxRate = parseFloat(document.getElementById('dividendTaxRate').value) / 100;
    const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100;
    const targetMonthlyDividend = parseFloat(document.getElementById('targetMonthlyDividend').value) * 10000;

    let totalInvestment = initialInvestment;
    let year = 1;
    let results = `<h3>계산 결과</h3>`;
    results += `<p>초기 투자금액: ${initialInvestment / 10000} 만 원</p>`;

    while (true) {
        const annualDividend = (totalInvestment * dividendRate + monthlyInvestment * 12 * dividendRate);
        const afterTaxDividend = annualDividend * (1 - dividendTaxRate);
        const adjustedDividend = afterTaxDividend * (1 - inflationRate);
        
        results += `<h4>${year}년차:</h4>`;
        results += `<p>연 배당금: ${(annualDividend / 10000).toFixed(2)} 만 원</p>`;
        results += `<p>세후 배당금: ${(afterTaxDividend / 10000).toFixed(2)} 만 원</p>`;
        results += `<p>인플레이션 반영 후 배당금: ${(adjustedDividend / 10000).toFixed(2)} 만 원</p>`;
        
        if (adjustedDividend / 12 >= targetMonthlyDividend / 10000) {
            results += `<p>목표 월 배당금 ${targetMonthlyDividend / 10000} 만 원 달성!</p>`;
            break;
        }

        totalInvestment += (monthlyInvestment * 12) + adjustedDividend;
        totalInvestment *= (1 + stockGrowthRate); // 주가 상승률 반영
        monthlyInvestment *= (1 + monthlyInvestmentGrowth); // 월 배당 투자금 증가율 반영
        results += `<p>총 투자금액: ${(totalInvestment / 10000).toFixed(2)} 만 원</p>`;

        dividendRate *= (1 + dividendGrowthRate); // 배당 성장률 반영
        year++;
    }

    document.getElementById('results').innerHTML = results;
}
