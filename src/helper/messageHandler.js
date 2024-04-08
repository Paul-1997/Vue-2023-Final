import Swal from 'sweetalert2';

// 錯誤訊息回饋
function showErrorMsg(msg) {
  Swal.fire({
    title: 'Error!',
    text: msg,
    icon: 'error',
    confirmButtonText: 'Ok',
  });
}
// 狀態toast
function showStatusMsgToast(msg, icon = 'success', option = {}) {
  Swal.fire({
    icon,
    toast: true,
    text: msg,
    timer: 1500,
    showConfirmButton: false,
    position: 'top-end',
    background: '#d3e8d3',
    padding: '.75rem 1rem',
    ...option,
  });
}

export { showErrorMsg, showStatusMsgToast };
