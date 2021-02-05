/**   
 * api接口统一管理
 */ 
import { get, post } from '../axios/http.js'; 

export const queryFieldName = (p) => get('api/optimization/queryfieldname', p);
export const getRecordSQL = (p) => get('api/optimization/getrecordSQL', p);
export const queryCategory = (p) => get('api/optimization/querycategory', p);
export const executeSQL = (p) => post('api/optimization/executeSQL', p);
export const saveSQL = (p) => post('api/optimization/saveSQL', p);
 