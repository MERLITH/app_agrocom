"use strict";

import Config    from '../../config.js'
import Main    from './Main.js'

const init = async () => { 

    window.BASE_URL = Config.base_url;
    window.BASE_API = Config.base_api;
    window.BASE_FILES = Config.base_files;
    window.BASE_FILES_ADMIN = Config.base_files_admin;

    // Main System
    Main.initialize();    
  
} 

// Al cargar página
window.addEventListener('load', init);