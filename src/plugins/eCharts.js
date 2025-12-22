/* ECharts图标库 */
import * as echarts from 'echarts'
export default {
  /* echarts挂载到vue全局 */
  install: (app) => {
    // 注入一个全局可用的 $line() 方法
    app.config.globalProperties.$line = (element, data) => {
      /* 加载echarts图表 */
      var myChart = echarts.init(document.getElementById(element))
      /* 图表配置 */
      const option = {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          // 将图例放到顶部居中
          top: 10,
          left: 'center',
          orient: 'horizontal', // 水平排列
          itemGap: 20, // 图例项之间的间距
          data: ['隧道增加数量', '地质预测数量'],
        },
        grid: {
          // 为顶部图例留出空间，避免被压住
          top: '12%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: data,
      }
      myChart.setOption(option)
    }
  },
}
