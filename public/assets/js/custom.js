$(document).ready(function () {
      /**element initialization */
      $.ajaxSetup({
            beforeSend: function () {
                  // $('.ajax-loader').show();
                  //One.loader('show')
            },
            complete: function () {
                  // $('.ajax-loader').hide();
                  //One.loader('hide')
            },
            headers: {
                  'Accept': 'application/json',
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
      });
      $(document).on('click', '.delete-record', function () {
            //$('.delete-record').click(function(){
            let context = $(this);
            Swal.fire({
                  title: "Are you sure?",
                  text: `You want to delete this record?`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
            }).then((willDelete) => {
                  if (willDelete.isConfirmed) {
                        $.ajax({
                              url: `${base}/${$(context).data('module')}/${$(context).data('id')}`,
                              data: '',
                              method: 'DELETE',
                              success: function (res) {
                                    if (res.status) {
                                          $(context).parents('tr').first().remove();
                                          showError(res.message, 'success')
                                    } else {
                                          showError(res.message, 'error')
                                    }
                                    return;
                              },
                        });
                  }
            });
      })
      $('.update-user-credentials').click(function () {
            let context = $(this);
            $('#pass_user_id').val(context.data('id'));
      })
      $('.nav-main-link-submenu').click(function () {
            $(this).parents('li').first().toggleClass('open');
      });
      $('#page-header-user-dropdown').click(function () {
            $('#page-header-user-dropdown').toggleClass('show');
            $('#page-header-user-dropdown').next('.dropdown-menu').toggleClass('show');
      });
      if ($('.select2').length) {
            $('.select2').select2();
      }
      if ($('#select2product').length) {
            $('#select2product').select2({
                  templateResult: productFormatState
            });
            function productFormatState(state) {
                  if (!state.id) {
                        return state.text;
                  }
                  console.log(state);
                  console.log($(state.element).attr('img'));
                  var baseUrl = "/user/pages/images/flags";
                  var $state = $(
                        '<span><img width="90" src="' + $(state.element).attr('img') + '" class="img-flag" /> ' + state.text + '</span>'
                  );
                  return $state;
            };
      }
      if ($('#select2productinquiry').length) {
            $('#select2productinquiry').select2({
                  templateResult: productFormatState
            });
            function productFormatState(state) {
                  if (!state.id) {
                        return state.text;
                  }
                  console.log(state);
                  console.log($(state.element).attr('img'));
                  var baseUrl = "/user/pages/images/flags";
                  var $state = $(
                        '<span><img width="90" src="' + $(state.element).attr('img') + '" class="img-flag" /> ' + state.text + '</span>'
                  );
                  return $state;
            };
      }
      if ($('.datepicker').length) {
            $('.datepicker').datepicker();
      }
      // let myDropzone = $(".file-upload").Dropzone();
      let showAlert = show_alert || '';
      showError(showAlert.message, showAlert.class);
      $('#list-view-btn').click(function () {
            $('#grid-view').hide();
            $('#list-view').show();
      });
      $('#grid-view-btn').click(function () {
            $('#grid-view').show();
            $('#list-view').hide();
      });
      if ($('.validateform').length) {
            $('.validateform').validate({
                  rules: {
                        '.required': {
                              required: true,
                        }
                  },
                  highlight: function (element, errorClass, validClass) {
                        $(element).css('border-color', 'red');
                  },
                  unhighlight: function (element, errorClass, validClass) {
                        $(element).css('border-color', '#dfe3ea');
                  }
            });
      }
      $('.triggger-role').trigger('change');
      $(document).on('change', '.statusswitch', function () {
            $(this).attr('disabled', 'disabled');
            var url = $(this).attr('url');
            window.location.href = url;
      });
      if ($('.only_date_picker').length) {
            $('.only_date_picker').datetimepicker({
                  format:'Y-m-d',
                  timepicker:false,
            });
      }
      $('[data-bs-dismiss="modal"]').click(function () {
            $('.modal').modal('hide');
      });
      if ($('#email').length) {
            callImaskForEmail('email');
            $('#email').blur(function () {
                  callImaskForEmail('email');
            });
      }
});
function callImaskForEmail(id) {
      IMask(document.getElementById(id), {
            mask: value => {
                  var el = document.getElementById(id);
                  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  el.setCustomValidity("");
                  if (!el.value.match(re)) {
                        el.setCustomValidity("Please include an '@' and '.' with valid value in the email address.");
                  }
            }
      });
}
/* function changeTripDateModal(booking_id){
      var url = base + '/get-booking-for-change-dates/'+booking_id;
      var data = {};
      callAjax(url, data, function (result) {
            if (result.status) {
                  $('#change_booking_date_start_datetime').val(result.data.trip_start_dt)
                  $('#change-booking-date-modal-tbody').html(result.data.html);
                  $('#change-booking-date-modal').modal('show');
                  $('#check_start_date_booking_id').val(booking_id);
            }
      });
} */
function submitDropImage(){
      if($('#v_drop_km').val()==''){
            showError('Enter drop time KM from vehicle.', 'error');
      } else if($('#v_drop_time_condition').prop('checked')){
            var is_img_updated = false;
            if($('#v_drop_front_image_div').find('a.btn-success').length){
                  is_img_updated = true;
            } else if($('#v_drop_back_image_div').find('a.btn-success').length){
                  is_img_updated = true;
            } else if($('#v_drop_left_image_div').find('a.btn-success').length){
                  is_img_updated = true;
            } else if($('#v_drop_right_image_div').find('a.btn-success').length){
                  is_img_updated = true;
            } else if($('#v_drop_special_image1_div').find('a.btn-success').length){
                  is_img_updated = true;
            }
            if(!is_img_updated){
                  showError('Please upload at least one image if you find any issue with the vehicle.', 'error');
            } else {
                  $('#formDelivery').submit();
            }
      } else {
            $('#formDelivery').submit();
      }
}
function activaTab(tab){
    $(tab).tab('show');
    $("html, body").animate({ scrollTop: 0 }, "slow");
};
function hideShowLoader(state){
      if(state){
      $('#de-preloader').addClass('loadershow');
      }else{
      $('#de-preloader').removeClass('loadershow');
      }
}
function callActDropDatetime(){
  $('.vehicle_actual_drop_datetime').datetimepicker({
        format:'Y-m-d H:i',
        minTime:'07:00',
        maxTime:'21:00',
        step:30,
        onClose:function(ct,e){
              vehicle_tr_change($(e).attr('vid'));
        }
  });
      /* $('.vehicle_est_drop_datetime').datetimepicker({
        format:'Y-m-d H:i',
        minTime:'07:00',
        maxTime:'21:00',
        step:30,
        onClose:function(ct,e){
              vehicle_tr_change($(e).attr('vid'),true);
        }
      }); */
}
function validateEmail(email) {
  console.log('asdf');
  alert();
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function callAjax(url, dataset, callbackfun, async_type = false) {
  $.ajax({
        type: "POST",
        url: url,
        data: dataset,
        async: async_type,
        success: function (response) {
              callbackfun(response);
        }
  });
}
function showError(message = '', toastType = 'danger') {
  if (toastType == 'error') {
        toastType = 'danger';
  }
  if (!message)
        return;
  //One.helpers('jq-notify', {type: toastType , message: message});
  var success_toast = document.getElementById("success_toast");
  var error_toast = document.getElementById("error_toast");
  if (toastType == 'danger') {
        $('#error_toast strong').html(message);
        var toast = new bootstrap.Toast(error_toast)
        toast.show()
  }
  else {
        $('#success_toast strong').html(message);
        var toast = new bootstrap.Toast(success_toast)
        toast.show()
  }
}
function readURL(input) {
  console.log($(input).attr('id'));
  if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
              $('[for="'+$(input).attr('id')+'"]').text('Uploaded');
        }
        reader.readAsDataURL(input.files[0]);
  }
}