$(document).ready(function () {
   /* читать дальше */

   
   if ($('.hidden_text').length > 0) {
      let $parent = $('.hidden_text');
      
      $parent.on('click', (event) => {openAnswer($(event.target).closest($parent))});
   }
   
   if ($('.how-to__block').length > 0) {
      let $parent = $('.how-to__block');
      
      $parent.on('click', (event) => {openAnswer($(event.target).closest($parent))});
   }
   
      function openAnswer(target) {
         let hidden = $(target).find('.hidden');
         
         if ($(target).hasClass('open')) {
            $(target).find(hidden).slideUp(300); // ради чего всё затевалось - показать скрытое
            $(target).removeClass('open');
         } else {
            $(target).find(hidden).slideDown(200);
            $(target).addClass('open');
         }
      }
      
   
   
   if ($('.project_sections__holder').length > 0) {
      let $trigger = $('.project_section__text');
      $trigger.on( 'click', (event) => {openPopup($(event.target).closest($trigger).data('popup'))});
      $('.popup__holder').on( 'click', (event) => {closePopup(event)})
   }
   
   var width = 0;
   function openPopup(target) {
      let current = $('.popup__main_holder#' + target);
      
      if (window.innerWidth > document.documentElement.offsetWidth) {
         width = window.innerWidth - document.documentElement.offsetWidth;
      }
      
      $('.popup__main_holder').addClass('popup-animate').hide();
      $('#back').fadeIn(100);
      $('.back__line').css('width', width).fadeIn(100);
      
      $('body').addClass('block-overflow').css('padding-right', width);
      $(current).fadeIn(0).removeClass('popup-animate');
   }
   function closePopup(event) {
      event.stopPropagation();
      if (!$(event.target).hasClass('popup__holder')) {
         return;
      }
      
      $('.popup__main_holder').addClass('popup-animate');
      $('body').removeClass('block-overflow').css('padding-right', 0);
      $('#back').fadeOut(400);
      $('.back__line').fadeOut(50);
      
      if ($('.popup__main_holder .iframe_holder').length > 0) {
         $.map( $('.popup__main_holder .iframe_holder'), (elem) => {
            $(elem).find('iframe').prop( 'src', '');
         
            // console.log('и сразу возвращаем ');
            let link = $(elem).data('video');
            return $(elem).find('iframe').prop( 'src', link);
         
         });
      }
   }
   
   slickIt();
   $(window).resize(() => {
        slickIt();
    });
      
   
   function slickIt() {
      if (window.innerWidth < 800) {
         let $holder = $('.support__holder');
         $holder.slick({
            slidesToShow: 2,
            slidesToScroll: 2,
            speed: 700,
            infinite: true,
            autoplay: false,
            arrows: false,
            dots: true,
            responsive: [
               {
                  breakpoint: 520,
                  settings: {
                     slidesToShow: 1,
                     slidesToScroll: 1
                  }
               }
            ]
            
         });
      } else {
         $holder.slick('unslick');
      }
   }
   
});
