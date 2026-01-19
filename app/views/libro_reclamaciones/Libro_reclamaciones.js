

 let DOM, DOM_ID ;

 let Componente = {
     render: async (d, data) => {
         
         $('#main').off();
         d.innerHTML = `       
        <div id="main">

          <section id="contact-2" class="contact-2 section">  

            <!-- Contact Form Section (Overlapping) -->
            <div class="container">
              <div class="row justify-content-center aos-init aos-animate" data-aos="fade-up" data-aos-delay="300">
                <div class="col-lg-10">
                  <div class="contact-form-wrapper">
                    <h2 class="text-center mb-4"><i class="bi bi-book"></i> Libro de reclamaciones</h2>

                    <form class="php-email-form" id="form_save" name="form_save">
                      <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Nombres</label>
                            <input type="text" class="form-control" name="nombres">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" name="email">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Teléfono</label>
                            <input type="text" class="form-control" name="telefono">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Tipo Documento</label>
                            <select class="form-control" name="id_tipo_documento">
                                <option value="">Seleccione</option>
                                <option value="1">DNI</option>
                                <option value="4">Carnet Extranjería</option>
                                <option value="3">Pasaporte</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">N° Documento</label>
                            <input type="text" class="form-control" name="numero_documento">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Tipo</label>
                            <select class="form-control" name="id_tipo">
                                <option value="">Seleccione</option>
                                <option value="1">Reclamo</option>
                                <option value="2">Queja</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Bien Contratado</label>
                            <input type="text" class="form-control" name="bien_contratado">
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Descripción del hecho</label>
                            <textarea class="form-control" name="descripcion" rows="4"></textarea>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Pedido del consumidor</label>
                            <textarea class="form-control" name="pedido" rows="3"></textarea>
                        </div>
                        <div class="col-12 text-center mt-3">
                            <button type="submit" class="btn btn-primary btn-submit">Enviar</button>
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

        var form = document.getElementById('form_save');
        var submitButton = form.querySelector('[type="submit"]');

        var fv = FormValidation.formValidation(form, {
            fields: {
                nombres: { validators: { notEmpty: { message: 'Campo requerido'} } },
                email: { validators: { notEmpty:{message:'Campo requerido'}, emailAddress:{message:'Correo inválido'} } },
                telefono: { validators: { notEmpty:{message:'Campo requerido'} } },
                id_tipo_documento: { validators: { notEmpty:{message:'Campo requerido'} } },
                numero_documento: { validators: { notEmpty:{message:'Campo requerido'} } },
                id_tipo: { validators: { notEmpty:{message:'Campo requerido'} } },
                bien_contratado: { validators: { notEmpty:{message:'Campo requerido'} } },
                descripcion: { validators: { notEmpty:{message:'Campo requerido'} } },
                pedido: { validators: { notEmpty:{message:'Campo requerido'} } },
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
                bootstrap5: new FormValidation.plugins.Bootstrap5(),
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

      let resp = await $.postData('publico/libro_reclamaciones/save', formData);
      if (resp && resp.tipo == 'success') {

          HELPER.notificacion_v2(resp.mensaje, 'success');
          ladda.stop();

      }else{
        ladda.stop();
      }
     
    },

 
 
 
 
 } 
 
 export default Componente;