export const SHARED_PEAK_GROUPBY_PARTNAME_DESC_COST =
	'SELECT egs_all.16 as "Category", round(egs_all.20,2) as "Cost",egs_all.13 as "PartName",sum(egs_all.26) as "SharedQtyTotal", round( GREATEST(  sum(egs_all.40),sum(egs_all.41),sum(egs_all.42),sum(egs_all.43),sum(egs_all.44),sum(egs_all.45),sum(egs_all.46),sum(egs_all.47),sum(egs_all.48),sum(egs_all.49),sum(egs_all.50),sum(egs_all.51),sum(egs_all.52),sum(egs_all.53),sum(egs_all.54),sum(egs_all.55),sum(egs_all.56),sum(egs_all.57),sum(egs_all.58),sum(egs_all.59),sum(egs_all.60),sum(egs_all.61),sum(egs_all.62),sum(egs_all.63),sum(egs_all.64),sum(egs_all.65),sum(egs_all.66),sum(egs_all.67),sum(egs_all.68),sum(egs_all.69),sum(egs_all.70),sum(egs_all.71),sum(egs_all.72),sum(egs_all.73),sum(egs_all.74),sum(egs_all.75),sum(egs_all.76),sum(egs_all.77),sum(egs_all.78),sum(egs_all.79),sum(egs_all.80),sum(egs_all.81),sum(egs_all.82),sum(egs_all.83),sum(egs_all.84),sum(egs_all.85),sum(egs_all.86),sum(egs_all.87),sum(egs_all.88),sum(egs_all.89),sum(egs_all.90),sum(egs_all.91),sum(egs_all.92),sum(egs_all.93),sum(egs_all.94),sum(egs_all.95),sum(egs_all.96),sum(egs_all.97),sum(egs_all.98),sum(egs_all.99),sum(egs_all.100),sum(egs_all.101),sum(egs_all.102),sum(egs_all.103),sum(egs_all.104),sum(egs_all.105),sum(egs_all.106),sum(egs_all.107),sum(egs_all.108)  ),2) as "Peak"  FROM egs_all  WHERE 1=1 and egs_all.24= "Shared"  GROUP BY egs_all.13 ORDER BY  CAST(  egs_all.20  as signed)  desc '



export const LOCATION_TOTAL  =
	'SELECT egs_all.11 as Location ,round( sum(egs_all.26*round(egs_all.20,2)),2) as Total  FROM egs_all   GROUP BY egs_all.11 ORDER BY egs_all.11'
// ↑-----------------计算LOCATION下的PEAK

export const LOCATION_TEAM_PARTNAME_2 =
	'select  egs_all.11 as "Location", egs_all.10 as "Team" , egs_all.13 as "PartName" ,round(egs_all.20,2) as Cost, sum(egs_all.25) as "Dedicated Total",Format( sum(egs_all.25) *  round( egs_all.20,2)  ,2) as "Dedicated Total Cost",sum(egs_all.26) as "Shared Total",  Format( sum(egs_all.26) *  round( egs_all.20,2)  ,2)  as "Shared Total Cost"  from   egs_all  WHERE  1=1  GROUP BY  egs_all.10,egs_all.13 ORDER BY  egs_all.11,egs_all.13'

export const LOCATION_TEAM_PARTNAME =
	'select  egs_all.11 as "Location", egs_all.10 as "Team" , egs_all.13 as "PartName" ,round(egs_all.20,2) as Cost, sum(egs_all.25) as "Dedicated Total",round( sum(egs_all.25) *  round( egs_all.20,2)  ,2) as "Dedicated Total Cost",sum(egs_all.26) as "Shared Total",  round( sum(egs_all.26) *  round( egs_all.20,2)  ,2)  as "Shared Total Cost"  from   egs_all  WHERE  1=1  GROUP BY  egs_all.10,egs_all.13 ORDER BY  egs_all.11,egs_all.13'
	
export const PROJECT_TOTAL  =
	'select  egs_all.3 as "Project",count(*) as "Request Total"  from   egs_all    GROUP BY  egs_all.3'
//↑------------------计算PROJECT下的各TEAM的各部件 shared 和dedicated 总数


export const DATE_SUM =
	' sum(egs_all.40),sum(egs_all.41),sum(egs_all.42),sum(egs_all.43),sum(egs_all.44),sum(egs_all.45),sum(egs_all.46),sum(egs_all.47),sum(egs_all.48),sum(egs_all.49),sum(egs_all.50),sum(egs_all.51),sum(egs_all.52),sum(egs_all.53),sum(egs_all.54),sum(egs_all.55),sum(egs_all.56),sum(egs_all.57),sum(egs_all.58),sum(egs_all.59),sum(egs_all.60),sum(egs_all.61),sum(egs_all.62),sum(egs_all.63),sum(egs_all.64),sum(egs_all.65),sum(egs_all.66),sum(egs_all.67),sum(egs_all.68),sum(egs_all.69),sum(egs_all.70),sum(egs_all.71),sum(egs_all.72),sum(egs_all.73),sum(egs_all.74),sum(egs_all.75),sum(egs_all.76),sum(egs_all.77),sum(egs_all.78),sum(egs_all.79),sum(egs_all.80),sum(egs_all.81),sum(egs_all.82),sum(egs_all.83),sum(egs_all.84),sum(egs_all.85),sum(egs_all.86),sum(egs_all.87),sum(egs_all.88),sum(egs_all.89),sum(egs_all.90),sum(egs_all.91),sum(egs_all.92),sum(egs_all.93),sum(egs_all.94),sum(egs_all.95),sum(egs_all.96),sum(egs_all.97),sum(egs_all.98),sum(egs_all.99),sum(egs_all.100),sum(egs_all.101),sum(egs_all.102),sum(egs_all.103),sum(egs_all.104),sum(egs_all.105),sum(egs_all.106),sum(egs_all.107),sum(egs_all.108) '


export const DATE_SUM_MAX = ' round( GREATEST( ' + DATE_SUM + ' ),2) as "HIGH PEAK" '
