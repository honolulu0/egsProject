import index from '../../../views/index.vue'
 const menuRoutes = [

 	{
 		path: '/project/',
 		name: 'project', 
 		component: index,
 		meta: {
 			title: "项目管理",
 			icon: "el-icon-folder"
 		},
 		children: [{
 			path: 'create',
 			name: 'createproject',
 			meta: {
 				title: "创建新项目"
 			},
 			component: resolve => require(['../../../views/SqlCombination.vue'], resolve),
 		},{
 			path: 'choose',
 			name: 'chooseproject',
 			meta: {
 				title: "选择已经创建的项目"
 			},
 			component: resolve => require(['../../../views/SqlCombination.vue'], resolve),
 		}, ]
 	},
	 
	 {
	 	path: '/data/',
	 	name: 'data', 
	 	component: index,
	 	meta: {
	 		title: "数据管理",
	 		icon: "el-icon-edit-outline"
	 	},
	 	children: [{
	 		path: 'import-newdata',
	 		name: 'importnewdata',
	 		meta: {
	 			title: "导入新数据"
	 		},
	 		component: resolve => require(['../../../views/data/importnewdata.vue'], resolve),
	 	},{
	 		path: 'choose-data',
	 		name: 'choosedata',
	 		meta: {
	 			title: "选择已经导入的数据"
	 		},
	 		component: resolve => require(['../../../views/data/choosedata.vue'], resolve),
	 	}, ]
	 },
	  	{
	  		path: '/screening-conditions/',
	  		name: 'screeningconditions',
	  		component: index,
	  		meta: {
	  			title: "筛选条件设置",
	  			icon: "el-icon-setting"
	  		},
	  		children: [{
	  			path: 'label',
	  			name: 'label',
	  			meta: {
	  				title: "通过组合标签设置筛选"
	  			},
	  			component: resolve => require(['../../../views/screen/label.vue'], resolve),
	  		},{
	  			path: 'SQL',
	  			name: 'SQL',
	  			meta: {
	  				title: "通过SQL语句设置筛选"
	  			},
	  			component: resolve => require(['../../../views/screen/sql.vue'], resolve),
	  		}, ]
	  	},
		
		{
			path: '/analysis-and-display/',
			name: 'analysisanddisplay',
			component: index,
			meta: {
				title: "数据分析与呈现",
				icon: "el-icon-s-data"
			},
			children: [{
				path: 'statistics-and-calculation',
				name: 'statisticsandcalculation',
				meta: {
					title: "统计与计算"
				},
				component: resolve => require(['../../../views/display/viewAndCalculation.vue'], resolve),
			},{
				path: 'broken-line-analysis',
				name: 'brokenlineanalysis',
				meta: {
					title: "折线分析"
				},
				component: resolve => require(['../../../views/display/brokenLineAnalysis.vue'], resolve),
			} ]
		},
 ]

 export default menuRoutes
