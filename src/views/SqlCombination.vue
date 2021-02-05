<template>
	<el-container>
		<el-header>
			<el-row type="flex" class="row-bg">
				<el-col :span="12">
					<el-select style='width:260px' @change='change_time' v-model="time_id" placeholder="请选择查询第几次导入的数据">
						<el-option v-for="item in options_times" :key="item.value" :label="'第 '+item.label+' 次'" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="12">
					<el-select class="topSel" @change='change_record_SQL' v-model="checked_record_SQL" placeholder="请选择">
						<el-option v-for="item in options_record_SQL" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
		</el-header>
		<el-container>
			<el-main>
				<el-row type="flex" class="row-bg">
					<el-col :span="12">
						<el-row type="flex" justify="center">
							<el-col :span="20">
								可以选择的属性标签
								<el-divider content-position="left">{{tabs_label}}</el-divider>
							</el-col>
						</el-row>
						<el-row type="flex" justify="center">
							<el-col :span="20">
								<el-button v-for="item in options_FieldName" :label="item.label" :key="item.value" style="margin-bottom: 20px;"
								 @click="click_fieldname(item)" type="primary">
									{{item.label}}
								</el-button>
							</el-col>
						</el-row>
					</el-col>
					<!-- 	<el-col :span="1" style='border-left:#909399 1px solid; '>
					</el-col> -->
					<el-col :span="12" style='border-left:#909399 1px solid; '>
						<!-- ------------------------------------------ -->
						<div id='ccc'>
							<el-row type="flex" justify="center">
								<el-col :span="20">
									<el-tabs style="height: 100%;">
										<el-tab-pane label="组合筛选查询">

											<el-tabs @tab-click='tabClick' type="border-card" style="height: 100%;">
												<el-tab-pane label="选择想要呈现的标签">
													<el-card class="box-card">
														<div slot="header" class="clearfix">
															<span>选择想要呈现的标签</span>
														</div>
														<div class="text item">
															<el-tag @close="handleTagDelete(tag[1])" v-for="tag in tags_select" :key="tag[1].value" closable>
																{{tag[1].label}}
															</el-tag>
														</div>
													</el-card>
												</el-tab-pane>

												<el-tab-pane label="设置特定筛选条件">
													<el-card class="box-card">
														<div slot="header" class="clearfix">
															<span>设置特定筛选条件</span>

														</div>
														<div class="text item">
															<el-tag @click="click_fieldname(tag[1])" @close="handleTagDelete(tag[1])" v-for="tag in tags_where" :key="tag[1].value"
															 closable>
																{{tag[1].label}}
															</el-tag>
														</div>
													</el-card>
												</el-tab-pane>

												<el-tab-pane label="设置相同属性分组">
													<el-card class="box-card">
														<div slot="header" class="clearfix">
															<span>把相同属性合并成一组,并选择后面的的统计与计算配合使用</span>
														</div>
														<div class="text item">
															<el-tag @close="handleTagDelete(tag[1])" v-for="tag in tags_group" :key="tag[1].value" closable>
																{{tag[1].label}}
															</el-tag>
														</div>
													</el-card>

												</el-tab-pane>

												<el-tab-pane label="设置分组内的统计与计算">

													<el-card class="box-card">
														<div slot="header" class="clearfix">
															<span>配合前面的分组方法,分组内指定标签进行统计计算</span>
														</div>
														<div class="text item">
															<el-tag @close="handleTagDelete(tag[1])" v-for="tag in tags_algorithm" :key="tag[1].value" closable>
																{{tag[1].label}}:{{algorithm_Map.get(tag[1].value)}}
															</el-tag>
														</div>
													</el-card>

													<span>固定算法统计计算</span>
													<el-checkbox-group style='margin-top: 20px;width:90% ' v-model="checked_Algorithms_public" size="medium">
														<el-checkbox-button v-for="item in algorithms_public" :key="item.value" :label="item.value">{{item.label}}</el-checkbox-button>
													</el-checkbox-group>
												</el-tab-pane>

												<el-tab-pane label="设置结果排序方式">
													<el-card class="box-card">
														<div slot="header" class="clearfix">
															<span>设置排序方式</span>

														</div>
														<div class="text item">
															<el-tag @close="handleTagDelete(tag[1])" v-for="tag in tags_sort" :key="tag[1].value" closable>
																{{tag[1].label}}
															</el-tag>
														</div>
													</el-card>


												</el-tab-pane>

												<el-button @click='submitPartSql' style="margin-top: 20px;" type="primary" round size="medium">edit SQL</el-button>
												<el-button @click='submitPartSqlSql' type="primary" round size="medium">submit</el-button>
											</el-tabs>

										</el-tab-pane>
										<el-tab-pane label="edit SQL">
											<el-card class="box-card">
												<div slot="header" class="clearfix">
													<span>edit SQL</span>
													<el-button @click='submitSql' type="primary" style="float: right;" size="medium">submit</el-button>
												</div>
												<div class="text item">
													<el-input type="textarea" :autosize="{ minRows: 6}" placeholder="请输入SQL内容" v-model="textarea_SET_SQL">
													</el-input>
												</div>
												<div class="text item">
													<el-input type="textarea" :autosize="{ minRows: 2}" placeholder="请为您编辑的SQL命名" v-model="textarea_SET_SQL_name">
													</el-input>
												</div>
												<el-button @click='submitSaveSql' type="primary" size="medium">save</el-button>
											</el-card>

										</el-tab-pane>
									</el-tabs>
								</el-col>
							</el-row>
						</div>
						<!-- ------------------------------------------ -->
					</el-col>
				</el-row>
				<el-drawer size='50%' @close='drawerBeforeClose' :visible.sync="drawer" :with-header="false">
					<span v-if='tabs_index==1'>
						<div>请选择您想指定的值</div>
						<el-select style='margin-top: 20px;width:80% ' v-model="checked_FieldNames" multiple placeholder="请选择">
							<el-option v-for="item in options_Field_Category" :key="item.val" :label="item.val" :value="item.val">
							</el-option>
						</el-select>
					</span>
					<span v-else>
						<div>请选择您需要的统计算法</div>
						<el-checkbox-group style='margin-top: 20px;width:90% ' v-model="checked_FieldNames" size="medium">
							<el-checkbox-button v-for="item in algorithms_private" :key="item.value" :label="item.value">{{item.label}}</el-checkbox-button>
						</el-checkbox-group>

					</span>
				</el-drawer>

			</el-main>
		</el-container>
		<el-main>

			<el-row type="flex" justify="center" class="row-bg">
				<el-col>
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<span>edit formula</span>

						</div>
						<div class="text item">
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
							<div style="margin-top: 20px;">
								<el-button @click='calculation' type="primary" size="medium">calculation</el-button>
							</div>

						</div>

					</el-card>
				</el-col>
			</el-row>


			<el-row type="flex" justify="center" class="row-bg">
				<el-col>
					<!-- table -->
					<div id='table-id'>

						<el-table  style="width: 98.8%; color: red;"  :data="tableSumData" :highlight-current-row='true' stripe>
							<el-table-column type="index" >
								<template>总计</template>
							</el-table-column>
							<el-table-column v-for="(item,index) in tableHead" :key="index" :label="item" :property="item" align="center">
								<template slot-scope="scope">{{scope.row[scope.column.property]}}</template>
							</el-table-column>
						</el-table>


						<el-table :height='table_height' :cell-class-name="addClass" :data="tableData" 
						 :highlight-current-row='true' stripe>
							<el-table-column type="index">
							</el-table-column>
							<el-table-column v-for="(item,index) in tableHead" :key="index" :label="item" :property="item" align="center">
								<template slot-scope="scope">{{scope.row[scope.column.property]}}</template>
							</el-table-column>
						</el-table>
					</div>
				</el-col>
			</el-row>
		</el-main>
	</el-container>
</template>

<script> 
	import CATEGORYCONSTANT from '../constant/categoryConstant.js'
	import * as SQLCONSTANT from '../constant/sqlConstant.js'
	import arithmetic from '../utils/math_.js'
	export default {
		name: 'SqlCombination',
		data() {
			return {
				options_times: [{
					"label": "1",
					"value": '1'
				}],
				algorithms_private: [{
						"label": "同一分组内求和",
						"value": 'sum'
					}, {
						"label": "同一分组内求最大值",
						"value": 'max'
					}, {
						"label": "同一分组内求最小值",
						"value": 'min'
					},
					{
						"label": "同一分组内求平均值",
						"value": 'avg'
					}
				],
				algorithms_public: [{
						"label": "同一分组内匹配次数",
						"value": 'COUNT(*)'
					},
					{
						"label": "同一分组内分别列出每周使用量的和",
						"value": 'DATE_SUM'
					},
					{
						"label": "同一分组内每周使用量和的最高值",
						"value": 'DATE_SUM_MAX'
					}
				],
				calculation_Method: ['+', '-', 'x', '÷'],
				options_FieldName: [],
				time_id: '',
				options_record_SQL: [],
				checked_record_SQL: '',
				checked_FieldNames: [],
				checked_Algorithms_public: [],
				drawer: false,
				fieldname_id: '',
				options_Field_Category: [],
				checked_Field_Category_vals: [],

				textarea_SET_SQL: '',
				textarea_SET_SQL_name: '',
				tabs_index: 0,
				tabs_label: '选择想要呈现的标签',
				tags_select: new Map(),

				tags_where: new Map(),
				where_Map: new Map(),

				tags_group: new Map(),

				tags_algorithm: new Map(),
				algorithm_Map: new Map(),

				tags_sort: new Map(),
				egs: 'egs_all.', //数据库前缀
				tableHead: [],
				tableData: [],
				num: 0,
				formula: [{
					formula_a: '',
					formula_method: '',
					formula_b: ''
				}],
				table_height: '500px',
				tableSumData: [],

			}
		},
		methods: {
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
						// console.log('计算结果', v.calculationRes) 
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
			tabClick(e) {
				this.tabs_index = e.index
				this.tabs_label = e.label

			},
			click_fieldname(item) {
				this.fieldname_now_item = item
				this.addTagList(item)
			},
			dynamicTag(type, item) {
				var dynamicTag_map = new Map()
				if (this.tabs_index == 0) {
					dynamicTag_map = this.tags_select
				} else if (this.tabs_index == 1) {
					dynamicTag_map = this.tags_where
					if (type == 0) {
						this.where_Map.delete(item.value)
					} else {
						this.drawerEject(item.value)
					}

				} else if (this.tabs_index == 2) {
					dynamicTag_map = this.tags_group
				} else if (this.tabs_index == 3) {
					dynamicTag_map = this.tags_algorithm
					if (type == 0) {
						this.algorithm_Map.delete(item.value)

					} else {
						this.drawerEject(item.value)
					}
				} else if (this.tabs_index == 4) {
					dynamicTag_map = this.tags_sort
				} else {
					this.warningMessage('tabs_index 错误')
				}
				return dynamicTag_map
			},
			handleTagDelete(item) {
				var tags_map = this.dynamicTag(0, item)
				tags_map.delete(item.label);
				this.$forceUpdate()
			},
			addTagList(item) {
				var tags_map = this.dynamicTag(1, item)
				if (!tags_map.has(item.label)) {
					tags_map.set(item.label, item)
				}
				this.$forceUpdate()
			},
			drawerBeforeClose() {

				if (this.checked_FieldNames.length > 0) {
					if (this.tabs_index == 1) {
						this.where_Map.set(this.fieldname_now_item.value, this.checked_FieldNames)

					} else if (this.tabs_index == 3) {
						this.algorithm_Map.set(this.fieldname_now_item.value, this.checked_FieldNames)
					}

				} else { //没有设置特定筛选的值就删除 添加的标签
					var item = {}
					this.handleTagDelete(this.fieldname_now_item)
				}

				this.checked_FieldNames = [] //清空上次选择
			},
			drawerEject() {

				if (parseInt(this.fieldname_now_item.value) < 1) {
					return
				}

				if (this.tabs_index == 1) {

					if (this.where_Map.has(this.fieldname_now_item.value)) {
						this.checked_FieldNames = this.where_Map.get(this.fieldname_now_item.value)
					}
				} else if (this.tabs_index == 3) {

					if (this.algorithm_Map.has(this.fieldname_now_item.value)) {
						this.checked_FieldNames = this.algorithm_Map.get(this.fieldname_now_item.value)
					}
				}


				this.getCategory(this.fieldname_now_item.value)

				setTimeout(() => {
					this.drawer = true
				}, 500)

			},
			change_record_SQL() {
				if (null != this.checked_record_SQL && '' != this.checked_record_SQL) {
					this.textarea_SET_SQL = this.checked_record_SQL
				}
			},
			change_time() {
				if (parseInt(this.time_id) > 0) {
					this.getFieldName(this.time_id)
					this.getRecordSQL(this.time_id)
				}
			},
			submitPartSql() {
				var sql, sql_select, sql_where, sql_group, sql_sort
				sql_select = this.sqlSelect() || '*'
				sql_where = this.sqlWhere()
				sql_group = this.sqlGroup()
				sql_sort = this.sqlSort()
				this.textarea_SET_SQL = 'SELECT ' + sql_select + ' FROM egs_all ' + sql_where + sql_group + sql_sort
				//this.successMessage('成功生成SQL,请使用SQL语句查询功能')
			},
			sqlSelect() {
				var temp_list = []
				for (let temp of this.tags_select.values()) {
					temp_list.push(this.egs + temp.value + ' as "' + temp.label + '"')
				}

				var algorithm_name = ''
				var algorithm_list = ''
				for (let temp of this.algorithm_Map) {
					algorithm_name = temp[0]
					algorithm_list = temp[1]
					for (let temp_a of algorithm_list) {
						temp_list.push(temp_a + '(' + this.egs + algorithm_name + ') as "' + temp_a + '"')
					}
				}

				for (let temp of this.checked_Algorithms_public) {
					if (temp == "DATE_SUM") {
						temp_list.push(SQLCONSTANT.DATE_SUM)
					} else if (temp == "DATE_SUM_MAX") {
						temp_list.push(SQLCONSTANT.DATE_SUM_MAX)
					} else if (temp == "COUNT(*)") {
						temp_list.push(temp)
					}
				}

				return temp_list.join(",")

			},
			sqlWhere() {
				var temp_list = []
				var temp_list_a = []

				// console.log(this.where_Map)
				for (let temp of this.where_Map) {
					temp_list_a = []
					for (let temp_a of temp[1]) {

						temp_list_a.push(this.egs + temp[0] + '= "' + temp_a + '"')
					}
					temp_list.push(temp_list_a.join(" OR "))
				}
				if (temp_list.length > 0) {
					return ' WHERE ' + temp_list.join(" AND ")

				} else {
					return ""
				}
			},
			sqlGroup() {
				var temp_list = []
				for (let temp of this.tags_group.values()) {
					temp_list.push(this.egs + temp.value)
				}
				if (temp_list.length > 0) {
					return ' GROUP BY ' + temp_list.join(",")

				} else {
					return ""
				}
			},
			sqlSort() {
				var temp_list = []
				for (let temp of this.tags_sort.values()) {
					temp_list.push(this.egs + temp.value)
				}
				if (temp_list.length > 0) {
					return ' ORDER BY ' + temp_list.join(",")

				} else {
					return ""
				}
			},
			submitSaveSql() {
				if (this.textarea_SET_SQL == '' || this.textarea_SET_SQL_name == '') {
					this.warningMessage('数据空')
					return
				}
				if (!(parseInt(this.time_id) > 0)) {
					this.warningMessage('请选择是第几次导入数据使用')
					return
				}
				this.$api.saveSQL({
					'sql': this.textarea_SET_SQL,
					'name': this.textarea_SET_SQL_name + " | " + this.dateFormat(),
					'time_id': this.time_id,
					'remarks': ''
				}).then(res => {
					if (res.code == 1) {
						//this.successMessage('保存成功')
						this.getRecordSQL(this.time_id)
					} else {
						//this.successMessage('保存失败 code ' + res.code)
					}
					// 执行某些操作      
				}).catch(err => {
					// 错误
					this.warningMessage('保存失败')
				})
			},
			dateFormat() {
				var date = new Date();
				var year = date.getFullYear();
				/* 在日期格式中，月份是从0开始的，因此要加0
				 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
				 * */
				var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				// 拼接
				return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
			},
			submitPartSqlSql() {
				this.submitPartSql()
				this.submitSql()
			},

			submitSql() {
				this.$api.executeSQL({
					'sql': this.textarea_SET_SQL
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
			additionTableData() {
				//统计各列计算
				var values = Object.values(this.tableData[0])
				var isNumberList = []
				var dataObj = {}
				var sumData = {}
				this.tableSumData = []
				for (var i = 0; i < values.length; i++) {
					isNaN(Number(values[i])) ? '' : (isNumberList.push(this.tableHead[i]), dataObj[this.tableHead[i]] = [])
					sumData[this.tableHead[i]] = ''
				}
				console.log(sumData)
				this.tableData.forEach((data) => {
					for (var i = 0; i < isNumberList.length; i++) {
						dataObj[isNumberList[i]].push(data[isNumberList[i]])
					}
				})

				console.log(dataObj)
				for (var i = 0; i < isNumberList.length; i++) {
					sumData[isNumberList[i]] = arithmetic.add(...dataObj[isNumberList[i]])
					// eval(dataObj[isNumberList[i]].join("+"))   
					console.log(isNumberList[i], sumData[isNumberList[i]])
				}
				this.tableSumData = [sumData]
				console.log(this.tableSumData)
			},
			getRecordSQL(time_id) {
				this.$api.getRecordSQL({
					'time_id': time_id
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
			getFieldName(time_id) {
				this.$api.queryFieldName({
					'time_id': time_id
				}).then(res => {
					if (res.code == 1) {
						this.options_FieldName = res.data
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
			getCategory(value_Field_id) {
				this.$api.queryCategory({
					'value_Field_name': this.options_FieldName[value_Field_id - 1].label,
					'value_Field_id': value_Field_id
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.options_Field_Category = res.data
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
	

	}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.row-bg {
		padding: 10px 0;
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

	#ccc .el-row.is-justify-center.el-row--flex {
		margin-top: 6px;
	}

	.resAndSug {
		color: crimson;
	}

	#table-id .el-table th {
		user-select: initial;
	}
</style>
