var siteConfiguration = {
	branding: {"name" : "Skill-Pill" },
	title: "Decision Making Tool",
	icon: "images/skillpill.png",
    email: {
        service: "default_service",
        templateId: "template_2rkf4re"
    }
}
var toolConfiguration = [
    { name: "Problem", question: "What is Problem ?", entry_type: "single-entry" },
    {
        name: "Choices", question: "What are the Choices ?", entry_type: "supportive-entry", "min-Value": 2, support_entries: [
            { name: "Consequences", question: "What are the Consequences ?", entry_type: "multi-entry" },
            { name: "Values", question: "What are the Values ?", entry_type: "multi-entry" },
            { name: "Feelings", question: "What are the Feelings ?", entry_type: "multi-entry" }
        ]
    },
    { name: "Additional Info", question: "Anything More you want to share ?", entry_type: "multi-entry" },
    { name: "Who can help", question: "Who can Help ?", entry_type: "multi-entry" },
    { name: "Decision", question: "What is your Decision ?", entry_type: "dependent-entry", dependent_on: "Choices", show: ["Additional Info", "Who can help ?"], message: "Select from the given Choices" },
    { name: "Assess Decision", question: "What is your assessment on Decision ?", entry_type: "multi-entry" }
];
