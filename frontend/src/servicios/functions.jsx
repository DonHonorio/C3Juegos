import Swal from 'sweetalert2';
import storage from '../Storage/storage';

export const show_alerta = (msj, icon) => {
  Swal.fire({ title:msj, icon:icon, buttonsStyling:true });
}

export const sendRequest = async(method, params, url, redir='',alerta=false, token=true) => {
  if(token){
    const authToken = storage.get('authToken');
    axios.defaults.headers.common['Authorization'] = 'Bearer '+authToken;
  }
  // 'res' = respuesta, pero está escrita así para distinguirla de 'response'
  let res;
  await axios({ method:method, url:url, data:params }).then(
    response => {

      res = response.data,
      setTimeout( () =>
        (redir !== '') ? window.location.href = redir : '', 2000)
    }).catch( (errors) => {
      let desc='';
      res = errors.response.data,
      // console.log(errors.response.data.errors),
      errors.response.data.errors.map( (e) => {desc = desc + ' \n'+e} )
      show_alerta(desc, 'error');
    })
    return res;
}

export const confirmation = async(name, url, redir) => {
  const alert = Swal.mixin({buttonsStyling:true});
  alert.fire({
    title: 'Are you sure delete '+name+' ?',
    icon: 'question', showCancelButton: true,
    confirmButtonText:'<i class="fa-solid fa-check"></i> Yes, delete',
    cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancel',
  }).then( (result) => {
    if(result.isConfirmed){
      sendRequest('DELETE',{},url, redir);
    }
  });
}

export function normalizarValoracionJuego(valorBruto) {
  valorBruto = Number(valorBruto).toFixed(1);
  return (valorBruto.toString().length === 1 && valorBruto.toString() != 0) ? valorBruto.toString().concat(',0') 
                                                                            : valorBruto.toString().replace('.', ',');
}

export function normalizarFormatoFecha(valorBruto) {
  let fecha = new Date(valorBruto);
  let dia = String(fecha.getDate()).padStart(2, '0');
  let mes = String(fecha.getMonth() + 1).padStart(2, '0');
  let anio = fecha.getFullYear();
  return dia+'/'+mes+'/'+anio;
}

export default sendRequest;