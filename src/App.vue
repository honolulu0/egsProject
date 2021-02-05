<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		// beforeCreate: function() {
		// 	console.group('------beforeCreate创建前状态------');
		// 	console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
		// 	console.log("%c%s", "color:red", "data   : " + this.$data); //undefined 
		// 	console.log("%c%s", "color:red", "message: " + this.message)
		// },
		// created: function() {
		// 	console.group('------created创建完毕状态------');
		// 	console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
		// 	console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化 
		// 	console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
		// },
		// beforeMount: function() {
		// 	console.group('------beforeMount挂载前状态------');
		// 	console.log("%c%s", "color:red", "el     : " + (this.$el)); //已被初始化
		// 	console.log(this.$el);
		// 	console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化  
		// 	console.log("%c%s", "color:red", "message: " + this.message); //已被初始化  
		// },
		// mounted: function() {
		// 	console.group('------mounted 挂载结束状态------');
		// 	console.log("%c%s", "color:red", "el     : " + this.$el); //已被初始化
		// 	console.log(this.$el);
		// 	console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
		// 	console.log("%c%s", "color:red", "message: " + this.message); //已被初始化 
		// },
		// beforeUpdate: function() {
		// 	console.group('beforeUpdate 更新前状态===============》');
		// 	console.log("%c%s", "color:red", "el     : " + this.$el);
		// 	console.log(this.$el);
		// 	console.log("%c%s", "color:red", "data   : " + this.$data);
		// 	console.log("%c%s", "color:red", "message: " + this.message);
		// },
		// updated: function() {
		// 	console.group('updated 更新完成状态===============》');
		// 	console.log("%c%s", "color:red", "el     : " + this.$el);
		// 	console.log(this.$el);
		// 	console.log("%c%s", "color:red", "data   : " + this.$data);
		// 	console.log("%c%s", "color:red", "message: " + this.message);
		// },
		// beforeDestroy: function() {
		// 	console.group('beforeDestroy 销毁前状态===============》');
		// 	console.log("%c%s", "color:red", "el     : " + this.$el);
		// 	console.log(this.$el);
		// 	console.log("%c%s", "color:red", "data   : " + this.$data);
		// 	console.log("%c%s", "color:red", "message: " + this.message);
		// },
		// destroyed: function() {
		// 	console.group('destroyed 销毁完成状态===============》');
		// 	console.log("%c%s", "color:red", "el     : " + this.$el);
		// 	console.log(this.$el);
		// 	console.log("%c%s", "color:red", "data   : " + this.$data);
		// 	console.log("%c%s", "color:red", "message: " + this.message)
		// }
	}
</script>

<style>
	html,
	body {
		margin: 0px;
		padding: 0px;
		width: 100%;
		height: 100%;
	}

	#app {
		width: 100%;
		height: 100% !important;
		margin: 0px;
		padding: 0px;
		position: absolute;

		background: #2d3a4b;
		/*background-size: cover;*/
		/*background-repeat: repeat;*/
		/*background-image:  url('./assets/bg3.png') ;*/
		/*background-size: cover;*/
		/*background-repeat: no-repeat;*/
		/*background-position: 50% 50%;*/
	}

	#nprogress .bar {
		background: rgb(96, 47, 231) !important;
	}
</style>
