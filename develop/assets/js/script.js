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
      if (window.innerWidth > document.documentElement.offsetWidth) {
         width = window.innerWidth - document.documentElement.offsetWidth;
      }
      
      // console.log(width);
      $('.popup__main_holder').addClass('popup-animate').hide();
      $('#back').fadeIn(100);
      $('.back__line').css('width', width).fadeIn(100);
      
      $('body').addClass('block-overflow').css('padding-right', width);
      $('.popup__main_holder#' + target).fadeIn(0).removeClass('popup-animate');
   }
   function closePopup(event) {
      event.stopPropagation();
      if (!$(event.target).hasClass('popup__holder')) {
         return;
      }

      $('.popup__main_holder').addClass('popup-animate');
      $('body').removeClass('block-overflow').css('padding-right', 0);
      $('#back').fadeOut(200);
      $('.back__line').fadeOut(50);
   }
});
