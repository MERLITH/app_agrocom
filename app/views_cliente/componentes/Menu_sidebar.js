
let Menu = {
  render: (usuario, permisos) => {
    
    let html = `
        <!-- sidebar menu: : style can be found in sidebar.less -->
            <ul id="side-menu" class="sidebar-menu" data-widget="tree">
              <li id="sidebar-navegacion" class="header">MENÚ DE NAVEGACIÓN</li><li id="sidebar-rastreo_unidad">
                <a href="#/rastreo_unidad">
                  <i class="fas fa-tachometer-alt-average"></i> &nbsp;&nbsp;<span>Rastreo de Unidades</span>
                </a>
              </li>   
            </ul>            
        `;

        return html;
  },

  after_render: (data_user) => {

    $('#side-menu').fadeIn();

    Menu.tree_initial();
  },

  tree_initial: () => {
    
    $(".sidebar-menu").tree();
    $(".sidebar").slimScroll({
        height: ($(window).height()-50)+'px'
    });
    
    
  },
};

export default Menu;
