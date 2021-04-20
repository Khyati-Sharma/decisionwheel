var template = 
'<!DOCTYPE html>'+
'<html>'+
    '<body>'+
        '<table style="width:100%; border: 1px solid black;">'+

            '<tr style="background: #ff2300c2">'+
                '<th style="border: 1px solid black; width: 25%;">Problem</th>'+
                '<th style="border: 1px solid black; width: 75%;" colspan="{{totalChoices}}">{{problem}}</th>'+
            '</tr>'+

            '<tr>'+
                '<td style="border: 1px solid black; width: 25%;">Choices</td>' + 
                '{{#choices}}<td style="border: 1px solid black; width:{{width}}%;">{{choice}}</td>{{/choices}}'+
            '</tr>'+

            '<tr>'+
                '<td style="border: 1px solid black; width: 25%;">Consequences</td>' + 
                '{{#consequences}}<td style="border: 1px solid black; width:{{width}}%;">'+
                    '<ul>' +
                        '{{#multiConsequences}}<li>{{multiConsequence}}</li>{{/multiConsequences}}'+
                    '</ul>'+
                '</td>{{/consequences}}'+
            '</tr>'+

            '<tr>'+
                '<td style="border: 1px solid black; width: 25%;">Values</td>' + 
                '{{#values}}<td style="border: 1px solid black; width:{{width}}%;">'+
                    '<ul>' +
                        '{{#multiValues}}<li>{{multiValue}}</li>{{/multiValues}}'+
                    '</ul>'+
                '</td>{{/values}}'+
            '</tr>'+

            '<tr>'+
                '<td style="border: 1px solid black; width: 25%;">Feelings</td>' + 
                '{{#feelings}}<td style="border: 1px solid black; width:{{width}}%;">'+
                    '<ul>' +
                        '{{#multiFeelings}}<li>{{multiFeeling}}</li>{{/multiFeelings}}'+
                    '</ul>'+
                '</td>{{/feelings}}'+
            '</tr>'+

            '<tr>'+
                '<td style="border: 1px solid black; width: 25%;">Additional Info</td>'+
                '<td style="border: 1px solid black; width: 75%;" colspan="{{totalChoices}}">{{additionalInfo}}</td>'+
            '</tr>'+

            '<tr>'+
                '<td style="border: 1px solid black; width: 25%;">Who can help</td>'+
                '<td style="border: 1px solid black; width: 75%;" colspan="{{totalChoices}}">'+
                    '<ul>' +
                        '{{#multiHelps}}<li>{{help}}</li>{{/multiHelps}}'+
                    '</ul>'+
                '</td>'+
            '</tr>'+

            '<tr style="background: #24ce24">'+
                '<td style="border: 1px solid black; width: 25%;">Decision</td>'+
                '<td style="border: 1px solid black; width: 75%;" colspan="{{totalChoices}}">{{decision}}</td>'+
            '</tr>'+

            '<tr>'+
                '<td style="border: 1px solid black; width: 25%;">Assessment</td>'+
                '<td style="border: 1px solid black; width: 75%;" colspan="{{totalChoices}}">{{assessment}}</td>'+
            '</tr>'+

        '</table>'+
    '</body>'+
'</html>';

{/* <tr><td style="border: 1px solid black; width: 25%;">Values</td>' + val + '</tr><tr><td style="border: 1px solid black; width: 25%;">Feelings</td>' + feel + '</tr><tr><td style="border: 1px solid black; width: 25%;">Additional Info</td><td style="border: 1px solid black; width: 75%;" colspan="' + storageUnit.userData[1].length + '">' + storageUnit.userData[5] + '</td></tr><tr><td style="border: 1px solid black; width: 25%;">Who Can Help</td><td style="border: 1px solid black; width: 75%;" colspan="' + storageUnit.userData[1].length + '"><ul>' + help + '</ul></td></tr><tr><td style="border: 1px solid black; width: 25%;">Decision</td><td style="border: 1px solid black; width: 75%;" colspan="' + storageUnit.userData[1].length + '">' + storageUnit.userData[7] + '</td></tr><tr><td style="border: 1px solid black; width: 25%;">Assessment</td><td style="border: 1px solid black; width: 75%;" colspan="' + storageUnit.userData[1].length + '">' + storageUnit.userData[8] + '</td></tr> */}




// var data = {
//     "choices": [
//         {"choice":"choice1"},
//         {"choice":"choice2"}
//     ],
//     "consequences": [
//         {
//             "multiConsequences":[
//                 {"multiConsequence":"con1"},
//                 {"multiConsequence":"con2"}
//             ]
//         },
//         {
//             "multiConsequences":[
//                 {"multiConsequence":"con3"},
//                 {"multiConsequence":"con4"}
//             ]
//         }
//     ]
// }
