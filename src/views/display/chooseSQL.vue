<template>


	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>choose edit</span>

			<el-select style='width:60%' class="topSel" @change='change_record_SQL' v-model="checked_record_SQL" placeholder="请选择">
				<el-option v-for="(item,index) in options_record_SQL" :key="index" :label="item.label" :value="item.value">
				</el-option>
			</el-select>

			<el-button @click='nextStep' type="primary" style="float: right;" size="medium">NEXT</el-button>
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


</template>

<script>
	export default {
		data() {
			return {
				textarea_SET_SQL: '',
				textarea_SET_SQL_name: '',
				options_record_SQL: '',
				checked_record_SQL: ''
			}
		},
		methods: {
			nextStep() {
				localStorage.setItem('chooseSQL', this.textarea_SET_SQL)
				this.$router.push({
					name: 'viewandcalculation'
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
			change_record_SQL() {
				if (null != this.checked_record_SQL && '' != this.checked_record_SQL) {
					this.textarea_SET_SQL = this.checked_record_SQL
				}
			},
			submitSaveSql() {
				if (this.textarea_SET_SQL == '' || this.textarea_SET_SQL_name == '') {
					this.warningMessage('要保存的数据和名称不能为空')
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
				this.textarea_SET_SQL = chooseSQL
			}
		}
	}
</script>

<style>
</style>
