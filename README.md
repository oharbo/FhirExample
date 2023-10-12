# FHIR Questionnaire Challenge

## Purpose

The goal of this challenge is to demonstrate dynamic form development and FHIR knowledge within the chosen framework.  This question was intended for the React-Native environment but could be used for other framework challenges.  

> It is **NOT** necessary for the candidate to make screens that look identical to the images in the `/example_images/` directory.

## React-Native Recommendations
- It's recommended that you use [@types/fhir](https://www.npmjs.com/package/@types/fhir) (./fhir5)

## Requirements
Dashboard that allows you to load 3 [Questionnaires](https://build.fhir.org/questionnaire.html) provided as FHIR json (included).

---

The title bar should have the name/title of the Questionnaire.

---

Navigation:
- Each question item should be on its own page with Next and Previous.
- The first page, previous button should go back to the dashboard
- The last page should have a “Submit” button instead of a Next button and only enabled when all questions have been answered.

---

Must support the 4 Questionnaire Item Types:
- Display
- Quantity Input (number)
- Text Input
- Single Choice (Radio and Button)


## Stretch Goals
- After submit, there should be a final page in the questionnaire that provides a summary of the answers.
- Validate the number range
- Implement a QR reader as a question item type where the value of the QR code is saved as the value.

## Super Stretch Goal
- Have the finished data save in a [QuestionnaireResponse](https://build.fhir.org/questionnaireresponse.html) format.