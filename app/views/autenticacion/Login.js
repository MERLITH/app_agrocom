
let Login = {

    render: async (d, data) => {  

        var logo_sistema = BASE_URL+'/assets/images/icono.png';
        var banner_loggin = BASE_URL+'/assets/images/banner-login.png'; //temp/assets/img/illustrations/auth-login-illustration-light.png"


        d.innerHTML = await `
                        <div class="authentication-wrapper authentication-cover" name="login">
                            <!-- Logo -->
                            <a href="index.html" class="auth-cover-brand d-flex align-items-center gap-2">
                                <span class="app-brand-logo demo">
                                    <span style="color: var(--bs-primary)">
                                        <img src="`+logo_sistema+`" width="30" height="30" alt="">
                                    </span>
                                </span>
                                <span class="app-brand-text demo text-heading fw-bold">AgroCom</span>
                            </a>
                            <!-- /Logo -->
                            <div class="authentication-inner row m-0">
                                <!-- /Left Section -->
                                <div class="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center justify-content-center p-5 pb-2">
                                    <img src="`+banner_loggin+`"
                                        class="auth-cover-illustration w-100" alt="auth-illustration"
                                        data-app-light-img="illustrations/auth-login-illustration-light.png"
                                        data-app-dark-img="illustrations/auth-login-illustration-dark.png" />
                                        <!--<img src="temp/assets/img/illustrations/auth-cover-login-mask-light.png" class="authentication-image"
                                        alt="mask" data-app-light-img="illustrations/auth-cover-login-mask-light.png"
                                        data-app-dark-img="illustrations/auth-cover-login-mask-dark.png" />-->
                                </div>
                                <!-- /Left Section -->
                        
                                <!-- Login -->
                                <div
                                    class="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg position-relative py-sm-5 px-4 py-4">
                                    <div class="w-px-400 mx-auto pt-5 pt-lg-0">
                                        <h4 class="mb-4 fw-semibold">Bienvenido a <span class="text-primary">AgroCom!</span> 👋</h4>
                                        <p class="mb-4 d-none">Please sign-in to your account and start the adventure</p>
                        
                                        <form id="formulario_login" class="mb-3">
                                            <div class="form-floating form-floating-outline mb-3">
                                                <input type="text" class="form-control" id="usuario" name="usuario"
                                                    placeholder="Ingrese su usuario" autofocus  />
                                                <label for="usuario">Usuario</label>
                                            </div>
                                            <div class="mb-3">
                                                <div class="form-password-toggle">
                                                    <div class="input-group input-group-merge">
                                                        <div class="form-floating form-floating-outline">
                                                            <input type="password" id="password" class="form-control" name="password"
                                                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                                                aria-describedby="password"  />
                                                            <label for="password">Contraseña</label>
                                                        </div>
                                                        <span class="input-group-text cursor-pointer"><i
                                                                class="mdi mdi-eye-off-outline"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mb-3 d-flex justify-content-between">
                                                <a href="#/recuperacion" class="float-end mb-1">
                                                    <span>Olvidaste tu contraseña?</span>
                                                </a>
                                            </div>
                                            <button type="submit" class="btn btn-primary d-grid w-100" name="btn_submit" id="btn-login">Iniciar sesión</button>
                                        </form>
                        
                        
                                    </div>
                                </div>
                                <!-- /Login -->
                            </div>
                        </div>
                        `;
        
        Login.after_render();

    },

    submit: () => {

        const ladda = HELPER.ladda('#btn-login');
        let form = document.querySelector('#formulario_login');
        var formData = new FormData(form);

        axios({
            method: 'post',
            url: BASE_API+'autenticacion/login',
            data: formData
        })
        .then(function(response) {

            localStorage.setItem('Token', response.data.Token);
            location.href = BASE_URL;
            
        }).catch(error => {
            console.log(error);
            ladda.stop();
        });

    },

    after_render: async () => {

        $('#template-customizer').hide();

        // Auto update layout based on screen size
        window.Helpers.setAutoUpdate(true);
        // Toggle Password Visibility
        window.Helpers.initPasswordToggle();
        // Speech To Text
        window.Helpers.initSpeechToText();
        // Nav tabs animation
        window.Helpers.navTabsAnimation();
        // Init PerfectScrollbar in Navbar Dropdown (i.e notification)
        window.Helpers.initNavbarDropdownScrollbar();


        /** SUBMIT SAVE */
        Login.validar_formLogin();   
    },

    validar_formLogin: function () {

        var form = document.getElementById('formulario_login');
        var submitButton = form.querySelector('[name="btn_submit"]');

        var fv = FormValidation.formValidation(form, {
            fields: {
                usuario: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor, ingrese su usuario',
                            
                        },
                    },
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'Ingrese su contraseña',
                        },
                        stringLength: {
                            min: 4,
                            max: 30,
                            message: 'Este campo debe tener más de 4 y menos de 30 caracteres'
                        },
                    },
                },
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                fieldStatus: new FormValidation.plugins.FieldStatus({
                    onStatusChanged: function (areFieldsValid) {
                        areFieldsValid
                            // Enable the submit button
                            // so user has a chance to submit the form again
                            ? submitButton.removeAttribute('disabled')
                            // Disable the submit button
                            : submitButton.setAttribute('disabled', 'disabled');
                    }
                }),
                // bootstrap5: new FormValidation.plugins.Bootstrap5({
                //     eleValidClass: '',
                //     rowSelector: function (field, element) {
                //         if (element.closest('table')) {
                //             return 'td';
                //         } else {
                //             return 'div';
                //         }
                //     },
                // }),  
                bootstrap5: new FormValidation.plugins.Bootstrap5({
                    eleValidClass: '',
                    rowSelector: '.mb-3'
                }),
                submitButton: new FormValidation.plugins.SubmitButton(),
                autoFocus: new FormValidation.plugins.AutoFocus(),
            },
        });

        submitButton.addEventListener('click', function (event) {
            event.preventDefault();
            // event.stopPropagation();
            // event.stopImmediatePropagation();
            fv.validate().then(function (status) {  
                if (status === 'Valid') {
                    Login.submit();
                    form.reset();
                    fv.resetForm();
                }
            });
        });

      
    },

}


export default Login;