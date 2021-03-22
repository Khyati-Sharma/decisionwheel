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
    ]
}
var helper = {
    pivot: 1,
    dependentList: [false, false, true, true, true, false, false, false, false],
    currentChoice: 0,
    viewMap: { "preview": "#preview_area", "dataEntry": "#user_data_entry_box" },
    viewButton: { "preview": "#show_data_entry", "dataEntry": "#show_preview" },
    last_visible_view: "preview",
    currentChoice: 0,
    incr: 0,
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
    choiceTemplate(id, index, classChoice) {
        var tempid = id + index;
        $("#" + id + "s").append('<div class="main-block ' + classChoice + ' "  id="' + tempid + '"></div>');
        tempid = "#" + tempid;
        $(tempid).append('<h1>' + storageUnit.userData[1][index] + '</h1><div class = "choice_content"></div>');
        $(tempid + " .choice_content").append('<h3>Consequences</h3><ul class = "cons"></ul><h3>Values</h3><ul class = "values"></ul><h3>Feelings</h3><ul class = "feelings"></ul>');
        var tempconsequences = storageUnit.userData[2][index].split("\n");
        for (var i = 0; i < tempconsequences.length; i++) {
            $(tempid + " .cons").append('<li>' + tempconsequences[i] + '</li>');
        }
        var tempvalues = storageUnit.userData[3][index].split("\n");
        for (var i = 0; i < tempvalues.length; i++) {
            $(tempid + " .values").append('<li>' + tempvalues[i] + '</li>');
        }
        var tempfeelings = storageUnit.userData[4][index].split("\n");
        for (var i = 0; i < tempfeelings.length; i++) {
            $(tempid + " .feelings").append('<li>' + tempfeelings[i] + '</li>');
        }
        /*rChoices =>.main-block #rChoices0
        #rChoices0 => h1 choice_content
        #rChoices0 .choice_content => h3 tags +ul tags with their class
        #rChoices0 respective class=>li tags
    */
    },
    showView(viewName) {
        $(helper.viewMap[helper.last_visible_view]).hide();
        $(helper.viewButton[helper.last_visible_view]).hide();
        helper.last_visible_view = viewName;
        $(helper.viewMap[helper.last_visible_view]).show();
        $(helper.viewButton[helper.last_visible_view]).show();
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
}

var action = {
    showDataEntry() {
        helper.showView("dataEntry");
        dataInput.setupUserDataEntryBox();
        $("#b" + (storageUnit.currentStage + 1)).addClass("inProgress");
    },
    showPreview() {
        $('#preview_area').show();
        $('#user_data_entry_box').hide();
        $('#resume').removeAttr('hidden');
        $('#preview').hide();

    },

    /*
    Start:-
      -change view from preview to user_data_entry_box
      -replace itself with preview button
      -setup userdataentrybox based on storageUnit
      -change name from start->resume->view report
    Home:-
      -change view from \user_data_entry_box to preview
      -replace itself with start button
      -preservence of user_data_entry_box
    */
}

var general = {
    progress() {
        $("#completed_bar").width(storageUnit.currentStage / 9 * 100 + "%");
        $("#b" + (storageUnit.currentStage)).removeClass("inProgress");
        $("#b" + (storageUnit.currentStage)).addClass("completed");
        $("#b" + (storageUnit.currentStage + 1)).addClass("inProgress");
    },

    refresh() {
        for (var i = 0; i < storageUnit.currentStage; i++) {
            if (helper.pivot == i || helper.dependentList[i]) {
                $("#p" + (i + 1)).text(storageUnit.userData[i][helper.currentChoice]);
            }
            else {
                $("#p" + (i + 1)).text(storageUnit.userData[i]);
            }
            $("#e" + (i + 1)).show();
        }
        if (helper.pivot < storageUnit.currentStage) {
            $("#backward").show();
            $("#forward").show();
        }
        this.progress();
    }
}

var dataInput = {
    /**
     *  Submit
     *    -store current value
     *      -special case choice multiple
     *    -call refresh
     *    -blank text area
     *    -move to next level
     *    
     *    -special use(for edit)
     * Next 
     *  - first of all store the data in current stage
     *  - next i_choices print in consequences
     *  - the next button show only (n-1) index of choices
     *  - then after show submit button
     * 
     */
    setupUserDataEntryBox() {
        $('#iQuestion').text(helper.questions[storageUnit.currentStage]);
        $('#i_response').focus();
        if (storageUnit.currentStage == 7) {
            $("#i_response").hide();
            $("#decision_data").show();
        
            for (var i = 0; i < storageUnit.userData[helper.pivot].length; i++) {
                helper.choiceTemplate("choiceList", i, "notselected");
                $('#choiceList' + i).attr('onclick', 'dataInput.decisionChoice(' + i + ')');
            }
            var addInfo = storageUnit.userData[5].split("\n");
            for (var i = 0; i < addInfo.length; i++) {
                $("#more_info").append('<li>' + addInfo[i] + '</li>');
            }
            var help = storageUnit.userData[6].split("\n");
            for (var i = 0; i < help.length; i++) {
                $("#help").append('<li>' + help[i] + '</li>');
            }
        }
        else if (storageUnit.currentStage == helper.pivot) {
            $("#add_more").show();
        }
        else if (helper.dependentList[storageUnit.currentStage]) {
            if (helper.currentChoice == helper.incr)
                $("#submit_response").show();
            else
                $("#input_next_btn").show();
            $("#i_choices").text(storageUnit.userData[helper.pivot][helper.incr]);
            $("#i_choices").show();
        }
        else {
            $("#submit_response").show();
        }
    },

    submitResponse() {
        var tempresponse = $.trim($("#i_response").val());
        if (helper.currentChoice > 1 && tempresponse == "") {
            $("#submit_response").hide();
            $("#add_more").hide();
            storageUnit.currentStage++;
            this.setupUserDataEntryBox();
            general.progress();
            return;
        }
        var response = helper.getResponse();
        if (response != false) {
            $("#submit_response").hide();
            if (storageUnit.currentStage == helper.pivot || helper.dependentList[storageUnit.currentStage]) {
                storageUnit.userData[storageUnit.currentStage][helper.currentChoice] = response;
                $("#add_more").hide();
                $("#i_response").val("");
                storageUnit.currentStage++;
                helper.incr = 0;
                $("#i_choices").hide();
                this.setupUserDataEntryBox();
                general.progress();
            }
            else {
                storageUnit.userData[storageUnit.currentStage] = response;
                $('#i_response').val("");
                storageUnit.currentStage++;
                general.progress();
                this.setupUserDataEntryBox();
            }
        }
    },
    addChoices() {
        $('#i_response').focus();
        var response = helper.getResponse();
        if (response != false) {
            storageUnit.userData[storageUnit.currentStage][helper.currentChoice] = response;
            $('#i_response').val("");
            helper.currentChoice++;
            $("#submit_response").show();
        }
    },

    nextChoice() {
        $('#i_response').focus();
        var response = helper.getResponse();
        if (response != false) {
            storageUnit.userData[storageUnit.currentStage][helper.incr] = response;
            $('#i_response').val("");
            helper.incr++;
            $("#input_next_btn").hide();
            this.setupUserDataEntryBox();
        }
    },

    decisionChoice(choice) {


        storageUnit.userData[storageUnit.currentStage] = storageUnit.userData[helper.pivot][choice];
        storageUnit.currentStage++;
        general.progress();
        this.setupUserDataEntryBox();

        $("#choiceLists .main-block").removeClass("selected");
        $("#choiceList" + choice).addClass("selected");
        $("#i_response").show();
        $("#decision_data").hide();
    }

}

var TestSuite =
{
    focusOnDecision1() {
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
    },

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
    },
    focusOnChoice() {
        MainButtons.toggleButton(storageUnit.currentStage, false);
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
        App.Beginning();
    },
    focusOnDependentChoice() {
        MainButtons.toggleButton(storageUnit.currentStage, false);
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
        App.Beginning();
    },
    focusOnAddInfo() {
        MainButtons.toggleButton(storageUnit.currentStage, false);
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
        App.Beginning();
    },
    focusOnSubmit() {
        MainButtons.toggleButton(storageUnit.currentStage, false);
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
        App.Beginning();
    }

}
