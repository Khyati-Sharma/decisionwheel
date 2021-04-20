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
        var choices = [], consequences = [], values = [], feelings = [], helps = [];
        for (var c = 0; c < storageUnit.userData[1].length; c++) {
            choices[c] = { "choice": storageUnit.userData[1][c] };
        }
        for (var c = 0; c < storageUnit.userData[1].length; c++) {
            var splitConsequences = storageUnit.userData[2][c].split("\n");
            var multiConsequence = [];
            for (var d = 0; d < splitConsequences.length; d++) {
                multiConsequence[d] = { "multiConsequence": splitConsequences[d] };
            }
            consequences[c] = { "multiConsequences": multiConsequence };
        }
        for (var c = 0; c < storageUnit.userData[1].length; c++) {
            var splitValues = storageUnit.userData[3][c].split("\n");
            var multiValues = [];
            for (var d = 0; d < splitValues.length; d++) {
                multiValues[d] = { "multiValue": splitValues[d] };
            }
            values[c] = { "multiValues": multiValues };
        }
        for (var c = 0; c < storageUnit.userData[1].length; c++) {
            var splitFeelings = storageUnit.userData[4][c].split("\n");
            var multiFeelings = [];
            for (var d = 0; d < splitFeelings.length; d++) {
                multiFeelings[d] = { "multiFeeling": splitFeelings[d] };
            }
            feelings[c] = { "multiFeelings": multiFeelings };
        }
        var splitHelps = storageUnit.userData[6].split("\n");
        for (var d = 0; d < splitHelps.length; d++) {
            helps[d] = { "help": splitHelps[d] };
        }

        var data =
        {
            "problem": storageUnit.userData[0],
            "totalChoices": storageUnit.userData[helper.pivot].length,
            "width": width,
            "choices": choices,
            "consequences": consequences,
            "values": values,
            "feelings": feelings,
            "additionalInfo": storageUnit.userData[5],
            "multiHelps": helps,
            "decision": storageUnit.userData[7],
            "assessment": storageUnit.userData[8]
        };
        var result = Mustache.render(template, data);
        if (email != false) {
            emailjs.init(siteConfiguration.email.userId);
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

var TestSuite = {
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