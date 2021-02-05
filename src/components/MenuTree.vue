<template>
	<div id='menu'>
		<div :class='icon' class="toggle-menu" @click="toggleMenu"></div>
		<el-menu :default-active='$route.path' :default-openeds="['0','1','2','3']" class="el-menu-vertical" @select="handleSelect"
		 @open="handleOpen" @close="handleClose" :collapse="isCollapse" text-color="#dedede" background-color="#001529"
		 router>

			<el-submenu :index='String(index)' v-for="(route,index) of menuList" :key="index">
				<template slot="title">
					<i :class='route.meta.icon'></i>
					<span slot="title">{{ route.meta.title }}</span>
				</template>

				<el-menu-item :index="route.path+children.path" v-for="(children,childrenindex) of route.children" :key="childrenindex">{{ children.meta.title }}</el-menu-item>

			</el-submenu>

		</el-menu>
	</div>
</template>

<script>
	import routes from '../router/routes/menu/index.js'
	export default {
		name: 'MenuTree',
		data() {
			return {
				isCollapse: false,
				icon: 'el-icon-d-arrow-left',
				menuList: routes,
				// activePath: "/project/choosedata",
			}
		},
		methods: {
			toggleMenu() {
				this.isCollapse ? (this.isCollapse = false, this.icon = 'el-icon-d-arrow-left') : (this.isCollapse = true, this.icon =
					'el-icon-d-arrow-right')
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				this.activePath = key
			}
		},
		mounted() {}
	}
</script>
<style>
	.el-menu-vertical:not(.el-menu--collapse) {
		width: 260px;
		min-height: 80%;
	}

	.el-menu {
		border-right: none;
	}

	#menu {
		height: 100%;
		background-color: #001529;
	}

	.toggle-menu {
		margin-left: 25px;
		color: #0542ab;
	}
</style>
