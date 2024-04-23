import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import About from '@/components/About'
import SearchPage from '@/components/SearchPage'
import SearchResult from '@/components/SearchResult'
import PaperInfo from '@/components/PaperInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: About
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage
    },
    {
      path: '/search/results',
      name: 'search-results',
      component: SearchResult
    },
    {
      path: '/paper/info/:paper_id',
      name: 'paper-info',
      component: PaperInfo,
      props: true
    }
  ]
})
