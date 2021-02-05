<template>
	<div>

		<el-row type="flex" justify="center" class="row-bg">
			<el-col>
				<el-card class="box-card" style="margin-bottom: 0px;">
					<div slot="header" class="clearfix">
						<span>edit formula</span>
						<el-select style='width:60%' class="topSel" @change='change_record_SQL' v-model="checked_record_SQL" placeholder="请选择">
							<el-option v-for="(item,index) in options_record_SQL" :key="index" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
					<div class="text item" style="margin-bottom:0px">
						<el-select style='width:260px' v-model="formula[0].formula_a" placeholder="请选择要计算的列">
							<el-option v-for="(item,index) in tableHead" :key="index" :label="item" :value="item">
							</el-option>
						</el-select>

						<el-select style='width:160px' v-model="formula[0].formula_method" placeholder="请选择计算方式">
							<el-option v-for="(item,index) in calculation_Method" :key="index" :label="item" :value="item">
							</el-option>
						</el-select>

						<el-select style='width:260px' v-model="formula[0].formula_b" placeholder="请选择要计算的列">
							<el-option v-for="(item,index) in tableHead" :key="index" :label="item" :value="item">
							</el-option>
						</el-select>
						<div style="margin-top: 10px;">
							<el-button @click='calculation' type="primary" size="medium">calculation</el-button>
						</div>

					</div>

				</el-card>
			</el-col>
		</el-row>


		<el-row type="flex" justify="center" class="row-bg">
			<el-col>
				<!-- table -->
				<div id='table-id' v-if="tableHead.length>0">

					<el-table style="width: 98.8%; color: red;" :data="tableSumData" :highlight-current-row='true' stripe>
						<el-table-column width="55px"  type="index">
							<template >Total</template>
						</el-table-column>
						<el-table-column v-for="(item,index) in tableHead" :key="index" :label="item" :property="item" align="center">
							<template v-if="scope.row[scope.column.property]" slot-scope="scope"> {{scope.row[scope.column.property]}}</template>
						</el-table-column>
					</el-table>


					<el-table :height='table_height' :cell-class-name="addClass" :data="tableData" :highlight-current-row='true'
					 stripe>
						<el-table-column type="index">
						</el-table-column>
						<el-table-column v-for="(item,index) in tableHead" :key="index" :label="item" :property="item" align="center">
							<template slot-scope="scope">{{scope.row[scope.column.property]}}</template>
						</el-table-column>
					</el-table>
					
				</div>
				<div  v-else>
					No Data
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import arithmetic from '../../utils/math_.js'
	export default {
		data() {
			return {
				calculation_Method: ['+', '-', 'x', '÷'],
				formula: [{
					formula_a: '',
					formula_method: '',
					formula_b: ''
				}],
				table_height: '500px',
				tableSumData: [],
				tableHead: [],
				tableData: [],
				num: 0,
				options_record_SQL: '',
				checked_record_SQL: ''
			}
		},
		methods: {
			change_record_SQL() {
				if (null != this.checked_record_SQL && '' != this.checked_record_SQL) {
					 this.submitSql(this.checked_record_SQL)
				}
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
			additionTableData() {
				//统计各列计算
				var values = Object.values(this.tableData[0])
				var isNumberList = []
				var dataObj = {}
				var sumData = {}
				this.tableSumData = []
				// console.log(isNaN(Number('16,464.00')), Number('16,464.00')) 
				for (var i = 0; i < values.length; i++) {
					isNaN(Number(values[i]))||values[i]===""||this.tableHead[i]==="Cost" ? '' : (isNumberList.push(this.tableHead[i]), dataObj[this.tableHead[i]] = [])
					sumData[this.tableHead[i]] = ''
				}
				// console.log(sumData)
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
				this.tableSumData = [sumData]
				// console.log(this.tableSumData)
			},
			calculation() {

				this.formula.forEach((temp) => {

					// for ( let v of this.tableData){
					// 	v.calculationRes = this.calculationRes(v[temp.formula_a], temp.formula_method, v[temp.formula_b])
					// 	console.log('计算结果', v.calculationRes)
					// }

					var column_name = temp.formula_a + '  ' + temp.formula_method + '  ' + temp.formula_b
					this.tableHead.push(column_name)
					this.tableData.forEach((v) => {
						// console.log(v[temp.formula_a], temp.formula_method, v[temp.formula_b]) 
						v[column_name] = this.calculationRes(v[temp.formula_a], temp.formula_method, v[temp.formula_b])
						// console.log('计算结果', v.calculationRes ) 
					})
					// console.log('计算结果',  this.tableData)
				})
				//解决样式错乱
				this.table_height == '500px' ? this.table_height = '502px' : this.table_height = '500px',
					this.additionTableData()
			},

			calculationRes(a, m, b) {
				switch (this.calculation_Method.indexOf(m)) {
					case 0:
						return arithmetic.add(a, b)
						break;
					case 1:
						return arithmetic.subtract(a, b)
						break;
					case 2:
						return arithmetic.multiply(a, b)
						break;
					case 3:
						return arithmetic.divide(a, b)
						break;
				}
			},
			comp(_func, args) {
				// let t = $math.chain($math.bignumber(args[0]));
				// for (let i = 1; i < args.length; i++) {
				// 	t = t[_func]($math.bignumber(args[i]))
				// }

				$math[_func]($math.bignumber(args[0]), $math.bignumber(args[1]))
				console.log($math[_func]($math.bignumber(args[0]), $math.bignumber(args[1])))
				return $math.done()
			},
			submitSql(textarea_SET_SQL) {
				//this.successMessage('正在加载数据，请稍后')
				this.$api.executeSQL({
					'sql': textarea_SET_SQL
				}).then(res => {
					if (res.code == 1) {
						// this.options_FieldName = res.data
						//this.successMessage('查询成功')
						if (res.data.length > 0) {
							this.tableHead = Object.keys(res.data[0])
							this.tableData = res.data
							this.additionTableData()
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
			getRecordSQL(timeId) {
				this.$api.getRecordSQL({
					'time_id': timeId
				}).then(res => {
					if (res.code == 1) {
						this.options_record_SQL = res.data
			
						//this.successMessage('查询成功')
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
		},
		created() {
			var choosedata = JSON.parse(localStorage.getItem('choosedata'))
			if (choosedata !== null) {
				if (parseInt(choosedata.timeId) > 0) {
					this.getRecordSQL(choosedata.timeId)
				}
			} 
			var chooseSQL = localStorage.getItem('chooseSQL')
			if (chooseSQL !== null) { 
				
				this.checked_record_SQL = chooseSQL
				this.submitSql(chooseSQL)
			}
		}


	}
</script>

<style>
</style>
