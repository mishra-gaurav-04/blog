import axios from 'axios';
import { API_NOTIFICATION_HANDLER, SERVICE_URLS } from '../constants/config';

const API_URL = 'http://localhost:5000'

const axiosInstance = axios.create({
    baseURL : API_URL,
    timeout : 10000,
    headers : {
        'content-type' : 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    function(config){
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function(response){
        //stop loader
        return processResponse(response);
    },
    function(error){
        // stop loader
        return Promise.reject(processError(error));
    }
);

const processResponse = (response) => {
    if(response.status === 200){
        return {isSuccess : true,data : response.data};
    }
    else{
        return {
            isFailure : true,
            status : response?.status,
            msg : response?.msg,
            code : response?.code
        }
    }
};

const processError = (error) => {
    if(error.response){
        console.log('Response Error',error);
        return {
            isError : true,
            msg : API_NOTIFICATION_HANDLER.responseFailure,
            code : error.response.status
        }
    }
    else if(error.request){
        console.log('Request Error',error);
        return {
            isError : true,
            msg : API_NOTIFICATION_HANDLER.requestFailure,
            code : ""
        }
    }
    else{
        console.log('Netwrok Error',error);
        return {
            isError : true,
            msg : API_NOTIFICATION_HANDLER.networkError,
            code : ""
        }
    }
}

const API = {}

for(const[key,value] of Object.entries(SERVICE_URLS)){
    API[key] = (body,showUploadProgress,showDownloadProgress) => 
        axiosInstance({
            method : value.method,
            url : value.url,
            data : body,
            responseType : value.responseType,
            onUploadProgress : function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded*100)/ProgressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress : function(progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded*100)/ProgressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }

        })
    
}

export {API};