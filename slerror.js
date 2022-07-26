/**
 * @param trainingExamples_ {Array<Array>} each element of the outer array is an array of 2 elements.
 *                  These 2 elements correspond to the input and output part of the training example.
 * @param trainingExampleErrorFn {(expectedOutput:any, actualOutput:any)=>any}
 * @param mlModelPredictionFn {(mlModel:any,input:any)=>any}
 * @param onTrainingExamplesChangedFn {()=>void}
 * @param exampleToStrFn {(example:any[])=>string}
 * Acronyms:
 * SL = supervised learning
 * mlModel = machine learning model/system
 */
export function initSlError(
  trainingExamples_,
  trainingExampleErrorFn,
  mlModelPredictionFn,
  onTrainingExamplesChangedFn,
  exampleToStrFn,
  totalErrorBeforeAccumulationFn,
  accumulateTotalErrorFn,
  finalizeTotalErrorFn
) {
  trainingExampleError = trainingExampleErrorFn;
  predict = mlModelPredictionFn;
  onTrainingExamplesChanged = onTrainingExamplesChangedFn;
  exampleToStr = exampleToStrFn;
  totalErrorBeforeAccumulation = totalErrorBeforeAccumulationFn;
  accumulateTotalError = accumulateTotalErrorFn;
  finalizeTotalError = finalizeTotalErrorFn;
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
  let totalError = totalErrorBeforeAccumulation();
  for (const trainingExample of trainingExamples) {
    const input = trainingExample[0];
    const expectedOutput = trainingExample[1];
    const actualOutput = predict(mlModel, input);
    accumulateTotalError(
      totalError,
      trainingExampleError(expectedOutput, actualOutput)
    );
  }
  totalError = finalizeTotalError(totalError);
  return totalError;
}

/**
 * Returns a string representation of the training examples.
 */
export function trainingExamplesToStr() {
  return trainingExamples.map(exampleToStr).join("\n");
}

let trainingExamples;
let trainingExampleError;
let predict;
let onTrainingExamplesChanged;
let exampleToStr;
let totalErrorBeforeAccumulation;
let accumulateTotalError;
let finalizeTotalError;
