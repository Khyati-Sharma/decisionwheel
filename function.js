var App = {
  "State": {
    "CurrentStage": 0
  },
  "UserData": [
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
  EDIT_MODE: false,
  last_visible_view: "preview",
  showView(viewname) {
    viewmap = { "preview": "#previewviewarea", "dataEntry": "#userdataentrybox" };
    viewEye = { "preview": "#eyeslash", "dataEntry": "#eye" };
    $(viewmap[this.last_visible_view]).hide();
    $(viewEye[this.last_visible_view]).hide();
    this.last_visible_view = viewname;
    $(viewmap[this.last_visible_view]).show();
    $(viewEye[this.last_visible_view]).show();
  },
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
  Begenning() {
    MainButtons.toggleButton(App.State.CurrentStage, true);
    PreviewPane.refresh();
  },
  Progress() {
    $("#completedbar").width((this.State.CurrentStage / 9 * 100) + "%");
  }
}

var TestSuite =
{

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
    App.Begenning();
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
    App.Begenning();
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
    App.Begenning();
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
    App.Begenning();
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
    App.Begenning();
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
    if (response == "" && App.State.CurrentStage != 7) {
      alert("Give some response");
      $("#iResponse").focus();
      return false;
    }
    return response;

  },
  decisionChoice(choice) {
    if (App.EDIT_MODE) {
      App.UserData[App.edit] = App.UserData[this.pivot][choice];
      App.EDIT_MODE = false;
      MainButtons.toggleButton(App.State.CurrentStage, true);
      App.showView("preview");
      PreviewPane.refresh();
    }
    else {
      App.UserData[App.State.CurrentStage] = App.UserData[this.pivot][choice];
      MainButtons.showDataEntryPane(++App.State.CurrentStage);
      App.Progress();
      $("#b" + (App.State.CurrentStage)).addClass("completed");
      $("#b" + (App.State.CurrentStage+1)).addClass("inProgress");
    }
    $("#choiceLists .main-block").removeClass("selected");
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
      PreviewPane.refresh();
      this.blankChoice = 0;
      MainButtons.showDependentEntryPane(App.State.CurrentStage + 1);
      App.State.CurrentStage++;
      App.Progress();
      $("#b" + (App.State.CurrentStage)).addClass("completed");
      $("#b" + (App.State.CurrentStage+1)).addClass("inProgress");
      return;
    }
    var response = this.getResponse();
    if (response != false) {
      if (App.EDIT_MODE) {
        if (this.IsList[App.edit] || this.DependentList[App.edit]) {
          App.UserData[App.edit][PreviewPane.ChoicePosition] = response;
          $("#iChoices").hide();
        }
        else {
          App.UserData[App.edit] = response;
        }
        App.EDIT_MODE = false;
        $("#iResponse").val("");
        PreviewPane.refresh();
        App.showView("preview");
        MainButtons.toggleButton(App.State.CurrentStage, true);
        App.showView("preview");
        return;
      }
      this.checkStageAndSetView(response);
      PreviewPane.refresh();
      App.State.CurrentStage++;
      $("#b" + (App.State.CurrentStage)).addClass("completed");
      $("#b" + (App.State.CurrentStage+1)).addClass("inProgress");
      App.Progress();
    }
  },
  checkStageAndSetView(response) {
    
    if (this.IsList[App.State.CurrentStage]) {//Choices Condition
      this.addChoices();
      $("#AddMore").hide();
      this.blankChoice = 0;
      MainButtons.showDependentEntryPane(App.State.CurrentStage + 1);
    }
    else if (this.DependentList[App.State.CurrentStage]) {
      this.nextChoice();
      $("#iChoices").hide();      
      this.incr = 0;
      if (App.State.CurrentStage == 4)
        MainButtons.showDataEntryPane(App.State.CurrentStage + 1);
      else
        MainButtons.showDependentEntryPane(App.State.CurrentStage + 1);
    }
    else if (App.State.CurrentStage == 7) { ; }
    else {
      App.UserData[App.State.CurrentStage] = response;
      $("#iResponse").val("");
    }
    if (App.State.CurrentStage == 0)
      MainButtons.showChoicesEntryPane(App.State.CurrentStage + 1);
    else if (App.State.CurrentStage == 5)
      MainButtons.showDataEntryPane(App.State.CurrentStage + 1);
    else if (App.State.CurrentStage == 6)
      MainButtons.showDecisionPane(App.State.CurrentStage + 1);
    else if (App.State.CurrentStage == 8) {
      MainButtons.enableNextButton();
      App.showView("preview");
      $("#mobileStart").text("Submit");
      $("#iChoices").hide();    
    }
  },

  nextChoice() {
    var response = this.getResponse();
    if (response != false) {
      this.incr++;
      if (App.UserData[this.pivot].length - 1 == this.incr) {
        $("#InputNextBtn").hide();
        $("#SubmitResponse").show();
      }
      this.showChoices();
      App.UserData[App.State.CurrentStage].push(response);
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
      App.UserData[App.State.CurrentStage].push(response);
      $("#iResponse").val("");
      $("#iResponse").focus();
      this.blankChoice++;
    }
  },
  setView(btnIndex) {
    $("#iQuestion").text(this.Questions[btnIndex]);
    if (btnIndex == 8){
      $("#iChoices").text(App.UserData[7]);
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
    $("#iChoices").text(App.UserData[this.pivot][this.incr]);
    $("#iChoices").show();
  },
  setDecisionPane() {
    $("#iResponse").hide();
    $("#SubmitResponse").hide();
    for (var i = 0; i < App.UserData[this.pivot].length; i++) {
      if (App.EDIT_MODE) {
        $("#decisionData").show();
      }
      else {
        App.choiceTemplate("choiceList", i, "notselected");
        $('#choiceList' + i).attr('onclick', 'DataEntryPane.decisionChoice(' + i + ')');
      }
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
  },
  prepareForEdit() {
    if (this.IsList[App.edit] || this.DependentList[App.edit]) {
      var data = App.UserData[App.edit][PreviewPane.ChoicePosition];
      if (this.DependentList[App.edit]) {
        $("#iChoices").text(App.UserData[this.pivot][PreviewPane.ChoicePosition]);
        $("#iChoices").show();
      }
    }
    else if (App.edit == 7) {
      DataEntryPane.setDecisionPane();
      $("#iQuestion").text(DataEntryPane.Questions[App.edit]);
      return;
    }
    else {
      var data = App.UserData[App.edit];
    }
    $("#iResponse").val(data);
    $("#InputNewBtn").hide();
    $("#iQuestion").text(DataEntryPane.Questions[App.edit]);
  }
}

var PreviewPane = {
  "ChoicePosition": 0,
  "textEntry": "",
  refresh() {
    controls = ["#p1", "#p2", "#p3", "#p4", "#p5", "#p6", "#p7", "#p8", "#p9"];
    for (var i = 0; i < controls.length; i++) {
      if (DataEntryPane.IsList[i] || DataEntryPane.DependentList[i]) {
        $(controls[i]).text(App.UserData[i][this.ChoicePosition]);
      }
      else {
        $(controls[i]).text(App.UserData[i]);
      }
      this.enableEdit();
    }
    App.Progress();
  },
  edit(button_index) {
    App.EDIT_MODE = true;
    App.edit = button_index;
    DataEntryPane.prepareForEdit();
    App.showView("dataEntry");
    MainButtons.toggleButton(App.State.CurrentStage, false);

  },
  choice(action) {
    if (action == "forward")
      this.ChoicePosition++;
    else {
      this.ChoicePosition--;
      if (this.ChoicePosition < 0)
        this.ChoicePosition = App.UserData[DataEntryPane.pivot].length - 1;
    }
    this.ChoicePosition = this.ChoicePosition % (App.UserData[DataEntryPane.pivot].length);
    this.refresh();
  },
  enableEdit() {
    var editId = "#e" + (App.State.CurrentStage + 1);
    for (var i = 1; i < 10; i++) {
      if (App.UserData[i - 1].length > 0) {
        editId = "#e" + i;
        $(editId).show();
      }
      else
        break;
    }
  },
  showPreview() {
    App.showView("preview");
    this.textEntry = $.trim($("#iResponse").val());
    $("#iChoices").hide();
    $(".ibtn").hide();
    $("#SubmitResponse").show();
    $("#decisionData").hide();
    $("#iResponse").show();
    this.refresh();
  },
  hidePreview() {
    if (App.State.CurrentStage == 1) {
      MainButtons.showChoicesEntryPane(App.State.CurrentStage);
      if (App.UserData[1].length > 0)
        $("#SubmitResponse").show();
    }
    else if (App.State.CurrentStage == 7) {
      $("#iResponse").hide();
      $("#SubmitResponse").hide();
      $("#decisionData").show();
      MainButtons.showDataEntryPane(App.State.CurrentStage);
      $("#decisionData").show();
    }
    else if (App.State.CurrentStage > 1 && App.State.CurrentStage < 5)
      MainButtons.showDependentEntryPane(App.State.CurrentStage);
    else
      MainButtons.showDataEntryPane(App.State.CurrentStage);
    $("#iResponse").val(this.textEntry);
  }
}

var MainButtons = {
  "buttons": ["#b1", "#b2", "#b3", "#b4", "#b5", "#b6", "#b7", "#b8", "#b9", "#b10"],
  toggleButton(index, visible) {
    $(this.buttons[index]).prop('disabled', (!visible));
  },
  showChoicesEntryPane() {
    DataEntryPane.showAdd();
    this.showDataEntryPane(DataEntryPane.pivot);
  },
  showDependentEntryPane(btnIndex) {
    if ((App.UserData[DataEntryPane.pivot].length - 1) == (App.UserData[App.State.CurrentStage].length)) {
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
    App.showView("dataEntry");
    this.toggleButton(App.State.CurrentStage, false);
    $("#iResponse").focus();
  },
  enableNextButton() {
    this.toggleButton(App.State.CurrentStage + 1, true);
  },
  showReport() {
    $("#viewarea").hide();
    $("#buttonarea").hide();
    $("#finalReport").show();
    $("#completedbar").hide();
    $("#rProblem").text(App.UserData[0]);
    var classChoice;
    for (var i = 0; i < App.UserData[1].length; i++) {
      if (App.UserData[1][i] == App.UserData[7])
        classChoice = "selected";
      else
        classChoice = "notselected";
      App.choiceTemplate("rChoice", i, classChoice);

    }
    $("#rMoreInfo").text(App.UserData[5]);
    var tempHelp = App.UserData[6].split("\n")
    for (var i = 0; i < tempHelp.length; i++) {
      $("#rHelp").append('<li>' + tempHelp[i] + '</li>')
    }
    $("#rAssess").text(App.UserData[8]);
    $(".progress").hide();
  },
  showDataEntryMobile() {
    if (App.State.CurrentStage == 0) {
      this.showDataEntryPane(0);
      $("#b" + (App.State.CurrentStage+1)).addClass("inProgress");
      $("#mobileStart").text("Continue");
    }
    else if (App.State.CurrentStage < 9) {
      PreviewPane.hidePreview();    
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
    var width=75/App.UserData[1].length;
    var Choices='',cons='',val='',feel='',help='';
    for(var c=0;c<App.UserData[1].length;c++){
      Choices+='<td style="border: 1px solid black; width:'+width+'%;">'+App.UserData[1][c]+'</td>';
    }
    for(var c=0;c<App.UserData[1].length;c++){
      cons+='<td style="border: 1px solid black; width:'+width+'%;"><ul>';
      var tempcons = App.UserData[2][c].split("\n");
      for (var i = 0; i < tempcons.length; i++) {
        cons+='<li>'+tempcons[i]+'</li>';
      }
      cons+='</ul></td>';
    }
    for(var c=0;c<App.UserData[1].length;c++){
      val+='<td style="border: 1px solid black; width:'+width+'%;"><ul>';
      var tempvals = App.UserData[3][c].split("\n");
      for (var i = 0; i < tempvals.length; i++) {
        val+='<li>'+tempvals[i]+'</li>';
      }
      val+='</ul></td>';
    }
    for(var c=0;c<App.UserData[1].length;c++){
      feel+='<td style="border: 1px solid black; width:'+width+'%;"><ul>';
      var tempcons = App.UserData[4][c].split("\n");
      for (var i = 0; i < tempcons.length; i++) {
        feel+='<li>'+tempcons[i]+'</li>';
      }
      feel+='</ul></td>';
    }
    var wcHelp = App.UserData[6].split("\n");
    for (var i = 0; i < wcHelp.length; i++) {
      help+='<li>'+wcHelp[i]+'</li>';
    }
    var templateParams = {
      Problem: App.UserData[0],
      reply_to: emailGt,
      reportData:'<!DOCTYPE html><html><body><table style="width:100%; border: 1px solid black;"><tr><th style="border: 1px solid black; width: 25%;">Problem</th><th style="border: 1px solid black; width: 75%;" colspan="'+App.UserData[1].length+'">'+App.UserData[0]+'</th></tr><tr><td style="border: 1px solid black; width: 25%;">Choices</td>'+Choices+'</tr><tr><td style="border: 1px solid black; width: 25%;">Consequences</td>'+cons+'</tr><tr><td style="border: 1px solid black; width: 25%;">Values</td>'+val+'</tr><tr><td style="border: 1px solid black; width: 25%;">Feelings</td>'+feel+'</tr><tr><td style="border: 1px solid black; width: 25%;">Additional Info</td><td style="border: 1px solid black; width: 75%;" colspan="'+App.UserData[1].length+'">'+App.UserData[5]+'</td></tr><tr><td style="border: 1px solid black; width: 25%;">Who Can Help</td><td style="border: 1px solid black; width: 75%;" colspan="'+App.UserData[1].length+'"><ul>'+help+'</ul></td></tr><tr><td style="border: 1px solid black; width: 25%;">Decision</td><td style="border: 1px solid black; width: 75%;" colspan="'+App.UserData[1].length+'">'+App.UserData[7]+'</td></tr><tr><td style="border: 1px solid black; width: 25%;">Assessment</td><td style="border: 1px solid black; width: 75%;" colspan="'+App.UserData[1].length+'">'+App.UserData[8]+'</td></tr></table></body></html>'
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
  App.Begenning();
  //TestSuite.focusOnSubmit();
});
