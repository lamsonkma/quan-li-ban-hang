$(document).ready(function () {
    $('.btn-submit').click(() => {
        
        console.log($('#form'));

    })
    function validateConfirmPassWord() {
        let confirmPassWord = $('#confirmPassword').val();
        let passWord = $('#password').val();
        if (confirmPassWord === passWord) {
            return true;
        }
        return false

    }
    $('#confirmPassword').keyup(function () {
        $("#confirmPassword ~ .form-icon").html('');
        if (validateConfirmPassWord()) {
            $('#confirmPassword ~ .form-icon').append("<i class='bx bxs-check-circle'></i>");
            $("#confirmPassword ~ .form-icon").css({ "color": "green" });
        }
        else {
            $('#confirmPassword ~ .form-icon').append("<i class='bx bxs-error-circle'></i>");
        }
    })
    function validatePassWord() {
        let passWord = $('#password').val();
        let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (re.test(passWord)) {
            return true;
        }
        return false

    }
    $('#password').keyup(function () {
        $("#password ~ .form-icon").html('');
        if (validatePassWord()) {
            $('#password ~ .form-icon').append("<i class='bx bxs-check-circle'></i>");
            $("#password ~ .form-icon").css({ "color": "green" });
        }
        else {
            $('#password ~ .form-icon').append("<i class='bx bxs-error-circle'></i>");
        }
    })
    function validateEmail() {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let email = $('#email').val();
        if (re.test(email)) {
            return true;
        }
        return false;

    }
    $('#email').keyup(function () {
        $("#email ~ .form-icon").html('');
        if (validateEmail()) {
            $('#email ~ .form-icon').append("<i class='bx bxs-check-circle'></i>");
            $("#email ~ .form-icon").css({ "color": "green" });;
        }
        else {
            $('#email ~ .form-icon').append("<i class='bx bxs-error-circle'></i>");
        }
    })

    $('#userName').keyup(function () {
        let userName = $('#userName').val();
        $.ajax({
            type: 'POST',
            url: '/user',
            data: JSON.stringify({ userName: userName }),
            contentType: "application/json",
        })
            .done(function (result) {
                $("#userName ~ .form-icon").html('');
                if (!result) {
                    if(validateUserName()){
                        $('#userName ~ .form-icon').append("<i class='bx bxs-check-circle'></i>");
                        $("#userName ~ .form-icon").css({ "color": "green" });
                    }
                    else{
                        $('#userName ~ .form-icon').append("<i class='bx bxs-error-circle'></i>");
                    }
                }
                else {
                    $('#userName ~ .form-icon').append("<i class='bx bxs-error-circle'></i>");
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus + ': ' + errorThrown);
            });
    })
    function validateUserName(){
        let userName = $('#userName').val();
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if(re.test(userName)){
            return true
        }
        return false
    }

})