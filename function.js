var storageUnit = {
    currentStage: 0,
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
    ],
    tempUserData: ""
}
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
    reportHTMLTemplate() {
        var width = 75 / storageUnit.userData[1].length;
        var Choices = '', cons = '', val = '', feel = '', help = '';
        for (var c = 0; c < storageUnit.userData[1].length; c++) {
            Choices += '<td style="border: 1px solid black; width:' + width + '%;">' + storageUnit.userData[1][c] + '</td>';
        }
        cons = helper.emailTemplateForDependentList(width, 2);
        val = helper.emailTemplateForDependentList(width, 3);
        feel = helper.emailTemplateForDependentList(width, 4);
        help = helper.stringToList(6, null);
        return '<!DOCTYPE html><html><body><table style="width:100%; border: 1px solid black;"><tr><th style="border: 1px solid black; width: 25%;">Problem</th><th style="border: 1px solid black; width: 75%;" colspan="' + storageUnit.userData[1].length + '">' + storageUnit.userData[0] + '</th></tr><tr><td style="border: 1px solid black; width: 25%;">Choices</td>' + Choices + '</tr><tr><td style="border: 1px solid black; width: 25%;">Consequences</td>' + cons + '</tr><tr><td style="border: 1px solid black; width: 25%;">Values</td>' + val + '</tr><tr><td style="border: 1px solid black; width: 25%;">Feelings</td>' + feel + '</tr><tr><td style="border: 1px solid black; width: 25%;">Additional Info</td><td style="border: 1px solid black; width: 75%;" colspan="' + storageUnit.userData[1].length + '">' + storageUnit.userData[5] + '</td></tr><tr><td style="border: 1px solid black; width: 25%;">Who Can Help</td><td style="border: 1px solid black; width: 75%;" colspan="' + storageUnit.userData[1].length + '"><ul>' + help + '</ul></td></tr><tr><td style="border: 1px solid black; width: 25%;">Decision</td><td style="border: 1px solid black; width: 75%;" colspan="' + storageUnit.userData[1].length + '">' + storageUnit.userData[7] + '</td></tr><tr><td style="border: 1px solid black; width: 25%;">Assessment</td><td style="border: 1px solid black; width: 75%;" colspan="' + storageUnit.userData[1].length + '">' + storageUnit.userData[8] + '</td></tr></table></body></html>'
    },
    emailTemplateForDependentList(width, reportStage) {
        var dependList = '';
        for (var c = 0; c < storageUnit.userData[1].length; c++) {
            dependList += '<td style="border: 1px solid black; width:' + width + '%;"><ul>';
            dependList += helper.stringToList(reportStage, c);
            dependList += '</ul></td>';
        }
        return dependList;
    },
    stringToList(i, j) {
        if (j != null)
            var splittedStrings = storageUnit.userData[i][j].split("\n");
        else
            var splittedStrings = storageUnit.userData[i].split("\n");
        var listHTML = '';
        for (var k = 0; k < splittedStrings.length; k++) {
            listHTML += '<li>' + splittedStrings[k] + '</li>';
        }
        return listHTML;
    },
    showThankYouPage() {
        $("#report").hide();
        $("#footer_area").hide();
        $("#thank_you").show();
    },
}

var action = {
    showDataEntry() {
        helper.showView("dataEntry");
        dataInput.setupUserDataEntryBox(storageUnit.currentStage);
        helper.inProgressLabel(true, (storageUnit.currentStage + 1));
        dataInput.showTemporaryData();
    },
    showPreview() {
        if (helper.editMode) {
            helper.editMode = false;
            $("#show_preview").text("Preview");
        }
        else {
            if (storageUnit.currentStage > 0) {
                $("#show_data_entry").text("Resume");
            }
            general.refresh();
            storageUnit.tempUserData = $.trim($("#i_response").val());
            helper.inProgressLabel(false, (storageUnit.currentStage + 1));
        }
        helper.showView("preview");
        helper.dataEntryToInitialState();
    },
    showReport() {
        helper.reportView();
        helper.createReportTemplate();
        helper.showMailReport();
    },
    choice(choiceAction) {
        if (choiceAction == "forward") {
            helper.choicePosition++;
            helper.choicePosition = helper.choicePosition % (storageUnit.userData[helper.pivot].length);
        }
        else {
            helper.choicePosition--;
            if (helper.choicePosition < 0)
                helper.choicePosition = storageUnit.userData[helper.pivot].length - 1;
        }
        general.refresh();
    },
    sendEmail() {
        var email = helper.getEmail();
        var width = 75 / storageUnit.userData[1].length;
        var choices=[], consequences=[], values=[], feelings=[], helps=[] ;
        for(var c=0;c<storageUnit.userData[1].length;c++){
            choices[c]={"choice":storageUnit.userData[1][c]};
        }
        for(var c=0;c<storageUnit.userData[1].length;c++){
            var splitConsequences = storageUnit.userData[2][c].split("\n");
            var multiConsequence=[];
            for(var d=0;d< splitConsequences.length; d++){
                multiConsequence[d]={"multiConsequence":splitConsequences[d]};
            }
            consequences[c]={"multiConsequences":multiConsequence};
        }
        for(var c=0;c<storageUnit.userData[1].length;c++){
            var splitValues = storageUnit.userData[3][c].split("\n");
            var multiValues=[];
            for(var d=0;d< splitValues.length; d++){
                multiValues[d]={"multiValue":splitValues[d]};
            }
            values[c]={"multiValues":multiValues};
        }
        for(var c=0;c<storageUnit.userData[1].length;c++){
            var splitFeelings = storageUnit.userData[4][c].split("\n");
            var multiFeelings=[];
            for(var d=0;d< splitFeelings.length; d++){
                multiFeelings[d]={"multiFeeling":splitFeelings[d]};
            }
            feelings[c]={"multiFeelings":multiFeelings};
        }
            var splitHelps = storageUnit.userData[6].split("\n");
            for(var d=0;d< splitHelps.length; d++){
                helps[d]={"help":splitHelps[d]};
            }

        var data = 
        {
            "problem": storageUnit.userData[0],
            "totalChoices": storageUnit.userData[helper.pivot].length,
            "width":width,
            "choices":choices,
            "consequences":consequences,
            "values":values,
            "feelings":feelings,
            "additionalInfo": storageUnit.userData[5],
            "multiHelps":helps,
            "decision": storageUnit.userData[7],
            "assessment": storageUnit.userData[8]
        };
        var result = Mustache.render(template, data);
        if (email != false) {
            var templateParams = {
                Problem: storageUnit.userData[0],
                reply_to: email,
                reportData: result
            };
            emailjs.send(siteConfiguration.email.service, siteConfiguration.email.templateId, templateParams)
                .then(
                    helper.showThankYouPage(),
                    function (error) {
                        alert("Sorry,We can't send your email currently, you can save report by downloading the webpage");
                        console.log(error);
                    }
                );
        }
    },
    edit(viewEdit) {
        helper.showView("dataEntry");
        helper.editMode = true;
        dataInput.setupUserDataEntryBox(viewEdit);
        $('#show_preview').text("Cancel");
        helper.edit = viewEdit;
    },
    reloadPage() {
        location.reload();
    }
}

var general = {
    progress() {
        $("#completed_bar").width(storageUnit.currentStage / 9 * 100 + "%");
        $("#b" + (storageUnit.currentStage)).addClass("completed");
        helper.inProgressLabel(true, (storageUnit.currentStage + 1));
        helper.inProgressLabel(false, (storageUnit.currentStage));
    },

    refresh() {
        for (var i = 0; i < storageUnit.currentStage; i++) {
            if (helper.pivot == i || helper.dependentList[i]) {
                $("#p" + (i + 1)).text(storageUnit.userData[i][helper.choicePosition]);
            }
            else {
                $("#p" + (i + 1)).text(storageUnit.userData[i]);
            }
            $("#ps" + (i + 1)).css("display", "flex");
        }

    }
}

var dataInput = {

    setupUserDataEntryBox(setupStage) {
        if (setupStage == storageUnit.userData.length)
            return;
        $('#i_question').text(helper.questions[setupStage]);
        $('#i_response').focus();
        if (setupStage == 7) {
            $("#i_response").hide();
            $("#decision_data").show();
        }
        else if (setupStage == helper.pivot) {
            if (helper.editMode) {
                $(helper.viewSubmit[helper.editMode]).show();
                $('#i_response').val(storageUnit.userData[setupStage][helper.choicePosition]);
            }
            else {
                $("#add_more").show();
                if (helper.totalChoices >= 1) {
                    $(helper.viewSubmit[helper.editMode]).show();
                }
            }
        }
        else if (helper.dependentList[setupStage]) {
            if (helper.editMode) {
                $(helper.viewSubmit[helper.editMode]).show();
                $("#i_choices").text(storageUnit.userData[helper.pivot][helper.choicePosition]);
                $('#i_response').val(storageUnit.userData[setupStage][helper.choicePosition]);
            }
            else {
                if (helper.totalChoices == (helper.incr + 1))
                    $(helper.viewSubmit[helper.editMode]).show();
                else
                    $("#input_next_btn").show();
                $("#i_choices").text(storageUnit.userData[helper.pivot][helper.incr]);
            }
            $("#i_choices").show();
        }
        else {
            $(helper.viewSubmit[helper.editMode]).show();
            if (helper.editMode)
                $('#i_response').val(storageUnit.userData[setupStage]);
        }

    },

    submitResponse() {
        if (helper.submitForBlankChoice())
            return;
        var response = helper.getResponse();
        if (response != false) {
            if (storageUnit.currentStage == helper.pivot)
                helper.submitForChoice(response);
            else if (helper.dependentList[storageUnit.currentStage])
                helper.submitForDependentlist(response);
            else
                helper.submitForRemainingEntries(response);
            helper.prepareForNextStage();
            if (storageUnit.currentStage == 7)
                helper.createDecisionView();
            if (storageUnit.currentStage == 9)
                helper.finalSubmit();
        }
    },
    addChoices() {
        $('#i_response').focus();
        var response = helper.getResponse();
        if (response != false) {
            helper.saveResponse(storageUnit.currentStage, helper.totalChoices, response);
            $('#i_response').val("");
            helper.totalChoices++;
            $("#submit_response").show();
        }
    },
    nextChoice() {
        $('#i_response').focus();
        var response = helper.getResponse();
        if (response != false) {
            helper.saveResponse(storageUnit.currentStage, helper.incr, response);
            $('#i_response').val("");
            helper.incr++;
            $("#input_next_btn").hide();
            dataInput.setupUserDataEntryBox(storageUnit.currentStage);
        }
    },
    decisionChoice(choice) {
        if (helper.editMode) {
            helper.saveResponse(helper.edit, null, storageUnit.userData[helper.pivot][choice]);
            helper.showView("preview");
            general.refresh();
            helper.editMode = false;
            $("#show_preview").text("Preview");
        }
        else {
            helper.saveResponse(storageUnit.currentStage, null, storageUnit.userData[helper.pivot][choice]);
            storageUnit.currentStage++;
            general.progress();
            this.setupUserDataEntryBox(storageUnit.currentStage);
        }
        helper.changeDecision(choice);
        $("#i_response").show();
        $('#i_response').focus();
        $("#decision_data").hide();
    },
    editSubmit() {
        var response = helper.getResponse();
        if (response != false) {
            if (helper.edit == helper.pivot || helper.dependentList[helper.edit]) {
                helper.editSubmitForMultiInput(response);
            }
            else {
                helper.editSubmitForRemainingEntries(response);
            }
            $('#i_response').val("");
            helper.showView("preview");
            general.refresh();
            helper.editMode = false;
            helper.editToInitialState();
        }
    },
    showTemporaryData() {
        $("#i_response").val(storageUnit.tempUserData);
    }
}

var TestSuite =
{
    focusOnDecision() {
        storageUnit.currentStage = 7;
        storageUnit.userData = [
            "focusOnDecision",
            ["choice1", "choice2", "choice3"],
            ["con1", "con2", "con3"],
            ["val1", "val2", "val3"],
            ["feel1", "feel2", "feel3"],
            "Additionalinfo",
            "Whocanhelp",
            "",
            ""
        ];
        helper.createDecisionView();
    },
    focusOnChoice() {
        storageUnit.currentStage = 1;
        storageUnit.userData = [
            "focusOnChoice",
            [],
            [],
            [],
            [],
            "",
            "",
            "",
            ""
        ];
    },
    focusOnDependentChoice() {
        storageUnit.currentStage = 2;
        storageUnit.userData = [
            "focusOnDependentChoice",
            ["choice1", "choice2", "choice3"],
            [],
            [],
            [],
            "",
            "",
            "",
            ""
        ];
    },
    focusOnAddInfo() {
        storageUnit.currentStage = 5;
        storageUnit.userData = [
            "focusOnAddInfo",
            ["choice1", "choice2", "choice3"],
            ["con1", "con2", "con3"],
            ["val1", "val2", "val3"],
            ["feel1", "feel2", "feel3"],
            "",
            "",
            "",
            ""
        ];
    },
    focusOnSubmit() {
        storageUnit.currentStage = 9;
        storageUnit.userData = [
            "focusOnSubmit",
            ["choice1", "choice2", "choice3egfgsxvdg", "choice4kd fkgkjknknknkn"],
            ["con1", "con2", "con3vbmdbdm", "choice3"],
            ["val1", "val2", "valsgufvgnvn3", "choice3"],
            ["feel1", "feel2", "feel3vcbdhd", "choice3"],
            "gjjvhgvbcbccnfg",
            "bvjkjkbbdhnnvsfwn nbdghch gdgdb vxgvzzvsgg cffjvnnmh",
            "choice2",
            "ADecisionf hrhf,vjjjtopwok  lcmgdllbd gdbnbnmn"
        ];
        helper.showView("preview");
        general.refresh();
        $('#show_data_entry').hide();
        $('#show_report').show();
    }
}