const datosAlmacenados = () =>{
    if (localStorage.getItem('empleados') == null ){
        return [{ 
            nombre: 'Luis',
            apellido : 'Sulbaran',
            edad: 21
        },
        { 
            nombre: 'Leonardo ',
            apellido : 'Gozalez',
            edad: 21
        },
        { 
            nombre: 'Oscar',
            apellido : 'Castillo',
            edad: 25
        }
         ]
    } else {
       return JSON.parse(localStorage.getItem('empleados'))
    }
}
const app = new Vue({
    el: '#app' ,
    data: {
        indice : null ,
        banderaEditar : false ,
        empleadosTotales : 0 ,
        bandera: false ,
        titulo : 'Empelados de EMQU en Puerto Ordaz',
        empleados : datosAlmacenados() 
     ,
         nuevoEmpleado : {
             nombre : '' ,
             apellido :'' ,
             edad : ''
          },

          editarEmpleado : {
            nombre : '' ,
            apellido :'' ,
            edad : ''
         }
        },
    methods : {
        agregarEmpleado () {
            if(this.nuevoEmpleado.nombre === '' || this.nuevoEmpleado.apellido === '' || this.nuevoEmpleado.edad == ''){
               // alert('Complete todos los campos para continuar') ;
              this.bandera = true ;
            }else {
               this.bandera = false
               this.empleados.push({
                    nombre : this.nuevoEmpleado.nombre ,
                    apellido : this.nuevoEmpleado.apellido ,
                    edad : this.nuevoEmpleado.edad
                })
               this.nuevoEmpleado = {
                   nombre: '' ,
                   apellido: '' ,
                   edad: ''
               }
               localStorage.setItem('empleados' , JSON.stringify(this.empleados));
            }
        } ,
        borrarEmpleado (empleado) {
            this.empleados = this.empleados.filter( nuevaListaDeEmpleados => nuevaListaDeEmpleados != empleado  ) ;
            localStorage.setItem('empleados' , JSON.stringify(this.empleados));
        } ,
        editarEmpleados (empleado) {
            this.banderaEditar = true ;
            this.editarEmpleado = {
                nombre: empleado.nombre ,
                apellido: empleado.apellido ,
                edad : empleado.edad 
            }
            this.indice = this.empleados.indexOf(empleado) ; 
            console.log(this.indice)
            
        } ,
        guardarEmpleadoEditado () {
            this.empleados.splice(this.indice , 1 , this.editarEmpleado) ;
            this.banderaEditar = false ;
            this.nuevoEmpleado = {
                nombre :'' ,
                apellido : '' ,
                edad  : ''
            }
            localStorage.setItem('empleados' , JSON.stringify(this.empleados));

        }
    },
    computed : {
        sumarEmpleados () {
           this.empleadosTotales = this.empleados.length ;
            return this.empleadosTotales ;
        }
    }



}) 