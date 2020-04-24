import axios from 'axios';
const ACCESS_KEY = "LQ8z85ChMAsFuOL-A3IwS7TmK7EQcyGZHTucLtEgiAE";
const BASE_URL  = "https://api.unsplash.com/";
const DATA_PER_PAGE = 9;
const config = {
    headers : {
        'Authorization' : "Client-ID "+ACCESS_KEY
    }
};



export const getAxiosConfig = (cancelToken) => {
    if(cancelToken) {
        return {...config,cancelToken}; 
    }
    return config;
}


export const getPhotoList =(reqData,cancelToken= null) => {
    const axiosConfig = getAxiosConfig(cancelToken);
    if(reqData.query) {
        return  getPhotoListByKeywards(reqData,cancelToken);
    } else {
        let URL = BASE_URL+"photos?per_page="+DATA_PER_PAGE+"&page="+reqData.pageNumber;        
        return  axios.get(URL,axiosConfig);
    }    
}


export const getPhotoListByKeywards = (reqData,cancelToken= null) => {
    const axiosConfig = getAxiosConfig(cancelToken);
    let URL = BASE_URL+"search/photos?per_page="+DATA_PER_PAGE+"&page="+reqData.pageNumber+"&query="+reqData.query;
    return axios.get(URL,axiosConfig);
}


export const getRandomPhoto = (cancelToken= null) => {
    const axiosConfig = getAxiosConfig(cancelToken);
    let URL = BASE_URL+"photos/random?orientation=landscape";
    return axios.get(URL,axiosConfig);
}


export const getPhotoById = (photoId,cancelToken=null) =>{
    const axiosConfig = getAxiosConfig(cancelToken);
    let URL = BASE_URL+"/photos/"+photoId;
    return axios.get(URL,axiosConfig);
}

export const downloadImageByURL = (URL,cancelToken) => {
    const axiosConfig = getAxiosConfig(cancelToken);
    const downloadConfig = {...axiosConfig, responseType: 'blob'};
    return axios.get(URL,downloadConfig);
}
