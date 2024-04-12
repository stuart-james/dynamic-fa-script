
window.onload = function () {

    function getCheckedValues(targetInputElements) {
        let checkedElCatcher = []
        targetInputElements.forEach((input) =>
        {
            let selectedValue = input.closest("span").querySelector("label").innerText;
            let selectedField = input.closest(".oneField").querySelector("label").innerText;
            checkedElCatcher.push(selectedValue)
        }
    )
        ;
        return checkedElCatcher
    }

    function setSelectedAsDefault(selections, choicesContainer) {
        choicesContainer.querySelectorAll("span.oneChoice").forEach((choice) =>
        {
            if (selections.includes(choice.querySelector("label").innerText)) {
                let inputEl = choice.querySelector("input");
                inputEl.setAttribute("checked");
                inputEl.setAttribute("data-default-value", "true");
            }
        }
    )
        ;
    }

    function getPreselectionFields(sectionContainer) {
        let fieldSets = sectionContainer.querySelectorAll("fieldset")
        let targetInputEls = []
        fieldSets.forEach((fieldset) =>
        {
            let checkboxes = fieldset.querySelectorAll('input[type="checkbox"]')
            if (checkboxes) {
                targetInputEls.push(...checkboxes)
            }
        }
    )
        ;
        return targetInputEls
    }


    const COUNTIES_EL_ID = "tfa_25"
    const LANGUAGES_EL_ID = "tfa_33"
    const SERVICE_BUILDER_SECTION = "tfa_24"
    const SERVICES_SECTION = "tfa_54"
    const REPEAT_FIELDSET = "tfa_22"

    const servicesCheckboxes = document.getElementById(SERVICES_SECTION).querySelectorAll("input")

    document.getElementById(REPEAT_FIELDSET).setAttribute("hidden", true)
    servicesCheckboxes.forEach((input) =>
    {
        input.addEventListener("change", makeOrRemoveServiceResponses)
    }
)

    function makeOrRemoveServiceResponses(e) {
        const serviceBuilderOptions = document.getElementById(SERVICE_BUILDER_SECTION).getElementsByTagName("option");
        const existingServiceResponses = {};
        for (const option of serviceBuilderOptions) {
            if (option.selected) {
                existingServiceResponses[option.innerText] = option.closest("fieldset");
            }
        }
        const responseServices = Object.keys(existingServiceResponses);
        const selectedOptionText = e.target.parentElement.querySelector("label").innerText;

        console.log(responseServices)
        if (e.target.checked &amp;&amp; !responseServices.includes(selectedOptionText)) {
            let serviceBuilderDiv = document.getElementById(SERVICE_BUILDER_SECTION);
            serviceBuilderDiv.querySelector("a.duplicateLink").click()

            let fieldSets = serviceBuilderDiv.querySelectorAll("fieldset")
            let targFieldSet = fieldSets[fieldSets.length - 1]
            targFieldSet.removeAttribute("hidden")
            targFieldSet.querySelectorAll("option").forEach((option) =>
            {
                if (option.innerText === selectedOptionText) {
                    option.selected = true
                }
            }
        )
        }
        if (!e.target.checked &amp;&amp; responseServices.includes(selectedOptionText)) {
            existingServiceResponses[selectedOptionText].querySelector("a.removeLink").click()
        }
    }

    document.getElementById("tfa_21").addEventListener("change", function (event) {
        const checkedElements = document.getElementById("tfa_21").querySelectorAll("input:checked");
        const selectedValues = getCheckedValues(checkedElements)

        let targetInputEls = document
            .getElementById(SERVICE_BUILDER_SECTION).querySelectorAll('input[type="checkbox"]')
        targetInputEls.forEach((element) =>
        {
            let targetFieldNames = Object.values(selectedValues)
            let elementFieldName = element.parentElement.querySelector("label").innerText;
            element.checked = targetFieldNames.includes(elementFieldName);

        }
    )
        ;
    })
    document.getElementById(SERVICE_BUILDER_SECTION).querySelector("div.duplicateSpan").addEventListener("click", function () {
        const checkedElements = document.getElementById("tfa_21").querySelectorAll("input:checked");
        let selectedValues = getCheckedValues(checkedElements)
        let targetInputEls = document.getElementById(SERVICE_BUILDER_SECTION).querySelectorAll('input[type="checkbox"]')
        targetInputEls.forEach((element) =>
        {
            let targetFieldNames = Object.values(selectedValues)
            let elementFieldName = element.parentElement.querySelector("label").innerText;
            element.checked = targetFieldNames.includes(elementFieldName);
        }
    )
        ;
    })


}
