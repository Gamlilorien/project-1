//To override Datepicker default formatting
inter_es = {
  months:    [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
  ]
};


$(document).ready(function(){
    $('.collapsible').collapsible();
    $('.modal').modal();
    $('select').formSelect();
    $('.datepicker').datepicker({
      format: "mm/dd/yy",
      autoClose: true,
      defaultDate: 1/1/2018,
      setDefaultDate: true,
      months: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      i18n: inter_es
    });
  });

  // Mobile Side Navigation Menu
  $(document).ready(function(){
    $('.sidenav').sidenav();
  });
      