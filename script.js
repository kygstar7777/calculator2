function calculate() {
    // 입력값 가져오기
    const investmentAmount = document.getElementById("investmentAmount").value * 10000; // 만 원
    const dividendYield = document.getElementById("dividendYield").value / 100; // 비율
    const dividendGrowthRate = document.getElementById("dividendGrowthRate").value / 100; // 비율
    const stockGrowthRate = document.getElementById("stockGrowthRate").value / 100; // 비율
    const monthlyDividendInvestment = document.getElementById("monthlyDividendInvestment").value * 10000; // 만 원
    const monthlyDividendIncreaseRate = document.getElementById("monthlyDividendIncreaseRate").value / 100; // 비율
    const dividendReinvestmentRate = document.getElementById("dividendReinvestmentRate").value / 100; // 비율
    const dividendTaxRate = document.getElementById("dividendTaxRate").value / 100; // 비율
    const inflationRate = document.getElementById("inflationRate").value / 100; // 비율
    const targetMonthlyDividend = document.getElementById("targetMonthlyDividend").value * 10000; // 만 원
    
    // 목표 연 배당금 계산
    const targetAnnualDividend = targetMonthlyDividend * 12; // 목표 연 배당금

    // 다음 해의 배당금 계산
    let nextYearDividend = (investmentAmount * dividendYield + monthlyDividendInvestment * dividendYield) * (1 + dividendGrowthRate);

    // 세후 배당금 계산
    let afterTaxDividend = nextYearDividend * (1 - dividendTaxRate);

    // 인플레이션 반영 후 배당금 가치 계산
    let realValueAfterInflation = afterTaxDividend / (1 + inflationRate) || afterTaxDividend;

    // 재투자된 배당금 계산
    let reinvestedDividends = afterTaxDividend * dividendReinvestmentRate;

    // 총 자산 증가 계산
    let totalAssetsIncrease = investmentAmount * (1 + stockGrowthRate) + (monthlyDividendInvestment * 12 * (1 + stockGrowthRate));

    // 목표 달성까지 걸리는 년수 및 연 배당금액 계산
    let years = 0;
    let currentAnnualDividend = afterTaxDividend;

    while (currentAnnualDividend < targetAnnualDividend) {
        // 다음 해의 배당금 계산
        nextYearDividend = (investmentAmount * dividendYield + monthlyDividendInvestment * dividendYield) * (1 + dividendGrowthRate);
        afterTaxDividend = nextYearDividend * (1 - dividendTaxRate);
        
        // 재투자된 배당금 계산
        reinvestedDividends = afterTaxDividend * dividendReinvestmentRate;

        // 자산 증가 계산
        investmentAmount = investmentAmount * (1 + stockGrowthRate) + reinvestedDividends + (monthlyDividendInvestment * 12);
        
        // 연간 배당금 업데이트
        currentAnnualDividend = afterTaxDividend;

        // 연도 증가
        years++;
    }

    // 결과 출력
    document.getElementById("nextYearDividend").innerText = "다음 해의 배당금: " + nextYearDividend.toFixed(2) + " 원";
    document.getElementById("afterTaxDividend").innerText = "세후 배당금: " + afterTaxDividend.toFixed(2) + " 원";
    document.getElementById("realValueAfterInflation").innerText = "인플레이션 반영 후 배당금 가치: " + realValueAfterInflation.toFixed(2) + " 원";
    document.getElementById("reinvestedDividends").innerText = "재투자된 배당금: " + reinvestedDividends.toFixed(2) + " 원";
    document.getElementById("totalAssetsIncrease").innerText = "총 자산 증가: " + totalAssetsIncrease.toFixed(2) + " 원";
    document.getElementById("yearsToGoal").innerText = "목표 달성까지 걸리는 년수: " + years + " 년";
    document.getElementById("finalAnnualDividend").innerText = "목표 달성 시 연 배당금액: " + currentAnnualDividend.toFixed(2) + " 원";
}
