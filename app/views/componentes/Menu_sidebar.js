
let Menu = {
  render: (usuario, permisos) => {
    
    let html = `

    <ul id="side-menu">
      <li id="sidebar-inicio"><a href="#/inicio">Inicio</a></li>
      <li id="sidebar-tienda"><a href="#/tienda">Tienda</a></li>
      <li class="dropdown"><a href="#"><span>Categías</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
        <ul>
          <li><a href="#/categoria/1">Veterinaria</a></li>
          <li><a href="#/categoria/2">Agricultura</a></li>
        </ul>
      </li>
      <li id="sidebar-contacto"><a href="#/contacto">Contacto</a></li>
    </ul>

    `;

    return html;
  },

  after_render: (data_user) => {

    
    // if(data_user.usuario.tipo != 'SUPER ADMINISTRADOR' && data_user.usuario.tipo != 'SUPER USUARIO')
    // {
    //     let json_permisos = data_user.permisos;

    //     let sidebar = $('#side-menu li');

    //     /** ELIMINAR SUB MODULOS */
    //     sidebar.each(function(index, value) {

    //         let encontrado = false;

    //         json_permisos.forEach(row => {

    //             if($(value).attr("id") == 'sidebar-'+row.menu && row.view == 1)
    //             {
    //                 encontrado = true;                  
    //             }

    //         });
            
    //         if(encontrado == false)
    //         {
    //             let menu = $(value).attr("id");
                 
    //             let particion = menu.split("-");
                
    //             if(particion.length == 3)
    //             {
    //                 $(value).remove();
                    
                    
    //             }
            
    //         }
            
    //     });

    //     /** ELIMINAR MODULOS */
    //     let sidebar_delete = $('#side-menu li[name="modulo"]');

    //     sidebar_delete.each(function(index, value) {
            
    //         let id = $(value).attr("id");
            
    //         if($('#'+id+' li').length == 0)
    //         {
    //         $('#'+id).remove();
    //         }
            

    //     });
    // }

    // $('#side-menu').fadeIn();
    // Menu.tree_initial();


  },

  tree_initial: () => {

  },

};

export default Menu;
