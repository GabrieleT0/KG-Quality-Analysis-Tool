function test(){
    document.getElementById('wrapSpinner').style.display = 'block'
    document.getElementById('submit').style.display = 'none'
    document.getElementById('msgBox').style.display = 'none'
    var id = document.getElementById('id').value
    var keyword = document.getElementById('keyword').value
    id = id.trim();
    keyword = keyword.trim();
    id = id.replace(/,\s*$/, '');
    keyword = keyword.replace(/,\s*$/, '');
    id = id.split(',')
    keyword = keyword.split(',')

    for(var i = 0; i<id.length;i++){
        if (id[i].length === 0)
           id.splice(i,1)
    }
    for(var i = 0; i<keyword.length;i++){
        if (keyword[i].length === 0)
            keyword.splice(i,1)
    }
    
    console.log(id)
    console.log(keyword)
    var csrf_token = "{{ csrf_token() }}";
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrf_token);
            }
        }
    });
    
    $.post("http://193.205.161.53:5000/testServer",{
        javascript_data: JSON.stringify(id),
        javascript_data2: JSON.stringify(keyword),
        },
        function(data){
            console.log($.parseJSON(data))
            if(jQuery.isEmptyObject($.parseJSON(data)) == false){
                window.location.href = 'result.html'
                localStorage.setItem('kgs',JSON.stringify(data))
                document.getElementById('msgBox').style.display = 'block'
                document.getElementById('wrapSpinner').style.display = 'none'
                console.log(data)
            } 
            else {
                document.getElementById('wrapSpinner').style.display = 'block'
                document.getElementById('submit').style.display = 'none'
                document.getElementById('msgBox').style.display = 'block'
                document.getElementById('wrapSpinner').style.display = 'none'
                document.getElementById('submit').style.display = 'block'
                msgBox = document.getElementById('errorMsg')
                msgBox.innerHTML = 'No Knowledge Graph found'
            }
    }).fail(function(xhr,exception){
        document.getElementById('wrapSpinner').style.display = 'block'
        document.getElementById('submit').style.display = 'none'
        var msg = '';
        if (xhr.status === 0) {
            msg = 'Not connect.\n Verify Network.';
        } else if (xhr.status == 404) {
            msg = 'Requested page not found. [404]';
        } else if (xhr.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        document.getElementById('msgBox').style.display = 'block'
        document.getElementById('wrapSpinner').style.display = 'none'
        document.getElementById('submit').style.display = 'block'        
        msgBox = document.getElementById('errorMsg')
        msgBox.innerHTML = msg
    });

}
