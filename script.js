document.getElementById("calculateButton").addEventListener("click", function() {
    const investmentAmount = parseFloat(document.getElementById("investmentAmount").value);
    const monthlyDividendInvestment = parseFloat(document.getElementById("monthlyDividendInvestment").value);
    const dividendYield = parseFloat(document.getElementById("dividendYield").value) / 100; // 배당률을 소수로 변환
    const dividendGrowthRate = parseFloat(document.getElementById("dividendGrowthRate").value) / 100; // 배당 성장률을 소수로 변환
    const stockGrowthRate = parseFloat(document.getElementById("stockGrowthRate").value) / 100; // 주가 상승률을 소수로 변환
    const dividendReinvestmentRate = parseFloat(document.getElementById("dividendReinvestmentRate").value) / 100; // 재투자율을 소수로 변환
    const dividendTaxRate = parseFloat(document.getElementById("dividendTaxRate").value) / 100; // 배당세율을 소수로 변환
    const inflationRate = parseFloat(document.getElementById("inflationRate").value) / 100; // 인플레이션 반영률을 소수로 변환
    const targetMonthlyDividend = parseFloat(document.getElementById("targetMonthlyDividend").value); // 목표 월 배당금

    // 다음 해의 배당금 계산
    const nextYearDividend = (investmentAmount * dividendYield + monthlyDividendInvestment * dividendYield) * (1 + dividendGrowthRate);
    document.getElementById("nextYearDividend").innerText = nextYearDividend.toFixed(2);

    // 세후 배당금 계산
    const afterTaxDividend = nextYearDividend * (1 - dividendTaxRate);
    document.getElementById("afterTaxDividend").innerText = afterTaxDividend.toFixed(2);

    // 인플레이션 반영 후 배당금 가치 계산
    const realValueAfterInflation = afterTaxDividend / (1 + inflationRate);
    document.getElementById("realValueAfterInflation").innerText = realValueAfterInflation.toFixed(2);

    // 재투자된 배당금 계산
    const reinvestedDividends = afterTaxDividend * dividendReinvestmentRate;
    document.getElementById("reinvestedDividends").innerText = reinvestedDividends.toFixed(2);

    // 총 자산 증가 계산
    const totalAssetsIncrease = investmentAmount * (1 + stockGrowthRate) + monthlyDividendInvestment * (1 + stockGrowthRate);
    document.getElementById("totalAssetsIncrease").innerText = totalAssetsIncrease.toFixed(2);

    // 목표 달성까지 걸리는 년수 계산
    let currentMonthlyDividend = afterTaxDividend;
    let years = 0;

    while (currentMonthlyDividend < targetMonthlyDividend) {
        // 다음 해의 배당금 계산
        const nextYearDividend = (investmentAmount * dividendYield + monthlyDividendInvestment * dividendYield) * (1 + dividendGrowthRate);
        const afterTaxDividend = nextYearDividend * (1 - dividendTaxRate);
        
        // 재투자된 배당금 계산
        const reinvestedDividends = afterTaxDividend * dividendReinvestmentRate;

        // 총 자산 증가 계산
        investmentAmount *= (1 + stockGrowthRate);
        investmentAmount += reinvestedDividends + monthlyDividendInvestment * 12 * (1 + stockGrowthRate);

        // 월 배당금 업데이트
        currentMonthlyDividend = (investmentAmount * dividendYield + monthlyDividendInvestment * dividendYield) * (1 - dividendTaxRate);
        
        // 연도 증가
        years++;
    }

    document.getElementById("yearsToTarget").innerText = years;
});
