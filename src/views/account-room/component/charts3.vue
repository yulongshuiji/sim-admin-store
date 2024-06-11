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
          show: false,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          bottom: 10,

          data: ['Temperature', 'Temperature2'],
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
            name: 'Temperature',
            type: 'line',
            smooth: true,

            color: ['#3469FF'],
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + ' °C';
              },
            },
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0.5547,
                  color: 'rgba(100, 162, 255, 0.12)'
                },
                {
                  offset: 1,
                  color: 'rgba(52, 105, 255, 0.00)'
                }
              ])
            },
          },
          {
            name: 'Temperature2',
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            color: ['#FF7D00'],
            tooltip: {
              valueFormatter: function (value) {
                return value + ' °C';
              },
            },
            data: [2.4, 2.5, 3.6, 4, 8.3, 15.2, 80.3, 30.4, 43.0, 66.5, 62.0, 6.2],
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0.5547,
                  color: 'rgba(255, 211, 100, 0.12)'
                },
                {
                  offset: 1,
                  color: 'rgba(255, 235, 52, 0.00)'
                }
              ])
            }
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
