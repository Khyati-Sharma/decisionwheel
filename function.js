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
    "isList": [false, true, false, false, false, false, false, false, false],
    "dependentList": [false, false, true, true, true, false, false, false, false],
    "currentChoice" : 0
}

var action = {
    showDataEntry() {
        $('#preview_area').hide();
        $('#user_data_entry_box').show();
        $('#SubmitResponse').show();
    },

    showView(viewname) {
        viewmap = { "preview": "#previewviewarea", "dataEntry": "#userdataentrybox" };
        viewEye = { "preview": "#eyeslash", "dataEntry": "#eye" };
        $(viewmap[this.last_visible_view]).hide();
        $(viewEye[this.last_visible_view]).hide();
        this.last_visible_view = viewname;
        $(viewmap[this.last_visible_view]).show();
        $(viewEye[this.last_visible_view]).show();
    }
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
            if(helper.isList[i] || helper.dependentList[i]){
                $("#p" + (i + 1)).text(storageUnit.userData[i][helper.currentChoice]);
            }
            else{
                $("#p" + (i + 1)).text(storageUnit.userData[i]);
            }
            $("#e" + (i + 1)).show();
        }
        if(storageUnit.userData[1]){
            $("#backward").show();
            $("#forward").show();
        }
        this.progress();
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
