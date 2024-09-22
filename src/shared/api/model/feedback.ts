type ApiFeedbackResponseStatus = 'fail' | 'success'

interface ApiFeedbackResponse {
  status: ApiFeedbackResponseStatus
}

const API_FEEDBACK_RESPONSE_DEFAULT_FAIL: ApiFeedbackResponse = {
  status: 'fail',
}

const API_FEEDBACK_RESPONSE_DEFAULT_SUCCESS: ApiFeedbackResponse = {
  status: 'success',
}

export type { ApiFeedbackResponse }

export {
  API_FEEDBACK_RESPONSE_DEFAULT_FAIL,
  API_FEEDBACK_RESPONSE_DEFAULT_SUCCESS,
}
