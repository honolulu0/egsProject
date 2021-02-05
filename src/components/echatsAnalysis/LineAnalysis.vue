<template>
	<el-card class="box-card">
		<el-scrollbar style="height:100%">

			<div ref="lineAnalysis"  style="height:800px; width: 100%;"></div>

		</el-scrollbar>
	</el-card>
</template>

<script>
	import echarts from 'echarts'
	export default {
		name: 'LineAnalysis',
		props: ['data', 'lineConfig'],
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
				var titles = this.lineConfig.titles
				var nameX = this.lineConfig.nameX

				var colors = ['#5793f3', '#d14a61', '#675bba',
					'#0780cf ', '#fa6d1d ', '#ac2026 ', '#701866 ', '#d22e8d ',
					'#FE8463', '#a195c5 ', '#FAD860', '#F3A43B', '#60C0DD',
					'#D7504B', '#a195c5  ', '#F4E001', '#F0805A', '#63b2ee',
					'#0780cf ', '#fa6d1d ', '#ac2026 ', '#701866 ', '#d22e8d ',
					'#FE8463', '#a195c5 ', '#FAD860', '#F3A43B', '#60C0DD',
					'#D7504B', '#a195c5  ', '#F4E001', '#F0805A', '#63b2ee',
					'#0780cf ', '#fa6d1d ', '#ac2026 ', '#701866 ', '#d22e8d ',
					'#FE8463', '#a195c5 ', '#FAD860', '#F3A43B', '#60C0DD',
					'#D7504B', '#a195c5  ', '#F4E001', '#F0805A', '#63b2ee'

				];
				var axisX = []
				var axisY = [] //占位空的
				var dataY = []

				for (var i = 0; i < titles.length; i++) {
					dataY.push({
						name: '类名',
						type: 'line',
						data: [],
					})
					dataY[i].name = titles[i]
					dataY[i].data = []
				}
				val.forEach((temp) => {
					axisX.push(temp[nameX])
					for (var i = 0; i < titles.length; i++) {
						dataY[i].data.push(temp[titles[i]])
					}
				})

				this.myChart = echarts.init(this.$refs.lineAnalysis);
				this.myChart.setOption(this.configLine(colors, titles, axisX, axisY, dataY));
				this.myChart.on("click", (params) => {
					// this.partName=params.name
					this.$emit('partNameChange',params.name)
				})
			},
			configLine(colors, titles, axisX, axisY, dataY) {

				var option = {
					title: {
						text: this.lineConfig.titleLocation
					},
					dataZoom: [{
							show: true,
							realtime: true,
							start: 0,
							end: 50
						},
						{
							type: 'inside',
							realtime: true,
							start: 0,
							end: 50
						}
					],
					tooltip: {
						trigger: 'axis',
						// formatter(params) { 
						// 	var a=''
						// 	for (let x in params) {
						// 		a= a+ '</br>'+params[x].color + ":" +params[x].name + ":" + params[x].value  ;
						// 	} 
						// 	return a
						// }
					},
					legend: {
						data: titles
					},
					grid: {
						left: '1%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: axisX,
						axisLabel: {
							interval: 0,
							rotate: 270,
							formatter: function(value) { //关键代码
								var res = value
								if (res.length > 7) {
									res = res.substring(0, 6) + '..'
								}
								return res
							},
						},

					},
					yAxis: {
						type: 'value'
					},
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
