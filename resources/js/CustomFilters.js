import Vue from 'vue';
import moment from 'moment';
import VueProgressBar from 'vue-progressbar'
import Swal from 'sweetalert2'


//Vue filters globally
Vue.filter('capitalize',function(value)
{
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
});
Vue.filter('date', function(value)
{
   return moment(value).format('ll'); 
})

//Vue Progress Bar
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '5px'
  })

//Vue Sweet Alert Things
window.Swal = Swal;
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });
window.Toast = Toast;
//-----------------------yes or no sweet alert dialog box



