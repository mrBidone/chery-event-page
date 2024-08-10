<div class="history__line_dot">
                            <div class="dot__small"></div>
                            <div class="dot__middle"></div>
                            <div class="dot__large"></div>
                        </div>

<!-- .history**line_dot {
position: relative;
}
.dot**small {
position: absolute;
top: -5px;
right: 7.5%;
width: 10px;
height: 10px;
background-color: #89E13E;
border-radius: 50%;
}
.dot**middle {
position: absolute;
content: '';
width: 20px;
height: 20px;
border-radius: 50%;
background-color: rgba(137, 225, 62, 0.2);
top: -10px;
right: calc( 7.5% - 5px);
}
@keyframes puls {
0% {
transform: scale(0);
}
100% {
transform: scale(1);
}
}
.dot**large {
position: absolute;
content: '';
width: 30px;
height: 30px;
border-radius: 50%;
background-color: rgba(137, 225, 62, 0.1);
top: -15px;
right: calc( 7.5% - 10px);
animation: 1s puls infinite;
} -->

<!-- кнопка трясется =((((()))))
<button type="button" id="btn_sendform" class="link_button link_button-purple_light">Send<img src="/wp-content/themes/gps/images/icons/icon_arrow_right_purple.svg" alt="arrow"></button>

.form-error{
  animation: shake .7s cubic-bezier(.36,.07,.19,.97) both;

}
JS
$('#btn_sendform').click(function(event) {
  let check = 0;

   if(!validateEmail(jQuery('#input_email').val())){
      check++;
      jQuery('#input_email').css('border', '1px solid red');

   }
   if( jQuery('#input_name').val().length < 3){
     check++;
     jQuery('#input_name').css('border', '1px solid red');

   }
  if(check == 0){
    $.ajax({
        url: '/wp-admin/admin-ajax.php',
        type: 'POST',
        data: {
          'action': 'get_form',
          'firstname' : jQuery('#input_name').val(),
          'email-adress' : jQuery('#input_email').val(),
          'telephone' : jQuery('#input_phone').val(),
          'message' : jQuery('#input_message').val(),

        }, // можно также передать в виде массива или объекта
        success: function( data ) {
         console.log(data);
          $('.form-inputs').css('opacity','0');
              $('.form-success').css('opacity','1');
        }
      });
  }else{
     jQuery('#btn_sendform').addClass('form-error');
     setTimeout(function(){
         jQuery('#btn_sendform').removeClass('form-error');
     },1000);
  } -->
