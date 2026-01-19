

 let DOM, DOM_ID ;

 let Componente = {
     render: async (d, data) => {
         
         $('#main').off();
         d.innerHTML = `       
        <div id="main">

          <section id="contact-2" class="contact-2 section">

            <div class="container aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">

              <!-- Contact Info Boxes -->
              <div class="row gy-4 mb-5">
                <div class="col-lg-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                  <div class="contact-info-box">
                    <div class="icon-box">
                      <i class="bi bi-geo-alt"></i>
                    </div>
                    <div class="info-content">
                      <h4>Nuestra direcci&oacute;n</h4>
                      <p>La Jalca, Chachapoyas, Amazonas</p>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
                  <div class="contact-info-box">
                    <div class="icon-box">
                      <i class="bi bi-envelope"></i>
                    </div>
                    <div class="info-content">
                      <h4>Email</h4>
                      <p>aracelymerlith@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay="300">
                  <div class="contact-info-box">
                    <div class="icon-box">
                      <i class="bi bi-headset"></i>
                    </div>
                    <div class="info-content">
                      <h4>Horario de atenci&oacute;n</h4>
                      <p>Lunes-Viernes: 9 AM - 6 PM</p>
                      <p>S&aacute;bado: 9 AM - 4 PM</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <!-- Google Maps (Full Width) -->
            <div class="map-section aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13334.268061886914!2d-77.82415962917577!3d-6.48343433220748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91b144e8d2dc391f%3A0x11ccb0316e7a154c!2sLa%20Jalca%2001440!5e0!3m2!1ses-419!2spe!4v1764435204241!5m2!1ses-419!2spe" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              <!-- <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus" width="100%" height="500" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>-->
            </div>

            <!-- Contact Form Section (Overlapping) -->
            <div class="container form-container-overlap">
              <div class="row justify-content-center aos-init aos-animate" data-aos="fade-up" data-aos-delay="300">
                <div class="col-lg-10">
                  <div class="contact-form-wrapper">
                    <h2 class="text-center mb-4">Ponte en contacto</h2>

                    <form class="php-email-form" id="form_save" name="form_save">
                      <div class="row g-3">
                        <div class="col-md-12">
                          <div class="form-group">
                            <div class="input-with-icon">
                              <i class="bi bi-person"></i>
                              <input type="text" class="form-control" name="nombres" placeholder="Nombres">
                            </div>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <div class="input-with-icon">
                              <i class="bi bi-envelope"></i>
                              <input type="email" class="form-control" name="email" placeholder="Email">
                            </div>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <div class="input-with-icon">
                              <i class="bi bi-telephone"></i>
                              <input type="text" class="form-control" name="telefono" placeholder="Celular">
                            </div>
                          </div>
                        </div>

                        <div class="col-md-12">
                          <div class="form-group">
                            <div class="input-with-icon">
                              <i class="bi bi-text-left"></i>
                              <input type="text" class="form-control" name="asunto" placeholder="Asunto">
                            </div>
                          </div>
                        </div>

                        <div class="col-12">
                          <div class="form-group">
                            <div class="input-with-icon">
                              <i class="bi bi-chat-dots message-icon"></i>
                              <textarea class="form-control" name="mensaje" placeholder="Escribir mensaje" style="height: 180px"></textarea>
                            </div>
                          </div>
                        </div>

                        <div class="col-12">
                          <div class="loading">Loading</div>
                          <div class="error-message"></div>
                          <div class="sent-message">Tu mensaje ha sido enviado. ¡Gracias!</div>
                        </div>

                        <div class="col-12 text-center">
                          <button type="submit" class="btn btn-primary btn-submit">ENVIAR MENSAJE</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

            </div>

          </section>

        </div>    
         `;
 
         await Componente.after_render();       
         
     },
 
     after_render: async () => {
 
         DOM_ID = '#main';
         DOM = $(DOM_ID);  
         
         Componente.validarForm();
 
         HELPER.load_component();
    },



    validarForm: function () {

        // let idform = 'form_save';

        // var arrayFields = [
        //     {field: 'nombres', message: 'Por favor, este campo es requerido'},
        //     {field: 'email', message: 'Por favor, este campo es requerido'},
        //     {field: 'telefono', message: 'Por favor, este campo es requerido'},
        //     {field: 'asunto', message: 'Por favor, este campo es requerido'},
        //     {field: 'mensaje', message: 'Por favor, este campo es requerido'},
        // ];

        // var fields = $.frmValidation_convertir_fields_simple(arrayFields);

        // var fv = $.frmValidation(idform, fields);
        // DOM.off('click', '#' + idform + ' button[type="submit"]');
        // DOM.on('click', '#' + idform +' button[type="submit"]', function(e) {
        //     e.preventDefault();
        //     fv.validate().then(function (status) {  
        //         if (status === 'Valid') {
        //             Componente.save();
        //         }
        //     });           
        // });



        var form = document.getElementById('form_save');
        var submitButton = form.querySelector('[type="submit"]');

        var fv = FormValidation.formValidation(form, {
            fields: {
                nombres: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor, este campo es requerido',
                        },
                    },
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor, este campo es requerido',
                        },
                        emailAddress: {
                            message: 'Deber ingresar un email válido',
                        }
                    },
                },
                telefono: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor, este campo es requerido',
                        },
                    },
                },
                asunto: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor, este campo es requerido',
                        },
                    },
                },
                mensaje: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor, este campo es requerido',
                        },
                    },
                },
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                fieldStatus: new FormValidation.plugins.FieldStatus({
                    onStatusChanged: function (areFieldsValid) {
                        areFieldsValid
                            ? submitButton.removeAttribute('disabled')
                            : submitButton.setAttribute('disabled', 'disabled');
                    }
                }),
                bootstrap5: new FormValidation.plugins.Bootstrap5({
                    eleValidClass: '',
                    rowSelector: '.input-with-icon'
                }),
                submitButton: new FormValidation.plugins.SubmitButton(),
                autoFocus: new FormValidation.plugins.AutoFocus(),
            },
        });

        submitButton.addEventListener('click', function (event) {
            event.preventDefault();
            fv.validate().then(function (status) {  
                if (status === 'Valid') {
                    Componente.save();
                    form.reset();
                    fv.resetForm();
                }
            });
        });


    },

    save: async function() {

      let ladda = HELPER.ladda(DOM_ID+' form[name="form_save"] button[type="submit"]');
      let formData = new FormData(document.querySelector(DOM_ID+' form[name="form_save"]'));

      let id_usuario = GLOBAL.usuario ? GLOBAL.usuario.id: null;

      if(id_usuario){
        formData.append('id_usuario', id_usuario);
      }

      let resp = await $.postData('publico/mensaje_contacto/save', formData);
      if (resp && resp.tipo == 'success') {

          HELPER.notificacion_v2(resp.mensaje, 'success');
          // setTimeout(() => {
          //     location.href = "#/inicio";
          // }, 3000);

          ladda.stop();

      }else{
        ladda.stop();
      }
     
    },

 
 
 
 
 } 
 
 export default Componente;