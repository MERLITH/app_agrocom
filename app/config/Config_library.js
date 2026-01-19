 /** DATATABLE */
 /*
 $.extend(true, $.fn.dataTable.defaults, {
    dom: 'Bfrtip',
    dom: "<'row'<'col-md-6'B><'col-md-6'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    buttons: [
        {
            extend: 'print',
            exportOptions: { columns: ':visible', stripHtml: false },
            title: '',
            footer: true,
        },
        {
            extend: 'excelHtml5',
            exportOptions: { columns: ':visible' },
            title: '',
            footer: true,
        },
        {
            extend: 'colvis',
            text: "Mostrar Columnas",
        }
    ],

    responsive: false,
    paginate:false,
    scrollY: (window.innerHeight - 320)+"px",
    scrollX: true,
    scrollCollapse: false,
    colReorder: true,

    createdRow: function (row, data, indice) {
        $(row).attr('data-json', JSON.stringify(data));

        if(data.fl_estado == 0)
        {
            $(row).find('td').css('text-decoration', 'line-through').css('color', 'red');
        }
    },
});
*/

/* moment.lang('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
  }
); */


// SELECT2

// $.fn.select2.defaults.set("language--noResults",function(args) {
//     return "Sin resultados";
// });

// $.fn.select2.defaults.set("language--searching",function(args) {
//     return "Buscando...";
// });