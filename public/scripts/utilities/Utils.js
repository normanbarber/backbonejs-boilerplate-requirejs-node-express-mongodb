define(['jquery', 'underscore', 'Backbone'],
    function ($, _, Backbone) {
        var utils = Backbone.View.extend({
            displayValidationErrors: function (messages) {
                for (var key in messages) {
                    if (messages.hasOwnProperty(key)) {
                        this.addValidationError(key, messages[key]);
                    }
                }
                this.showAlert('Warning!', 'Fix validation errors and try again', 'alert-warning');
            },
            addValidationError: function (field, message) {
                var controlGroup = $('#' + field).parent().parent();
                controlGroup.addClass('error');
                $('.help-inline', controlGroup).html(message);
            },
            removeValidationError: function (field) {
                var controlGroup = $('#' + field).parent().parent();
                controlGroup.removeClass('error');
                $('.help-inline', controlGroup).html('');
            },
            showAlert: function(title, text, klass) {
                $('.alert').removeClass('alert-error alert-warning alert-success alert-info');
                $('.alert').addClass(klass);
                $('.alert').html('<strong>' + title + '</strong> ' + text);
                $('.alert').show();
                $('.alert').fadeOut(3000, function() {
                });
            },
            hideAlert: function() {
                $('.alert').hide();
            }
        });
        return utils;
    });