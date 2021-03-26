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
    tempUserData:""
}
var helper = {
    pivot: 1,
    dependentList: [false, false, true, true, true, false, false, false, false],
    currentChoice: 0,
    viewMap: { "preview": "#preview_area", "dataEntry": "#user_data_entry_box" },
    viewButton: { "preview": "#show_data_entry", "dataEntry": "#show_preview" },
    lastVisibleView: "preview",
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
        var tempId = id + index;
        $("#" + id + "s").append('<div class="main_block ' + classChoice + ' "  id="' + tempId + '"></div>');
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
        /*rChoices =>.main_block #rChoices0
        #rChoices0 => h1 choice_content
        #rChoices0 .choice_content => h3 tags +ul tags with their class
        #rChoices0 respective class=>li tags
    */
    },
    showView(viewName) {
        $(helper.viewMap[helper.lastVisibleView]).hide();
        $(helper.viewButton[helper.lastVisibleView]).hide();
        helper.lastVisibleView = viewName;
        $(helper.viewMap[helper.lastVisibleView]).show();
        $(helper.viewButton[helper.lastVisibleView]).show();
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
    createDecisionView(){
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
    }
}

var action = {
    showDataEntry() {
        helper.showView("dataEntry");
        dataInput.setupUserDataEntryBox();
        $("#b" + (storageUnit.currentStage + 1)).addClass("in_progress");
    },
    showPreview() {
        if (storageUnit.currentStage > 0) {
            $("#show_data_entry").text("Resume");
        }
        general.refresh();
        helper.showView("preview");
        storageUnit.tempUserData=$.trim($("#i_response").val());
        $(".i_btn").hide();
        $("#i_response").show();
        $("#i_choices").hide();
        $("#decision_data").hide();
    },
    showReport() {
        $("#details").hide();
        $('#show_report').hide();
        $("#report").show();
        $("#r_problem").text(storageUnit.userData[0]);
        var classChoice;
        for (var i = 0; i < storageUnit.userData[1].length; i++) {
            if (storageUnit.userData[1][i] == storageUnit.userData[7])
                classChoice = "selected";
            else
                classChoice = "not_selected";
            helper.choiceTemplate("r_choice", i, classChoice);
        }
        $("#r_more_info").text(storageUnit.userData[5]);
        var tempHelp = storageUnit.userData[6].split("\n")
        for (var i = 0; i < tempHelp.length; i++) {
            $("#r_help").append('<li>' + tempHelp[i] + '</li>')
        }
        $("#r_assess").text(storageUnit.userData[8]);
        $("#send_report").show();

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
   sendEmail(){
    var emailGt =$.trim($("#send_reportint").val());
    if (emailGt== "") {
      alert("Please enter the Email");
      return;
    }
    var width=75/storageUnit.userData[1].length;
    var Choices='',cons='',val='',feel='',help='';
    for(var c=0;c<storageUnit.userData[1].length;c++){
      Choices+='<td style="border: 1px solid black; width:'+width+'%;">'+storageUnit.userData[1][c]+'</td>';
    }
    for(var c=0;c<storageUnit.userData[1].length;c++){
      cons+='<td style="border: 1px solid black; width:'+width+'%;"><ul>';
      var tempcons = storageUnit.userData[2][c].split("\n");
      for (var i = 0; i < tempcons.length; i++) {
        cons+='<li>'+tempcons[i]+'</li>';
      }
      cons+='</ul></td>';
    }
    for(var c=0;c<storageUnit.userData[1].length;c++){
      val+='<td style="border: 1px solid black; width:'+width+'%;"><ul>';
      var tempvals = storageUnit.userData[3][c].split("\n");
      for (var i = 0; i < tempvals.length; i++) {
        val+='<li>'+tempvals[i]+'</li>';
      }
      val+='</ul></td>';
    }
    for(var c=0;c<storageUnit.userData[1].length;c++){
      feel+='<td style="border: 1px solid black; width:'+width+'%;"><ul>';
      var tempcons = storageUnit.userData[4][c].split("\n");
      for (var i = 0; i < tempcons.length; i++) {
        feel+='<li>'+tempcons[i]+'</li>';
      }
      feel+='</ul></td>';
    }
    var wcHelp = storageUnit.userData[6].split("\n");
    for (var i = 0; i < wcHelp.length; i++) {
      help+='<li>'+wcHelp[i]+'</li>';
    }
    var templateParams = {
      Problem: storageUnit.userData[0],
      reply_to: emailGt,
      reportData:'<!DOCTYPE html><html><body><table style="width:100%; border: 1px solid black;"><tr><th style="border: 1px solid black; width: 25%;">Problem</th><th style="border: 1px solid black; width: 75%;" colspan="'+storageUnit.userData[1].length+'">'+storageUnit.userData[0]+'</th></tr><tr><td style="border: 1px solid black; width: 25%;">Choices</td>'+Choices+'</tr><tr><td style="border: 1px solid black; width: 25%;">Consequences</td>'+cons+'</tr><tr><td style="border: 1px solid black; width: 25%;">Values</td>'+val+'</tr><tr><td style="border: 1px solid black; width: 25%;">Feelings</td>'+feel+'</tr><tr><td style="border: 1px solid black; width: 25%;">Additional Info</td><td style="border: 1px solid black; width: 75%;" colspan="'+storageUnit.userData[1].length+'">'+storageUnit.userData[5]+'</td></tr><tr><td style="border: 1px solid black; width: 25%;">Who Can Help</td><td style="border: 1px solid black; width: 75%;" colspan="'+storageUnit.userData[1].length+'"><ul>'+help+'</ul></td></tr><tr><td style="border: 1px solid black; width: 25%;">Decision</td><td style="border: 1px solid black; width: 75%;" colspan="'+storageUnit.userData[1].length+'">'+storageUnit.userData[7]+'</td></tr><tr><td style="border: 1px solid black; width: 25%;">Assessment</td><td style="border: 1px solid black; width: 75%;" colspan="'+storageUnit.userData[1].length+'">'+storageUnit.userData[8]+'</td></tr></table></body></html>'
  }; 
    emailjs.send("default_service", "template_2rkf4re", templateParams)
    .then(function() {
      $("#finalReport").hide();
      $("#thankYou").show();
    }, function(error) {
        alert("Sorry,We can't send your email currently, you can save report by downloading the webpage");
    });
  }
}

var general = {
    progress() {
        $("#completed_bar").width(storageUnit.currentStage / 9 * 100 + "%");
        $("#b" + (storageUnit.currentStage)).removeClass("in_progress");
        $("#b" + (storageUnit.currentStage)).addClass("completed");
        $("#b" + (storageUnit.currentStage + 1)).addClass("in_progress");
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
        $('#i_question').text(helper.questions[storageUnit.currentStage]);
        $('#i_response').focus();
        if (storageUnit.currentStage == 7) {
            $("#i_response").hide();
            $("#decision_data").show();
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
                if(storageUnit.currentStage==7)
                helper.createDecisionView();
                if (storageUnit.currentStage == 9) {
                    helper.showView("preview");
                    general.refresh();
                    $('#show_data_entry').hide();
                    $('#show_preview').hide();
                    $('#show_report').show();
                }
                else
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
        $("#choice_lists .main_block").removeClass("selected");
        $("#choice_list" + choice).addClass("selected");
        $("#i_response").show();
        $('#i_response').focus();
        $("#decision_data").hide();
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
    }

}
