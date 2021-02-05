<template>
	<div>

		<u-table ref="plxTable" :max-height="height" use-virtual @table-body-scroll="scroll" border>
			<u-table-column type="index" width="100" fixed />
			<u-table-column v-for="item in columns" :key="item.id" :show-overflow-tooltip="true" :prop="item.prop" :label="item.label"
			 fixed="" />
		</u-table>
	</div>
</template>

<script>
	import {
		LOCATION_TEAM_PARTNAME,
		PROJECT_TOTAL
	} from '../../constant/sqlConstant.js'
	export default {
		data() {
			return {
				height: 0,

				columns: [],
				scrollTop: 0,
				radio: 1,

				tableHead: [],
				tableData: [],
			}
		},
		mounted() {
			this.height = 500 // 动态设置高度
			// 异步设置数据，这样解决初次进来不卡，由于加载数据很大啦，你没必要这样做哦
			this.submitSql(this.strSql(''), 0)

		},
		methods: {
			rnd(n, m) {
				var random = Math.floor(Math.random() * (m - n + 1) + n);
				return random;
			},
			setHei(val) {
				this.height = val
			},
			scroll({
				scrollTop,
				scrollLeft
			}) {
				this.scrollTop = scrollTop
			},
			setData(num) {
				this.datas = Array.from({
					length: num
				}, (_, idx) => ({
					id: idx + 1,
					name: 'pl' + idx,
					sex: idx,
					describe: '欢迎使用plx' + idx,
				}))
				this.$refs.plxTable.reloadData(this.datas)
				// 默认是数据变化滚动到顶部，这里需要手动滚动之前位置
				if (this.radio === 2) {
					this.$refs.plxTable.pagingScrollTopLeft(this.scrollTop)
				}
			},
			selectable({
				row
			}) {
				return row.id !== 2
			},
			toggleSelection(rows, type) {
				if (rows) {
					rows.forEach(row => {
						// 注意： 勾选方法与element不同哦
						// this.$refs.plxTable.toggleRowSelection(row); // element表格是这样写的
						// 我们得这样写

						// 如果是固定选中
						if (type === '固定选中') {
							// toggleRowSelection方法参数不懂得去看文档api哦
							this.$refs.plxTable.toggleRowSelection([{
								row: row,
								selected: true
							}])
							// 下面这是切换选中
						} else {
							this.$refs.plxTable.toggleRowSelection([{
								row: row
							}])
						}
					});
				} else {
					this.$refs.plxTable.clearSelection();
				}
			},
			pagingScrollTopLeft(val) {
				this.$refs.plxTable.pagingScrollTopLeft(val, val)
			},
			scrollBottom() {
				this.$refs.plxTable.scrollToRow(this.datas[this.datas.length - 1])
			},
			// 选中的行
			selectionChange(row) {
				console.log(row)
			},

			tableCreat() {
				setTimeout(() => {

					let col = this.tableHead
					console.log(this.tableHead)
					this.columns = Array.from({
						length: col.length
					}, (_, idx) => ({
						prop: col[idx], //数据的key
						id: idx, //索引
						label: col[idx], //列名 
					})) //表头定义
					console.log(this.columns)
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
			strSql(locationStr) {

				return locationStr !== '' ? LOCATION_TEAM_PARTNAME.replace('1=1',
					' egs_all.3= "' + locationStr + '"') : LOCATION_TEAM_PARTNAME
			}

		}
	}
</script>
<style>
	.plTableBox .el-table .cell.el-tooltip {
		white-space: normal
	}

	.elx-checkbox .elx-checkbox--label,
	.elx-radio .elx-radio--label,
	.elx-radio-button .elx-radio--label,
	.elx-table .elx-body--column.col--ellipsis:not(.col--actived)>.elx-cell,
	.elx-table .elx-footer--column.col--ellipsis:not(.col--actived)>.elx-cell,
	.elx-table .elx-header--column.col--ellipsis:not(.col--actived)>.elx-cell {
		white-space: normal
	}
</style>
