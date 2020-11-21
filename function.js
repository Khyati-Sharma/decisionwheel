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
    $(viewmap[this.last_visible_view]).hide();
    this.last_visible_view = viewname;
    $(viewmap[this.last_visible_view]).show();
  },
  choiceTemplate(id,index,classChoice){
    var tempid = id+index;
    $("#" + id + "s").append('<div class="main-block '+ classChoice +' "  id="'+tempid+'"></div>');
    tempid = "#" + tempid;
    $(tempid).append('<h1>'+this.UserData[1][index]+'</h1><div class = "choiceContent"></div>');
    $(tempid + " .choiceContent").append('<h3>Consequences</h3><ul class = "cons"></ul><h3>Values</h3><ul class = "values"></ul><h3>Feelings</h3><ul class = "feelings"></ul>');
    var tempconsequences = this.UserData[2][index].split("\n")
    for(var i=0;i<tempconsequences.length;i++){
      $(tempid + " .cons").append('<li>'+tempconsequences[i]+'</li>')
    }
    var tempvalues = this.UserData[3][index].split("\n")
    for(var i=0;i<tempvalues.length;i++){
      $(tempid + " .values").append('<li>'+tempvalues[i]+'</li>')
    }
    var tempfeelings = this.UserData[4][index].split("\n")
    for(var i=0;i<tempfeelings.length;i++){
      $(tempid  + " .feelings").append('<li>'+tempfeelings[i]+'</li>')
    }
  }
}
/*rChoices =>.main-block #rChoices0
#rChoices0 => h1 choiceContent
#rChoices0 .choiceContent => h3 tags +ul tags with their class
#rChoices0 respective class=>li tags
*/
var TestSuite =
{

  focusOnDecision() {
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
    ]
  },
  focusOnChoice() {
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
    ]
  },
  focusOnDependentChoice() {
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
    ]
  },
  focusOnAddInfo() {
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
    ]
  },
  focusOnSubmit() {
    App.State.CurrentStage = 9;
    App.UserData = [
      "focusOnSubmit",
      ["choice1", "choice2", "choice3","choice4"],
      ["con1", "con2", "con3","choice3"],
      ["val1", "val2", "val3","choice3"],
      ["feel1", "feel2", "feel3","choice3"],
      "gjjvhg",
      "bvjkjkbb",
      "choice2",
      "ADecision"
    ]
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
  "blankChoice" : 0,
  "DependentListEntries" :["Consequences","Values","Feelings"],

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
      App.EDIT_MODE=false;
      MainButtons.toggleButton(App.State.CurrentStage,true);
    }
    else {
      App.UserData[App.State.CurrentStage] = App.UserData[this.pivot][choice];
      MainButtons.toggleButton(++App.State.CurrentStage, true);
    }
    $("#choiceLists .main-block").removeClass("selected");
    $("#choiceList"+choice).addClass("selected");
    App.showView("preview");
    PreviewPane.refresh();
    $("#iResponse").show();
    $("#SubmitResponse").prop('disabled', false);
    $("#choiceLists").hide();

  },
  SubmitResponse() {
    var tempResponse = $.trim($("#iResponse").val());
    if ( this.blankChoice > 1 && tempResponse.length == 0 ){
      MainButtons.enableNextButton();
      App.showView("preview");
      $("#AddMore").hide();
      PreviewPane.refresh();
      App.State.CurrentStage++;
      this.blankChoice = 0 ;
      return ;
    }
    var response = this.getResponse();
    if (response != false) {
      if (App.EDIT_MODE) {
        if (this.IsList[App.edit] || this.DependentList[App.edit]) {
        App.UserData[App.edit][PreviewPane.ChoicePosition] = response;
        $("#iChoices").text("");
        }
        else{
          App.UserData[App.edit] = response;
        }
        App.EDIT_MODE = false;
        $("#iResponse").val("");
        PreviewPane.refresh();
        App.showView("preview");
        MainButtons.toggleButton(App.State.CurrentStage,true);
        return;
      }
      MainButtons.enableNextButton();
      App.showView("preview");
      this.checkStageAndSetView(response);
      PreviewPane.refresh();
      App.State.CurrentStage++;
    }

    // var editId = ["#e1" , "#e2" , "#e3" , "#e4" , "e5" , "e6" , "e7" , "e8" , "e9"]
  },
  checkStageAndSetView(response) {
    if (this.IsList[App.State.CurrentStage]) {//Choices Condition
      this.addChoices();
      $("#AddMore").hide();
      this.blankChoice = 0 ;
    }
    else if (this.DependentList[App.State.CurrentStage]) {
      this.nextChoice();
      $("#iChoices").text("");
      this.incr = 0;

    }
    else if (App.State.CurrentStage == 7) { ; }
    else {
      App.UserData[App.State.CurrentStage] = response;
      $("#iResponse").val("");
    }
  },

  nextChoice() {
    var response = this.getResponse();
    if (response != false) {
      this.incr++;
      if (App.UserData[this.pivot].length - 1 == this.incr) {
        $("#InputNextBtn").prop('disabled', true);
        $("#SubmitResponse").prop('disabled', false);
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
      $("#SubmitResponse").prop('disabled', false);
      App.UserData[App.State.CurrentStage].push(response);
      $("#iResponse").val("");
      $("#iResponse").focus();
      this.blankChoice++ ;
    }
  },
  setView(btnIndex) {
    $("#iQuestion").text(this.Questions[btnIndex]);
  },
  showAdd() {
    $("#AddMore").prop('disabled', false);
    $("#SubmitResponse").prop('disabled', true);
  },
  showNext() {
    $("#InputNextBtn").prop('disabled', false);
    $("#SubmitResponse").prop('disabled', true);
  },
  showChoices() {
    $("#iChoices").text(App.UserData[this.pivot][this.incr]);
  },
  setDecisionPane() {
    $("#iResponse").hide();
    $("#SubmitResponse").prop('disabled', true);
    for (var i = 0; i < App.UserData[this.pivot].length; i++) {
     // $("#choiceLists").append('<button class="choiceOption" onClick="DataEntryPane.decisionChoice(' + i + ')">' + App.UserData[this.pivot][i] + '</button>');
     if(App.EDIT_MODE){
     $("#choiceLists").show();
     }
     else{
      App.choiceTemplate( "choiceList",i,"notselected" );
      $('#choiceList'+ i).attr('onclick', 'DataEntryPane.decisionChoice('+i+')');
     }
      // $("#choiceList"+ i).click(function(){
      //   alert("the not respons");
      //   DataEntryPane.decisionChoice(i);
      // });
    }
  },
  prepareForEdit() {
    if (this.IsList[App.edit] || this.DependentList[App.edit]) {
      var data = App.UserData[App.edit][PreviewPane.ChoicePosition];
      if(this.DependentList[App.edit]){
        $("#iChoices").text(App.UserData[this.pivot][PreviewPane.ChoicePosition]);
      }
    }
    else if ( App.edit == 7 ){
      DataEntryPane.setDecisionPane();
      $("#iQuestion").text(DataEntryPane.Questions[App.edit]);
      return ;
    }
    else {
      var data = App.UserData[App.edit];
    }
    $("#iResponse").val(data);
    $("#InputNewBtn").prop('disabled', true);
    $("#iQuestion").text(DataEntryPane.Questions[App.edit]);
  }
}

var PreviewPane = {
  "ChoicePosition": 0,
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
  },
  edit(button_index) {
    App.EDIT_MODE = true;
    App.edit = button_index;
    DataEntryPane.prepareForEdit();
    App.showView("dataEntry");
    MainButtons.toggleButton(App.State.CurrentStage,false);

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
    DataEntryPane.showNext();
    DataEntryPane.showChoices();
    this.showDataEntryPane(btnIndex);
  },
  showDecisionPane(btnIndex) {
    DataEntryPane.setDecisionPane();
    this.showDataEntryPane(btnIndex);
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
  showReport(){
    $("#viewarea").hide();
    $("#buttonarea").hide();
    $("#finalReport").show();
    $("#rProblem").text(App.UserData[0]);
    var classChoice;
    for(var i=0;i<App.UserData[1].length;i++) {
      if(App.UserData[1][i]==App.UserData[7])
      classChoice = "selected";
      else
      classChoice ="notselected";
        App.choiceTemplate("rChoice",i,classChoice);

    }
    $("#rMoreInfo").text(App.UserData[5]);
    var tempHelp = App.UserData[6].split("\n")
    for(var i=0;i<tempHelp.length;i++){
      $("#rHelp").append('<li>'+tempHelp[i]+'</li>')
    }
    $("#rAssess").text(App.UserData[8]);
  }

}

$(document).ready(function () {
  //TestSuite.focusOnSubmit();
  MainButtons.toggleButton(App.State.CurrentStage, true);
  PreviewPane.refresh();
});
