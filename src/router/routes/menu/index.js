import index from '../../../views/index.vue'
 const menuRoutes = [

 	{
 		path: '/project/',
 		name: 'project', 
 		component: index,
 		meta: {
 			title: "Project Management",
 			icon: "el-icon-folder"
 		},
 		children: [{
 			path: 'create',
 			name: 'createproject',
 			meta: {
 				title: "New Project"
 			},
 			component: resolve => require(['../../../views/project/test.vue'], resolve),
 		},{
 			path: 'choose',
 			name: 'chooseproject',
 			meta: {
 				title: "Select The Project"
 			},
 			component: resolve => require(['../../../views/project/test2.vue'], resolve),
 		}, ]
 	},
	 
	 {
	 	path: '/data/',
	 	name: 'data', 
	 	component: index,
	 	meta: {
	 		title: "Data Management",
	 		icon: "el-icon-edit-outline"
	 	},
	 	children: [{
	 		path: 'import-newdata',
	 		name: 'importnewdata',
	 		meta: {
	 			title: "Import Data"
	 		},
	 		component: resolve => require(['../../../views/data/importnewdata.vue'], resolve),
	 	},{
	 		path: 'choose-data',
	 		name: 'choosedata',
	 		meta: {
	 			title: "Select The Data"
	 		},
	 		component: resolve => require(['../../../views/data/choosedata.vue'], resolve),
	 	}, ]
	 },
	  	{
	  		path: '/screening-conditions/',
	  		name: 'screeningconditions',
	  		component: index,
	  		meta: {
	  			title: "Filter Condition Setting",
	  			icon: "el-icon-setting"
	  		},
	  		children: [{
	  			path: 'label',
	  			name: 'label',
	  			meta: {
	  				title: "Set Filter By Tags"
	  			},
	  			component: resolve => require(['../../../views/screen/label.vue'], resolve),
	  		},{
	  			path: 'SQL',
	  			name: 'SQL',
	  			meta: {
	  				title: "Set Filter By SQL"
	  			},
	  			component: resolve => require(['../../../views/screen/sql.vue'], resolve),
	  		}, ]
	  	},
		
		{
			path: '/analysis-and-display/',
			name: 'analysisanddisplay',
			component: index,
			meta: {
				title: "Analysis And Presentation",
				icon: "el-icon-s-data"
			},
			children: [{
				path: 'statistics-and-calculation',
				name: 'statisticsandcalculation',
				meta: {
					title: "Statistics And Calculation"
				},
				component: resolve => require(['../../../views/display/viewAndCalculation.vue'], resolve),
			},{
				path: 'peak-analysis',
				name: 'peakanalysis',
				meta: {
					title: "Peak Analysis"
				},
				component: resolve => require(['../../../views/display/peakAnalysis.vue'], resolve),
			},{
				path: 'project-analysis',
				name: 'projectanalysis',
				meta: {
					title: "Project Analysis"
				},
				component: resolve => require(['../../../views/display/projectAnalysis.vue'], resolve),
			} ]
		},
 ]

 export default menuRoutes
