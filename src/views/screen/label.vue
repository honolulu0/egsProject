<template>
	<div>

		<!-- 		<el-row type="flex" justify="center"  >
			<el-col :span="20">
				<el-button v-for="item in options_FieldName" :label="item.label" :key="item.value" style="margin-bottom: 20px;"
				 @click="click_fieldname(item)" type="primary">
					{{item.label}}
				</el-button>
			</el-col>
		</el-row> -->
		<el-row type="flex" justify="center">
			<el-col>

				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>可供选择的标签</span>
					</div>
					<el-scrollbar style="height:180px">
						<el-button v-for="item in options_FieldName" :label="item.label" :key="item.value" style="margin-bottom: 5px;"
						 @click="click_fieldname(item)" type="primary">
							{{item.label}}
						</el-button>
					</el-scrollbar>
				</el-card>


			</el-col>
		</el-row>
		<el-row type="flex" justify="center">
			<el-col>
				<!-- ------------------------------------------ -->
				<div id='ccc'>
					<el-row type="flex" justify="center">
						<el-col :span="20">

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

								<el-button @click='submitSaveSql' type="primary" round size="medium">edit SQL</el-button>
								<el-button @click='nextStep' type="primary" round size="medium">NEXT</el-button>
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


	</div>
</template>

<script>
	export default {
		data() {
			return {
				options_FieldName: [],
				chooseData: {
					timeId: '',
					projectId: ''
				},
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



			}
		},
		methods: {
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
			nextStep() {
				this.PartSql()
				localStorage.setItem('chooseSQL', this.textarea_SET_SQL)
				this.$router.push({
					name: 'viewandcalculation'
				})
			},
			tabClick(e) {
				this.tabs_index = e.index
				this.tabs_label = e.label

			},
			click_fieldname(item) {
				this.fieldname_now_item = item
				this.addTagList(item)
			},
			addTagList(item) {
				var tags_map = this.dynamicTag(1, item)
				if (!tags_map.has(item.label)) {
					tags_map.set(item.label, item)
				}
				this.$forceUpdate()
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
			submitSaveSql() {
				this.PartSql()
				localStorage.setItem('chooseSQL', this.textarea_SET_SQL)
				this.$router.push({
					name: 'SQL'
				})
			},
			PartSql() {
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

			getFieldName(timeId) {
				this.$api.queryFieldName({
					'time_id': timeId
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
		},
		created() {
			var choosedata = JSON.parse(localStorage.getItem('choosedata'))
			if (choosedata !== null) {
				if (parseInt(choosedata.timeId) > 0) {
					this.getFieldName(choosedata.timeId)
				}

			}
		}

	}
</script>

<style>
	.el-divider__text.is-left {
		background-color: #f9faff
	}

	.el-scrollbar__wrap {
		/* // 必要的 */
		overflow: scroll;

		height: 108%;
		/* //隐藏底部滚动条  （100%如果达不到效果可以试着用108%）  */
	}
</style>
