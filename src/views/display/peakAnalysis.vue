<template>
	<div>
		<el-row type="flex" justify="center" class="row-bg">
			<el-col>
				<PieAnalysis @locationChange='locationChange' :pieConfig='pieConfig' :dataPie='resPie'></PieAnalysis>
			</el-col>
		</el-row>
		<el-row type="flex" justify="center" class="row-bg">
			<el-col>
				<LineAnalysis @partNameChange='partNameChange' :lineConfig='lineConfig' :data='res'></LineAnalysis>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import LineAnalysis from '../../components/echatsAnalysis/LineAnalysis.vue'
	import PieAnalysis from '../../components/echatsAnalysis/PieAnalysis.vue'
	import {
		SHARED_PEAK_GROUPBY_PARTNAME_DESC_COST,
		LOCATION_TOTAL
	} from '../../constant/sqlConstant.js'
	export default {
		data() {
			return {
				options_record_SQL: '',
				checked_record_SQL: '',
				res: {},
				resPie: {},
				lineConfig:{
					titleLocation: 'All Location',
					titles:['Peak', 'SharedQtyTotal'],
					nameX:'PartName'
				},
				pieConfig:{
					titles:['Location', 'Total'],
					titleName: 'Location',
				},
				partName:''
			}
		},
		components: {
			LineAnalysis,
			PieAnalysis
		},
		methods: {
			partNameChange(partName){
				// console.log(partName)
				this.partName=partName
			},
			locationChange(location) {
				console.log('egs_all.11= ' + location)
				this.submitSql(this.strSql(location), 0)
			},
			change_record_SQL() {
				if (null != this.checked_record_SQL && '' != this.checked_record_SQL) {
					this.submitSql(this.checked_record_SQL)
				}
			},
			submitSql(textarea_SET_SQL, type) {

				this.$api.executeSQL({
					'sql': textarea_SET_SQL
				}).then(res => {
					if (res.code == 1) {
						// this.options_FieldName = res.data
						//this.successMessage('查询成功')
						if (res.data.length > 0) {
							// this.tableHead = Object.keys(res.data[0])
							// this.tableData = res.data
							// this.additionTableData()
							if (type === 0) {
								this.res = res.data
							} else {
								this.resPie = res.data
							}


						}
					} else {
						this.warningMessage('查询失败 code ' + res.code)
					}

					// 执行某些操作      
				}).catch(err => {
					// 错误
					this.warningMessage('查询失败')
				})
			},

			successMessage(message) {
				this.$message({
					message: message,
					type: 'success'
				});
			},

			warningMessage(message) {
				this.$message({
					message: message,
					type: 'warning'
				});
			},
			strSql(locationStr) {

				locationStr !== '' ? this.lineConfig.titleLocation = locationStr : this.lineConfig.titleLocation = 'All Location'

				return locationStr !== '' ? SHARED_PEAK_GROUPBY_PARTNAME_DESC_COST.replace('1=1',
					' egs_all.11= "' + locationStr + '"') : SHARED_PEAK_GROUPBY_PARTNAME_DESC_COST
			}
		},
		mounted() { 

			this.submitSql(this.strSql(''), 0)
			this.submitSql(
				LOCATION_TOTAL,
				1)
		}



	}
</script>

<style>
</style>
