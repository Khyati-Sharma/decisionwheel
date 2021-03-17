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
    viewMap : { "preview": "#preview_area", "dataEntry": "#user_data_entry_box" },
    viewButton : { "preview": "#show_data_entry", "dataEntry": "#show_preview" },
    last_visible_view : "preview",
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
        $(tempid).append('<h1>' + this.UserData[1][index] + '</h1><div class = "choiceContent"></div>');
        $(tempid + " .choiceContent").append('<h3>Consequences</h3><ul class = "cons"></ul><h3>Values</h3><ul class = "values"></ul><h3>Feelings</h3><ul class = "feelings"></ul>');
        var tempconsequences = this.UserData[2][index].split("\n")
        for (var i = 0; i < tempconsequences.length; i++) {
          $(tempid + " .cons").append('<li>' + tempconsequences[i] + '</li>')
        }
        var tempvalues = this.UserData[3][index].split("\n")
        for (var i = 0; i < tempvalues.length; i++) {
          $(tempid + " .values").append('<li>' + tempvalues[i] + '</li>')
        }
        var tempfeelings = this.UserData[4][index].split("\n")
        for (var i = 0; i < tempfeelings.length; i++) {
          $(tempid + " .feelings").append('<li>' + tempfeelings[i] + '</li>')
        }
        /*rChoices =>.main-block #rChoices0
        #rChoices0 => h1 choiceContent
        #rChoices0 .choiceContent => h3 tags +ul tags with their class
        #rChoices0 respective class=>li tags
    */
      },
      showView(viewName) {
        $(helper.viewMap[helper.last_visible_view]).hide();
        $(helper.viewButton[helper.last_visible_view]).hide();
        helper.last_visible_view = viewName;
        $(helper.viewMap[helper.last_visible_view]).show();
        $(helper.viewButton[helper.last_visible_view]).show();
    }
}

var action = {
    showDataEntry() {
        this.showView("dataEntry");
        dataInput.setupUserDataEntryBox();
    },
    showPreview() {
        $('#preview_area').show();
        $('#user_data_entry_box').hide();
        $('#resume').removeAttr('hidden');
        $('#preview').hide();

    },
    resume() {
        $('#preview_area').hide();
        $('#user_data_entry_box').show();
        $('#resume').hide();
        $('#preview').show();
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
        for (var i = 0; i < storageUnit.currentStage; i++) {
            $("#b" + (i + 1)).addClass("completed");
        }
    },

    refresh() {
        for (var i = 0; i < storageUnit.currentStage; i++) {
            if (helper.pivot==i || helper.dependentList[i]) {
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
     * 
     * 
     */
    setupUserDataEntryBox(){
        $('#iQuestion').text(helper.questions[storageUnit.currentStage]);
        if(storageUnit.currentStage == 7){
            $("#iResponse").hide();
            $("#iDecision").show();
            for (var i = 0; i < storageUnit.UserData[helper.pivot].length; i++) {
                helper.choiceTemplate("choiceList", i, "notselected");
                $('#choiceList' + i).attr('onclick', 'DataEntryPane.decisionChoice(' + i + ')');
              
              // $("#choiceList"+ i).click(function(){
              //   alert("the not respons");
              //   DataEntryPane.decisionChoice(i);
              // });
            }
            var addInfo = App.UserData[5].split("\n");
            for (var i = 0; i < addInfo.length; i++) {
              $("#MoreInfo").append('<li>'+addInfo[i] + '</li>');
            }
            var Help = App.UserData[6].split("\n");
            for (var i = 0; i < Help.length; i++) {
              $("#Help").append('<li>'+Help[i] + '</li>');
            }
        }
        
    },
    
    submitResponse(){
       /* var tempResponse = $.trim($("#iResponse").val());
        storageUnit.userData[currentStage]=tempResponse;
        $('#p1').val(tempResponse);
         $('#iResponse').val("");*/
        general.refresh();



     },

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
        MainButtons.toggleButton(App.State.CurrentStage, false);
        App.State.CurrentStage = 7;
        App.UserData = [
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
        App.Beginning();
    },
    focusOnChoice() {
        MainButtons.toggleButton(App.State.CurrentStage, false);
        App.State.CurrentStage = 1;
        App.UserData = [
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
        MainButtons.toggleButton(App.State.CurrentStage, false);
        App.State.CurrentStage = 2;
        App.UserData = [
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
        MainButtons.toggleButton(App.State.CurrentStage, false);
        App.State.CurrentStage = 5;
        App.UserData = [
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
        MainButtons.toggleButton(App.State.CurrentStage, false);
        App.State.CurrentStage = 9;
        App.UserData = [
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
