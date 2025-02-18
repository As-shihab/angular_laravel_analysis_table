import Swal from "sweetalert2";

export const SuccessAlert=(title :string , text: string)=>{
  Swal.fire({
        title: title,
        text: text,
        icon: 'success',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        showCancelButton: undefined,
        showCloseButton: undefined,
      });
}


