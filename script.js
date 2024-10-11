document.getElementById("calculateButton").onclick = function() {
    const initialInvestment = parseFloat(document.getElementById("initialInvestment").value) * 10000;
    const dividendYield = parseFloat(document.getElementById("dividendYield").value) / 100;
    const dividendGrowthRate = parseFloat(document.getElementById("dividendGrowthRate").value) / 100;
    const stockGrowthRate = parseFloat(document.getElementById("stockGrowthRate").value) / 100;
    let monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value) * 10000;
    const monthlyInvestmentIncreaseRate = parseFloat(document.getElementById("monthlyInvestmentIncreaseRate").value) / 100;
    const dividendReinvestmentRate = parseFloat(document.getElementById("dividendReinvestmentRate").value) / 100;
    const dividendTaxRate = parseFloat(document.getElementById("dividendTaxRate").value) / 100;
    const inflationRate = parseFloat(document.getElementById("inflationRate").value) / 100;
    const targetMonthlyDividend = parseFloat(document.getElementById("targetMonthlyDividend").value) * 10000;

    let totalInvestment = initialInvestment;
    let totalDividend = 0;
    let year = 0;
    let results = "<table><tr><th>연차</th><th>연초 배당금</th><th>연말 보유 자산</th><th>누적 투자 원금</th><th>누적 재투자 배당금</th></tr>";

    while (true) {
        year++;

        // 1년차 배당금 계산
        const annualDividend = (totalInvestment * dividendYield) + (monthlyInvestment * 12 * dividendYield);
        const afterTaxDividend = annualDividend * (1 - dividendTaxRate);
        const realDividend = afterTaxDividend * (1 - inflationRate);
        totalDividend += realDividend;

        // 총 투자금액 업데이트
        totalInvestment += (monthlyInvestment * 12 * dividendReinvestmentRate) + realDividend;

        // 다음 연도 배당금 성장률 반영
        totalInvestment *= (1 + stockGrowthRate); // 주가 상승률 반영
        
        // 월 배당금
        const monthlyDividend = (totalInvestment * dividendYield) / 12;

        // 결과 기록
        results += `<tr>
                        <td>${year} 년</td>
                        <td>${(monthlyDividend * 12 / 10000).toFixed(2)} 만 원</td>
                        <td>${(totalInvestment / 10000).toFixed(2)} 만 원</td>
                        <td>${((monthlyInvestment * 12 * year) / 10000).toFixed(2)} 만 원</td>
                        <td>${(totalDividend / 10000).toFixed(2)} 만 원</td>
                    </tr>`;

        // 목표 월 배당금 도달 여부 확인
        if (monthlyDividend >= targetMonthlyDividend) {
            break;
        }

        // 월 배당 투자금 증가율 반영
        monthlyInvestment *= (1 + monthlyInvestmentIncreaseRate);
    }

    // 결과 출력
    results += `</table><br>목표 월 배당금 (${(targetMonthlyDividend / 10000).toFixed(2)} 만원) 달성까지 ${year}년이 소요됩니다.🔥`;
    document.getElementById("result").innerHTML = results;
};
