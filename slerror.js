/**
 * @param trainingExamples_ {Array<Array>} each element of the outer array is an array of 2 elements.
 *                  These 2 elements correspond to the input and output part of the training example.
 * @param trainingExampleErrorFn {(expectedOutput:any, actualOutput:any)=>any}
 * @param mlModelPredictionFn {(mlModel:any,input:any)=>any}
 * @param onTrainingExamplesChangedFn {()=>void}
 * Acronyms:
 * SL = supervised learning
 * mlModel = machine learning model/system
 */
 export function initSlError(
  trainingExamples_,
  trainingExampleErrorFn,
  mlModelPredictionFn,
  onTrainingExamplesChangedFn
) {
  trainingExampleError = trainingExampleErrorFn;
  predict = mlModelPredictionFn;
  onTrainingExamplesChanged = onTrainingExamplesChangedFn;
  setTrainingExamples(trainingExamples_);
}

/**
 * @param {any[][]} trainingExamples_
 */
export function setTrainingExamples(trainingExamples_) {
  trainingExamples = trainingExamples_;
  onTrainingExamplesChanged();
}

/**
 * @param {any} mlModel
 */
export function slError(mlModel) {
  let totalError = 0;
  for (const trainingExample of trainingExamples) {
    const input = trainingExample[0];
    const expectedOutput = trainingExample[1];
    const actualOutput = predict(mlModel, input);
    totalError += trainingExampleError(expectedOutput, actualOutput);
  }
  return totalError;
}

let trainingExamples;
let trainingExampleError;
let predict;
let onTrainingExamplesChanged;
