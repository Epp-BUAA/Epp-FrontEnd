// api.js
import Vue from 'vue'
import axios from 'axios'
axios.defaults.withCredentials = true

Vue.prototype.$axios = axios
const baseURL = 'http://114.116.214.56:8000/api/'

const api = axios.create({
  baseURL,
  timeout: 5000 // 设置超时时间
})

export const login = async (params) => {
  try {
    console.log(params)
    const response = api.post('login', params)
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export const register = async (params) => {
  try {
    console.log(params)
    const response = api.post('sign', params)
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.response.data.message)
    // throw new Error(error.response.data.message)
  }
}

export const fetchCollectedPapers = () => {
  try {
    console.log('fetchCollectPapers')
    const response = api.get('userInfo/collectedPapers')
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export const fetchSearchHistory = () => {
  try {
    console.log('fetchSearchHistory')
    const response = api.get('userInfo/searchHistory')
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export const fetchReports = () => {
  try {
    console.log('fetchReports')
    const response = api.get('userInfo/summaryReports')
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}
