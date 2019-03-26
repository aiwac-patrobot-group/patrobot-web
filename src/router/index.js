import Vue from 'vue'
import Router from 'vue-router'


import Login from '@/components/Login'
import Admin from '@/components/Admin'

import UserList from '@/components/admin/UserList'
import UserConfig from '@/components/admin/UserConfig'
import UploadMedia from '@/components/admin/MediaUpload'
import MediaList from '@/components/admin/MediaList'
import MediaUpdate from '@/components/admin/MediaUpdate'

Vue.use(Router);

export default new Router({
  // 去除'/#'路径 但是会导致打包问题
  // mode: 'history',
  routes: [
    // 其他
    {
      path: '/',
      name: '请登录',
      component: Login,
      meta:{
        isLogin:false
      }
    },
    // 登录页面
    {
      path: '/login',
      component: Login,
      name: '请登录',
      meta:{
        isLogin:false
      }
    }, 
    //管理员主界面 iconCls 见 http://fontawesome.dashgame.com/
    {
      path: '/admin', component:Admin, name: '用户管理', iconCls: 'fa fa-address-card',
          meta:{ isLogin:true, auth: 'admin'},
          children:[
            {path: '/admin/userlist', component: UserList, name: '注册用户列表', meta:{ isLogin:true, auth: 'admin'}},
            {path: '/admin/userconfig', component: UserConfig, name: '用户配置信息', meta:{ isLogin:true, auth: 'admin'}},
            ]
    },
    { path: '/admin', component: Admin, name: '音视频管理', iconCls: 'fa fa-bar-chart',
          meta:{isLogin:true, auth: 'admin'},
          children:[
            {path: '/admin/mediaupload', component: UploadMedia, name: '音视频上传', meta:{ isLogin:true, auth: 'admin'}},
            {path: '/admin/medialist', component: MediaList, name: '音视频列表展示', meta:{ isLogin:true, auth: 'admin'}},
            {path: '/admin/mediaupdate', component: MediaUpdate, name: '音视频更新', meta:{ isLogin:true, auth: 'admin'},hidden:true},
            ]
    },
  ]
})
