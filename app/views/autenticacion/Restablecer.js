
let Login = {

    render: async (d, salt) => {  

        d.innerHTML = await `<div name="login">
                            <div class="wrapper fadeInDown">
                                <div id="formContent">
                                <!-- Tabs Titles -->                              
                            
                                <!-- Icon -->
                                <div class="fadeIn first">
                                    <img src="assets/images/logo_login.png" id="icon" alt="User Icon" style="max-width:200px; margin-top:40px;" />
                                </div>
                                
                                <h2 style="margin-top:10px;">Establecer nueva Contraseña</h2>
                                
                                <div id="mensaje_final"></div>
                                <!-- Login Form -->
                                <form id="formulario_login">
                                    <input type="text" class="fadeIn second" name="password" placeholder="Nueva contraseña" autocomplete="off" required>
                                    <button type="submit" id="btn-login" class="fadeIn fourth" data-style="zoom-in" >Restablecer Contraseña</button>
                                </form>
                            
                                <!-- Remind Passowrd -->
                                <div id="formFooter">
                                    <a class="underlineHover" href="#/login">Tengo mi cuenta</a>
                                </div>
                                </div>
                            </div>
                        </div>`;
        
        Login.after_render();
        Login.salt = salt;

    },

    submit: () => {

        const ladda = HELPER.ladda('#btn-login');

        let form = document.querySelector('#formulario_login');
        var formData = new FormData(form);

        formData.append('salt', Login.salt);
        
        axios({
            method: 'post',
            url: BASE_API+'autenticacion/restablecer',
            data: formData
        })
        .then(function(response) {
            
            localStorage.setItem('Token', response.data.Token);
            location.href = BASE_URL;
            
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