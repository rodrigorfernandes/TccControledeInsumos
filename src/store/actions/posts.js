import {ADD_POST, SET_POSTS} from './actionTypes';
import axios from 'axios';


export const addPost = post => {
    return dispatch => {
        
        axios({
            url: 'uploadImage',
            baseURL: 'https://us-central1-tcc-de-controle-de-obra.cloudfunctions.net/uploadImage',
            method: 'post',
            data: {
                image: post.image.base64
            }
        })
            .catch(err => console.log(err))
            .then(resp => {
                post.image = resp.data.imageUrl
                axios.post(`/posts.json`, { ...post })
                    .catch(err => console.log(err))
                    .then(res => console.log(res.data))
            })

    } 
}
export const setPosts = posts => {
    return {
        type: SET_POSTS, 
        payload: posts
    }
}

export const fetchPosts = () => {
    return dispatch => { 
        axios.get('/posts.json')
            .catch(err => console.log(err))
            .then(res => {
                const rawPosts = res.data
                const posts = []
                for (let key in rawPosts){
                    posts.push({
                        ...rawPosts[key],
                        id: key
                    })
                }
                dispatch(setPosts(posts))
            })
    }
}