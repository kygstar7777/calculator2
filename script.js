function calculate() {
    // 입력값 가져오기
    const initialInvestment = parseFloat(document.getElementById("initialInvestment").value);
    const dividendYield = parseFloat(document.getElementById("dividendYield").value) / 100;
    const dividendGrowthRate = parseFloat(document.getElementById("dividendGrowthRate").value) / 100;
    const stockGrowthRate = parseFloat(document.getElementById("stockGrowthRate").value) / 100;
    let monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value); // let으로 변경
    const monthlyInvestmentIncreaseRate = parseFloat(document.getElementById("monthlyInvestmentIncreaseRate").value) / 100;
    const dividendTaxRate = parseFloat(document.getElementById("dividendTaxRate").value) / 100;
    const inflationRate = parseFloat(document.getElementById("inflationRate").value) / 100;
    const targetMonthlyDividend = parseFloat(document.getElementById("targetMonthlyDividend").value);
    
    let totalInvestment = initialInvestment; // 총 투자금액 초기화
    let year = 0; // 연도 초기화
    let monthlyDividend = 0; // 월 배당금 초기화

    while (monthlyDividend < targetMonthlyDividend) {
        year++;

        // 초기 투자에서 발생하는 배당금
        const initialDividend = totalInvestment * dividendYield;

        // 월 투자에서 발생하는 배당금
        const monthlyDividendFromInvestment = monthlyInvestment * dividendYield * 12;

        // 총 배당금 계산
        const totalDividend = initialDividend + monthlyDividendFromInvestment;

        // 세후 배당금 계산
        const afterTaxDividend = totalDividend * (1 - dividendTaxRate) * (1 - inflationRate);
        
        // 월 배당금 계산
        monthlyDividend = afterTaxDividend / 12;

        // 총 투자금액 업데이트
        totalInvestment += monthlyInvestment * 12 + afterTaxDividend; // 12개월 후 월 투자금과 배당금을 더함
        
        // 월 배당 투자금 증가
        monthlyInvestment *= (1 + monthlyInvestmentIncreaseRate);
        
        // 총 투자금액에 주가 상승률 적용
        totalInvestment *= (1 + stockGrowthRate); // 주가 상승률 반영

        // 배당금 성장률 적용
        monthlyDividend *= (1 + dividendGrowthRate); // 배당금 성장률 반영
    }

    // 결과 표시
    document.getElementById("result").innerHTML = `목표 월 배당금 ${targetMonthlyDividend}원을 달성하는 데 걸리는 연도: ${year}년`;
}
