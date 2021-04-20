var helper = {
    pivot: 1,
    dependentList: [false, false, true, true, true, false, false, false, false],
    totalChoices: 0,
    viewMap: { "preview": "#preview_area", "dataEntry": "#user_data_entry_box" },
    viewButton(button) {
        if (button == "dataEntry")
            return "#show_preview";
        if (storageUnit.currentStage == 9)
            return "#show_report";
        return "#show_data_entry";
    },
    viewSubmit: { true: "#submit_editted_response", false: "#submit_response" },
    editMode: false,
    edit: -1,
    lastVisibleView: "preview",
    incr: 0,
    choicePosition: 0,
    questions: [
        "What is Problem ?",
        "What are the choices?",
        "What are the consequences ?",
        "What are the values?",
        "What are your feelings ?",
        "Anything More you want to share ?",
        "Who Can Help ?",
        "What is your Decision ?",
        "Assess Decision"
    ],
    choiceTemplate(id, index, decisionChoiceCandidate) {
        var tempId = id + index;
        $("#" + id + "s").append('<div class="main_block ' + decisionChoiceCandidate + ' "  id="' + tempId + '"></div>');
        tempId = "#" + tempId;
        $(tempId).append('<h1>' + storageUnit.userData[1][index] + '</h1><div class = "choice_content"></div>');
        $(tempId + " .choice_content").append('<h3>Consequences</h3><ul class = "cons"></ul><h3>Values</h3><ul class = "values"></ul><h3>Feelings</h3><ul class = "feelings"></ul>');
        var tempConsequences = storageUnit.userData[2][index].split("\n");
        for (var i = 0; i < tempConsequences.length; i++) {
            $(tempId + " .cons").append('<li>' + tempConsequences[i] + '</li>');
        }
        var tempValues = storageUnit.userData[3][index].split("\n");
        for (var i = 0; i < tempValues.length; i++) {
            $(tempId + " .values").append('<li>' + tempValues[i] + '</li>');
        }
        var tempFeelings = storageUnit.userData[4][index].split("\n");
        for (var i = 0; i < tempFeelings.length; i++) {
            $(tempId + " .feelings").append('<li>' + tempFeelings[i] + '</li>');
        }
    },
    showView(viewName) {
        $(helper.viewMap[helper.lastVisibleView]).hide();
        $(helper.viewButton(helper.lastVisibleView)).hide();
        helper.lastVisibleView = viewName;
        $(helper.viewMap[helper.lastVisibleView]).show();
        $(helper.viewButton(helper.lastVisibleView)).show();
    },
    getResponse() {
        var response = $.trim($("#i_response").val());
        if (response == "") {
            alert("Give some response");
            $("#i_response").focus();
            return false;
        }
        return response;
    },
    createDecisionView() {
        for (var i = 0; i < storageUnit.userData[helper.pivot].length; i++) {
            helper.choiceTemplate("choice_list", i, "not_selected");
            $('#choice_list' + i).attr('onclick', 'dataInput.decisionChoice(' + i + ')');
        }
        var addInfo = storageUnit.userData[5].split("\n");
        for (var i = 0; i < addInfo.length; i++) {
            $("#more_info").append('<li>' + addInfo[i] + '</li>');
        }
        var help = storageUnit.userData[6].split("\n");
        for (var i = 0; i < help.length; i++) {
            $("#help").append('<li>' + help[i] + '</li>');
        }
    },
    inProgressLabel(show, labelNum) {
        if (show)
            $("#b" + (labelNum)).addClass("in_progress");
        else
            $("#b" + (labelNum)).removeClass("in_progress");

    },

    submitForBlankChoice() {
        var tempresponse = $.trim($("#i_response").val());
        if (helper.totalChoices > 1 && tempresponse == "") {
            $("#add_more").hide();
            helper.prepareForNextStage();
            return true;
        }
        return false;
    },
    submitForChoice(response) {
        helper.saveResponse(storageUnit.currentStage, helper.totalChoices, response);
        $("#add_more").hide();
        helper.totalChoices++;
    },
    submitForDependentlist(response) {
        helper.saveResponse(storageUnit.currentStage, helper.incr, response);
        helper.incr = 0;
        $("#i_choices").hide();
    },
    submitForRemainingEntries(response) {
        helper.saveResponse(storageUnit.currentStage, null, response);
    },
    prepareForNextStage() {
        $("#submit_response").hide();
        storageUnit.currentStage++;
        dataInput.setupUserDataEntryBox(storageUnit.currentStage);
        $("#i_response").val("");
        general.progress();
    },
    finalSubmit() {
        helper.showView("preview");
        general.refresh();
    },
    saveResponse(i, j, response) {
        if (j != null)
            storageUnit.userData[i][j] = response;
        else
            storageUnit.userData[i] = response;
    },
    changeDecision(choice) {
        $("#choice_lists .main_block").removeClass("selected");
        $("#choice_list" + choice).addClass("selected");
    },
    editToInitialState() {
        $("#submit_editted_response").hide();
        $("#show_preview").text("Preview");
    },
    editSubmitForMultiInput(response) {
        helper.saveResponse(helper.edit, helper.choicePosition, response);
        $("#i_choices").hide();

    },
    editSubmitForRemainingEntries(response) {
        helper.saveResponse(helper.edit, null, response);
    },
    dataEntryToInitialState() {
        $("#i_response").val("");
        $(".i_btn").hide();
        $("#i_response").show();
        $("#i_choices").hide();
        $("#decision_data").hide();
    },
    choiceCreationAndShowDecision() {
        var decisionChoiceCandidate;
        for (var i = 0; i < storageUnit.userData[1].length; i++) {
            if (storageUnit.userData[1][i] == storageUnit.userData[7])
                decisionChoiceCandidate = "selected";
            else
                decisionChoiceCandidate = "not_selected";
            helper.choiceTemplate("r_choice", i, decisionChoiceCandidate);
        }
    },
    reportView() {
        $("#details").hide();
        $('#show_report').hide();
        $("#report").show();
    },
    getEmail() {
        var emailGt = $.trim($("#mail_reportinp").val());
        if (emailGt == "") {
            alert("Please enter the Email");
            return false;
        }
        var emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!emailPattern.test(emailGt)) {
            alert("You have entered an invalid email address!");
            return false;
        }
        return emailGt;
    },
    createReportTemplate() {
        $("#r_problem").text(storageUnit.userData[0]);
        helper.choiceCreationAndShowDecision();
        $("#r_more_info").text(storageUnit.userData[5]);
        var tempHelp = storageUnit.userData[6].split("\n")
        for (var i = 0; i < tempHelp.length; i++) {
            $("#r_help").append('<li>' + tempHelp[i] + '</li>')
        }
        $("#r_assess").text(storageUnit.userData[8]);
    },
    showMailReport() {
        $("#mail_report").css("display", "flex");
    },
    showThankYouPage() {
        $("#report").hide();
        $("#footer_area").hide();
        $("#thank_you").show();
    },
}