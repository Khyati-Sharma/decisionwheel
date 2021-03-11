var app = {
    "state": {
      "currentStage": 0
    },
    "userData": [
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
    "edit": -1,
    editMode: false,
    lastVisibleView: "preview",
    showView(viewName) {
      viewMap = { "preview": "#previewViewArea", "dataEntry": "#userDataEntryBox" };
      viewEye = { "preview": "#eyeSlash", "dataEntry": "#eye" };
      $(viewMap[this.lastVisibleView]).hide();
      $(viewEye[this.lastVisibleView]).hide();
      this.lastVisibleView = viewName;
      $(viewMap[this.lastVisibleView]).show();
      $(viewEye[this.lastVisibleView]).show();
    },
    choiceTemplate(id, index, classChoice) {
      var tempId = id + index;
      $("#" + id + "s").append('<div class="mainBlock ' + classChoice + ' "  id="' + tempId + '"></div>');
      tempId = "#" + tempId;
      $(tempId).append('<h1>' + this.userData[1][index] + '</h1><div class = "choiceContent"></div>');
      $(tempId + " .choiceContent").append('<h3>Consequences</h3><ul class = "cons"></ul><h3>Values</h3><ul class = "values"></ul><h3>Feelings</h3><ul class = "feelings"></ul>');
      var tempConsequences = this.userData[2][index].split("\n")
      for (var i = 0; i < tempConsequences.length; i++) {
        $(tempId + " .cons").append('<li>' + tempConsequences[i] + '</li>')
      }
      var tempValues = this.userData[3][index].split("\n")
      for (var i = 0; i < tempValues.length; i++) {
        $(tempId + " .values").append('<li>' + tempValues[i] + '</li>')
      }
      var tempFeelings = this.userData[4][index].split("\n")
      for (var i = 0; i < tempFeelings.length; i++) {
        $(tempId + " .feelings").append('<li>' + tempFeelings[i] + '</li>')
      }
    },
    beginning() {
      mainButtons.toggleButton(app.state.currentStage, true);
      previewPane.refresh();
    },
    progress() {
      $("#completedbar").width((this.state.currentStage / 9 * 100) + "%");
    }
  }
  
  var testSuite =
  {
  
    focusOnDecision() {
      mainButtons.toggleButton(app.state.currentStage, false);
      app.state.currentStage = 7;
      app.userData = [
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
      app.beginning();
    },
    focusOnChoice() {
      mainButtons.toggleButton(app.state.currentStage, false);
      app.state.currentStage = 1;
      app.userData = [
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
      app.beginning();
    },
    focusOnDependentChoice() {
      mainButtons.toggleButton(app.state.currentStage, false);
      app.state.currentStage = 2;
      app.userData = [
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
      app.beginning();
    },
    focusOnAddInfo() {
      mainButtons.toggleButton(app.state.currentStage, false);
      app.state.currentStage = 5;
      app.userData = [
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
      app.beginning();
    },
    focusOnSubmit() {
      mainButtons.toggleButton(app.state.currentStage, false);
      app.state.currentStage = 9;
      app.userData = [
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
      app.beginning();
    }
  
  }
  
  var DataEntryPane = {
    "Questions": [
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
    "IsList": [false, true, false, false, false, false, false, false, false],
    "pivot": 1,
    "DependentList": [false, false, true, true, true, false, false, false, false],
    "incr": 0,
    "blankChoice": 0,
    "DependentListEntries": ["Consequences", "Values", "Feelings"],
  
    getResponse() {
      var response = $.trim($("#iResponse").val());
      if (response == "" && app.state.currentStage != 7) {
        alert("Give some response");
        $("#iResponse").focus();
        return false;
      }
      return response;
  
    },
    decisionChoice(choice) {
      if (app.editMode) {
        app.userData[app.edit] = app.userData[this.pivot][choice];
        app.editMode = false;
        mainButtons.toggleButton(app.state.currentStage, true);
        app.showView("preview");
        previewPane.refresh();
      }
      else {
        app.userData[app.state.currentStage] = app.userData[this.pivot][choice];
        mainButtons.showDataEntryPane(++app.state.currentStage);
        app.progress();
        $("#b" + (app.state.currentStage)).addClass("completed");
        $("#b" + (app.state.currentStage+1)).addClass("inProgress");
      }
      $("#choiceLists .mainBlock").removeClass("selected");
      $("#choiceList" + choice).addClass("selected");
      $("#iResponse").show();
      $("#SubmitResponse").show();
      $("#decisionData").hide();
      $("#iResponse").focus();
    },
    SubmitResponse() {
      var tempResponse = $.trim($("#iResponse").val());
      if (this.blankChoice > 1 && tempResponse.length == 0) {
        $("#AddMore").hide();
        previewPane.refresh();
        this.blankChoice = 0;
        mainButtons.showDependentEntryPane(app.state.currentStage + 1);
        app.state.currentStage++;
        app.progress();
        $("#b" + (app.state.currentStage)).addClass("completed");
        $("#b" + (app.state.currentStage+1)).addClass("inProgress");
        return;
      }
      var response = this.getResponse();
      if (response != false) {
        if (app.editMode) {
          if (this.IsList[app.edit] || this.DependentList[app.edit]) {
            app.userData[app.edit][previewPane.ChoicePosition] = response;
            $("#iChoices").hide();
          }
          else {
            app.userData[app.edit] = response;
          }
          app.editMode = false;
          $("#iResponse").val("");
          previewPane.refresh();
          app.showView("preview");
          mainButtons.toggleButton(app.state.currentStage, true);
          app.showView("preview");
          return;
        }
        this.checkStageAndSetView(response);
        previewPane.refresh();
        app.state.currentStage++;
        $("#b" + (app.state.currentStage)).addClass("completed");
        $("#b" + (app.state.currentStage+1)).addClass("inProgress");
        app.progress();
      }
    },
    checkStageAndSetView(response) {
      
      if (this.IsList[app.state.currentStage]) {//Choices Condition
        this.addChoices();
        $("#AddMore").hide();
        this.blankChoice = 0;
        mainButtons.showDependentEntryPane(app.state.currentStage + 1);
      }
      else if (this.DependentList[app.state.currentStage]) {
        this.nextChoice();
        $("#iChoices").hide();      
        this.incr = 0;
        if (app.state.currentStage == 4)
          mainButtons.showDataEntryPane(app.state.currentStage + 1);
        else
          mainButtons.showDependentEntryPane(app.state.currentStage + 1);
      }
      else if (app.state.currentStage == 7) { ; }
      else {
        app.userData[app.state.currentStage] = response;
        $("#iResponse").val("");
      }
      if (app.state.currentStage == 0)
        mainButtons.showChoicesEntryPane(app.state.currentStage + 1);
      else if (app.state.currentStage == 5)
        mainButtons.showDataEntryPane(app.state.currentStage + 1);
      else if (app.state.currentStage == 6)
        mainButtons.showDecisionPane(app.state.currentStage + 1);
      else if (app.state.currentStage == 8) {
        mainButtons.enableNextButton();
        app.showView("preview");
        $("#mobileStart").text("Submit");
        $("#iChoices").hide();    
      }
    },
  
    nextChoice() {
      var response = this.getResponse();
      if (response != false) {
        this.incr++;
        if (app.userData[this.pivot].length - 1 == this.incr) {
          $("#InputNextBtn").hide();
          $("#SubmitResponse").show();
        }
        this.showChoices();
        app.userData[app.state.currentStage].push(response);
        $("#iResponse").val("");
        $("#iResponse").focus();
        /**
         * increment
         * checkcondn
         * show next choice in pane
         * push choice
         * empty data entry textarea
         */
      }
  
    },
    addChoices() {
      var response = this.getResponse();
      if (response != false) {
        $("#SubmitResponse").show();
        app.userData[app.state.currentStage].push(response);
        $("#iResponse").val("");
        $("#iResponse").focus();
        this.blankChoice++;
      }
    },
    setView(btnIndex) {
      $("#iQuestion").text(this.Questions[btnIndex]);
      if (btnIndex == 8){
        $("#iChoices").text(app.userData[7]);
        $("#iChoices").show();
      }
    },
    showAdd() {
      $("#AddMore").show();
      $("#SubmitResponse").hide();
    },
    showNext() {
      $("#InputNextBtn").show();
      $("#SubmitResponse").hide();
    },
    showChoices() {
      $("#iChoices").text(app.userData[this.pivot][this.incr]);
      $("#iChoices").show();
    },
    setDecisionPane() {
      $("#iResponse").hide();
      $("#SubmitResponse").hide();
      for (var i = 0; i < app.userData[this.pivot].length; i++) {
        if (app.editMode) {
          $("#decisionData").show();
        }
        else {
          app.choiceTemplate("choiceList", i, "notselected");
          $('#choiceList' + i).attr('onclick', 'DataEntryPane.decisionChoice(' + i + ')');
        }
        // $("#choiceList"+ i).click(function(){
        //   alert("the not respons");
        //   DataEntryPane.decisionChoice(i);
        // });
      }
      var addInfo = app.userData[5].split("\n");
      for (var i = 0; i < addInfo.length; i++) {
        $("#MoreInfo").append('<li>'+addInfo[i] + '</li>');
      }
      var Help = app.userData[6].split("\n");
      for (var i = 0; i < Help.length; i++) {
        $("#Help").append('<li>'+Help[i] + '</li>');
      }
    },
    prepareForEdit() {
      if (this.IsList[app.edit] || this.DependentList[app.edit]) {
        var data = app.userData[app.edit][previewPane.ChoicePosition];
        if (this.DependentList[app.edit]) {
          $("#iChoices").text(app.userData[this.pivot][previewPane.ChoicePosition]);
          $("#iChoices").show();
        }
      }
      else if (app.edit == 7) {
        DataEntryPane.setDecisionPane();
        $("#iQuestion").text(DataEntryPane.Questions[app.edit]);
        return;
      }
      else {
        var data = app.userData[app.edit];
      }
      $("#iResponse").val(data);
      $("#InputNewBtn").hide();
      $("#iQuestion").text(DataEntryPane.Questions[app.edit]);
    }
  }
  
  var previewPane = {
    "ChoicePosition": 0,
    "textEntry": "",
    refresh() {
      controls = ["#p1", "#p2", "#p3", "#p4", "#p5", "#p6", "#p7", "#p8", "#p9"];
      for (var i = 0; i < controls.length; i++) {
        if (DataEntryPane.IsList[i] || DataEntryPane.DependentList[i]) {
          $(controls[i]).text(app.userData[i][this.ChoicePosition]);
        }
        else {
          $(controls[i]).text(app.userData[i]);
        }
        this.enableEdit();
      }
      app.progress();
    },
    edit(button_index) {
      app.editMode = true;
      app.edit = button_index;
      DataEntryPane.prepareForEdit();
      app.showView("dataEntry");
      mainButtons.toggleButton(app.state.currentStage, false);
  
    },
    choice(action) {
      if (action == "forward")
        this.ChoicePosition++;
      else {
        this.ChoicePosition--;
        if (this.ChoicePosition < 0)
          this.ChoicePosition = app.userData[DataEntryPane.pivot].length - 1;
      }
      this.ChoicePosition = this.ChoicePosition % (app.userData[DataEntryPane.pivot].length);
      this.refresh();
    },
    enableEdit() {
      var editId = "#e" + (app.state.currentStage + 1);
      for (var i = 1; i < 10; i++) {
        if (app.userData[i - 1].length > 0) {
          editId = "#e" + i;
          $(editId).show();
        }
        else
          break;
      }
    },
    showPreview() {
      app.showView("preview");
      this.textEntry = $.trim($("#iResponse").val());
      $("#iChoices").hide();
      $(".ibtn").hide();
      $("#SubmitResponse").show();
      $("#decisionData").hide();
      $("#iResponse").show();
      this.refresh();
    },
    hidePreview() {
      if (app.state.currentStage == 1) {
        mainButtons.showChoicesEntryPane(app.state.currentStage);
        if (app.userData[1].length > 0)
          $("#SubmitResponse").show();
      }
      else if (app.state.currentStage == 7) {
        $("#iResponse").hide();
        $("#SubmitResponse").hide();
        $("#decisionData").show();
        mainButtons.showDataEntryPane(app.state.currentStage);
        $("#decisionData").show();
      }
      else if (app.state.currentStage > 1 && app.state.currentStage < 5)
        mainButtons.showDependentEntryPane(app.state.currentStage);
      else
        mainButtons.showDataEntryPane(app.state.currentStage);
      $("#iResponse").val(this.textEntry);
    }
  }
  
  var mainButtons = {
    "buttons": ["#b1", "#b2", "#b3", "#b4", "#b5", "#b6", "#b7", "#b8", "#b9", "#b10"],
    toggleButton(index, visible) {
      $(this.buttons[index]).prop('disabled', (!visible));
    },
    showChoicesEntryPane() {
      DataEntryPane.showAdd();
      this.showDataEntryPane(DataEntryPane.pivot);
    },
    showDependentEntryPane(btnIndex) {
      if ((app.userData[DataEntryPane.pivot].length - 1) == (app.userData[app.state.currentStage].length)) {
        $("#InputNextBtn").hide();
        $("#SubmitResponse").show();
      }
      else
        DataEntryPane.showNext();
      DataEntryPane.showChoices();
      this.showDataEntryPane(btnIndex);
    },
    showDecisionPane(btnIndex) {
      DataEntryPane.setDecisionPane();
      this.showDataEntryPane(btnIndex);
      $("#decisionData").show();
    },
    showDataEntryPane(btnIndex) {
      DataEntryPane.setView(btnIndex);
      app.showView("dataEntry");
      this.toggleButton(app.state.currentStage, false);
      $("#iResponse").focus();
    },
    enableNextButton() {
      this.toggleButton(app.state.currentStage + 1, true);
    },
    showReport() {
      $("#viewarea").hide();
      $("#buttonarea").hide();
      $("#finalReport").show();
      $("#completedbar").hide();
      $("#rProblem").text(app.userData[0]);
      var classChoice;
      for (var i = 0; i < app.userData[1].length; i++) {
        if (app.userData[1][i] == app.userData[7])
          classChoice = "selected";
        else
          classChoice = "notselected";
        app.choiceTemplate("rChoice", i, classChoice);
  
      }
      $("#rMoreInfo").text(app.userData[5]);
      var tempHelp = app.userData[6].split("\n")
      for (var i = 0; i < tempHelp.length; i++) {
        $("#rHelp").append('<li>' + tempHelp[i] + '</li>')
      }
      $("#rAssess").text(app.userData[8]);
      $(".progress").hide();
    },
    showDataEntryMobile() {
      if (app.state.currentStage == 0) {
        this.showDataEntryPane(0);
        $("#b" + (app.state.currentStage+1)).addClass("inProgress");
        $("#mobileStart").text("Continue");
      }
      else if (app.state.currentStage < 9) {
        previewPane.hidePreview();    
      }
      else {
        this.showReport();
  
      }
    },
    sendEmail(){
      var emailGt =$.trim($("#sendReportInt").val());
      if (emailGt== "") {
        alert("Please enter the Email");
        return;
      }
      var width=75/app.userData[1].length;
      var Choices='',cons='',val='',feel='',help='';
      for(var c=0;c<app.userData[1].length;c++){
        Choices+='<td style="border: 1px solid black; width:'+width+'%;">'+app.userData[1][c]+'</td>';
      }
      for(var c=0;c<app.userData[1].length;c++){
        cons+='<td style="border: 1px solid black; width:'+width+'%;"><ul>';
        var tempcons = app.userData[2][c].split("\n");
        for (var i = 0; i < tempcons.length; i++) {
          cons+='<li>'+tempcons[i]+'</li>';
        }
        cons+='</ul></td>';
      }
      for(var c=0;c<app.userData[1].length;c++){
        val+='<td style="border: 1px solid black; width:'+width+'%;"><ul>';
        var tempvals = app.userData[3][c].split("\n");
        for (var i = 0; i < tempvals.length; i++) {
          val+='<li>'+tempvals[i]+'</li>';
        }
        val+='</ul></td>';
      }
      for(var c=0;c<app.userData[1].length;c++){
        feel+='<td style="border: 1px solid black; width:'+width+'%;"><ul>';
        var tempcons = app.userData[4][c].split("\n");
        for (var i = 0; i < tempcons.length; i++) {
          feel+='<li>'+tempcons[i]+'</li>';
        }
        feel+='</ul></td>';
      }
      var wcHelp = app.userData[6].split("\n");
      for (var i = 0; i < wcHelp.length; i++) {
        help+='<li>'+wcHelp[i]+'</li>';
      }
      var templateParams = {
        Problem: app.userData[0],
        reply_to: emailGt,
        reportData:'<!DOCTYPE html><html><body><table style="width:100%; border: 1px solid black;"><tr><th style="border: 1px solid black; width: 25%;">Problem</th><th style="border: 1px solid black; width: 75%;" colspan="'+app.userData[1].length+'">'+app.userData[0]+'</th></tr><tr><td style="border: 1px solid black; width: 25%;">Choices</td>'+Choices+'</tr><tr><td style="border: 1px solid black; width: 25%;">Consequences</td>'+cons+'</tr><tr><td style="border: 1px solid black; width: 25%;">Values</td>'+val+'</tr><tr><td style="border: 1px solid black; width: 25%;">Feelings</td>'+feel+'</tr><tr><td style="border: 1px solid black; width: 25%;">Additional Info</td><td style="border: 1px solid black; width: 75%;" colspan="'+app.userData[1].length+'">'+app.userData[5]+'</td></tr><tr><td style="border: 1px solid black; width: 25%;">Who Can Help</td><td style="border: 1px solid black; width: 75%;" colspan="'+app.userData[1].length+'"><ul>'+help+'</ul></td></tr><tr><td style="border: 1px solid black; width: 25%;">Decision</td><td style="border: 1px solid black; width: 75%;" colspan="'+app.userData[1].length+'">'+app.userData[7]+'</td></tr><tr><td style="border: 1px solid black; width: 25%;">Assessment</td><td style="border: 1px solid black; width: 75%;" colspan="'+app.userData[1].length+'">'+app.userData[8]+'</td></tr></table></body></html>'
    }; 
      emailjs.send("default_service", "template_2rkf4re", templateParams)
      .then(function() {
        $("#finalReport").hide();
        $("#thankYou").show();
      }, function(error) {
          alert("Sorry,We can't send your email currently, you can save report by downloading the webpage");
      });
    },
    reloadPage(){
      location.reload();
    }
  }
  
  $(document).ready(function () {
    app.beginning();
    //testSuite.focusOnSubmit();
  });
  