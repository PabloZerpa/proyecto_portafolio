
const baseUrl = process.env.REACT_APP_URL;

export const rutaAuth = `${baseUrl}login/`;
export const rutaAplicacion = `${baseUrl}aplicaciones/`;
export const rutaBaseDatos = `${baseUrl}aplicaciones/`;
export const rutaServidor = `${baseUrl}aplicaciones/`;
export const rutaCustodio = `${baseUrl}aplicaciones/`;
export const rutaUsuario = `${baseUrl}usuarios/`;

export const obtenerUsuario = () => {
    return JSON.parse(localStorage.getItem('user'));
}


// export const host = "https://chat-app-wxyz.herokuapp.com/";
// export const registerRoute = `${host}/api/auth/register`;
// export const loginRoute = `${host}/api/auth/login`;
// export const logoutRoute = `${host}/api/auth/logout`;
// export const setAvatarRoute = `${host}/api/auth/setavatar`;
// export const allUsersRoute = `${host}/api/auth/allusers`;
// export const sendMessageRoute = `${host}/api/messages/addmsg`;
// export const recieveMessageRoute = `${host}/api/messages/getmsg`;


// const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (validateForm()) {
//       const { username, password } = values;
//       const { data } = await axios.post(loginRoute, {
//         username,
//         password,
//       });
    //   if (data.status === false) {
    //     toast.error(data.msg, toastOptions);
    //   }
    //   if (data.status === true) {
    //     localStorage.setItem(
    //       "chat-app-user",
    //       JSON.stringify(data.user)
    //     );

//         navigate("/");
//       }
//     }
//   };