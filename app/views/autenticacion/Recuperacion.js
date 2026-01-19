

let Login = {

    render: async (d) => {  

        d.innerHTML = await `<div name="login" class="text-center">
                                <div class="wrapper fadeInDown">
                                    <div id="formContent">
                                        <!-- Tabs Titles -->                              
                                    
                                        <!-- Icon -->
                                        <div class="fadeIn first">
                                            <img src="assets/images/logo_login.png" id="icon" alt="User Icon" style="max-width:200px; margin-top:40px;" />
                                        </div>
                                        
                                        <h2 style="margin-top:10px;"> RECUPERAR CUENTA</h2>
                                        
                                        <div id="mensaje_final"></div>
                                        <!-- Login Form -->
                                        <form id="formulario_login">
                                            <input type="email" class="fadeIn second" name="email" placeholder="Correo electrónico" autocomplete="off" required>
                                            <button type="submit" id="btn-login" class="fadeIn fourth" data-style="zoom-in" >Solicitar Recuperación</button>
                                        </form>
                                    
                                        <!-- Remind Passowrd -->
                                        <div id="formFooter">
                                            <a class="underlineHover" href="#/login">Tengo mi cuenta</a>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
        
        Login.after_render();

    },

    submit: () => {

        const ladda = HELPER.ladda('#btn-login');

        let form = document.querySelector('#formulario_login');
        var formData = new FormData(form);
        
        axios({
            method: 'post',
            url: BASE_API+'autenticacion/recuperar',
            data: formData
        })
        .then(function(response) {
            
            $('#mensaje_final').text(response.data.mensaje);
            $('#formulario_login').remove();
            
        }).catch(error => {
            ladda.stop();
        });

    },

    after_render: async () => {

        /** SUBMIT SAVE */
        $('#formulario_login').validate({
            submitHandler: function() {
                Login.submit()
            }
        });      
        
    }
}


export default Login;