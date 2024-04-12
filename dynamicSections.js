window.onload=function() {

    const SERVICE_BUILDER_SECTION = "tfa_24"
    const SERVICES_SECTION = "tfa_54"
    const REPEAT_FIELDSET = "tfa_22"
    const servicesCheckboxes = document.getElementById(SERVICES_SECTION).querySelectorAll("input")


    document.getElementById(REPEAT_FIELDSET).setAttribute("hidden", "true")
    servicesCheckboxes.forEach((input) => {
        input.addEventListener("change", makeOrRemoveServiceResponses)
    })
    function makeOrRemoveServiceResponses(e){
        const serviceBuilderOptions = document.getElementById(SERVICE_BUILDER_SECTION).getElementsByTagName("option");
        const existingServiceResponses = {};

        for (const option of serviceBuilderOptions){

            if(option.selected){
                existingServiceResponses[option.innerText] = option.closest("fieldset");
            }
        }

        const responseServices = Object.keys(existingServiceResponses);
        const selectedOptionText = e.target.parentElement.querySelector("label").innerText;

        console.log(responseServices);

        if(e.target.checked && !responseServices.includes(selectedOptionText)){

            let serviceBuilderDiv = document.getElementById(SERVICE_BUILDER_SECTION);
            serviceBuilderDiv.querySelector("a.duplicateLink").click();

            let fieldSets = serviceBuilderDiv.querySelectorAll("fieldset")
            let targetFieldset = fieldSets[fieldSets.length -1]
            targetFieldset.removeAttribute("hidden")

            targetFieldset.querySelectorAll("option").forEach((option) => {
                if(option.innerText === selectedOptionText){
                option.selected = true
                }
            })
    }
        if(!e.target.checked && responseServices.includes(selectedOptionText)){
        existingServiceResponses[selectedOptionText].querySelector("a.removeLink").click();
        }
    }

    function getCheckedValues(targetInputElements) {
        let checkedElCatcher = []
        targetInputElements.forEach((input) => {
            let selectedValue = input.closest("span").querySelector("label").innerText;
            checkedElCatcher.push(selectedValue)
        });
        return checkedElCatcher
    }

    document.getElementById("tfa_21").addEventListener("change", function (e) {

        const checkedElements = document.getElementById("tfa_21").querySelectorAll("input:checked");
        const selectedValues = getCheckedValues(checkedElements)

        let targetInputEls = document.getElementById(SERVICE_BUILDER_SECTION).querySelectorAll('input[type="checkbox"]')

        targetInputEls.forEach((element) => {
            let targetFieldNames = Object.values(selectedValues)
            let elementFieldName = element.parentElement.querySelector("label").innerText ;
            element.checked = targetFieldNames.includes(elementFieldName);

        });
    });

    document.getElementById(SERVICE_BUILDER_SECTION).querySelector("div.duplicateSpan").addEventListener("click", function(){
        const checkedElements = document.getElementById("tfa_21").querySelectorAll("input:checked");

        let selectedValues = getCheckedValues(checkedElements)
        let targetInputEls = document.getElementById(SERVICE_BUILDER_SECTION).querySelectorAll('input[type="checkbox"]')

        targetInputEls.forEach((element) => {
            let targetFieldNames = Object.values(selectedValues);
            let elementFieldName = element.parentElement.querySelector("label").innerText;
            element.checked = targetFieldNames.includes(elementFieldName);
        });
    });


}

