/* Javascript for pdfXBlock. */
function pdfXBlockInitEdit(runtime, element) {
    var dataUrl = runtime.handlerUrl(element, 'get_select_data');
    var url_selector = $(element).find('#pdf_select_url');

    var selectList =[{'label': 'initLable', 'url': 'init-url'}]

    $(element).find('.action-cancel').bind('click', function() {
        runtime.notify('cancel', {});
    });

    $(element).find('.action-save').bind('click', function() {
        var data = {
            'display_name': $('#pdf_edit_display_name').val(),
            'url': $('#pdf_edit_url').val(),
            'allow_download': $('#pdf_edit_allow_download').val(),
            'source_text': $('#pdf_edit_source_text').val(),
            'source_url': $('#pdf_edit_source_url').val()
        };

        runtime.notify('save', {state: 'start'});

        var handlerUrl = runtime.handlerUrl(element, 'save_pdf');
        $.post(handlerUrl, JSON.stringify(data)).done(function(response) {
            if (response.result === 'success') {
                runtime.notify('save', {state: 'end'});
                // Reload the whole page :
                // window.location.reload(false);
            } else {
                runtime.notify('error', {msg: response.message})
            }
        });
    });

    /*$.ajax({
        type: "POST",
        url: dataUrl,
        data: JSON.stringify({requested: true}),
        success: set_select_data
    });*/

    $.ajax({
        type: "GET",
        url: 'http://localhost:8088/wx/selects',
        success: set_select_data
    });
    
    function set_select_data(result) {
        console.log('get select data from backend');
        console.log(result);
        selectList = result;
        var selectOpts = '';
        if(selectList.length >0 ){
            for (let i = 0; i < selectList.length; i++) {
                var obj = selectList[i]
                var opt = '<option value =' + obj.url + '>' + obj.label + '</option>'
                selectOpts += opt
            }
        }
        console.log('add options,',selectOpts);
        url_selector.html(selectOpts)
    }
}
