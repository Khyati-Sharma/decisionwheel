var template = 
`<!DOCTYPE html>
<html>
    <body>
        <table style="width:100%; border: 1px solid black;">
            <tr style="background: #ff2300c2">
                <th style="border: 1px solid black; width: 25%;">Problem</th>
                <th style="border: 1px solid black; width: 75%;" colspan="{{totalChoices}}">{{problem}}</th>
            </tr>
            <tr style="background: #007bff59;">
                <td style="border: 1px solid black; width: 25%; text-align: center">Choices</td>  
                {{#choices}}<td style="border: 1px solid black; width:{{width}}%;">{{choice}}</td>{{/choices}}
            </tr>
            <tr style="background: #007bff59">
                <td style="border: 1px solid black; width: 25%; text-align: center">Consequences</td>  
                {{#consequences}}<td style="border: 1px solid black; width:{{width}}%;">
                    <ul> 
                        {{#multiConsequences}}<li>{{multiConsequence}}</li>{{/multiConsequences}}
                    </ul>
                </td>{{/consequences}}
            </tr>
            <tr style="background: #007bff59">
                <td style="border: 1px solid black; width: 25%; text-align: center">Values</td>  
                {{#values}}<td style="border: 1px solid black; width:{{width}}%;">
                    <ul> 
                        {{#multiValues}}<li>{{multiValue}}</li>{{/multiValues}}
                    </ul>
                </td>{{/values}}
            </tr>
            <tr style="background: #007bff59">
                <td style="border: 1px solid black; width: 25%; text-align: center">Feelings</td>  
                {{#feelings}}<td style="border: 1px solid black; width:{{width}}%;">
                    <ul> 
                        {{#multiFeelings}}<li>{{multiFeeling}}</li>{{/multiFeelings}}
                    </ul>
                </td>{{/feelings}}
            </tr>
            <tr style="background: #007bff59">
                <td style="border: 1px solid black; width: 25%; text-align: center">Additional Info</td>
                <td style="border: 1px solid black; width: 75%;" colspan="{{totalChoices}}">{{additionalInfo}}</td>
            </tr>
            <tr style="background: #007bff59">
                <td style="border: 1px solid black; width: 25%; text-align: center">Who can help</td>
                <td style="border: 1px solid black; width: 75%;" colspan="{{totalChoices}}">
                    <ul> 
                        {{#multiHelps}}<li>{{help}}</li>{{/multiHelps}}
                    </ul>
                </td>
            </tr>
            <tr style="background: #24ce24">
                <td style="border: 1px solid black; width: 25%; text-align: center">Decision</td>
                <td style="border: 1px solid black; width: 75%;" colspan="{{totalChoices}}">{{decision}}</td>
            </tr>
            <tr style="background: #007bff59">
                <td style="border: 1px solid black; width: 25%; text-align: center">Assessment</td>
                <td style="border: 1px solid black; width: 75%;" colspan="{{totalChoices}}">{{assessment}}</td>
            </tr>
        </table>
    </body>
</html>`;