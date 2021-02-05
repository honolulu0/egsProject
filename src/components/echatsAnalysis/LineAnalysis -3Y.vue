<template>
	<el-card class="box-card">
		<div ref="lineAnalysis" style="height:560px; "></div>
	</el-card>
</template>

<script>
	import echarts from 'echarts'
	export default {
		name: 'LineAnalysis',
		props: ['data'],
		data() {
			return {
				myChart: {},
			}
		},
		watch: {
			data: function a(val) {
				this.drowLine(val)
			}
		},
		methods: {
			drowLine(val) {
				var colors = ['#5793f3', '#d14a61', '#675bba'];
				var titles = ['Peak', 'Cost', 'SharedQtyTotal']
				var nameX ='PartName'
				var axisX = []
				var axisY = [{
						type: 'value',
						name: titles[0],
						min: 0,
						max: 250,
						position: 'right',
						axisLine: {
							lineStyle: {
								color: colors[0]
							}
						},
						axisLabel: {
							formatter: '{value} 件'
						}
					},
					{
						type: 'value',
						name: titles[1],
						min: 0,
						max: 250,
						position: 'right',
						offset: 80,
						axisLine: {
							lineStyle: {
								color: colors[1]
							}
						},
						axisLabel: {
							formatter: '{value} 元'
						}
					},
					{
						type: 'value',
						name: titles[2],
						min: 0,
						max: 25,
						position: 'left',
						axisLine: {
							lineStyle: {
								color: colors[2]
							}
						},
						axisLabel: {
							formatter: '{value} 件'
						}
					}
				]
				
				var dataY = []
				 
				for (var i = 0; i < titles.length; i++) { 
					dataY.push({
					name: '类名',
					type: 'line',
					data: [2.0, 7.0]
				})
					dataY[i].name = titles[i]
					dataY[i].type = 'line'
					dataY[i].data = []
				} 
				val.forEach((temp) => {
					axisX.push(temp[nameX])
					for (var i = 0; i < titles.length; i++) {
						dataY[i].data.push(temp[titles[i]]) 
					}
				}) 
				
				for (var i = 0; i < titles.length; i++) {
							axisY[i].max=Math.max.apply(null, dataY[i].data)
							axisY[i].min=Math.min.apply(null, dataY[i].data)
							console.log(dataY[i].data.length)
				} 
				
				this.myChart = echarts.init(this.$refs.lineAnalysis);
				this.myChart.setOption(this.configLine(colors, titles, axisX, axisY, dataY));
			},
			configLine(colors, titles, axisX, axisY, dataY) {

				var option = {
					color: colors,

					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						}
					},
					grid: {
						right: '20%'
					},
					toolbox: {
						feature: {
							dataView: {
								show: true,
								readOnly: false
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					legend: {
						data: titles
					},
					xAxis: [{
						type: 'category',
						axisTick: {
							alignWithLabel: true
						},
						data: axisX
					}],
					yAxis: axisY,
					series: dataY
				};

				return option
			}
		},
		mounted() {
			// this.drowLine()
		}

	}
</script>

<style>
</style>
