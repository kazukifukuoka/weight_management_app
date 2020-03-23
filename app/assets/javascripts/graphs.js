document.addEventListener('turbolinks:load', () => {

  // 棒グラフ
    const TODAY = new Date(new Date().setHours(0, 0, 0, 0))
    const A_MONTH_AGO = new Date(TODAY.getFullYear(), TODAY.getMonth() - 1, TODAY.getDate())

    // 選択できない日付データ
    const DISABLE_DATES = ['2020-03-10']

    // カレンダーの日本語化
    flatpickr.localize(flatpickr.l10ns.ja)

    // カレンダーの表示
    flatpickr('#date-form', {
        // スマートフォンでもカレンダーに「flatpickr」を使用
        disableMobile: true,
        // 1ヶ月前から本日まで選択可
        minDate: A_MONTH_AGO,
        maxDate: TODAY,
        // 選択できない日付
        disable: DISABLE_DATES
    })


    // 棒グラフのデータ
    let barLabel = ['1月', '2月', '3月', '4月', '5月', '6月']
    let barData = [5, 4, 2, 6, 5, 8]

    // 棒グラフのオプション

    const barChartData = {
        labels: barLabel,
        datasets: [{
            label: '得点',
            data: barData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    }

    const barChartOption = {
        title: {
            display: true,
            text: '棒グラフ'
        },
        scales: {
            yAxes: [{
                ticks: {
                    // y軸のメモリを 0 からスタートに強制
                    beginAtZero: true
                }
            }]
        }
    }

    // 棒グラフを表示
    const barChartContext = document.getElementById("bar-chart").getContext('2d')
    new Chart(barChartContext, {
        type: 'bar',
        data: barChartData,
        options: barChartOption
    })

    // 折れ線グラフ
    let lineLabel = gon.chart_label
    let lineData = gon.chart_data

    // 折れ線グラフのオプション

    const lineChartData = {
        labels: lineLabel,
        datasets: [{
            label: '体重(kg)',
            data: lineData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            spanGaps: true
        }]
    }

    const lineChartOption = {
        title: {
            display: true,
            text: '折れ線グラフ'
        },
        tooltips: {
            callbacks: {
                // ホバー（スマホならタップ）時のラベル表示を変更
                title: function (tooltipItems) {
                    return tooltipItems[0].xLabel.replace(/^(\d+).(\d+)$/, ' $1 月 $2 日')
                },
                label: function (tooltipItem) {
                    return '体重: ' + tooltipItem.yLabel + 'kg'
                }
            }
        }
    }

    // 折れ線グラフを表示
    const lineChartContext = document.getElementById("line-chart").getContext('2d')
    new Chart(lineChartContext, {
        type: 'line',
        data: lineChartData,
        options: lineChartOption
    })
  })