<template>
  <div ref="chart" style="width: 100%; height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'EChartsComponent',
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart);
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
          },
        },
        toolbox: {
          show:false,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          bottom: 10,
          
          data: ['Evaporation', 'Precipitation', 'Precipitations', 'Temperature', 'Temperature2'],
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisPointer: {
              type: 'shadow',
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 120,
            interval: 20,
            axisLabel: {
              formatter: '{value}',
            },
          },
          {
            type: 'value',
            min: 0,
            max: 180,
            interval: 30,
            axisLabel: {
              formatter: '{value}',
            },
          },
        ],
        series: [
          {
            barWidth: '16px',
            name: 'Evaporation',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' ml';
              },
            },
            color: ['#81E2FF'],
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
            ],
            yAxisIndex: 0,
          },
          {
            barWidth: '16px',

            name: 'Precipitation',
            type: 'bar',
            color: ['#246EFF'],
            tooltip: {
              valueFormatter: function (value) {
                return value + ' ml';
              },
            },
            yAxisIndex: 0,
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
            ],
          },
          {
            barWidth: '16px',

            name: 'Precipitations',
            type: 'bar',
            color: ['#00B2FF'],
            yAxisIndex: 0,
            tooltip: {
              valueFormatter: function (value) {
                return value + ' ml';
              },
            },
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 182.2, 48.7, 18.8, 6.0, 2.3,
            ],
          },
          {
            name: 'Temperature',
            type: 'line',
            smooth: true,

            color: ['#A8DB39'],
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + ' °C';
              },
            },
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
          },
          {
            name: 'Temperature2',
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            color: ['#F77E45'],
            tooltip: {
              valueFormatter: function (value) {
                return value + ' °C';
              },
            },
            data: [2.4, 2.5, 3.6, 4, 8.3, 15.2, 80.3, 30.4, 43.0, 66.5, 62.0, 6.2],
          },
        ],
      };

      this.chart.setOption(option);
    },
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
};
</script>

<style scoped>
/* Add any styles you need for your component here */
</style>
