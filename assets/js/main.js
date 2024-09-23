const showLoad = (title = '', text = '')=>{
    return new Promise((resolve, reject) => {
        Swal.fire({
            didOpen: ()=>{
                Swal.showLoading();
                resolve();
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            title: title,
            text: text,
        })
    });
};
const hideLoad = ()=>{
    Swal.close();
};
const showError = (title = '', text = '')=>{
    Swal.close();
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
    })
};
const showSuccess = (title = '', text = '')=>{
    return new Promise((resolve, reject) => {
        Swal.fire({
            icon: 'success',
            title: title,
            text: text,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            // timerProgressBar: true,
            timer: 1300
        });
        setTimeout(()=>{resolve();}, 1300);
    })
};
const alertInput = (title='', text='', value='', type='text', placeholder='', preConfirm=undefined)=>{
    Swal.close();
    return new Promise((resolve, reject) => {
        return Swal.fire({
            title: title,
            text: text,
            input: type,
            inputValue: value,
            inputPlaceholder: placeholder,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showCancelButton: true,
            confirmButtonText: "確定",
            cancelButtonText: "取消",
            showLoaderOnConfirm: preConfirm!==undefined,
            preConfirm: preConfirm,
        }).then((res)=>{
            resolve(res);
        })
    })
};
const r = (f)=>{if(document.readyState!=='loading'){f();}else{document.addEventListener('DOMContentLoaded',f);}}
const roundTo = ( num, decimal )=>{ return Math.round( ( num + Number.EPSILON ) * Math.pow( 10, decimal ) ) / Math.pow( 10, decimal ); }