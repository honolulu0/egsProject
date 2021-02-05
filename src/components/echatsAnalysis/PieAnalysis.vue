<template>
	<el-card class="box-card">
		<el-scrollbar style="height:100%">

			<div ref="pieAnalysis" style="height:300px; width: 100%;"></div>

		</el-scrollbar>
	</el-card>
</template>

<script>
	import echarts from 'echarts'
	export default {
		name: 'PieAnalysis',
		props: ['dataPie','pieConfig'],
		data() {
			return {
				myChart: {},
				currentLocation:''
			}
		},
		watch: {
			dataPie: function a(val) {
				this.drowPie(val)
			}
		},
		methods: {
			drowPie(val) {

				var titles = this.pieConfig.titles

				var data = []

				val.forEach((temp) => {

					data.push({
						name: temp[titles[0]],
						value: temp[titles[1]]
					})

				})

				this.myChart = echarts.init(this.$refs.pieAnalysis);
				this.myChart.setOption(this.configPie(data));
				this.myChart.on("click", (params)=> { 
					this.currentLocation=params.name
					this.$emit('locationChange',params.name)
				})
			},
			configPie(data) {

				var option = {
					title: [{
						text:  this.pieConfig.titleName
					}, {
						subtext: this.currentLocation,
						left: '16.67%',
						top: '75%',
						textAlign: 'center'
					}],
					tooltip: {
						trigger: 'item',
						formatter: '{b} : {c} ({d}%)'
					},
					legend: {
						type: 'scroll',
						orient: 'vertical',
						right: 4,
						top: 2,
						bottom: 2,
						data: data.legendData, 
						selected: data.selected
					},
					series: [{
						type: 'pie',
						radius: '70%',
						center: ['35%', '50%'],
						data: data,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
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
