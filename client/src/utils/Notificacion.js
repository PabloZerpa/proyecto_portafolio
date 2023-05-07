
import swal from 'sweetalert';
import Swal from 'sweetalert2';

export const Notificacion = (texto,tipo) => {
  // Swal.fire({
  //   text: `${texto}`,
  //   icon: `${tipo}`,
  //   showConfirmButton: false,
  //   timer: '2000',
  // })
  swal(
    {
        text: `${texto}`,
        icon: `${tipo}`,
        button: false,
        timer: '2000'
    }
  );
}