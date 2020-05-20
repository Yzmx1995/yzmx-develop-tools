import Vue from 'vue';

function GENERATE_TYPESET_JSON(params = {}) {
    return Vue.http.post('/generate-typeset-array', params, {
        responseType:'blob',
        onDownloadProgress (a){
            console.log(a, 'a')
        }
    });
}

export { GENERATE_TYPESET_JSON };