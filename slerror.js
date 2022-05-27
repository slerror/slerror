/**
* @param trainingExamples_ {Array<Array>} each element of the outer array is an array of 2 elements. 
*                  These 2 elements correspond to the input and output part of the training example. 
* @param trainingExampleErrorFn {(expectedOutput:any, actualOutput:any)=>any}
* @param mlModelPredictionFn {(mlModel:any,input:any)=>output:any}
* Acronymns:
* SL = supervised learning
* mlModel = machine learning model/system
*/
export function initSlError(trainingExamples_, trainingExampleErrorFn, mlModelPredictionFn) {
  trainingExamples = trainingExamples_
  trainingExampleError = trainingExampleErrorFn
  predict = mlModelPredictionFn
}

export function slError(mlModel) {
  let totalError = 0
  for(const trainingExample of trainingExamples) {
    const input = trainingExample[0]
    const expectedOutput = trainingExample[1]
    const actualOutput = predict(mlModel, input)
    totalError += trainingExampleError(expectedOutput, actualOutput)
  }
  return totalError
}

let trainingExamples
let trainingExampleError
let predict
