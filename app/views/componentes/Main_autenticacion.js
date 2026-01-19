
let Main = {
    render: (data) => {
                
        let html = `                
                <link rel="stylesheet" href="assets/library/ladda/ladda.min.css">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <!--<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" /> -->

                <!-- Icons -->
                <link rel="stylesheet" href="temp/assets/vendor/fonts/materialdesignicons.css" />
                <link rel="stylesheet" href="temp/assets/vendor/fonts/fontawesome.css" />

                <!-- Core CSS -->
                <link rel="stylesheet" href="temp/assets/css/demo.css" />
                <link rel="stylesheet" type="text/css" href="temp/assets/vendor/libs/extensions/toastr.min.css">
                <link rel="stylesheet" type="text/css" href="temp/assets/vendor/libs/extensions/css/ext-component-toastr.css">
                <!-- Vendors CSS -->
                <link rel="stylesheet" href="temp/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />
                <link rel="stylesheet" href="temp/assets/vendor/libs/node-waves/node-waves.css" />
                <link rel="stylesheet" href="temp/assets/vendor/libs/typeahead-js/typeahead.css" />
                <!-- Vendor -->
                <!-- <link rel="stylesheet" href="temp/assets/vendor/libs/formvalidation/dist/css/formValidation.min.css" /> -->

                <link rel="stylesheet" href="temp/assets/vendor/libs/form-validate/form-validation.min.css" />
                <!-- Page CSS -->
                <!-- Page -->
                <link rel="stylesheet" href="temp/assets/vendor/css/pages/page-auth.css" />


                <div id="app"></div>

                <script src="assets/library/sammy/sammy.min.js"></script>                
                <script src="assets/library/ladda/spin.min.js"></script>
                <script src="assets/library/ladda/ladda.min.js"></script>

                
                <!-- <script src="assets/library/form_validate/jquery.form.js"></script>
                <script src="assets/library/form_validate/jquery.validate.js"></script> -->
                <script src="assets/library/jquery-loading-overlay/dist/loadingoverlay.min.js"></script>

                <!-- <script src="temp/assets/vendor/libs/jquery/jquery.js"></script> -->
                <script src="temp/assets/vendor/libs/popper/popper.js"></script>
                <script src="temp/assets/vendor/js/bootstrap.js"></script>
                <script src="temp/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>
                <script src="temp/assets/vendor/libs/node-waves/node-waves.js"></script>

                <script src="temp/assets/vendor/libs/extensions/js/toastr.min.js"></script>
            
                <script src="temp/assets/vendor/libs/hammer/hammer.js"></script>
                <script src="temp/assets/vendor/libs/i18n/i18n.js"></script>
                <script src="temp/assets/vendor/libs/typeahead-js/typeahead.js"></script>
        
                <script src="temp/assets/vendor/libs/formvalidation/dist/js/FormValidation.min.js"></script>
                <script src="temp/assets/vendor/libs/formvalidation/dist/js/plugins/Bootstrap5.min.js"></script>
                <script src="temp/assets/vendor/libs/formvalidation/dist/js/plugins/AutoFocus.min.js"></script> 


                <!-- endbuild -->
                <script src="temp/assets/vendor/libs/form-validate/jquery.validate.min.js"></script>
                <script src="app/config/Helper.js"></script>
                <script src="app/config/Library_init.js"></script>
                
                

        `;  

        return html;

    },

    after_render: async () => {
        
    }
}
export default Main;
