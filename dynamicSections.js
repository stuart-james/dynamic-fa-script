

const SERVICE_BUILDER_SECTION = "tfa_24"
const SERVICES_SECTION = "tfa_54"
const REPEAT_FIELDSET = "tfa_22"
const LANGUAGES_COUNTIES_SECTION = "tfa_21"

window.onload = function () {

    function getCheckedValues(targetInputElements) {
        let checkedElCatcher = []
        targetInputElements.forEach((input) => {
            let selectedValue = input.closest("span").querySelector("label").innerText;
            checkedElCatcher.push(selectedValue)
        });
        return checkedElCatcher
    }

    document.getElementById(REPEAT_FIELDSET).style.display = "none"

    const servicesCheckboxes = document
        .getElementById(SERVICES_SECTION)
        .querySelectorAll("input")

    servicesCheckboxes.forEach((input) => {
        input.addEventListener("change", makeOrRemoveServiceResponses)
    })

    function makeOrRemoveServiceResponses(e) {
        const serviceBuilderOptions = document
            .getElementById(SERVICE_BUILDER_SECTION)
            .querySelectorAll("input[type='text']");

        const existingServiceResponses = {};
        for (const input of serviceBuilderOptions) {
            existingServiceResponses[input.value] = input.closest("fieldset");
        }
        const responseServices = Object.keys(existingServiceResponses);
        const currentInputLabelText = e.target.parentElement.querySelector("label").innerText;

        const removeDeselectedService = (serviceResponses, eventInputLabel) => {
            existingServiceResponses[eventInputLabel].querySelector("a.removeLink").click();
        }
        if (!e.target.checked && responseServices.includes(currentInputLabelText)) {
            removeDeselectedService(existingServiceResponses, currentInputLabelText)
        }

        if (e.target.checked && !responseServices.includes(currentInputLabelText)) {
            const createDuplicateFieldset = (duplicatorElement) => {
                duplicatorElement.click()
            }
            const getNewFieldset = (divWithNewFieldset) => {
                let fieldSets = divWithNewFieldset.querySelectorAll("fieldset")
                return fieldSets[fieldSets.length - 1]
            }
            const addServiceNameToNewFieldsetInput = (newFieldSet, serviceName) => {
                let targetInput = newFieldSet.querySelector("input[type='text']");
                targetInput.value = serviceName;
                targetInput.setAttribute("readonly", "readonly");
                targetFieldset.removeAttribute("style");
            }

            const serviceBuilderDiv = document.getElementById(SERVICE_BUILDER_SECTION);
            createDuplicateFieldset(serviceBuilderDiv.querySelector("a.duplicateLink"));

            const targetFieldset = getNewFieldset(serviceBuilderDiv)
            addServiceNameToNewFieldsetInput(targetFieldset, currentInputLabelText)


            const globallySelectedInputsMap = getCheckedValues(
                document.getElementById(LANGUAGES_COUNTIES_SECTION).querySelectorAll("input:checked")
            );
            const previouslySelectedCountyLanguages = Object.values(globallySelectedInputsMap);


            const newServiceCountyLanguageInputs = document
                .getElementById(SERVICE_BUILDER_SECTION)
                .querySelectorAll('input[type="checkbox"]');

            targetFieldset.querySelector("a[class=removeLink]").style.display = "none"

            newServiceCountyLanguageInputs.forEach((element) => {
                const selectInputIfSelectedGlobally = (
                    previouslySelected, currentInput, currentInputLabelEl
                ) => {
                    if (previouslySelected.includes(currentInputLabelEl.innerText)) {
                        currentInput.closest("span.oneChoice").removeAttribute("style");
                        currentInput.checked = true;
                    } else {
                        currentInput.closest("span.oneChoice").style.display = "none";
                        currentInput.checked = false;
                    }
                }

                let currentElementLabel = element.parentElement.querySelector("label");

                selectInputIfSelectedGlobally(previouslySelectedCountyLanguages, element, currentElementLabel);

                if (currentElementLabel.innerText.includes("Other") && previouslySelectedCountyLanguages.includes("Other")) {
                    element.checked = true;
                    element.closest("span.oneChoice").removeAttribute("style");
                }

                const createChangeForAllSection = (divId, yesId, noId) => {
                    let changeForAll = document.createElement("div");
                    changeForAll.id = divId;
                    changeForAll.style.display = "none";
                    changeForAll.appendChild(document.createElement("hr"))
                    changeForAll.append("Add selection to all other services?");

                    let answerSpan = changeForAll.appendChild(document.createElement("span"));
                    answerSpan.innerHTML =
                        `<br><a id=${yesId} style="cursor: pointer">Yes</a> / <a id=${noId} style="cursor: pointer">No</a>`
                    changeForAll.appendChild(document.createElement("hr"))
                    return changeForAll
                }
                let changeForAll = element.closest("span.oneChoice").appendChild(
                    createChangeForAllSection("changeForAll", "yesChangeForAll", "noChangeForAll")
                );

                const addSelectionToAllServices = (e) => {
                    const selectedValue = e.target.closest("span.oneChoice").querySelector("label").innerText;
                    const countyLanguageInputs = document.querySelectorAll("input[type=checkbox]");
                    countyLanguageInputs.forEach((input) => {
                        if (selectedValue !== input.parentNode.querySelector("label").innerText) {
                            return;
                        }
                        input.checked = true;
                        input.style.display = null;
                        console.log(input)
                    });
                    e.target.closest("div").style.display = "none";
                }
                changeForAll.querySelector("#yesChangeForAll").addEventListener("click", addSelectionToAllServices);

                const hidePrompt = () => {
                    changeForAll.style.display = "none";
                }
                changeForAll.querySelector("#noChangeForAll").addEventListener("click", hidePrompt)


                const showOrHideAddSelectionToAllPrompt = (e) => {
                    if (e.target.checked) {
                        e.target.parentNode.querySelector("div#changeForAll").style.display = null;
                    } else {
                        e.target.parentNode.querySelector("div#changeForAll").style.display = "none";
                    }
                }
                element.addEventListener("change", showOrHideAddSelectionToAllPrompt)

            })

            targetFieldset.querySelectorAll("div.oneField.field-container-D").forEach((el) => {
                const hideUnchecked = (e) => {
                    let targetFieldset = e.target.closest("div.oneField.field-container-D")

                    let questionId = targetFieldset.querySelector("span.choices.vertical.required").id

                    let inputs = targetFieldset.querySelectorAll("input[type=checkbox]");

                    inputs.forEach((el) => {
                        if (!el.checked) {
                            el.parentNode.style.display = "none"
                        }
                    })
                    e.target.style.display = "none";
                    document.getElementById(questionId + "_ShowA").style.display = null;
                }
                const showAllOptions = (e) => {
                    let targetFieldset = e.target.closest("div.oneField.field-container-D")
                    let questionId = targetFieldset.querySelector("span.choices.vertical.required").id

                    targetFieldset.querySelectorAll("span.oneChoice").forEach((el) => {
                        el.removeAttribute("style")
                    })
                    e.target.style.display = "none";
                    document.getElementById(questionId + "_HideA").style.display = null;
                }

                if (el.querySelector("input").type !== 'text') {
                    let inputWrapper = el.querySelector("div.inputWrapper");
                    let id = inputWrapper.querySelector("span").id;
                    let showHidDIv = inputWrapper.appendChild(document.createElement("div"));
                    showHidDIv.setAttribute("id", "showHideSpan");

                    let showButton = showHidDIv.appendChild(document.createElement("a"));
                    showButton.innerText = "show all options";
                    showButton.setAttribute("id", id + "_ShowA");
                    showButton.setAttribute("style", "cursor:pointer");
                    showButton.addEventListener("click", showAllOptions);

                    let hideButton = showHidDIv.appendChild(document.createElement("a"));
                    hideButton.innerText = "Hide unchecked options";
                    hideButton.setAttribute("id", id + "_HideA");
                    hideButton.setAttribute("style", "cursor:pointer");
                    hideButton.addEventListener("click", hideUnchecked)
                    hideButton.style.display = "none"
                }
            })
        }


    }

    const updateServiceCountyLanguageSelections = () => {

        const checkedElements = document.getElementById(LANGUAGES_COUNTIES_SECTION).querySelectorAll("input:checked");
        const selectedValues = getCheckedValues(checkedElements)

        let targetInputEls = document.getElementById(SERVICE_BUILDER_SECTION).querySelectorAll('input[type="checkbox"]')
        targetInputEls.forEach((element) => {
            let targetFieldNames = Object.values(selectedValues)
            let elementLabelEl = element.parentElement.querySelector("label");

            element.checked = targetFieldNames.includes(elementLabelEl);

            if (targetFieldNames.includes(elementLabelEl.innerText)) {
                element.closest("span.oneChoice").removeAttribute("style")
                element.checked = true
            } else {
                element.closest("span.oneChoice").style.display = "none"
                element.checked = true
            }

        });
    };
    document.getElementById(LANGUAGES_COUNTIES_SECTION).addEventListener("change", updateServiceCountyLanguageSelections)
}