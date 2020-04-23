import http from 'axios'
import qs from 'querystring';
import router from '@/router'
import Vue from 'vue'


const axios = http.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 1000,
  headers: {'Content-Type': 'application/json'}
});

axios.interceptors.response.use((res) => {
  if (res.data.code && res.data.code === 401) { // 401, token失效
    Vue.prototype.$message.error(res.data.msg);
    setTimeout(()=> {
      router.push('/signin')
    }, 500)
  }
  return res
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.request.use((config) => {
  config.headers['token'] = window.localStorage.getItem('token') || ''
  return config
}, error => {
  return Promise.reject(error)
})

export function post(url, data) {
  return axios.post(url, data)
    .then(function (res) {
      return res.data
    }).catch(function (err) {
      return err
    })
}

export function put(url, data) {
  return axios.put(url, data)
    .then(function (res) {
      return res.data
    }).catch(function (err) {
      return err
    })
}

export function get(url, data) {
  const qstring = qs.stringify(data);
  return axios.get(url+"?"+qstring, )
    .then(function (res) {
      return res.data
    }).catch(function (err) {
      return err
    })
}

export function deleteFetch(url, data) {
  return axios.delete(url, data)
    .then(function (res) {
      return res.data
    }).catch(function (err) {
      return err
    })
}
