import {post, get, deleteFetch} from "./index";

export default {
  signup: function (data) {
    return post( '/signup', data)
  },
  signin: function (data) {
    return post( '/signin', data)
  },
  essay: function (data) {
    return get( '/posts/'+data.essayId, data)
  },
  essayList: function (data) {
    return get( '/posts/essayList', data)
  },
  essayCreate: function (data) {
    return post( '/posts/create', data)
  },
  comment: function (data) {
    return post( '/comments', data)
  },
  commentRemove: function (data) {
    return deleteFetch( '/comments/'+data.commentId, data)
  },
  commentList: function (data) {
    return get( '/comments/'+data.essayId, data)
  }
}