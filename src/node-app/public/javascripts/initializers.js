$(document).ready(function () {
    $('#modal-add-expense select').css('width', '100%');
    $('#modal-add-trip select').css('width', '100%');
    $('#modal-add-income select').css('width', '100%');

    $('.select-several-users-expenses').select2({
        dropdownParent: $('#modal-add-expense'),
    });
    $('.select-several-users-trips').select2({
        dropdownParent: $('#modal-add-trip'),
    });
    $('.select-several-users-incomes').select2({
        dropdownParent: $('#modal-add-income'),
    });
});