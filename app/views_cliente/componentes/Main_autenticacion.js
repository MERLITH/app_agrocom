
let Main = {
    render: (data) => {
                
        let html = `                
                <link rel="stylesheet" href="assets/css/autenticacion.css">
                <link rel="stylesheet" href="assets/library/ladda/ladda.min.css">
                

                <div id="app"></div>

                <script src="assets/library/sammy/sammy.min.js"></script>                
                <script src="assets/library/ladda/spin.min.js"></script>
                <script src="assets/library/ladda/ladda.min.js"></script>
                <script src="assets/library/form_validate/jquery.form.js"></script>
                <script src="assets/library/form_validate/jquery.validate.js"></script>
                <script src="assets/library/jquery-loading-overlay/dist/loadingoverlay.min.js"></script>
                <script src="assets/library/bootstrap-notify.min.js"></script>
                <script src="assets/library/node_modules/sweetalert/dist/sweetalert.min.js"></script>
                <script src="app/config/Helper.js"></script>
                <script src="app/config/Library_init.js"></script>
                
                <style>
                    
                    .alert {
                        width:450px !important;
                        border-radius:10px;
                        padding:15px;
                        text-align:center;
                    }

                    .alert button{
                        width:40px;
                        margin:0;
                        padding:5px;
                        font-size:18px;
                        float:right;
                    }
                    
                    .alert-warning {
                        color: #8a6d3b;
                        background-color: #fcf8e3;
                        border-color: #faebcc
                    }
                    
                    .alert-warning hr {
                        border-top-color: #f7e1b5
                    }
                    
                    .alert-warning .alert-link {
                        color: #66512c
                    }
                    `;

                    if(data.general.fl_bg_login == 1)
                    {
                        html += `
                        html{
                            background: -webkit-linear-gradient(rgba(234,90,38,.1),rgba(234,90,38,.1)),url(`+BASE_FILES+'images/'+data.general.bg_login+`);
                        }
                        `
                    }
                    
                   html += `

                </style>

        `;  

        return html;

    },

    after_render: async () => {
        
        
    }
}
export default Main;
