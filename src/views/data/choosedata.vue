<template>
	<div >

		<el-row align="center" type="flex" justify="center" :gutter="2">
			<el-col :span="8">
				<el-select style='width:90%' v-model="chooseData.projectId" placeholder="请选择指定项目">
					<el-option v-for="item in optionsProjects" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-col>

			<el-col :span="8">
				<el-select style='width:90%' v-model="chooseData.timeId" placeholder="请选择您所想分析的数据">
					<el-option v-for="item in optionsTimes" :key="item.value" :label="'第 '+item.label+' 次导入 2021-02-08 17:41:16'"
					 :value="item.value">
					</el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row type="flex" justify="center">
			<el-col :span="3">
				<el-button style='width:90%' @click='nextStep' type="primary" size="medium">NEXT</el-button>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				optionsProjects: [{
					"label": "2021年度各项目采购计划",
					"value": '1'
				}],
				optionsTimes: [{
					"label": "1",
					"value": '1'
				}],
				chooseData: {
					timeId: '',
					projectId: ''
				}
			}
		},
		methods: {
			nextStep() {
				localStorage.setItem('choosedata', JSON.stringify(this.chooseData))
				this.$router.push({name:'label'})
			},
	 
		}, 
		created() {
			var choosedata = JSON.parse(localStorage.getItem('choosedata'))
			if (choosedata !== null) {
				this.chooseData = choosedata
			}
		}


	}
</script>

<style>
	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}
</style>
