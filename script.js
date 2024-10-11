function calculate() {
    const initialInvestment = parseFloat(document.getElementById('initialInvestment').value) * 10000; // 만원 단위로 변환
    const dividendRate = parseFloat(document.getElementById('dividendRate').value) / 100;
    const dividendGrowthRate = parseFloat(document.getElementById('dividendGrowthRate').value) / 100;
    const stockGrowthRate = parseFloat(document.getElementById('stockGrowthRate').value) / 100;
    const monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value) * 10000; // 만원 단위로 변환
    const monthlyInvestmentGrowth = parseFloat(document.getElementById('monthlyInvestmentGrowth').value) / 100;
    const dividendTaxRate = parseFloat(document.getElementById('dividendTaxRate').value) / 100;
    const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100;
    const targetMonthlyDividend = parseFloat(document.getElementById('targetMonthlyDividend').value) * 10000; // 만원 단위로 변환

    let totalInvestment = initialInvestment;
    let year = 0;
    let detailedResults = "";

    while (true) {
        year++;
        
        // 1년차 배당금 계산
        const dividendFromInvestment = totalInvestment * dividendRate;
        const dividendFromMonthlyInvestment = monthlyInvestment * 12 * dividendRate;
        const totalAnnualDividend = dividendFromInvestment + dividendFromMonthlyInvestment;
        
        // 세후 배당금
        const afterTaxDividend = totalAnnualDividend * (1 - dividendTaxRate) * (1 - inflationRate);
        
        // 총 투자금액 업데이트
        totalInvestment += (monthlyInvestment * 12) + afterTaxDividend;

        // 배당금 재투자 후 총 투자금액 반영
        totalInvestment *= (1 + stockGrowthRate); // 주가 상승률 반영

        // 월 배당 투자금 증가
        monthlyInvestment *= (1 + monthlyInvestmentGrowth);

        // 월 배당금 계산
        const monthlyDividend = (totalInvestment * dividendRate) / 12;

        // 결과 기록
        detailedResults += `
            <p>${year}년차: 
            초기 투자금: ${(totalInvestment - (monthlyInvestment * 12) - afterTaxDividend) / 10000} 만원,
            월 배당 투자금: ${(monthlyInvestment / 10000).toFixed(2)} 만원,
            연 배당금: ${totalAnnualDividend.toFixed(2)} 원,
            세후 배당금: ${afterTaxDividend.toFixed(2)} 원,
            총 투자금액: ${(totalInvestment / 10000).toFixed(2)} 만원,
            목표 월 배당금: ${targetMonthlyDividend / 10000} 만원,
            현재 월 배당금: ${monthlyDividend.toFixed(2)} 원
            </p>`;

        // 배당금 목표에 도달했는지 확인
        if (monthlyDividend >= targetMonthlyDividend) {
            document.getElementById('result').innerHTML = `${year}년 후, 월 배당금이 목표인 ${targetMonthlyDividend / 10000}만원을 초과합니다.`;
            break;
        }
    }

    document.getElementById('detailedResults').innerHTML = detailedResults;
}
