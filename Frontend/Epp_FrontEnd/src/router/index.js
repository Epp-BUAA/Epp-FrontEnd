import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import About from '@/components/About'

import Dashboard from '@/components/Main/Dashboard'
import SearchPage from '@/components/Search/SearchPage'
import SearchResult from '@/components/Search/SearchResult'
import PaperInfo from '@/components/PaperInfo/PaperInfo'
import PersonalMain from '@/components/Personal/PersonalMain'
import UploadDocument from '@/components/Personal/UploadDocument'
import PaperReader from '@/components/PaperRead/PaperReader'
import LocalPaperReader from '@/components/PaperRead/LocalPaperReader'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect: '/dashboard',
      component: HelloWorld,
      meta: {
        hideNavbar: false// 标识显示导航栏
      }
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: About,
      meta: {
        hideNavbar: false// 标识显示导航栏
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        hideNavbar: true // 标识不显示导航栏
      }
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage,
      meta: {
        hideNavbar: false// 标识显示导航栏
      }
    },
    {
      path: '/search/results',
      name: 'search-results',
      component: SearchResult,
      meta: {
        hideNavbar: false// 标识显示导航栏
      }
    },
    {
      path: '/paper/info/:paper_id',
      name: 'paper-info',
      component: PaperInfo,
      props: true,
      meta: {
        hideNavbar: false// 标识显示导航栏
      }
    },
    {
      path: '/paper/reader/:paper_id',
      name: 'paper-reader',
      component: PaperReader,
      props: true,
      meta: {
        hideNavbar: false// 标识显示导航栏
      }
    },
    {
      path: '/paper/localReader/:paper_id',
      name: 'localPaper-reader',
      component: LocalPaperReader,
      props: true,
      meta: {
        hideNavbar: false// 标识显示导航栏
      }
    },
    {
      path: '/personal',
      name: 'personal',
      component: PersonalMain,
      props: true,
      meta: {
        hideNavbar: false// 标识不显示导航栏
      }
    },
    {
      path: '/upload',
      name: 'UploadDocument',
      component: UploadDocument,
      props: true,
      meta: {
        hideNavbar: false
      }
    }
    // {
    //   path: '/pdf-viewer/:reportId',
    //   name: 'PdfViewer',
    //   component: PdfViewer
    // }
  ]
})
