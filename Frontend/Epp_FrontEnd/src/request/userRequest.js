// api.js
import Vue from 'vue'
import axios from 'axios'
// import { cat } from 'shelljs'
axios.defaults.withCredentials = true

Vue.prototype.$axios = axios
const baseURL = 'https://epp.buaase.cn/api/'

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

export const logout = async () => {
  try {
    const response = api.get('logout')
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

export const fetchCollectedPapers = async () => {
  console.log('fetchCollectPapers')
  return api.get('userInfo/collectedPapers')
    .then(response => {
      console.log(response)
      return response
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

export const deleteCollectedPapers = async (data) => {
  try {
    console.log('deleteCollectPapers')
    const response = api.delete('userInfo/delCollectedPapers', data)
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export const deleteReport = async (data) => {
  try {
    console.log('deleteReport')
    const response = api.delete('userInfo/delSummaryReports', data)
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export const fetchSearchHistory = async () => {
  try {
    console.log('fetchSearchHistory')
    const response = api.get('userInfo/searchHistory')
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}
export const deleteSearchHistory = async (params) => {
  try {
    console.log('deleteReport')
    const response = api.delete('userInfo/delSearchHistory', params)
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export const fetchReports = async () => {
  try {
    console.log('fetchReports')
    const response = api.get('userInfo/summaryReports')
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export const fetchUserInfo = async () => {
  try {
    console.log('fetchInfo')
    const response = api.get('userInfo/userInfo')
    console.log(response)
    return response
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data.message)
  }
}
export const fetchChat = async () => {
  try {
    console.log('fetchChat')
    const response = api.get('userInfo/paperReading')
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}
export const deleteChat = async (data) => {
  try {
    console.log('deleteChat')
    console.log(data)
    const response = api.delete('userInfo/delPaperReading', data)
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}
export const fetchDocument = async () => {
  try {
    console.log('fetchDocument')
    const response = api.get('userInfo/documents')
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}
export const uploadDocument = async (formData) => {
  try {
    console.log('uploadDocument')
    console.log(formData)
    const response = await api.post('uploadPaper', formData)
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}
export const deleteDocument = async (params) => {
  try {
    console.log('deleteDocument')
    const response = api.post('removeUploadedPaper', params)
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}
export const fetchNotification = async (mode) => {
  try {
    console.log('fetchNotification')
    console.log(mode)
    const response = api.get('userInfo/notices', mode)
    console.log('response')
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}
export const deleteNotification = async (data) => {
  try {
    console.log('deleteDocument')
    const response = api.delete('userInfo/delNotices', data)
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}
export const readNotification = async (data) => {
  try {
    console.log('readNotification')
    const response = api.post('userInfo/readNotices', data)
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}
export const fetchReportContent = async (params) => {
  try {
    console.log(params)
    console.log('fetchReportContent')
    const response = api.get('userInfo/getSummary', params)
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}
