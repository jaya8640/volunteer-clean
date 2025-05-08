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
        Accept: "application/json",
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
      },
    });
    $(document).on("click", ".delete-record", function () {
      //$('.delete-record').click(function(){
      let context = $(this);
      Swal.fire({
        title: "Are you sure?",
        text: `You want to delete this record?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((willDelete) => {
        if (willDelete.isConfirmed) {
          $.ajax({
            url: `${base}/${$(context).data("module")}/${$(context).data("id")}`,
            data: "",
            method: "DELETE",
            success: function (res) {
              if (res.status) {
                $(context).parents("tr").first().remove();
                showError(res.message, "success");
              } else {
                showError(res.message, "error");
              }
              return;
            },
          });
        }
      });
    });
    $(".update-user-credentials").click(function () {
      let context = $(this);
      $("#pass_user_id").val(context.data("id"));
    });
    $(".nav-main-link-submenu").click(function () {
      $(this).parents("li").first().toggleClass("open");
    });
    $("#page-header-user-dropdown").click(function () {
      $("#page-header-user-dropdown").toggleClass("show");
      $("#page-header-user-dropdown").next(".dropdown-menu").toggleClass("show");
    });
    if ($(".select2").length) {
      $(".select2").select2();
    }
    if ($("#select2product").length) {
      $("#select2product").select2({
        templateResult: productFormatState,
      });
      function productFormatState(state) {
        if (!state.id) {
          return state.text;
        }
        console.log(state);
        console.log($(state.element).attr("img"));
        var baseUrl = "/user/pages/images/flags";
        var $state = $(
          '<span><img width="90" src="' +
            $(state.element).attr("img") +
            '" class="img-flag" /> ' +
            state.text +
            "</span>"
        );
        return $state;
      }
    }
    if ($("#select2productinquiry").length) {
      $("#select2productinquiry").select2({
        templateResult: productFormatState,
      });
      function productFormatState(state) {
        if (!state.id) {
          return state.text;
        }
        console.log(state);
        console.log($(state.element).attr("img"));
        var baseUrl = "/user/pages/images/flags";
        var $state = $(
          '<span><img width="90" src="' +
            $(state.element).attr("img") +
            '" class="img-flag" /> ' +
            state.text +
            "</span>"
        );
        return $state;
      }
    }
    if ($(".datepicker").length) {
      $(".datepicker").datepicker();
    }
    // let myDropzone = $(".file-upload").Dropzone();
    let showAlert = show_alert || "";
    showError(showAlert.message, showAlert.class);
    $("#list-view-btn").click(function () {
      $("#grid-view").hide();
      $("#list-view").show();
    });
    $("#grid-view-btn").click(function () {
      $("#grid-view").show();
      $("#list-view").hide();
    });
    if ($(".validateform").length) {
      $(".validateform").validate({
        rules: {
          ".required": {
            required: true,
          },
        },
        highlight: function (element, errorClass, validClass) {
          $(element).css("border-color", "red");
        },
        unhighlight: function (element, errorClass, validClass) {
          $(element).css("border-color", "#dfe3ea");
        },
      });
    }
    $(".open-qr-modal").click(function (event) {
      let context = $(this);
      $(".qr-modal-body").html(context.html());
      $(".machinery-modal-title").text(context.data("machine"));
    });
    $(".print-qr").click(function (event) {
      var prtContent = $(".qr-modal-body").clone();
      prtContent.find("svg").css({ height: "300px", width: "300px" });
      console.log(prtContent);
      var WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
      );
      WinPrint.document.write(prtContent.html());
      // WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      // WinPrint.close();
    });
    $(".triggger-role").change(function () {
      console.log("Hello World how are you");
      let context = $(this);
      let type = $(this).find(":selected").attr("is_manager");
      if (type == "1") {
        $(".machine-box").hide();
      } else {
        $(".machine-box").show();
      }
    });
    $(".triggger-role").trigger("change");
    $(document).on("change", ".statusswitch", function () {
      $(this).attr("disabled", "disabled");
      var url = $(this).attr("url");
      window.location.href = url;
    });
    $("#product_type_id").change(function () {
      getSelectBrand();
    });
    if ($("#product_type_id").length) {
      getSelectBrand();
    }
    $("#remove_file_btn").click(function () {
      $("#file_div").remove();
      $("#photo_remove").val(1);
    });
    $(".remove_file_btn").click(function () {
      var filename = $(this).attr("filename");
      $("#file_div_" + filename).remove();
      $("#photo_remove_" + filename).val(1);
    });
    if ($(".only_date_picker").length) {
      $(".only_date_picker").datetimepicker({
        format: "Y-m-d",
        timepicker: false,
      });
    }
    $("#send_otp_btn").click(function () {
      var mobile = $("#mobile").val();
      var type = $("#type").val();
      var url = base + "/referrer-send-login-otp";
      if (type == 1) {
        var url = base + "/send-login-otp";
      }
      var data = { mobile: mobile };
      callAjax(url, data, function (result) {
        if (result.status) {
          if (send_g_event) {
            gtag("event", "submit_ref_login_otp");
          }
          $("#otp_text_div").show();
          $("#login_btn_div").show();
          $("#otp_btn_div").hide();
          /* if (type == 1) { // this code is for adding DL number field visible to login with DL
                                $('#is_dl').val(result.data.dl_avail);
                                if(result.data.dl_avail){
                                      $('#dl_text_div').show();
                                }
                          } */
          showError(result.message, "success");
        } else {
          showError(result.message, "error");
        }
      });
    });
    /* if ($('#trip_start_datetime').length) {
              flatpickr('#trip_start_datetime', {
                    enableTime: true,
                    dateFormat: "Y-m-d H:i",
                    minTime: "07:00",
                    maxTime: "21:00",
                    minDate: "today",
              });
        } */
    function getBookingValidDateTime() {
      const now = new Date();
      let minutes = now.getMinutes();
      let hours = now.getHours();
      // If before 7:00 AM, set to 07:00 AM
      if (hours < 7) {
            hours = 7;
            minutes = 0;
      } else {
            // Round up to the next nearest 30-minute slot
            if (minutes === 0 || minutes === 30) {
                  minutes += 30; // Just add 30 minutes
            } else if (minutes < 30) {
                  minutes = 30; // Round up to 30
            } else {
                  minutes = 0; // Round up to the next hour
                  hours++;
            }
            // Ensure it's at least 30 minutes in the future
            if (minutes === 0) {
                  minutes = 30;
            } else {
                  minutes = 0;
                  hours++;
            }
      }
      // If time goes past 9:00 PM, move to 7:00 AM the next day
      if (hours >= 21) {
            now.setDate(now.getDate() + 1);
            hours = 7;
            minutes = 0;
      }
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const time = `${formattedHours}:${formattedMinutes}`;
      const date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
      return [date, time];
    }
    /* function getBookingValidDateTime() {
      const now = new Date();
      let minutes = now.getMinutes();
      let hours = now.getHours();
      if (minutes > 30) {
        minutes = 0;
        hours++; // Move to the next hour
      } else if (minutes != 0) {
        minutes = 30;
      }
      hours++;
      if (hours >= 24) {
        hours = 0; // Reset to midnight
      }
      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");
      var time = `${formattedHours}:${formattedMinutes}`;
      if (formattedHours >= 21) {
        now.setDate(now.getDate() + 1);
        time = "07:00";
      }
      var date =
        now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
      returnData = [date, time];
      return returnData;
    } */
    if ($("#front_trip_start_dt").length) {
      const validDateTime = getBookingValidDateTime();
      $("#front_trip_start_dt").datetimepicker({
        format: "Y-m-d H:i",
        minTime: validDateTime[1],
        maxTime: "21:00",
        minDate: validDateTime[0],
        step: 30,
        onSelectDate: function (ct, e) {
          var ndate =
            ct.getFullYear() + "-" + (ct.getMonth() + 1) + "-" + ct.getDate();
          const cdate = getBookingValidDateTime();
          if (cdate[0] != ndate) {
            this.setOptions({
              minTime: "07:00",
            });
          } else {
            this.setOptions({
              minTime: cdate[1],
            });
          }
        },
        onClose: function (ct, e) {
          $("#front_trip_end_dt").datetimepicker("toggle");
        },
      });
    }
    if ($("#front_trip_end_dt").length) {
      const validDateTime = getBookingValidDateTime();
      $("#front_trip_end_dt").datetimepicker({
        format: "Y-m-d H:i",
        minTime: validDateTime[1],
        maxTime: "21:00",
        minDate: validDateTime[0],
        step: 30,
        onSelectDate: function (ct, e) {
          var ndate =
            ct.getFullYear() + "-" + (ct.getMonth() + 1) + "-" + ct.getDate();
          const cdate = getBookingValidDateTime();
          if (cdate[0] != ndate) {
            this.setOptions({
              minTime: "07:00",
            });
          } else {
            this.setOptions({
              minTime: cdate[1],
            });
          }
        },
        onClose: function (ct, e) {
          if ($('[name="f_type[]"]').length) {
            filterVehicle();
          }
        },
      });
    }
    if ($(".vehicle_datetime").length) {
      $(".vehicle_datetime").datetimepicker({
        format: "Y-m-d H:i",
        minTime: "07:00",
        maxTime: "21:00",
        step: 30,
      });
    }
    if ($(".vehicle_drop_datetime").length) {
      flatpickr(".vehicle_drop_datetime", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        minTime: "07:00",
        maxTime: "21:00",
        minDate: "today",
      });
    }
    if ($(".vehicle_date").length) {
      flatpickr(".vehicle_date", {
        dateFormat: "Y-m-d",
      });
    }
    if ($(".transaction_date").length) {
      flatpickr(".transaction_date", {
        enableTime: false,
        dateFormat: "Y-m-d",
      });
    }
    if ($("#trip_start_dt").length) {
      $("#trip_start_dt").daterangepicker({
        singleDatePicker: true,
        //"showISOWeekNumbers": false,
        timePicker: false,
        //"autoUpdateInput": true,
        locale: {
          format: "MMMM DD, YYYY",
          /*  "separator": " - ",
                          "applyLabel": "Apply",
                          "cancelLabel": "Cancel",
                          "fromLabel": "From",
                          "toLabel": "To",
                          "customRangeLabel": "Custom",
                          "weekLabel": "W",
                          "daysOfWeek": [
                                "Su",
                                "Mo",
                                "Tu",
                                "We",
                                "Th",
                                "Fr",
                                "Sa"
                          ],
                          "monthNames": [
                                "January",
                                "February",
                                "March",
                                "April",
                                "May",
                                "June",
                                "July",
                                "August",
                                "September",
                                "October",
                                "November",
                                "December"
                          ],
                          "firstDay": 1 */
        },
        //"linkedCalendars": true,
        //"showCustomRangeLabel": false,
        startDate: 1,
        minDate: new Date(),
        endDate: moment().startOf("hour").add(5, "hour"),
        opens: "right",
      });
      $("#trip_start_dt").on("apply.daterangepicker", (e, picker) => {
        var tax_rate = $("#tax_rate").val();
        var startdate = $("#trip_start_dt").val();
        $("#trip_end_dt").data("daterangepicker").setStartDate(startdate);
        var enddate = $("#trip_end_dt").val();
        var mstartdate = moment(startdate, "MMMM DD, YYYY");
        var menddate = moment(enddate, "MMMM DD, YYYY");
        var diff = menddate.diff(mstartdate, "days");
        var price = $("#product_id").attr("price");
        var total = parseFloat(price) * (parseFloat(diff) + 1).toFixed(2);
        var tax_amt = (total * tax_rate) / 100;
        $("#est_subtotal").text(total.toFixed(2));
        $("#est_total").text((total + tax_amt).toFixed(2));
        $("#est_tax_amt").text(tax_amt.toFixed(2));
      });
      $("#trip_end_dt").on("apply.daterangepicker", (e, picker) => {
        var tax_rate = $("#tax_rate").val();
        var mstartdate = moment($("#trip_start_dt").val(), "MMMM DD, YYYY");
        var menddate = moment($("#trip_end_dt").val(), "MMMM DD, YYYY");
        var diff = menddate.diff(mstartdate, "days");
        if (diff < 0) {
          var startdate = $("#trip_start_dt").val();
          $("#trip_end_dt").data("daterangepicker").setStartDate(startdate);
          var mstartdate = moment($("#trip_start_dt").val(), "MMMM DD, YYYY");
          var menddate = moment($("#trip_end_dt").val(), "MMMM DD, YYYY");
          var diff = menddate.diff(mstartdate, "days");
        }
        var price = $("#product_id").attr("price");
        var total = parseFloat(price) * (parseFloat(diff) + 1).toFixed(2);
        var tax_amt = (total * tax_rate) / 100;
        $("#est_subtotal").text(total.toFixed(2));
        $("#est_total").text((total + tax_amt).toFixed(2));
        $("#est_tax_amt").text(tax_amt.toFixed(2));
      });
      $("#trip_end_dt").daterangepicker({
        singleDatePicker: true,
        showISOWeekNumbers: false,
        timePicker: false,
        autoUpdateInput: true,
        locale: {
          format: "MMMM DD, YYYY",
          separator: " - ",
          applyLabel: "Apply",
          cancelLabel: "Cancel",
          fromLabel: "From",
          toLabel: "To",
          customRangeLabel: "Custom",
          weekLabel: "W",
          daysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          monthNames: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          firstDay: 1,
        },
        linkedCalendars: true,
        showCustomRangeLabel: false,
        startDate: 1,
        minDate: new Date(),
        endDate: moment().startOf("hour").add(24, "hour"),
        opens: "right",
      });
    }
    if ($("#select2product").length) {
      bookingCalculation();
      $("#referral_id").change(function () {
        var selectOpt = $("#referral_id").children("option:selected");
        if (selectOpt.val() != "") {
          $("#commision_rate").val(selectOpt.attr("rate"));
        }
        bookingCalculation();
      });
      $("#select2product").change(function () {
        var selectProduct = $("#select2product").children("option:selected");
        if (selectProduct.val() != "") {
          $("#product_price").val(selectProduct.attr("price"));
        }
        bookingCalculation();
      });
      $("#product_price,#commision_rate,#tax_rate").keyup(function () {
        bookingCalculation();
      });
      $("#trip_start_datetime,#trip_end_datetime").change(function () {
        bookingCalculation();
      });
    }
    if ($('[name="f_type[]"]').length) {
      filterVehicle();
      $('[name="f_type[]"],[name="f_brand[]"],[name="f_category[]"]').change(
        function () {
          filterVehicle();
        }
      );
    }
    $(".home-filter-btn").click(function () {
      var brand_id = $(this).attr("brand_id");
      $(".home-filter-btn").removeClass("filter-active");
      $(this).addClass("filter-active");
      if (brand_id != "") {
        $(".home-filter-product").hide();
        $(".product-brand-" + brand_id).show();
        if ($(".product-brand-" + brand_id).length) {
          $(".product-brand-0").hide();
        } else {
          $(".product-brand-0").show();
        }
      } else {
        $(".home-filter-product").show();
        $(".product-brand-0").hide();
      }
    });
    $("#l_send_inquiry_otp_btn").click(function () {
      var mobile = $("#l_mobile").val();
      var url = base + "/send-luggage-inquiry-otp";
      var data = { mobile: mobile };
      hideShowLoader(true);
      callAjax(
        url,
        data,
        function (result) {
          hideShowLoader(false);
          if (result.status) {
            if (send_g_event) {
              gtag("event", "submit_luggage_inquiry");
            }
            $("#l_inquiry_otp_div").show();
            $("#l_submit_inquiry_btn_div").show();
            $("#l_otp_btn_div").hide();
            $("#l_inquiry_error").hide();
            $("#l_verify_inquiry_btn").attr("booking_id", result.data.booking_id);
            showError(result.message, "success");
          } else {
            $("#l_inquiry_error").show();
            $("#l_inquiry_error").text(result.message);
          }
        },
        true
      );
    });
    $("#l_verify_inquiry_btn").click(function () {
      var booking_id = $(this).attr("booking_id");
      var otp = $("#l_otp").val();
      if (otp != "") {
        $("#l_inquiry_error").hide();
        var url = base + "/verify-luggage-inquiry-otp";
        var data = { otp: otp, booking_id: booking_id };
        hideShowLoader(true);
        callAjax(
          url,
          data,
          function (result) {
            hideShowLoader(false);
            if (result.status) {
              if (send_g_event) {
                gtag("event", "verified_luggage_inquiry");
              }
              $("#l_inquiry_success_div").show();
              $("#l_inquiry_form_div").hide();
              var d = new Date();
              var curDate =
                d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
              localStorage.setItem("locker_booking_date", curDate);
            } else {
              $("#l_inquiry_error").show();
              $("#l_inquiry_error").text(result.message);
            }
          },
          true
        );
      } else {
        $("#l_inquiry_error").show();
        $("#l_inquiry_error").text("Please enter OTP to verify.");
        $("#l_otp").focus();
      }
    });
    $("#checkout_get_otp_btn").click(function () {
      var b_name = $("#b_name").val();
      var b_phone = $("#b_phone").val();
      if (b_name == "") {
        showError("Enter name to get verification OTP.", "error");
        $("#b_name").focus();
      } else if (b_phone == "") {
        showError("Enter phone to get verification OTP.", "error");
        $("#b_phone").focus();
      } else {
        var url = base + "/send-checkout-otp";
        var data = { phone: b_phone, name: b_name };
        callAjax(
          url,
          data,
          function (result) {
            hideShowLoader(false);
            if (result.status) {
              $("#b_otp").attr("phone", b_phone);
              $("#checkout_get_otp_div").hide();
              $(".checkout_verify_otp_div").show();
              $("#b_phone").attr("readonly", "readonly");
              showError(result.message, "success");
            } else {
              showError(result.message, "error");
            }
          },
          true
        );
      }
    });
    $("#checkout_verify_otp_btn").click(function () {
      var phone = $("#b_otp").attr("phone");
      var otp = $("#b_otp").val();
      if (phone == "") {
        showError("Phone is invalid. Please try again later.", "error");
        return false;
      }
      if (phone != "" && otp != "") {
        var url = base + "/verify-checkout-otp";
        var data = { otp: otp, phone: phone };
        hideShowLoader(true);
        callAjax(
          url,
          data,
          function (result) {
            hideShowLoader(false);
            if (result.status) {
              $("#checkout_get_otp_div").hide();
              $(".checkout_verify_otp_div").hide();
              $("#checkout_submit_btn").removeAttr("disabled");
              if ($("#note_verify_phone").length) {
                $("#note_verify_phone").hide();
              }
              $('#phoneVerifyModal').modal('hide');
              submitBookingForm();
            } else {
              showError(result.message, "error");
            }
          },
          true
        );
      } else {
        showError("Please enter OTP to verify", "error");
        $("#b_otp").focus();
      }
    });
    $("#send_inquiry_otp_btn").click(function () {
      var mobile = $("#mobile").val();
      var product_id = $("#product_id").val();
      var url = base + "/send-inquiry-otp";
      var referrer_id = "";
      if (
        localStorage.getItem("referrer_id") &&
        localStorage.getItem("referrer_id") != ""
      ) {
        var referrer_id = localStorage.getItem("referrer_id");
      }
      hideShowLoader(true);
      var data = {
        mobile: mobile,
        product_id: product_id,
        referrer_id: referrer_id,
      };
      callAjax(
        url,
        data,
        function (result) {
          hideShowLoader(false);
          if (result.status) {
            if (send_g_event) {
              gtag("event", "submit_rental_inquiry");
            }
            $("#inquiry_otp_div").show();
            $("#submit_inquiry_btn_div").show();
            $("#otp_btn_div").hide();
            $("#inquiry_error").hide();
            $("#verify_inquiry_btn").attr("booking_id", result.data.booking_id);
            showError(result.message, "success");
            localStorage.removeItem("referrer_id");
            localStorage.removeItem("referrer_data");
            var d = new Date();
            var curDate =
              d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
            localStorage.setItem("booking_id", result.data.booking_id);
            localStorage.setItem(
              "booking_data",
              JSON.stringify({
                booking_id: result.data.booking_id,
                time: curDate,
              })
            );
          } else {
            $("#inquiry_error").show();
            $("#inquiry_error").text(result.message);
          }
        },
        true
      );
    });
    $("#verify_inquiry_btn").click(function () {
      var booking_id = $(this).attr("booking_id");
      var otp = $("#otp").val();
      if (otp != "") {
        $("#inquiry_error").hide();
        var url = base + "/verify-inquiry-otp";
        var data = { otp: otp, booking_id: booking_id };
        hideShowLoader(true);
        callAjax(
          url,
          data,
          function (result) {
            hideShowLoader(false);
            if (result.status) {
              if (send_g_event) {
                gtag("event", "verified_rental_inquiry");
              }
              $("#inquiry_success_div").show();
              $("#product_detail_div").show();
              $("#product_detail_div").html(result.data.html);
              $("#inquiry_form_div").hide();
            } else {
              $("#inquiry_error").show();
              $("#inquiry_error").text(result.message);
            }
          },
          true
        );
      } else {
        $("#inquiry_error").show();
        $("#inquiry_error").text("Please enter OTP to verify.");
        $("#otp").focus();
      }
    });
    if ($("#inquiry-date").length) {
      flatpickr("#inquiry-date", {
        mode: "range",
        //defaultDate: new Date()
        onClose: function (selectedDates, dateStr, instance) {
          $("#inquiry-form").submit();
        },
      });
      if ($("#inquiry-status").length) {
        var inquiryStatus = document.getElementById("inquiry-status");
        new Choices(inquiryStatus, {
          placeholderValue: "This is a placeholder set in the config",
          searchPlaceholderValue: "This is a search placeholder",
        });
        $("#inquiry-status").change(function () {
          $("#inquiry-form").submit();
        });
      }
    }
    /* if ($('#pickup-drop-date').length) {
              flatpickr('#pickup-drop-date', {
                    onClose: function (selectedDates, dateStr, instance) {
                          $('#pickup-drop-form').submit();
                    }
              });
        } */
    $('[data-bs-dismiss="modal"]').click(function () {
      $(".modal").modal("hide");
    });
    if ($("#email").length) {
      callImaskForEmail("email");
      $("#email").blur(function () {
        callImaskForEmail("email");
      });
    }
    if ($("#f_email").length) {
      callImaskForEmail("f_email");
      $("#f_email").blur(function () {
        callImaskForEmail("f_email");
      });
    }
    if ($("#vc_phone").length) {
      callImaskForMobile("vc_phone");
      $("#vc_phone").blur(function () {
        callImaskForMobile("vc_phone");
      });
    }
    if ($("#b_phone").length) {
      callImaskForMobile("b_phone");
      $("#b_phone").blur(function () {
        callImaskForMobile("b_phone");
      });
    }
    if ($("#mobile_number").length) {
      callImaskForMobile("mobile_number");
      $("#mobile_number").blur(function () {
        callImaskForMobile("mobile_number");
      });
    }
    if ($("#mobile").length) {
      callImaskForMobile("mobile");
      $("#mobile").blur(function () {
        callImaskForMobile("mobile");
      });
    }
    if ($("#f_mobile").length) {
      callImaskForMobile("f_mobile");
      $("#f_mobile").blur(function () {
        callImaskForMobile("f_mobile");
      });
    }
    if ($("#l_mobile").length) {
      callImaskForMobile("l_mobile");
      $("#l_mobile").blur(function () {
        callImaskForMobile("l_mobile");
      });
    }
    if ($("#otp").length) {
      IMask(document.getElementById("otp"), {
        min: 6,
        mask: "000000",
      });
    }
    if ($("#l_otp").length) {
      IMask(document.getElementById("l_otp"), {
        min: 6,
        mask: "000000",
      });
    }
    $(document).on("click", ".seemore", function () {
      var id = $(this).attr("showhideid");
      $(this).hide();
      $(".seelessdiv" + id).show();
    });
    $(document).on("click", ".seeless", function () {
      var id = $(this).attr("showhideid");
      $(".seelessdiv" + id).hide();
      $(".seemore" + id).show();
    });
    if ($("#in_referral_id").length) {
      $("#in_referral_id").change(function () {
        var val = $(this).val();
        var camt = $("#in_referral_id")
          .find('option[value="' + val + '"]')
          .attr("camt");
        $("#in_commision_amt").val(camt);
      });
    }
    if ($("#custom_datatable").length) {
      var oTable = $("#custom_datatable").DataTable();
      if ($("#custom_datatable").attr("sort")) {
        oTable.order([$("#custom_datatable").attr("sort"), "desc"]).draw();
      }
    }
    $("#add_booking_accessory").click(function () {
      var trip_start_datetime = $("#trip_start_datetime").val();
      if (trip_start_datetime == "") {
        showError("Select trip start date time to select accessory.", "error");
      } else {
        $("#add-vehicle-accessory-modal").modal("show");
        var dd = trip_start_datetime.split(" ");
        $("#add_vehicle_accessory_search_model_est_datetime").datetimepicker({
          format: "Y-m-d H:i",
          minTime: "07:00",
          maxTime: "21:00",
          step: 30,
          minDate: dd[0],
          value: dd[0] + " 21:00",
        });
        $("#vehicle-accessory-booking-modal-tbody").html(
          '<tr><td colspan="4" class="text-center">Search to see the accessory</td></tr>'
        );
      }
      $("#add-vehicle-accessory-modal").modal("show");
    });
    $("#add_booking_vehicle").click(function () {
      var trip_start_datetime = $("#trip_start_datetime").val();
      if (trip_start_datetime == "") {
        showError("Select trip start date time to select vehicle.", "error");
      } else {
        $("#add-vehicle-modal").modal("show");
        var dd = trip_start_datetime.split(" ");
        $("#add_vehicle_search_model_est_datetime").datetimepicker({
          format: "Y-m-d H:i",
          minTime: "07:00",
          maxTime: "21:00",
          step: 30,
          minDate: dd[0],
          value: dd[0] + " 21:00",
        });
        /* flatpickr('#add_vehicle_search_model_est_datetime', {
                          enableTime: true,
                          dateFormat: "Y-m-d H:i",
                          minTime: "07:00",
                          maxTime: "21:00",
                          minDate: "today",
                          defaultDate: dd[0]+' 21:00'
                    }); */
        /* flatpickr('#add_vehicle_search_model_est_date', {
                          dateFormat: "Y-m-d",
                          minDate: "today",
                    }); */
        $('[name="booking_type"]').prop("checked", "");
        $("#booking_type_10h").removeAttr("disabled");
        $("#booking_type_10h").prop("checked", "checked");
        $("#vehicle-booking-modal-tbody").html(
          '<tr><td colspan="4" class="text-center">Search to see the products</td></tr>'
        );
      }
      /* var trip_start_datetime = $('#trip_start_datetime').val();
              var trip_end_datetime = $('#trip_end_datetime').val();
              var start_actual_time = new Date(trip_start_datetime);
              var end_actual_time = new Date(trip_end_datetime);
              var diff = end_actual_time - start_actual_time;
              var diffSeconds = diff/1000;
              var HH = Math.floor(diffSeconds/3600);
              var MM = Math.floor(diffSeconds%3600)/60;
              //console.log(HH,MM,diffSeconds);
              if(HH && HH>0){
                    $('#add-vehicle-modal').modal('show');
                    var dd = trip_start_datetime.split(' ');
                    flatpickr('#add_vehicle_search_model_est_datetime', {
                          enableTime: true,
                          dateFormat: "Y-m-d H:i",
                          minTime: "07:00",
                          maxTime: "21:00",
                          minDate: "today",
                          defaultDate: dd[0]+' 21:00'
                    });
              }
              else{
                    if(trip_start_datetime==''){
                          showError('Select trip start date time to select vehicle.', 'error');
                    }
                    else if(trip_end_datetime==''){
                          showError('Select trip end date time to select vehicle.', 'error');
                    }
                    else{
                          showError('Select valid start date time and end date time of trip.', 'error');
                    }
              } */
    });
    $("#add_vehicle_accessory_search_modal_btn").click(function () {
      var trip_start_datetime = $("#trip_start_datetime").val();
      var trip_est_end_datetime = $(
        "#add_vehicle_accessory_search_model_est_datetime"
      ).val();
      if (trip_est_end_datetime == "") {
        showError("Select Estimate Drop Date Time to search accessory.", "error");
        $("#add_vehicle_accessory_search_model_est_datetime").focus();
      } else {
        var start_actual_time = new Date(trip_start_datetime);
        var end_actual_time = new Date(trip_est_end_datetime);
        var diff = end_actual_time - start_actual_time;
        var diffSeconds = diff / 1000;
        var HH = Math.floor(diffSeconds / 3600);
        var MM = Math.floor(diffSeconds % 3600) / 60;
        if (HH && HH > 0) {
          var url = base + "/get-vehicle-accessory-for-booking";
          var data = {
            start_datetime: trip_start_datetime,
            est_end_datetime: trip_est_end_datetime,
          };
          callAjax(url, data, function (result) {
            if (result.status) {
              $("#vehicle-accessory-booking-modal-tbody").html(result.data);
            } else {
              showError(result.message, "error");
            }
          });
        } else {
          showError(
            "Select valid estimate drop datetime to search accessory.",
            "error"
          );
        }
      }
    });
    $("#add_vehicle_search_modal_btn").click(function () {
      var add_vehicle_search_model_query = $(
        "#add_vehicle_search_model_query"
      ).val();
      var trip_est_end_datetime = $(
        "#add_vehicle_search_model_est_datetime"
      ).val();
      var trip_start_datetime = $("#trip_start_datetime").val();
      var trip_booking_type = $('[name="booking_type"]:checked').val();
      if (add_vehicle_search_model_query == "") {
        showError("Enter value to search.", "error");
        $("#add_vehicle_search_model_query").focus();
      } else if (trip_est_end_datetime == "") {
        showError("Select Estimate Drop Date Time to search vehicle.", "error");
        $("#add_vehicle_search_model_est_datetime").focus();
      } else {
        var start_actual_time = new Date(trip_start_datetime);
        var end_actual_time = new Date(trip_est_end_datetime);
        var diff = end_actual_time - start_actual_time;
        var diffSeconds = diff / 1000;
        var HH = Math.floor(diffSeconds / 3600);
        var MM = Math.floor(diffSeconds % 3600) / 60;
        if (HH && HH > 0) {
          var url = base + "/get-vehicle-for-booking";
          var data = {
            searchStr: add_vehicle_search_model_query,
            start_datetime: trip_start_datetime,
            est_end_datetime: trip_est_end_datetime,
            trip_booking_type: trip_booking_type,
          };
          callAjax(url, data, function (result) {
            if (result.status) {
              $("#vehicle-booking-modal-tbody").html(result.data.html);
            } else {
              showError(result.message, "error");
            }
          });
        } else {
          showError(
            "Select valid estimate drop datetime to search vehicle.",
            "error"
          );
        }
      }
    });
    /* $('#add_vehicle_search_model_est_date').change(function () {
              var trip_start_date = $('#trip_start_date').val();
              var trip_est_end_date = $(this).val();
              $('[name="booking_type"]').prop('checked','');
              if(trip_start_date==trip_est_end_date){
                    $('#booking_type_10h').prop('checked','checked');
                    $('#booking_type_10h').removeAttr('disabled');
              }
              else{
                    $('#booking_type_23h').prop('checked','checked');
                    $('#booking_type_10h').attr('disabled','disabled');
              }
        }); */
    $("#add_vehicle_search_model_est_datetime").change(function () {
      var trip_start_datetime = $("#trip_start_datetime").val();
      var trip_est_end_datetime = $(this).val();
      var trip_start_ = trip_start_datetime.split(" ");
      var trip_end_ = trip_est_end_datetime.split(" ");
      $('[name="booking_type"]').prop("checked", "");
      if (trip_start_[0] == trip_end_[0]) {
        $("#booking_type_10h").prop("checked", "checked");
        $("#booking_type_10h").removeAttr("disabled");
      } else {
        $("#booking_type_23h").prop("checked", "checked");
        $("#booking_type_10h").attr("disabled", "disabled");
      }
    });
    $(document).on("change", ".v_booking_type,.v_price_type", function () {
      var vid = $(this).attr("vid");
      vehicle_tr_change(vid);
      /* var trip_start_datetime = $('#trip_start_datetime').val();
              var v_booking_type = $('[name="v_booking_type_'+vid+'"]:checked').val();
              var v_price_type = $('[name="v_price_type_'+vid+'"]:checked').val();
              var v_est_drop_datetime = $('#v_est_drop_datetime_'+vid+'').val();
              var url = base + '/add-vehicle-for-booking';
              var data = {product_item_id:vid,trip_start_datetime:trip_start_datetime,trip_est_end_datetime:v_est_drop_datetime,trip_booking_type:v_booking_type,trip_price_type:v_price_type};
              callAjax(url, data, function (result) {
                    if (result.status) {
                          $('#vehicle-tr-'+vid).replaceWith(result.data);
                          flatpickr('.vehicle_drop_datetime', {
                                enableTime: true,
                                dateFormat: "Y-m-d H:i",
                                minTime: "07:00",
                                maxTime: "21:00",
                                minDate: "today",
                          });
                    }
                    else {
                          showError(result.message, 'error');
                    }
              }); */
    });
    $(document).on("change", "#referral_id", function () {
      calc_referrer_comm();
    });
    $(document).on("change", "#commision_amt", function () {
      $("#b_ref_comm").text($("#commision_amt").val());
    });
    $(document).on("change", ".change_calc", function () {
      vehicle_tr_calc();
    });
    $(document).on("change", ".change_tr_calc", function () {
      transaction_tr_calc();
    });
    if ($(".vehicle_actual_drop_datetime").length) {
      callActDropDatetime();
    }
    if ($(".change_calc").length) {
      vehicle_tr_calc();
      calc_referrer_comm();
    }
    $(".images_model").click(function () {
      var imgData = $(this).attr("data");
      if (imgData != "") {
        var images = JSON.parse(imgData);
        var html = "";
        $.each(images, function (index, value) {
          html +=
            '<div class="col-sm-3 mb-2">' +
            '<img src="' +
            weburl +
            "/" +
            value +
            '" class="img-fluid">' +
            "</div>";
        });
        $("#images-model-row").html(html);
        $("#see-images-modal").modal("show");
      }
    });
    if ($("#front_subtotal").length) {
      front_cart_calc();
    }
    $(".customer-doc").change(function () {
      readURL(this);
    });
    $("#view_all_review").click(function () {
      if (send_g_event) {
        gtag("event", "view_reviews");
      }
    });
    $(".g_event_social_share").click(function () {
      if (send_g_event) {
        gtag("event", "click_social_share");
      }
    });
    $(".accessories_checkbox").change(function () {
      add_acc_to_product($(this).attr("id"));
      /* var cart_id = $(this).attr('cart_id');
              var all_acc = [];
              var all_acc_qty = [];
              $('[name="extraitem['+cart_id+'][]"').each(function(c,e){
                    if($(e).prop('checked')){
                          all_acc.push($(e).val());
                          all_acc_qty.push($('#extraitemQty_'+cart_id+'_'+$(e).val()).val());
                    }
              });
              var url = base + '/add-accessory-to-cart';
              var data = {accessories:all_acc,accessories_qty:all_acc_qty,cart_id:cart_id};
              callAjax(url, data, function (result) {
                    if (result.status) {
                          front_cart_calc();
                    }
              }); */
    });
    $(".accessories_qty_checkbox").change(function () {
      var acc_id = $(this).attr("acc_id");
      if ($("#" + acc_id).prop("checked")) {
        add_acc_to_product(acc_id);
      }
    });
    $("#switch_vehicle_drop").change(function () {
      if ($(this).prop("checked")) {
        $(".show_hide_for_vehicle_drop").show();
      } else {
        $(".show_hide_for_vehicle_drop").hide();
      }
    });
    $("#pickup-drop-form-toggler").click(function () {
          $("#pickup-drop-form").toggle();
          $(".manage-vehicle-detaile").toggle();
          $('#toggle-icon').toggleClass('toggle-icon-rotate');
    });
    $("#allow_gst_fields").click(function () {
          $(".gst_fields").toggle();
    });
    $('.product_qty_select').change(function(){
          var id = $(this).attr('enc_cart_id');
          updateCartItemQty(id);
    });
    $('.product_price_select').change(function(){
          var id = $(this).attr('enc_cart_id');
          updateCartItemQty(id);
    });
  });
  function showVehiclePickupDetail(id) {
    var url = base + "/get-vehicle-pickup-data/" + id;
    var data = {};
    callAjax(url, data, function (result) {
      if (result.status) {
        $("#vehicle-pickup-modal-body").html(result.data);
        $("#vehicle-pickup-modal").modal("show");
      }
    });
  }
  function showVehicleDropDetail(id) {
    var url = base + "/get-vehicle-drop-data/" + id;
    var data = {};
    callAjax(url, data, function (result) {
      if (result.status) {
        $("#vehicle-drop-modal-body").html(result.data);
        $("#vehicle-drop-modal").modal("show");
      }
    });
  }
  function viewItemDoc(id) {
    console.log(id);
    var url = base + "/get-product-item-doc/" + id;
    var data = {};
    callAjax(url, data, function (result) {
      if (result.status) {
        $("#view-item-doc-model-body").html(result.data);
        $("#view-item-doc-modal").modal("show");
      }
    });
  }
  function add_acc_to_product(id) {
    var cart_id = $("#" + id).attr("cart_id");
    var all_acc = [];
    var all_acc_qty = [];
    $('[name="extraitem[' + cart_id + '][]"').each(function (c, e) {
      if ($(e).prop("checked")) {
        all_acc.push($(e).val());
        if ($("#extraitem_" + cart_id + "_" + $(e).val()).prop("checked")) {
          all_acc_qty.push(
            $("#extraitemQty_" + cart_id + "_" + $(e).val()).val()
          );
        }
      }
    });
    hideShowLoader(true);
    setTimeout(() => {
      var url = base + "/add-accessory-to-cart";
      var data = {
        accessories: all_acc,
        accessories_qty: all_acc_qty,
        cart_id: cart_id,
      };
      callAjax(url, data, function (result) {
        hideShowLoader(false);
        if (result.status) {
          front_cart_calc();
          var qty_field_id = $("#" + id).attr("qty_field_id");
          if ($("#" + id).prop("checked")) {
            $("#" + id + "_label").html(
              '<span class="text-success">Added!</v>'
            );
          } else {
            $("#" + id + "_label").html("<span>Add Now</span>");
            $("#" + qty_field_id).val(1);
          }
        }
      });
    }, 500);
  }
  function submitDeliveryForm() {
    if ($(".v_input").length) {
      var submitForm = true;
      var idArr = [];
      var idCustArr = [];
      var isDuplicateSelected = false;
      var isDuplicateCustSelected = false;
      $('[name="vehicles[]"]').each(function (c, e) {
        if ($(e).attr("product_type_id") != "5" && $(e).val() != "") {
          if ($.inArray($(e).val(), idArr) !== -1) {
            isDuplicateSelected = true;
          }
          idArr.push($(e).val());
        }
      });
      $(".v_customers").each(function (c, e) {
        if ($(e).attr("product_type_id") != "5" && $(e).val() != "") {
          if ($.inArray($(e).val(), idCustArr) !== -1) {
            isDuplicateCustSelected = true;
          }
          idCustArr.push($(e).val());
        }
      });
      if (isDuplicateSelected) {
        showError(
          "Duplicate item selected as vehicle, please select unique item for every vehicle to submit the form.",
          "error"
        );
      } else if (isDuplicateCustSelected) {
        showError(
          "Duplicate customer selected for vehicle, please select unique customer for every vehicle to submit the form.",
          "error"
        );
      } else {
        $(".v_input").each(function (c, e) {
          var id = $(e).val();
          var pickup_date = $("#v_actual_pickup_datetime_" + id).val();
          var drop_date = $("#v_actual_drop_datetime_" + id).val();
          if (pickup_date != "" && drop_date != "") {
            var date1 = new Date(pickup_date);
            var date2 = new Date(drop_date);
            if (date1.getTime() > date2.getTime()) {
              $("#v_actual_pickup_datetime_" + id).focus();
              showError(
                "Actual Pickup Datetime should not be greater than Actual Drop Datetime.",
                "error"
              );
              submitForm = false;
            }
          }
        });
        if (submitForm) {
          $("#formDelivery").submit();
        }
      }
    }
  }
  function showPhoneVerifyModal(){
        if($('#b_name').val()==''){
              $('#b_name').focus();
              showError('Please enter name', 'error');
              return false;
        }
        if($('#b_phone').val()==''){
              $('#b_phone').focus();
              showError('Please enter phone', 'error');
              return false;
        }
        if(!$('#agree_terms').prop('checked')){
              $('#agree_terms').focus();
              showError('Please check the box to accept the Terms and Conditions.', 'error');
              return false;
        }
        if(!$('#create_account').prop('checked')){
              $('#create_account').focus();
              showError('Please check the box to confirm that you understand an account will be created for you.', 'error');
              return false;
        }
        hideShowLoader(true);
        setTimeout(() => {
              var b_name = $('#b_name').val();
              var b_phone = $('#b_phone').val();
              var url = base + '/send-checkout-otp';
              var data = { phone: b_phone, name: b_name };
              callAjax(url, data, function (result) {
                    hideShowLoader(false);
                    if (result.status) {
                          $('#b_otp').attr('phone',b_phone);
                          $('#checkout_get_otp_div').hide();
                          $('.checkout_verify_otp_div').show();
                          $('#b_phone').attr('readonly','readonly');
                          showError(result.message, 'success');
                          $('#phoneVerifyModal').modal('show');
                    }
                    else {
                          showError(result.message, 'error');
                    }
              },true);
        }, 1000);
  }
  function submitBookingForm() {
    if ($("#b_name").val() == "") {
      $("#b_name").focus();
      showError("Please enter name", "error");
      return false;
    }
    if ($("#b_phone").val() == "") {
      $("#b_phone").focus();
      showError("Please enter phone", "error");
      return false;
    }
    if(!$('#agree_terms').prop('checked')){
          $('#agree_terms').focus();
          showError('Please check the box to accept the Terms and Conditions.', 'error');
          return false;
    }
    if(!$('#create_account').prop('checked')){
          $('#create_account').focus();
          showError('Please check the box to confirm that you understand an account will be created for you.', 'error');
          return false;
    }
    //rzp.open();
    hideShowLoader(true);
    setTimeout(() => {
      var data = $("#bookingConfirmForm").serialize();
      var url = base + "/get-payment-intent";
      var data = { data: data };
      callAjax(url, data, function (result) {
        if (result.status) {
          hideShowLoader(false);
          // Checkout details as a json
          var options = JSON.parse(result.data);
          // * The entire list of Checkout fields is available at
          // * https://docs.razorpay.com/docs/checkout-form#checkout-fields
          options.handler = function (response) {
            document.getElementById("razorpay_payment_id").value =
              response.razorpay_payment_id;
            document.getElementById("razorpay_signature").value =
              response.razorpay_signature;
            document.razorpayform.submit();
          };
          // Boolean whether to show image inside a white frame. (default: true)
          options.theme.image_padding = false;
          options.modal = {
            ondismiss: function () {
              console.log("This code runs when the popup is closed");
              window.location = base + "/booking-confirmation";
            },
            // Boolean indicating whether pressing escape key
            // should close the checkout form. (default: true)
            escape: true,
            // Boolean indicating whether clicking translucent blank
            // space outside checkout form should close the form. (default: false)
            backdropclose: false,
          };
          var rzp = new Razorpay(options);
          rzp.open();
        }
      });
    }, 1000);
  }
  function hideShowLoader(state) {
    if (state) {
      $("#de-preloader").addClass("loadershow");
    } else {
      $("#de-preloader").removeClass("loadershow");
    }
  }
  function removeFromCart(id) {
    var url = base + "/remove-from-cart";
    var data = { product_id: id };
    callAjax(url, data, function (result) {
      if (result.status) {
        if (send_g_event) {
          gtag("event", "remove_from_rental_cart");
        }
        window.location.reload();
      }
    });
  }
  function updateCartItemQty(id) {
    var qty = $("#qty_" + id).val();
    var price_type = $('#product_price_'+id).val();
    if (qty != "" && qty > 0) {
      hideShowLoader(true);
      setTimeout(() => {
        var url = base + "/update-cart-item-qty";
        var data = { product_id: id, qty: qty ,price_type:price_type};
        callAjax(url, data, function (result) {
          hideShowLoader(false);
          if (result.status) {
            showError(result.message, "success");
            if (result.data && result.data.org_qty) {
              $("#qty_" + id).val(result.data.org_qty);
              $('#product_price_'+id).val(result.data.org_price_type);
              if ($("#display_qty_" + id).length) {
                $("#display_qty_" + id).text(result.data.visible_qty);
              }
            }
          } else {
            showError(result.message, "error");
            if (result.data && result.data.org_qty) {
              $("#qty_" + id).val(result.data.org_qty);
              $('#product_price_'+id).val(result.data.org_price_type);
              if ($("#display_qty_" + id).length) {
                $("#display_qty_" + id).text(result.data.visible_qty);
              }
            }
          }
          front_cart_calc();
        });
      }, 500);
    } else {
      showError("Please enter quantity to update item detail.", "error");
    }
  }
  function front_cart_calc() {
    /* var product_id = $("[name='product_id[]']").map(function(){return $(this).val();}).get(); 
        var product_price = $("[name='product_price[]']").map(function(){return $(this).val();}).get(); 
        //var trip_start_datetime = $('#front_trip_start_dt').val();
        //var trip_end_datetime = $('#front_trip_end_dt').val();
        var trip_start_datetime = $("[name='pickup_datetime[]']").map(function(){return $(this).val();}).get(); 
        var trip_end_datetime = $("[name='product_return_dt[]']").map(function(){return $(this).val();}).get(); 
        var data = {product_id:product_id,product_price:product_price,trip_start_datetime:trip_start_datetime,trip_end_datetime:trip_end_datetime}; */
    var url = base + "/front-cart-calculation";
    var data = {};
    callAjax(url, data, function (result) {
      if (result.status) {
        $("#front_subtotal").text(result.data.subtotal);
        $("#front_tax_amt").text(result.data.gst);
        $("#front_total").text(result.data.grandtotal);
        $("#payment_amt").val(result.data.grandtotal);
        $("#front_payable_total").text(result.data.grandtotal);
        $("#front_vehicle_charge").text(result.data.all_items_charge);
        $("#front_accessory_charge").text(result.data.accessory_charge);
        $("#front_only_vehicle_charge").text(result.data.vehicle_charge);
        $("#front_vehicle_eh_charge").text(result.data.vehicle_ex_hr_charge);
        $("#front_ex_hr").text(result.data.extra_hours);
        $('#payment-note').hide();
        if (parseFloat($("#booking_days").val()) > 1) {
          $("#payment_amt").val(parseFloat(result.data.payable_amt));
          $("#front_payable_total").text(parseFloat(result.data.payable_amt));
        }
        if(parseFloat(result.data.total_booking_days)>1){
              $('#payment-note').show();
        }
      }
    });
  }
  function vehicle_tr_change(vid, check_avail = false) {
    var trip_start_datetime = $("#trip_start_datetime").val();
    var v_booking_type = $('[name="v_booking_type_' + vid + '"]:checked').val();
    var v_price_type = $('[name="v_price_type_' + vid + '"]:checked').val();
    var v_est_drop_datetime = $("#v_est_drop_datetime_" + vid).val();
    var v_pickup_km = $("#v_pickup_km_" + vid).val();
    var v_drop_km = $("#v_drop_km_" + vid).val();
    var v_drop_km = $("#v_drop_km_" + vid).val();
    var v_other_charge = $("#v_other_charge_" + vid).val();
    var v_actual_pickup_datetime = $("#v_actual_pickup_datetime_" + vid).val();
    var v_actual_drop_datetime = $("#v_actual_drop_datetime_" + vid).val();
    var v_notes = $("#v_notes_" + vid).val();
    var v_customer = $("#v_customer_" + vid).val();
    var v_co_customer = $("#v_co_customer_" + vid).val();
    var order_id = $("#order_id").val();
    var vehicle_id = $("#vehicle_id_" + vid).val();
    var url = base + "/add-vehicle-for-booking"; // product_item_id:vid
    var data = {
      vid: vid,
      product_item_id: vehicle_id,
      trip_start_datetime: trip_start_datetime,
      trip_est_end_datetime: v_est_drop_datetime,
      trip_booking_type: v_booking_type,
      trip_price_type: v_price_type,
      v_pickup_km: v_pickup_km,
      v_drop_km: v_drop_km,
      v_other_charge: v_other_charge,
      v_actual_pickup_datetime: v_actual_pickup_datetime,
      v_actual_drop_datetime: v_actual_drop_datetime,
      v_notes: v_notes,
      v_customer: v_customer,
      v_co_customer: v_co_customer,
      order_id: order_id,
    };
    if (check_avail) {
      data.change_est_drop_datetime = true;
    }
    callAjax(url, data, function (result) {
      if (result.status) {
        $("#vehicle-tr-" + vid).replaceWith(result.data);
        $(".select2").select2();
        $(".vehicle_datetime").datetimepicker({
          format: "Y-m-d H:i",
          minTime: "07:00",
          maxTime: "21:00",
          step: 30,
        });
        /* flatpickr('.vehicle_drop_datetime', {
                          enableTime: true,
                          dateFormat: "Y-m-d H:i",
                          minTime: "07:00",
                          maxTime: "21:00",
                          minDate: "today",
                    }); */
        callActDropDatetime();
        /* flatpickr('.vehicle_actual_drop_datetime', {
                          enableTime: true,
                          dateFormat: "Y-m-d H:i",
                          minTime: "07:00",
                          maxTime: "21:00",
                          minDate: "today",
                          onClose:function(selectedDates, dateStr, instance){
                                vehicle_tr_change($(instance.element).attr('vid'));
                          }
                    }); */
        vehicle_tr_calc();
      } else {
        if (check_avail) {
          if (result.data.est_datetime && result.data.est_datetime != "") {
            $("#v_est_drop_datetime_" + vid).val(result.data.est_datetime);
          } else {
            $("#v_est_drop_datetime_" + vid).val("");
            $("#v_end_datetime_" + vid).val("");
          }
        }
        showError(result.message, "error");
      }
    });
  }
  function vehicle_tr_calc() {
    if ($(".v_input").length) {
      var subtotal = 0;
      var gst = 0;
      var gst_rate = $("#tax_rate").val();
      var discount = $("#discount").val();
      var discount_type = $("#discount_type").val();
      var grand_total = 0;
      var discount_amt = 0;
      $(".v_input").each(function (c, e) {
        var id = $(e).val();
        var id2 = $(e).attr("val2");
        id = id != id2 ? id2 : id;
        console.log(id);
        var total = parseFloat($("#v_trip_charge_" + id).val());
        if ($("#v_extra_hr_charge_" + id).val() != "") {
          total += parseFloat($("#v_extra_hr_charge_" + id).val());
        }
        if ($("#v_extra_km_charge_" + id).val() != "") {
          total += parseFloat($("#v_extra_km_charge_" + id).val());
        }
        if ($("#v_other_charge_" + id).val() != "") {
          total += parseFloat($("#v_other_charge_" + id).val());
        }
        $("#v_total_" + id).text(parseFloat(total).toFixed(2));
        subtotal += parseFloat(total);
      });
      if (discount != "") {
        if (discount_type == 1) {
          $("#b_discount_type").text("(" + discount + "%)");
          discount_amt = (parseFloat(subtotal) * parseFloat(discount)) / 100;
          $("#b_discount").text(parseFloat(discount_amt).toFixed(2));
        } else {
          $("#b_discount_type").text("");
          $("#b_discount").text(discount);
          discount_amt = discount;
        }
      }
      var real_subtotal = parseFloat(subtotal) - parseFloat(discount_amt);
      if (gst_rate != "") {
        gst = (parseFloat(real_subtotal) * parseFloat(gst_rate)) / 100;
        $("#b_taxrate").text(parseFloat(gst_rate).toFixed(2));
      }
      grand_total = parseFloat(real_subtotal) + parseFloat(gst);
      $("#b_subtotal").text(parseFloat(subtotal).toFixed(2));
      $("#b_tax").text(parseFloat(gst).toFixed(2));
      $("#b_total").text(parseFloat(grand_total).toFixed(2));
    } else {
      $("#b_subtotal").text(0);
      $("#b_tax").text(0);
      $("#b_total").text(0);
    }
    transaction_tr_calc();
  }
  function transaction_tr_calc() {
    if ($(".change_tr_calc").length) {
      var total_paid = 0;
      $(".change_tr_calc").each(function (c, e) {
        var amt = $(e).val();
        if (amt != "") {
          total_paid += parseFloat(amt);
        }
      });
      $("#b_total_paid").text(parseFloat(total_paid).toFixed(2));
      var grand_total = parseFloat($("#b_total").text());
      var sec_amt = 0;
      if (parseFloat(total_paid) > grand_total) {
        sec_amt = parseFloat(total_paid) - grand_total;
        $("#b_pending_amt").text(0);
      } else {
        $("#b_pending_amt").text(
          (parseFloat(grand_total) - parseFloat(total_paid)).toFixed(2)
        );
      }
      $("#b_security_amt").text(parseFloat(sec_amt).toFixed(2));
    } else {
      $("#b_total_paid").text(0);
      $("#b_security_amt").text(0);
      $("#b_pending_amt").text($("#b_total").text());
    }
  }
  function showVerifyCustomerModal(id) {
    $("#verify_customer_id").val(id);
    $("#verify-customer-modal").modal("show");
  }
  function send_otp_customer_phone() {
    var id = $("#verify_customer_id").val();
    var url = base + "/send-otp-customer-phone/" + id;
    var data = {};
    callAjax(url, data, function (result) {
      if (result.status) {
        showError(result.message, "success");
      } else {
        showError(result.message, "error");
      }
    });
  }
  function verify_customer_phone() {
    var otp = $("#customer_otp").val();
    var id = $("#verify_customer_id").val();
    if (otp == "") {
      $("#customer_otp").focus();
      showError("Enter OTP ", "error");
    } else {
      var url = base + "/verify-customer-phone";
      var data = { otp: otp, id: id };
      callAjax(url, data, function (result) {
        if (result.status) {
          $("#customer_otp").val("");
          $("#verify-customer-modal").modal("hide");
          window.location.reload();
          showError(result.message, "success");
        } else {
          showError(result.message, "error");
        }
      });
    }
  }
  function showVehicleCustomerAddModal(id, co = 0) {
    $(".customer_fields_div").show();
    $(".customer_verify_fields_div").hide();
    $("#add-vehicle-customerLabel").text("Add Customer");
    if (id != "") {
      $("#add-vehicle-customerLabel").text("Add Vehicle Customer");
    }
    $("#for_co_customer").val(co);
    $("#vid_for_customer").val(id);
    $("#add-vehicle-customer-modal").modal("show");
  }
  function submit_v_customer_verification() {
    var vid = $("#vid_for_customer").val();
    var co = $("#for_co_customer").val();
    var vc_phone = $("#vc_phone").val();
    var vc_otp = $("#vc_otp").val();
    if (vc_otp == "") {
      $("#vc_otp").focus();
      showError("Enter OTP ", "error");
    } else {
      var url = base + "/verify-vehicle-customer-for-booking";
      var data = { otp: vc_otp, phone: vc_phone };
      callAjax(url, data, function (result) {
        if (result.status) {
          $("#vc_name").val("");
          $("#vc_email").val("");
          $("#vc_phone").val("");
          $("#vc_address").val("");
          $("#vc_city").val("");
          $("#vc_state").val("");
          $("#vc_country").val("");
          $("#vc_zipcode").val("");
          $("#vc_ad_no").val("");
          $("#vc_dl_no").val("");
          $("#vc_otp").val("");
          $("#switchDl").prop("checked", "");
          $("#switchA").prop("checked", "");
          if (co == "1") {
            $("#v_co_customer_" + vid).select2("destroy");
            $("#v_co_customer_" + vid).append(
              '<option value="' +
                result.data.id +
                '">' +
                result.data.phone +
                " (" +
                result.data.name +
                ")</option>"
            );
            $("#v_co_customer_" + vid)
              .val(result.data.id)
              .trigger("change");
            $("#v_co_customer_" + vid).select2();
          } else {
            if (vid != "") {
              $("#v_customer_" + vid).select2("destroy");
              $("#v_customer_" + vid).append(
                '<option value="' +
                  result.data.id +
                  '">' +
                  result.data.phone +
                  " (" +
                  result.data.name +
                  ")</option>"
              );
              $("#v_customer_" + vid)
                .val(result.data.id)
                .trigger("change");
              $("#v_customer_" + vid).select2();
            } else {
              $("#customer_id").select2("destroy");
              $("#customer_id").append(
                '<option value="' +
                  result.data.id +
                  '">' +
                  result.data.phone +
                  " (" +
                  result.data.name +
                  ")</option>"
              );
              $("#customer_id").val(result.data.id).trigger("change");
              $("#customer_id").select2();
            }
          }
          $("#add-vehicle-customer-modal").modal("hide");
        } else {
          showError(result.message, "error");
        }
      });
    }
  }
  function submit_v_customer(type) {
    var vid = $("#vid_for_customer").val();
    var vc_name = $("#vc_name").val();
    var vc_email = $("#vc_email").val();
    var vc_phone = $("#vc_phone").val();
    var vc_address = $("#vc_address").val();
    var vc_city = $("#vc_city").val();
    var vc_state = $("#vc_state").val();
    var vc_country = $("#vc_country").val();
    var vc_zipcode = $("#vc_zipcode").val();
    var vc_dl_no = $("#vc_dl_no").val();
    var vc_ad_no = $("#vc_ad_no").val();
    var co = $("#for_co_customer").val();
    var vc_dl_verified = $("#switchDl").prop("checked") ? 1 : 0;
    var vc_ad_verified = $("#switchA").prop("checked") ? 1 : 0;
    if (vc_name == "") {
      $("#vc_name").focus();
      showError("Enter customer name", "error");
    } /* else if(vc_email==''){
              $('#vc_email').focus();
              showError('Enter customer email', 'error');
        } */ else if (vc_phone == "") {
      $("#vc_phone").focus();
      showError("Enter customer phone", "error");
    } /* else if(co!='1' && vc_dl_no==''){
              showError('Enter driving licence number', 'error');
        } else if(co!='1' && vc_ad_no==''){
              showError('Enter aadhar number', 'error');
        } */ else {
      var url = base + "/add-vehicle-customer-for-booking";
      var formData = new FormData();
      var vc_dl = $("#vc_dl").prop("files")[0];
      var vc_aadhar_front = $("#vc_aadhar_front").prop("files")[0];
      var vc_aadhar_back = $("#vc_aadhar_back").prop("files")[0];
      formData.append("name", vc_name);
      formData.append("email", vc_email);
      formData.append("phone", vc_phone);
      formData.append("address", vc_address);
      formData.append("city", vc_city);
      formData.append("state", vc_state);
      formData.append("country", vc_country);
      formData.append("zipcode", vc_zipcode);
      formData.append("dl_no", vc_dl_no);
      formData.append("ad_no", vc_ad_no);
      formData.append("dl", vc_dl);
      formData.append("send_otp", type);
      formData.append("aadhar_front", vc_aadhar_front);
      formData.append("aadhar_back", vc_aadhar_back);
      formData.append("dl_verified", vc_dl_verified);
      formData.append("ad_verified", vc_ad_verified);
      $.ajax({
        url: url,
        type: "POST",
        contentType: "multipart/form-data",
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        success: (result) => {
          if (result.status) {
            if (type == 1) {
              $(".customer_fields_div").hide();
              $(".customer_verify_fields_div").show();
            } else {
              $("#vc_name").val("");
              $("#vc_email").val("");
              $("#vc_phone").val("");
              $("#vc_address").val("");
              $("#vc_city").val("");
              $("#vc_state").val("");
              $("#vc_country").val("");
              $("#vc_zipcode").val("");
              $("#vc_ad_no").val("");
              $("#vc_dl_no").val("");
              $("#vc_otp").val("");
              $("#switchDl").prop("checked", "");
              $("#switchA").prop("checked", "");
              if (co == "1") {
                $("#v_co_customer_" + vid).select2("destroy");
                $("#v_co_customer_" + vid).append(
                  '<option value="' +
                    result.data +
                    '">' +
                    vc_phone +
                    " (" +
                    vc_name +
                    ")</option>"
                );
                $("#v_co_customer_" + vid)
                  .val(result.data)
                  .trigger("change");
                $("#v_co_customer_" + vid).select2();
              } else {
                if (vid != "") {
                  $("#v_customer_" + vid).select2("destroy");
                  $("#v_customer_" + vid).append(
                    '<option value="' +
                      result.data +
                      '">' +
                      vc_phone +
                      " (" +
                      vc_name +
                      ")</option>"
                  );
                  $("#v_customer_" + vid)
                    .val(result.data)
                    .trigger("change");
                  $("#v_customer_" + vid).select2();
                } else {
                  $("#customer_id").select2("destroy");
                  $("#customer_id").append(
                    '<option value="' +
                      result.data +
                      '">' +
                      vc_phone +
                      " (" +
                      vc_name +
                      ")</option>"
                  );
                  $("#customer_id").val(result.data).trigger("change");
                  $("#customer_id").select2();
                }
              }
              $("#add-vehicle-customer-modal").modal("hide");
            }
          } else {
            showError(result.message, "error");
          }
        },
        error: (response) => {
          console.log(response);
        },
      });
      /* var url = base + '/add-vehicle-customer-for-booking';
              var data = {name:vc_name,email:vc_email,phone:vc_phone,address:vc_address,city:vc_city,state:vc_state,country:vc_country,zipcode:vc_zipcode};
              callAjax(url, data, function (result) {
                    console.log(result);
                    if (result.status) {
                          $('#vc_name').val('');
                          $('#vc_email').val('');
                          $('#vc_phone').val('');
                          $('#vc_address').val('');
                          $('#vc_city').val('');
                          $('#vc_state').val('');
                          $('#vc_country').val('');
                          $('#vc_zipcode').val('');
                          $('#v_customer_'+vid).select2('destroy');
                          $('#v_customer_'+vid).append('<option value="'+result.data+'">'+vc_phone+' ('+vc_name+')</option>');
                          $('#v_customer_'+vid).val(result.data).trigger('change');
                          $('#v_customer_'+vid).select2();
                          $('#add-vehicle-customer-modal').modal('hide');
                    }
                    else {
                          showError(result.message, 'error');
                    }
              }); */
    }
  }
  function removeVehicle(id) {
    let context = $(this);
    Swal.fire({
      title: "Are you sure?",
      text: `You want to remove this vehicle?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        $("#vehicle-tr-" + id).remove();
        if (!$(".vehicle_tr").length) {
          $("#no-vehicle-tr").show();
        }
        vehicle_tr_calc();
        calc_referrer_comm();
      }
    });
  }
  function refreshCustomerDropdown(id) {
    var url = base + "/get-customer-options";
    var data = {};
    callAjax(url, data, function (result) {
      if (result.status) {
        var old_val = $("#" + id).val();
        $("#" + id).select2("destroy");
        $("#" + id).html('<option value="">Select option</option>' + result.data);
        if (old_val != "") {
          $("#" + id)
            .val(old_val)
            .trigger("change");
        } else {
          $("#" + id).trigger("change");
        }
        $("#" + id).trigger("change");
        $("#" + id).select2();
      } else {
        showError(result.message, "error");
      }
    });
  }
  function addBookingAccessory(product_item_id) {
    if ($("#vehicle-tr-" + product_item_id).length) {
      showError("Product already added.", "error");
    } else {
      var trip_start_datetime = $("#trip_start_datetime").val();
      var trip_est_end_datetime = $(
        "#add_vehicle_accessory_search_model_est_datetime"
      ).val();
      var url = base + "/add-vehicle-accessory-for-booking";
      var data = {
        product_item_id: product_item_id,
        trip_start_datetime: trip_start_datetime,
        trip_est_end_datetime: trip_est_end_datetime,
      };
      callAjax(url, data, function (result) {
        if (result.status) {
          $("#no-vehicle-tr").hide();
          $("#add-vehicle-accessory-modal").modal("hide");
          $("#manage-vehicle-tbody").append(result.data);
          $(".select2").select2();
          $(".vehicle_datetime").datetimepicker({
            format: "Y-m-d H:i",
            minTime: "07:00",
            maxTime: "21:00",
            step: 30,
          });
          callActDropDatetime();
          vehicle_tr_calc();
          calc_referrer_comm();
        } else {
          showError(result.message, "error");
        }
      });
    }
  }
  function addBookingVehicle(product_item_id) {
    if ($("#vehicle-tr-" + product_item_id).length) {
      showError("Product already added.", "error");
    } else {
      var trip_start_datetime = $("#trip_start_datetime").val();
      var trip_est_end_datetime = $(
        "#add_vehicle_search_model_est_datetime"
      ).val();
      var trip_booking_type = $('[name="booking_type"]:checked').val();
      var url = base + "/add-vehicle-for-booking";
      var data = {
        product_item_id: product_item_id,
        trip_start_datetime: trip_start_datetime,
        trip_est_end_datetime: trip_est_end_datetime,
        trip_booking_type: trip_booking_type,
        check_vehicle_available: true,
      };
      callAjax(url, data, function (result) {
        if (result.status) {
          $("#no-vehicle-tr").hide();
          $("#add-vehicle-modal").modal("hide");
          $("#manage-vehicle-tbody").append(result.data);
          $(".select2").select2();
          $(".vehicle_datetime").datetimepicker({
            format: "Y-m-d H:i",
            minTime: "07:00",
            maxTime: "21:00",
            step: 30,
          });
          /* flatpickr('.vehicle_drop_datetime', {
                                enableTime: true,
                                dateFormat: "Y-m-d H:i",
                                minTime: "07:00",
                                maxTime: "21:00",
                                minDate: "today",
                          }); */
          callActDropDatetime();
          /* flatpickr('.vehicle_actual_drop_datetime', {
                                enableTime: true,
                                dateFormat: "Y-m-d H:i",
                                minTime: "07:00",
                                maxTime: "21:00",
                                minDate: "today",
                                onClose:function(selectedDates, dateStr, instance){
                                      vehicle_tr_change($(instance.element).attr('vid'));
                                }
                          }); */
          vehicle_tr_calc();
          calc_referrer_comm();
        } else {
          showError(result.message, "error");
        }
      });
    }
  }
  function addBookingTransaction() {
    var url = base + "/add-transaction-for-booking";
    var data = {};
    callAjax(url, data, function (result) {
      if (result.status) {
        $("#no-transaction-tr").hide();
        $("#manage-transaction-tbody").append(result.data);
        $(".select2").select2();
        flatpickr(".transaction_date", {
          enableTime: false,
          dateFormat: "Y-m-d",
        });
        transaction_tr_calc();
      } else {
        showError(result.message, "error");
      }
    });
  }
  function removeTransaction(id) {
    let context = $(this);
    Swal.fire({
      title: "Are you sure?",
      text: `You want to remove this transaction?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        $("#transaction_tr_" + id).remove();
        if (!$(".transaction_tr").length) {
          $("#no-transaction-tr").show();
        }
        transaction_tr_calc();
      }
    });
  }
  function callActDropDatetime() {
    /* flatpickr('.vehicle_actual_drop_datetime', {
              enableTime: true,
              dateFormat: "Y-m-d H:i",
              minTime: "07:00",
              maxTime: "21:00",
              minDate: "today",
              onClose:function(selectedDates, dateStr, instance){
                    vehicle_tr_change($(instance.element).attr('vid'));
              }
        }); */
    $(".vehicle_actual_drop_datetime").datetimepicker({
      format: "Y-m-d H:i",
      minTime: "07:00",
      maxTime: "21:00",
      step: 30,
      onClose: function (ct, e) {
        vehicle_tr_change($(e).attr("vid"));
      },
    });
    $(".vehicle_est_drop_datetime").datetimepicker({
      format: "Y-m-d H:i",
      minTime: "07:00",
      maxTime: "21:00",
      step: 30,
      onClose: function (ct, e) {
        vehicle_tr_change($(e).attr("vid"), true);
      },
    });
  }
  function calc_referrer_comm() {
    var val = $("#referral_id").val();
    if (val != "") {
      var comm = $('#referral_id option[value="' + val + '"]').attr("comm");
      console.log(comm);
      var total_comm = comm * $(".vehicle_tr").length;
      $("#commision_amt").val(total_comm);
      $("#b_ref_comm").text(total_comm);
    } else {
      $("#commision_amt").val(0);
      $("#b_ref_comm").text(0);
    }
  }
  function sendWhatsappMsg() {
    var referrer_str = "";
    if (
      localStorage.getItem("referrer_id") &&
      localStorage.getItem("referrer_id") != "" &&
      localStorage.getItem("referrer_data") &&
      localStorage.getItem("referrer_data") != ""
    ) {
      var referrer_data = localStorage.getItem("referrer_data");
      var rData = JSON.parse(referrer_data);
      referrer_str = " with Referrer(" + rData.code + ")";
    }
    if (send_g_event) {
      gtag("event", "click_whatsapp_btn");
    }
    var msg =
      "Hello, I want to book a bike" + referrer_str + ". Can you assist me?";
    var url = "https://api.whatsapp.com/send?phone=+919950454545&text=" + msg;
    window.open(url, "_blank").focus();
  }
  function callImaskForMobile(id) {
    IMask(document.getElementById(id), {
      min: 10,
      mask: "#000000000",
      definitions: {
        "#": /[6-9]/,
      },
    });
  }
  function showInquiryConfirmModal(id) {
    var url = base + "/get-vehicle-inquiry-data/" + id;
    var data = {};
    callAjax(url, data, function (result) {
      if (result.status) {
        $("#inquiry_id").val(id);
        $("#note").val(result.data.referrer_notes);
        $("#referrer_amount").val(result.data.commision_amt);
        $("#confirm_inquiry_modal").modal("show");
      } else {
        showError(result.message, "error");
      }
    });
  }
  function callImaskForEmail(id) {
    IMask(document.getElementById(id), {
      mask: (value) => {
        var el = document.getElementById(id);
        var re =
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        el.setCustomValidity("");
        if (!el.value.match(re)) {
          el.setCustomValidity(
            "Please include an '@' and '.' with valid value in the email address."
          );
        }
      },
    });
  }
  function validateEmail(email) {
    console.log("asdf");
    alert();
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  function emptyCartThenRedirect(type = 1) {
    var alertText =
      "You want to empty your cart and want to add vehicle with different date time?";
    if (type == 2) {
      alertText = "You want to empty your cart?";
    }
    Swal.fire({
      title: "Are you sure?",
      text: alertText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        var data = { product_id: 0, empty_cart: true };
        var url = base + "/add-vehicle-to-cart";
        callAjax(url, data, function (result) {
          if (result.status) {
            showError(result.message, "success");
            window.location.href = base + "/booking";
          } else {
            showError(result.message, "error");
          }
        });
      }
    });
  }
  function checkDatesAndSubmit() {
    var start_dt = $("#front_trip_start_dt").val();
    var end_dt = $("#front_trip_end_dt").val();
    if (start_dt == "") {
      showError("Select trip start date to submit the form.", "error");
      $("#front_trip_start_dt").focus();
      return false;
    }
    if (end_dt == "") {
      showError("Select trip end date to submit the form.", "error");
      $("#front_trip_end_dt").focus();
      return false;
    }
    var startDateTime = new Date(start_dt);
    var endDateTime = new Date(end_dt);
    if (startDateTime > endDateTime) {
      showError("Please select valid date time to submit the form.", "error");
      $("#front_trip_start_dt").focus();
      return false;
    }
    $("#dates_form").submit();
  }
  function addToCart(id) {
    var url = base + "/add-vehicle-to-cart";
    var start_dt = $("#front_trip_start_dt").val();
    var end_dt = $("#front_trip_end_dt").val();
    var price = $("#product_price_" + id).val();
    var data = {
      product_id: id,
      price: price,
      start_dt: start_dt,
      end_dt: end_dt,
    };
    callAjax(url, data, function (result) {
      if (result.status) {
        if (send_g_event) {
          gtag("event", "add_to_rental_cart");
        }
        showError(result.message, "success");
        window.location.href = base + "/booking-confirmation";
      } else {
        if (result.data == "ask_to_add") {
          Swal.fire({
            title: "Are you sure?",
            text: result.message,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          }).then((willDelete) => {
            if (willDelete.isConfirmed) {
              data.empty_cart = true;
              callAjax(url, data, function (result) {
                if (result.status) {
                  if (send_g_event) {
                    gtag("event", "add_to_rental_cart");
                  }
                  showError(result.message, "success");
                  window.location.href = base + "/booking-confirmation";
                } else {
                  showError(result.message, "error");
                }
              });
            }
          });
        } else {
          showError(result.message, "error");
        }
      }
    });
  }
  function inquiryModal(id) {
    $("#product_id").val(id);
    $("#inquiry_success_div").hide();
    $("#product_detail_div").hide();
    $("#inquiry_otp_div").hide();
    $("#submit_inquiry_btn_div").hide();
    $("#inquiry_error").hide();
    $("#otp_btn_div").show();
    $("#inquiry_form_div").show();
    $("#otp").val("");
    $("#inquiry_success_div h5").text(
      "Thanks for showing interest and your information has been submitted successfully. Our Representative will get in touch with you shortly. Or you can call on 9950454545"
    );
    if (
      localStorage.getItem("booking_id") &&
      localStorage.getItem("booking_id") != ""
    ) {
      var booking_data = localStorage.getItem("booking_data");
      var pData = JSON.parse(booking_data);
      var d = new Date();
      var curDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
      const date1 = new Date(curDate);
      const date2 = new Date(pData.time);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      if (!diffDays) {
        hideShowLoader(true);
        var url = base + "/get-vehicle-data";
        var data = { product_id: id };
        callAjax(url, data, function (result) {
          hideShowLoader(false);
          if (result.status) {
            $("#inquiry_success_div h5").text(
              "Thanks for showing interest and your information has been already submitted. Our Representative will get in touch with you shortly. Or you can call on 9950454545"
            );
            $("#inquiry_success_div").show();
            $("#product_detail_div").show();
            //$('#product_detail_div').html(result.data.html);
            $("#product_detail_div").html("");
            $("#inquiry_form_div").hide();
          } else {
            $("#inquiry_error").show();
            $("#inquiry_error").text(result.message);
          }
        });
      }
    }
    $("#inquiryModal").modal("show");
  }
  function showProductCategorySequenceModal() {
    var url = base + "/get-all-category-data";
    var data = {};
    callAjax(url, data, function (result) {
      if (result.status) {
        if (result.data) {
          result.data.category.forEach((element) => {
            var html =
              '<li class="card border border-primary mb-2"><div class="card-body p-2"><p class="card-text">' +
              element.name +
              '</p></div><input type="hidden" name="category_order[]" value="' +
              element.id +
              '" /></li>';
            $("#product-sequence-div").append(html);
          });
        }
        $("#product-sequence-div").sortable();
        $("#arrange_category_modal").modal("show");
      } else {
        $("#inquiry_error").show();
        $("#inquiry_error").text(result.message);
      }
    });
  }
  function showProductSequenceModal() {
    var url = base + "/get-all-vehicle-data";
    var data = {};
    callAjax(url, data, function (result) {
      if (result.status) {
        if (result.data) {
          result.data.products.forEach((element) => {
            var year = "";
            if (element.year) {
              year = '<span class="badge bg-primary">' + element.year + "</span>";
            }
            var category = "";
            if (element.category && element.category.name != "") {
              category =
                '<span class="badge bg-secondary">' +
                element.category.name +
                "</span>";
            }
            var model = "";
            if (element.model && element.model != "") {
              model = element.model;
            }
            var is_active = '<span class="badge bg-danger">In-Active</span>';
            if (element.is_active == 1) {
              is_active = '<span class="badge bg-success">Active</span>';
            }
            var is_featured = "";
            /* if(element.is_featured==1){
                                      is_featured = '<span class="badge bg-warning">Featured</span>';
                                } */
            var html =
              '<li class="card border border-primary mb-2"><div class="card-body p-2"><p class="card-text">' +
              element.brand.name +
              " " +
              element.name +
              " " +
              model +
              " " +
              year +
              " " +
              category +
              " " +
              is_active +
              " " +
              is_featured +
              '</p></div><input type="hidden" name="product_order[]" value="' +
              element.id +
              '" /></li>';
            $("#product-sequence-div").append(html);
          });
        }
        $("#product-sequence-div").sortable();
        $("#arrange_product_modal").modal("show");
      } else {
        $("#inquiry_error").show();
        $("#inquiry_error").text(result.message);
      }
    });
  }
  function luggageInquiryModal() {
    $("#l_inquiry_success_div").hide();
    $("#l_inquiry_otp_div").hide();
    $("#l_submit_inquiry_btn_div").hide();
    $("#l_inquiry_error").hide();
    $("#l_otp_btn_div").show();
    $("#l_inquiry_form_div").show();
    $("#l_otp").val("");
    $("#l_inquiry_success_div h5").text(
      "Thanks for showing interest and your information has been submitted successfully. Our Representative will get in touch with you shortly. Or you can call on 9950454545"
    );
    if (
      localStorage.getItem("locker_booking_date") &&
      localStorage.getItem("locker_booking_date") != ""
    ) {
      var d = new Date();
      var curDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
      var locker_booking_date = localStorage.getItem("locker_booking_date");
      const date1 = new Date(curDate);
      const date2 = new Date(locker_booking_date);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      if (!diffDays) {
        $("#l_inquiry_form_div").hide();
        $("#l_inquiry_success_div").show();
        $("#l_inquiry_success_div h5").text(
          "Thanks for showing interest and your information has been already submitted. Our Representative will get in touch with you shortly. Or you can call on 9950454545"
        );
      }
    }
    $("#luggageInquiryModal").modal("show");
  }
  function filterVehicle() {
    var trip_start_dt = $("#front_trip_start_dt").val();
    var trip_end_dt = $("#front_trip_end_dt").val();
    var type = [];
    $('[name="f_type[]"]:checked').each(function (i) {
      type[i] = $(this).val();
    });
    var brand = [];
    $('[name="f_brand[]"]:checked').each(function (i) {
      brand[i] = $(this).val();
    });
    var category = [];
    $('[name="f_category[]"]:checked').each(function (i) {
      category[i] = $(this).val();
    });
    var url = base + "/get-vehicles";
    var data = {
      type: type,
      brand: brand,
      category: category,
      trip_start_dt: trip_start_dt,
      trip_end_dt: trip_end_dt,
    };
    callAjax(url, data, function (result) {
      if (result.status) {
        $("#vehicle_box").html(result.data);
      } else {
        showError(result.message, "error");
      }
    });
  }
  function submitBookingEdit(type) {
    var idArr = [];
    var idCustArr = [];
    var vehicleNotSelected = false;
    var isDuplicateSelected = false;
    var isDuplicateCustSelected = false;
    $('[name="vehicles[]"]').each(function (c, e) {
      if ($(e).attr("product_type_id") != "5") {
        if ($.inArray($(e).val(), idArr) !== -1) {
          isDuplicateSelected = true;
        }
        idArr.push($(e).val());
      }
      if ($(e).val() == "") {
        vehicleNotSelected = true;
      }
    });
    $(".v_customers").each(function (c, e) {
      if ($(e).attr("product_type_id") != "5" && $(e).val() != "") {
        if ($.inArray($(e).val(), idCustArr) !== -1) {
          isDuplicateCustSelected = true;
        }
        idCustArr.push($(e).val());
      }
    });
    if (vehicleNotSelected) {
      showError(
        "Please select all vehicle or accessories item to submit the form.",
        "error"
      );
    } else if (isDuplicateSelected) {
      showError(
        "Duplicate item selected as vehicle, please select unique item for every vehicle to submit the form.",
        "error"
      );
    } else if (isDuplicateCustSelected) {
      showError(
        "Duplicate customer selected for vehicle, please select unique customer for every vehicle to submit the form.",
        "error"
      );
    } else {
      $("#close_page").val(type);
      $("#booking_form").submit();
    }
  }
  function bookingCalculation() {
    var taxRate = $("#tax_rate").val();
    var price = $("#product_price").val();
    var trip_start = $("#trip_start_datetime").val();
    var trip_end = $("#trip_end_datetime").val();
    var trip_start_ = trip_start.split(" ");
    var trip_end_ = trip_end.split(" ");
    var dt1 = new Date(trip_start_[0] + " 00:00");
    var dt2 = new Date(trip_end_[0] + " 00:00");
    var time_difference = dt2.getTime() - dt1.getTime();
    var diff = time_difference / (1000 * 60 * 60 * 24) + 1;
    var subtotal = (price * diff).toFixed(2);
    $("#b_subtotal").text(subtotal);
    var tax = ((subtotal * taxRate) / 100).toFixed(2);
    $("#b_taxrate").text(taxRate);
    $("#b_tax").text(tax);
    $("#b_total").text((parseFloat(tax) + parseFloat(subtotal)).toFixed(2));
    if ($("#referral_id").val() != "") {
      var commision_rate = $("#commision_rate").val();
      $("#b_ref_comm_rate").text(commision_rate);
      $("#b_ref_comm").text(((subtotal * commision_rate) / 100).toFixed(2));
    } else {
      $("#commision_rate").val(0);
      $("#b_ref_comm_rate").text("0");
    }
  }
  function approveWithdrawal(id) {
    $("#withdrawal_id").val(id);
    $("#withdrawal_modal").modal("show");
  }
  function getSelectBrand() {
    var val = $("#product_type_id").val();
    if (val == 5) {
      // 5 = accessory
      $("#accessory_discount_div").show();
      $("#price_23hr_for_100km").removeAttr("required");
      $("#extra_hr_price").removeAttr("required");
      $("#extra_km_price").removeAttr("required");
      $("#price_23hr_for_100km").attr("readonly", "readonly");
      $("#price_23hr_for_150km").attr("readonly", "readonly");
      $("#price_23hr_for_250km").attr("readonly", "readonly");
      $("#extra_hr_price").attr("readonly", "readonly");
      $("#extra_km_price").attr("readonly", "readonly");
      $("#accessory_icon").removeAttr("disabled");
    } else {
      $("#accessory_discount_div").hide();
      $("#price_23hr_for_100km").attr("required", "required");
      $("#extra_hr_price").attr("required", "required");
      $("#extra_km_price").attr("required", "required");
      $("#price_23hr_for_100km").removeAttr("readonly");
      $("#price_23hr_for_150km").removeAttr("readonly");
      $("#price_23hr_for_250km").removeAttr("readonly");
      $("#extra_hr_price").removeAttr("readonly");
      $("#extra_km_price").removeAttr("readonly");
      $("#accessory_icon").attr("disabled", "disabled");
    }
    var url = base + "/get-brand";
    var data = { type: val };
    callAjax(url, data, function (result) {
      if (result.status) {
        if (result.data) {
          var html = '<option value="">Select option</option>';
          var selected = $("#product_brand_id").attr("brandid");
          result.data.forEach((element) => {
            if (selected == element.id) {
              html +=
                '<option selected value="' +
                element.id +
                '">' +
                element.name +
                "</option>";
            } else {
              html +=
                '<option value="' +
                element.id +
                '">' +
                element.name +
                "</option>";
            }
          });
          $("#product_brand_id").html(html);
          $(".select2").select2();
        }
      } else {
        showError(result.message, "error");
      }
    });
  }
  function showQrcodeModal(id) {
    var url = base + "/get-referrer-qrcode/" + id;
    var data = {};
    callAjax(url, data, function (result) {
      if (result.status) {
        $("#qrcode-div").html(result.data.qr_code);
        $("#referrer-code-div").html(result.data.referrer_code);
        $("#download_qr_btn1").attr("href", result.data.download_url1);
        $("#download_qr_btn2").attr("href", result.data.download_url2);
        $("#download_qr_btn3").attr("href", result.data.download_url3);
        $("#qrcode-modal").modal("show");
      } else {
        showError(result.message, "error");
      }
    });
  }
  function addScanCount(id, code, time) {
    //localStorage.removeItem("referrer_id");
    //localStorage.removeItem("referrer_data");
    localStorage.removeItem("booking_id");
    localStorage.removeItem("booking_data");
    if (
      localStorage.getItem("referrer_id") &&
      localStorage.getItem("referrer_id") != ""
    ) {
      console.log("get");
      var data = localStorage.getItem("referrer_data");
      if (data) {
        var pData = JSON.parse(data);
        if (pData.code != code) {
          localStorage.setItem("referrer_id", id);
          localStorage.setItem(
            "referrer_data",
            JSON.stringify({ id: id, code: code, time: time })
          );
          var data = { referrer_id: id };
          var url = base + "/add-scan-count";
          callAjax(url, data, function (result) {});
        } else {
          const date1 = new Date(time);
          const date2 = new Date(pData.time);
          const diffTime = Math.abs(date2 - date1);
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays) {
            localStorage.setItem("referrer_id", id);
            localStorage.setItem(
              "referrer_data",
              JSON.stringify({ id: id, code: code, time: time })
            );
            var data = { referrer_id: id };
            var url = base + "/add-scan-count";
            callAjax(url, data, function (result) {});
          }
        }
      } else {
        localStorage.setItem("referrer_id", id);
        localStorage.setItem(
          "referrer_data",
          JSON.stringify({ id: id, code: code, time: time })
        );
        var data = { referrer_id: id };
        var url = base + "/add-scan-count";
        callAjax(url, data, function (result) {});
      }
    } else {
      console.log("set");
      localStorage.setItem("referrer_id", id);
      localStorage.setItem(
        "referrer_data",
        JSON.stringify({ id: id, code: code, time: time })
      );
      var url = base + "/add-scan-count";
      var data = { referrer_id: id };
      callAjax(url, data, function (result) {});
    }
  }
  function callAjax(url, dataset, callbackfun, async_type = false) {
    $.ajax({
      type: "POST",
      url: url,
      data: dataset,
      async: async_type,
      success: function (response) {
        callbackfun(response);
      },
    });
  }
  function showError(message = "", toastType = "danger") {
    if (toastType == "error") {
      toastType = "danger";
    }
    if (!message) return;
    //One.helpers('jq-notify', {type: toastType , message: message});
    var success_toast = document.getElementById("success_toast");
    var error_toast = document.getElementById("error_toast");
    if (toastType == "danger") {
      $("#error_toast strong").html(message);
      var toast = new bootstrap.Toast(error_toast);
      toast.show();
    } else {
      $("#success_toast strong").html(message);
      var toast = new bootstrap.Toast(success_toast);
      toast.show();
    }
  }
  function readURL(input) {
    console.log($(input).attr("id"));
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('[for="' + $(input).attr("id") + '"]').text("Uploaded");
      };
      reader.readAsDataURL(input.files[0]);
    }
  }