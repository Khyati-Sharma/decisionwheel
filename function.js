var storageUnit ={
    currentStage : 0,
    userData: [
        "",
        [],
        [],
        [],
        [],
        "",
        "",
        "",
        ""
      ]
}
function showDataEntry(){
    $('#preview_area').hide();
    $('#user_data_entry_box').show();
    $('#SubmitResponse').show();
}

function showView(viewname) {
    viewmap = { "preview": "#previewviewarea", "dataEntry": "#userdataentrybox" };
    viewEye = { "preview": "#eyeslash", "dataEntry": "#eye" };
    $(viewmap[this.last_visible_view]).hide();
    $(viewEye[this.last_visible_view]).hide();
    this.last_visible_view = viewname;
    $(viewmap[this.last_visible_view]).show();
    $(viewEye[this.last_visible_view]).show();
}

function progress(){
    $("#completed_bar").width(storageUnit.currentStage/ 9 * 100 +"%");
    for(var i=0;i<storageUnit.currentStage;i++){
        $("#b"+(i+1)).addClass("completed");
    }
}

function refresh(){
    for(var i=0;i<storageUnit.currentStage;i++){
        $("#p"+(i+1)).text(storageUnit.userData[storageUnit.currentStage])
    }
}