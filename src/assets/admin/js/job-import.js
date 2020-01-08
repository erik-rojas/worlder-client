$(document).ready(function () {
    var isLoading = false;
    var isSaving = false;
    var page = 1;
    var post_form_data = {};
    var total_records = 0;
    var records = [];

    $(document).ready(function () {
        $('input[name="daterange"]').daterangepicker({
            locale: {
                format: 'DD/MM/YYYY'
            }
        });

        $('#form-get-data').submit(function (e) {
            e.preventDefault();
            page = 1;
            total_records = 0;
            var daterange = $('#daterange').val();
            $('#list-data').empty();
            daterange = daterange.split('-');
            records = [];
            post_form_data = {
                website: $('#website').val(),
                page: 1,
                from_date: daterange[0],
                to_date: daterange[1]
            };

            $('#unload-message').addClass('hide');
            getData(post_form_data);
        });

        $(window).scroll(function () {
            if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                if (!isLoading && total_records) {
                    page++;
                    post_form_data.page = page;
                    getData(post_form_data);
                }
            }
        });

        $('#btn-import').click(function () {
            var postData = [];
            $('.cb-job').each(function () {
                if ($(this).is(":checked")) {
                    var alt = $(this).attr('alt');
                    alt = parseInt(alt) - 1;
                    postData.push(records[alt]);
                }
            });

            importData(postData);
        });
    });

    function getData(postData) {
        isLoading = true;
        $('#loading').removeClass('hide');
        $.ajax({
            method: 'POST',
            url: rootUrl + 'admin/jobs/get_link_jobs',
            data: postData,
            dataType: 'json'
        }).done(function (result) {
            if (Array.isArray(result)) {
                for (var i = 0; i < result.length; i++) {
                    total_records += 1;
                    records.push(result[i]);
                    var html_append = '<tr>\
                        <td class="checkboxRecord" valign="middle" style="width: 60px;">\
                            <input type="checkbox" name="" alt="' + total_records + '" id="cb-job-' + total_records + '" class="cb-user cb-job">\
                            <label style="padding-left: 0; height: initial; line-height:initial;" for="cb-job-' + total_records + '"></label>\
                        </td>\
                        <td valign="middle" style="width: 120px;"><img style="height: 60px;" src="' + result[i].company_info.logo + '" alt=""></td>\
                        <td valign="middle">\
                            <h4><b> ' + result[i].title + '</b></h4>\
                            <div> ' + result[i].company_info.name + '</div>\
                            <div><a target="_blank" href="' + result[i].link + '">ref link</a></div>\
                        </td>\
                    </tr>';

                    $('#list-data').append(html_append);
                }
            }
        }).fail(function () {
            alert('Please reload and try again');
        }).always(function () {
            isLoading = false;
            $('#loading').addClass('hide');
            $('#btn-import').removeClass('hide');
        });
    }

    function importData(postData) {
        $('#btn-import').attr('disabled', true);
        $('#btn-import i').show();
        isSaving = true;
        $.ajax({
            method: 'POST',
            url: rootUrl + 'admin/jobs/import_jobs',
            data: { data: postData },
            dataType: 'json',
        }).done(function (result) {
            if (result.success) alert('Imported successfully');
        }).fail(function (err) {

        }).always(function () {
            $('#btn-import').attr('disabled', false);
            $('#btn-import i').hide();
            isSaving = false;
        });
    }
});