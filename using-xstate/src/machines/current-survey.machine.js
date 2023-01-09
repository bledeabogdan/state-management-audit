import { assign, createMachine } from "xstate";

export const currentSurveyMachine = createMachine({
    id: "currentSurvey",
    predictableActionArguments: true,
    initial: "active",
    context: {
        id: 0,
        questions: [],
        currentQuestion: {
            id: 0,
            responses: []
        }
    },
    states: {
        active: {
            on: {
                ADD_QUESTION: {
                    actions: assign({
                        questions: (context, event) => context.questions.concat(event.value)
                    })
                },
                SET_CURRENT_QUESTION: {
                    actions: assign({
                        currentQuestion: (_, event) => ({ id: event.value, responses: [] })
                    })
                },
                ADD_RESPONSE: {
                    actions: assign({
                        currentQuestion: (context, event) => {
                            return { id: context.currentQuestion.id, responses: context.currentQuestion.responses.concat(event.value) }
                        }
                    })
                },
                SET_CURRENT_SURVEY: {
                    actions: assign({
                        id: (_, event) => {
                            console.log(event);

                            return event.value;
                        }
                    })
                }
            }
        }
    }
})