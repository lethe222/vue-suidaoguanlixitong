/* ECharts图标库 */
import * as echarts from 'echarts'
//引入地图
import beijing from '@/assets/json/province/beijing.json'
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
          data: ['隧道完成进度(%)', '安全检测合格率(%)', '质量评分'],
        },
        grid: {
          // 为顶部图例留出空间，避免被压住
          top: '12%',
          left: '2%',
          right: '3%',
          bottom: '8%',
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
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月',
          ],
        },
        yAxis: {
          type: 'value',
        },
        series: data.map((item) => ({
          ...item,
          lineStyle: { width: 2 },
          smooth: true,
        })),
      }
      myChart.setOption(option)
      // 监听窗口大小变化，自动调整图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }

    // 注入一个全局可用的 $radar() 方法
    app.config.globalProperties.$radar = (element, data) => {
      /* 加载echarts图表 */
      var myChart = echarts.init(document.getElementById(element))
      const option = {
        legend: {
          data: ['京沈高铁隧道群', '南北交通隧道', '城市地铁5号线'],
        },
        radar: {
          indicator: [
            { name: '工程进度', max: 100 },
            { name: '安全系数', max: 100 },
            { name: '质量评分', max: 100 },
            { name: '成本控制', max: 100 },
            { name: '进度把控', max: 100 },
            { name: '环保达标', max: 100 },
            { name: '团队效率', max: 100 },
          ],
        },
        series: [
          {
            name: '项目表现',
            type: 'radar',
            data: data,
          },
        ],
      }
      myChart.setOption(option)
      // 监听窗口大小变化，自动调整图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }

    // 注入一个全局可用的 $piechart() 方法
    app.config.globalProperties.$piechart = (element, data) => {
      var myChart = echarts.init(document.getElementById(element))
      const option = {
        legend: {
          top: 'bottom',
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: '隧道施工状态分布',
            type: 'pie',
            radius: [40, 140],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8,
            },
            label: {
              show: true,
              position: 'outside',
            },
            labelLine: {
              show: true,
              length: 4, // 第一段引导线长度
              length2: 5, // 第二段引导线长度
              lineStyle: {
                width: 2, // 引导线宽度
              },
            },
            data: data,
          },
        ],
      }
      myChart.setOption(option)
      // 监听窗口大小变化，自动调整图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }

    // 注入一个全局可用的 $barchart() 方法
    app.config.globalProperties.$barchart = (element, data) => {
      var myChart = echarts.init(document.getElementById(element))
      const option = {
        xAxis: {
          type: 'category',
          data: [
            '隧道1',
            '隧道2',
            '隧道3',
            '隧道4',
            '隧道5',
            '隧道6',
            '隧道7',
            '隧道8',
            '隧道9',
            '隧道10',
            '隧道11',
            '隧道12',
          ],
        },
        yAxis: {
          type: 'value',
          name: '完成度(%)',
        },
        series: [
          {
            data: data,
            type: 'bar',
            name: '隧道完成进度',
          },
        ],
      }
      myChart.setOption(option)
      // 监听窗口大小变化，自动调整图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
    // 注入一个全局可用的 $beijing() 方法
    app.config.globalProperties.$beijing = (element, data) => {
      var myChart = echarts.init(document.getElementById(element))
      //注册地图
      echarts.registerMap('beijing', beijing)

      const option = {
        //鼠标点击弹窗
        tooltip: {
          triggerOn: 'click', //点击触发
          enterable: true, //是否出现弹框
          formatter: '{b}: {c}个隧道',
        },
        visualMap: {
          orient: 'vertical',
          type: 'piecewise',
          left: 'left',
          top: 'bottom',
          pieces: [
            { min: 60, color: '#1a53ff' }, // 深蓝 - 隧道最多
            { min: 40, max: 60, color: '#3d7eff' }, // 蓝色
            { min: 30, max: 40, color: '#5fa3ff' }, // 浅蓝
            { min: 20, max: 30, color: '#91c7ff' }, // 淡蓝
            { min: 10, max: 20, color: '#c2e0ff' }, // 很淡蓝
            { max: 10, color: '#e3f2ff' }, // 最淡蓝
          ],
          textStyle: {
            color: '#333',
          },
        },
        series: [
          {
            name: '北京地图',
            type: 'map',
            map: 'beijing',
            roam: true, //鼠标滚轮是否可以缩放
            zoom: 1.2, //默认地图倍数
            label: {
              show: true, //是否显示地图上的文本信息
              fontSize: 10,
              color: '#333',
            },
            itemStyle: {
              areaColor: '#f0f5ff',
              borderColor: '#4a90e2',
              borderWidth: 1,
            },
            emphasis: {
              label: {
                color: '#fff',
              },
              itemStyle: {
                areaColor: '#ffc107',
              },
            },
            data: data,
          },
        ],
      }
      myChart.setOption(option)
      // 监听窗口大小变化，自动调整图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
  },
}
