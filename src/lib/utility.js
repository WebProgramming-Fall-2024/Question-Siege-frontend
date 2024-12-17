import Swal from "sweetalert2";
import $ from "jquery";

export function showToast(message_string, type_string, position, styles, duration) {
    let messageText = (message_string) ? message_string : "متاسفانه مشکلی رخ داده است لطفا مجددا تلاش کنید.";
    let typeMessage = (type_string) ? type_string : "error";
    let position_end = (position) ? position : "bottom-start";
    let styles_main = (styles) ? styles : "";
    let timer = duration ? duration : 3000;

    const Toast = Swal.mixin({
        toast: true,
        position: position_end,
        showConfirmButton: false,
        timer: timer,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
        customClass: {
            popup: styles_main,
        }
    });
    Toast.fire({
        icon: typeMessage,
        title: messageText
    });
}
export function showSwalMessage(message_string, type_string, show_button_boolean, duration_ms) {
    let messageText = (message_string) ? message_string : "متاسفانه مشکلی رخ داده است لطفا مجددا تلاش کنید.",
        typeMessage = (type_string) ? type_string : "error",
        buttonStatus = (show_button_boolean) ? true : false,
        duration = (duration_ms) ? duration_ms : 5000;
    Swal.fire({
        text: messageText,
        showClass: {
            popup: `animate__animated animate__fadeInUp animate__faster`
        },
        hideClass: {
            popup: `animate__animated animate__fadeOutDown animate__faster `
        },
        icon: typeMessage,
        confirmButtonText: "تایید",
        showConfirmButton: buttonStatus,
        timer: duration,
    })
    $("#swal2-html-container").css("direction", 'rtl')
}

export function checkMobile(text) {

    let mobileRegex = /^09\d{9}$/;
    return mobileRegex.test(text)
}
export function checkUsername(text) {
    let usernameRegex = /^[A-Za-z0-9_]{3}[A-Za-z0-9_]+$/;
    return usernameRegex.test(text)
}
export function toEnglish(number) {
    let numberPersian = number.toString();
    let enNum = "";
    for (let i = 0; i < numberPersian.length; i++) {
        let char = numberPersian[i];
        switch (char) {
            case "۱":
                enNum += "1";
                break;
            case "۲":
                enNum += "2";
                break;
            case "۳":
                enNum += "3";
                break;
            case "۴" || "٤":
                enNum += "4";
                break;
            case "۵" || "٥":
                enNum += "5";
                break;
            case "۶" || "٦":
                enNum += "6";
                break;
            case "۷":
                enNum += "7";
                break;
            case "۸":
                enNum += "8";
                break;
            case "۹":
                enNum += "9";
                break;
            case "۰":
                enNum += "0";
                break;
            default:
                enNum += char;
        }
    }
    return enNum;
}