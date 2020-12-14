//public是对axios的工具类封装，定义了http请求方法
import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

export const page_list = (page,size,params) => {
  //将json对象转成key/value对
  let query = querystring.stringify(params)
  return http.requestQuickGet(apiUrl+'/cms/page/list/'+page+'/'+size+'/?'+query)
}



/*页面添加*/
export const page_add = params => {
  return http.requestPost(apiUrl+'/cms/page/add',params)
}

/*页面查询*/
export const page_get = id => {
  return http.requestQuickGet(apiUrl+'/cms/page/get/'+id)
}

/*页面修改，采用put方法*/
export const page_edit = (id,params) => {
  return http.requestPut(apiUrl+'/cms/page/edit/'+id,params)
}

/*页面删除*/
export const page_del = id => {
  return http.requestDelete(apiUrl+'/cms/page/del/'+id)
}

//#############################site##################################
/*站点查询*/
export const site_findAll = () => {
  return http.requestQuickGet(apiUrl+'/cms/site/findAll/')
}
export const site_list = (page,size,params) => {
  //将json对象转成key/value对
  let query = querystring.stringify(params)
  return http.requestQuickGet(apiUrl+'/cms/site/list/'+page+'/'+size+'/?'+query)
}
/*站点添加*/
export const site_add = params => {
  return http.requestPost(apiUrl+'/cms/site/add',params)
}

/*站点查询*/
export const site_get = id => {
  return http.requestQuickGet(apiUrl+'/cms/site/get/'+id)
}

/*站点修改，采用put方法*/
export const site_edit = (id,params) => {
  return http.requestPut(apiUrl+'/cms/site/edit/'+id,params)
}

/*站点删除*/
export const site_del = id => {
  return http.requestDelete(apiUrl+'/cms/site/del/'+id)
}
//#############################template####################################
/*模板查询*/
export const template_findAll = () => {
  return http.requestQuickGet(apiUrl+'/cms/template/findAll/')
}

/*发布页面*/
export const page_postPage= id => {
  return http.requestPost(apiUrl+'/cms/page/postPage/'+id)
}
