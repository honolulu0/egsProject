<template>
	<!-- <SqlCombination></SqlCombination> -->
	<el-container>
		<el-header>
			<span style="margin-left:20px;">
				<img ref='logo_bigdata' src="../assets/image/bigdata.png" width="35px;" />
				<img src="../assets/image/dataanalysis.png" width="200px;" style="margin-left:20px;" />
			</span>
		</el-header>
		<el-container>
			<el-aside width="auto">
				<MenuTree></MenuTree>
			</el-aside>
			<el-main v-loading="loading">

				<router-view />

			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	// import SqlCombination from './SqlCombination.vue'
	import MenuTree from '../components/MenuTree.vue'
	export default {
		data() {
			return {
				loading: false,
			}
		},
		components: {
			MenuTree
		},
		watch: {
			$route(to, from) {
				this.loading = true
			}
		},
		methods: {
			//旋转图片角度
			rotate() {
				var rotateval = 0
				var img = this.$refs.logo_bigdata
				setInterval(() => {
					rotateval === 360 ? rotateval = 0 : rotateval += 1;
					img.style.transform = 'rotate(' + rotateval + 'deg)'
					img.style.transition = '0.1s linear'
				}, 100)
			},



		},
		mounted: function() {
			this.rotate()
		},
		updated: function() {
			this.loading = false
		}
	}
</script>

<style>
	.el-header {
		background-color: #001529;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
		font-size: 19px;
		padding-left: 0px;
	}

	.el-aside {
		background-color: #001529;
	}

	.el-main {
		background-color: #f9faff;
		text-align: center;
	}

	.el-container {
		height: 100%;
	}
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	
	.clearfix:after {
		clear: both
	}
	
	.clearfix span {
		float: left;
	 }
	 .box-card {
	 	margin-bottom: 20px;
	 }
	 .text {
	 	font-size: 14px;
	 }
	 
	 .item {
	 	margin-bottom: 18px;
	 }
	 
	 .text.item {
	 	min-height: 100px;
	 }
</style>
