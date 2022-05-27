/**
* @param trainingExamples_ {Array<Array>} each element of the outer array is an array of 2 elements, 
*                                         for input and output part of the training example 
* @param trainingExampleErrorFn {(expectedOutput:any, actualOutput:any)=>any}
* @param candSlnPredictionFn {(candSln:any,input:any)=>output:any}
* SL = supervised learning
* candSln = candidate solution
*/
export function initSlError(trainingExamples_, trainingExampleErrorFn, candSlnPredictionFn) {
  trainingExamples = trainingExamples_
  trainingExampleError = trainingExampleErrorFn
  predict = candSlnPredictionFn
}

export function slError(candSln) {
  let totalError = 0
  for(const trainingExample of trainingExamples) {
    const input = trainingExample[0]
    const expectedOutput = trainingExample[1]
    const actualOutput = predict(candSln, input)
    totalError += trainingExampleError(expectedOutput, actualOutput)
  }
  return totalError
}

let trainingExamples
let trainingExampleError
let predict
