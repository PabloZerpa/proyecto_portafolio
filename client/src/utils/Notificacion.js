
import swal from 'sweetalert';

export const Notificacion = (texto,tipo) => {
  swal(
    {
        text: `${texto}`,
        icon: `${tipo}`,
        button: false,
        timer: '2000'
    }
  );
}

