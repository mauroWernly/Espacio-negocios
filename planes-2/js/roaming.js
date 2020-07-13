$( document ).ready(function() {

	var countries = new Bloodhound({
	    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('country'),
	    queryTokenizer: Bloodhound.tokenizers.whitespace,
	    prefetch: {
	        url: 'js/paises.json'
	    },
        local: countries
	});

	countries.clearPrefetchCache();
	countries.initialize();

	/* $('.search .typeahead').typeahead({
        highlight: true
    }, {
        displayKey: 'country',
        source: countries.ttAdapter(),
        templates: {
            empty: [
              '<div class="empty-message">',
              'unable to find any company that match current query',
              '</div>'
            ].join('\n'),
              suggestion: Handlebars.compile('<p><a onClick="goToSection()" data-scroll="{{section}}">{{country}}</a></p>')
        }
    }); */

    //stickyHeader();

    $.ajax({
        url: "js/paises.json", // path to file
        dataType: 'json', // type of file (text, json, xml, etc)
        success: function(data) { // callback for successful completion
          //$(".paisesAmerica").append(data.country);

          function compareStrings(a, b) {
              // Assuming you want case-insensitive comparison
              a = a.toLowerCase();
              b = b.toLowerCase();

              return (a < b) ? -1 : (a > b) ? 1 : 0;
          };

          data.sort(function(a, b) {
              return compareStrings(a.country, b.country);
          });

          $( data ).each(function( index, element ) {
            // element == this
            if (element.section == 'allInclusiveSection') {
                if (element.continent == 'america') {
                    $(".paisesAmerica").append("<div class='item'>"+element.country+"</div>");
                } else if (element.continent == 'europa') {
                    $(".paisesEuropa").append("<div class='item'>"+element.country+"</div>");
                } else if (element.continent == 'asia') {
                    $(".paisesAsia").append("<div class='item'>"+element.country+"</div>");
                } else if (element.continent == 'africa') {
                    $(".paisesAfrica").append("<div class='item'>"+element.country+"</div>");
                } else if (element.continent == 'oceania') {
                    $(".paisesOceania").append("<div class='item'>"+element.country+"</div>");
                };
            };
          });
        }
    });

    $('.vermas_block').on('click', function(){
        $('.hidden-list').toggleClass('open');
    });

    $('.hidden-list').on('click', function(){
        $('html,body').animate({
            scrollTop: $("#allInclusiveSection").offset().top},
        'slow');
    });

    $('input.searchPaises').keypress(function(e) {
        if(e.which == 13) {
            checkValor()
        }
    });

    /* $('table.paises').tableSearch({
        searchText:'Ingresá aquí el nombre del país a viajar',
        searchPlaceHolder:'Buscá por país o por operadora'
    }); */



}); /// FIN DOCUMENT READY
 

$(document).scroll(function() {
    //stickyHeader();
});


function stickyHeader() {
    var scrollPos = $(window).scrollTop();
    if(scrollPos > 80) {
        $('header').addClass('header-fixed');        
    } else {
        $('header').removeClass('header-fixed');
    }
};

function goToSection() {

    var id = $(event.currentTarget).data("scroll")
    $('html,body').animate({
            scrollTop: $("#"+id).offset().top},
        'slow');
   
}

function checkValor(event) {

    event.preventDefault()
    
    var paisIngresado = $('input.typeahead.tt-input').val();

    $.ajax({
        url: "js/paises.json", // path to file
        dataType: 'json', // type of file (text, json, xml, etc)
        success: function(data) { // callback for successful completion
          //$(".paisesAmerica").append(data.country);
          $( data ).each(function( index, element ) {
            // element == this
            if (element.country == paisIngresado) {
                
                $('html,body').animate({                
                    scrollTop: $("#"+element.section).offset().top},
                'slow');
                
            };
          });
        }
    });

   
}