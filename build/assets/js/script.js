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
   var width = window.innerWidth - document.documentElement.offsetWidth;
   function openPopup(target) {
      $('.popup__main_holder').hide();
      $('#back').show();
      $('body').addClass('block-overflow').css('padding-right', width);
      $('.popup__main_holder#' + target).show();
      // let popup = $(target).data('popup');
      
      // console.log($(popup));
      
      
   }
   function closePopup(event) {
      event.stopPropagation();
      if (!$(event.target).hasClass('popup__holder')) {
         return;
      }
      $('#back').hide();
      $('body').removeClass('block-overflow').css('padding-right', 0);
      console.log($(event.target));
   }
});
