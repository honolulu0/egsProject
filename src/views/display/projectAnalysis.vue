<template>
	<div>
		<el-row type="flex" justify="center" class="row-bg">
			<el-col>
				<PieAnalysis @locationChange='locationChange' :pieConfig='pieConfig' :dataPie='resPie'></PieAnalysis>
			</el-col>
		</el-row>
		<el-row type="flex" justify="center" class="row-bg">
			<el-col>
				<el-card class="box-card">
					{{checkedProject}}
					<div style="color: red;">{{totalCost}}</div>
				</el-card>
			</el-col>
		</el-row>
		<el-row type="flex" justify="center" class="row-bg">
			<el-col>
				<!-- table -->
				<div id='table-id' v-if="tableHead.length>0">

					<el-table style="width: 98.8%; color: red;" :data="tableSumData" :highlight-current-row='true' stripe>
						<el-table-column width="55px" type="index">
							<template>Total</template>
						</el-table-column>
						<el-table-column v-for="(item,index) in tableHead" :key="index" :label="item" :property="item" align="center">
							<template v-if="scope.row[scope.column.property]" slot-scope="scope"> {{scope.row[scope.column.property]}}</template>
						</el-table-column>
					</el-table>
<!-- 					<el-table :height='table_height' :cell-class-name="addClass" :data="tableData" :highlight-current-row='true'
					 stripe>
						<el-table-column type="index">
						</el-table-column>
						<el-table-column v-for="(item,index) in tableHead" :key="index" :label="item" :property="item" align="center">
							<template slot-scope="scope">{{scope.row[scope.column.property]}}</template>
						</el-table-column>
					</el-table> -->
					
					
					<u-table ref="plxTable" :max-height="table_height" use-virtual @table-body-scroll="scroll" border>
						<u-table-column type="index" width="100" fixed />
						<u-table-column v-for="item in columns" :key="item.id" :show-overflow-tooltip="true" :prop="item.prop" :label="item.label"
						 fixed="" />
					</u-table>
					
				</div>
				<div v-else>

				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import arithmetic from '../../utils/math_.js'
	import PieAnalysis from '../../components/echatsAnalysis/PieAnalysis.vue'
	import {
		LOCATION_TEAM_PARTNAME,
		PROJECT_TOTAL
	} from '../../constant/sqlConstant.js'
	export default {
		data() {
			return {
				options_record_SQL: '',
				checked_record_SQL: '',
				res: {},
				resPie: {},
				pieConfig: {
					titles: ['Project', 'Request Total'],
					titleName: 'Project'
				},
				partName: '',
				table_height: '500px',
				tableSumData: [],
				tableHead: [],
				tableData: [],
				columns:[],
				checkedProject: 'All Project',
				totalCost: '',
			}
		},
		components: {
			PieAnalysis
		},
		methods: {
	
			partNameChange(partName) {
				// console.log(partName)
				this.partName = partName
			},
			addClass({
				row,
				column,
				rowIndex,
				columnIndex
			}) {

				if (columnIndex == this.num) {
					return 'resAndSug'
				}
			},
			locationChange(location) {
				this.checkedProject = location


				this.totalCost = ''
				this.submitSql(this.strSql(location), 0)
			},
			change_record_SQL() {
				if (null != this.checked_record_SQL && '' != this.checked_record_SQL) {
					this.submitSql(this.checked_record_SQL)
				}
			},
			tableCreat() {
				setTimeout(() => {
			
					let col = this.tableHead 
					this.columns = Array.from({
						length: col.length
					}, (_, idx) => ({
						prop: col[idx], //数据的key
						id: idx, //索引
						label: col[idx], //列名 
					})) //表头定义 
					this.datas = this.tableData // 知道为啥datas不在 data()方法里面定义吗？嘻嘻
					this.$refs.plxTable.reloadData(this.datas)
				})
			},
			submitSql(textarea_SET_SQL, type) {

				this.$api.executeSQL({
					'sql': textarea_SET_SQL
				}).then(res => {
					if (res.code == 1) {
						// this.options_FieldName = res.data
						//this.successMessage('查询成功')
						if (res.data.length > 0) {
							if (type === 0) {
							 
								if (res.data.length > 0) {
									this.tableHead = Object.keys(res.data[0])
									this.tableData = res.data 
									this.tableCreat()
									this.additionTableData()
								}
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
			additionTableData() {
				//统计各列计算
				var values = Object.values(this.tableData[0])
				var isNumberList = []
				var dataObj = {}
				var sumData = {}
				this.tableSumData = []
				// console.log(isNaN(Number('16,464.00')), Number('16,464.00')) 
				// console.log('isNumberList')
				for (var i = 0; i < values.length; i++) {

					isNaN(Number(values[i])) || values[i] === "" || this.tableHead[i] === "Cost" ? '' : (isNumberList.push(this.tableHead[
						i]), dataObj[this.tableHead[i]] = [])
					sumData[this.tableHead[i]] = ''
					// console.log(values[i],Number(values[i]),isNaN(Number(values[i])))
				}

				// console.log('isNumberList',isNumberList)
				this.tableData.forEach((data) => {
					for (var i = 0; i < isNumberList.length; i++) {
						dataObj[isNumberList[i]].push(data[isNumberList[i]])
					}
				})

				// console.log(dataObj)
				for (var i = 0; i < isNumberList.length; i++) {
					sumData[isNumberList[i]] = arithmetic.formatNumberRgx(arithmetic.add(...dataObj[isNumberList[i]]))
					// eval(dataObj[isNumberList[i]].join("+"))   
					// console.log(isNumberList[i], sumData[isNumberList[i]])
				}

				this.totalCost = " Total Cost:$ " + arithmetic.formatNumberRgx(arithmetic.add(sumData['Dedicated Total Cost'].replace(
					/,/gi, ''), sumData['Shared Total Cost'].replace(/,/gi, '')))

				this.tableSumData = [sumData]
				// console.log(this.tableSumData)
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

				return locationStr !== '' ? LOCATION_TEAM_PARTNAME.replace('1=1',
					' egs_all.3= "' + locationStr + '"') : LOCATION_TEAM_PARTNAME
			}
		},
		mounted() {

			this.submitSql(this.strSql(''), 0)
			this.submitSql(
				PROJECT_TOTAL,
				1)
		}



	}
</script>

<style>
	.plTableBox .el-table .cell.el-tooltip {
		white-space: normal
	}
</style>
