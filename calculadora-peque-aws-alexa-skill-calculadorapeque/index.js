/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const LaunchHandler = {
  canHandle(handlerInput) {
    console.log("LaunchHandler - canHandle:" + JSON.stringify(handlerInput));
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    console.log("LaunchHandler:" + JSON.stringify(handlerInput));
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const CuantoEsHandler = {
  canHandle(handlerInput) {
    console.log("CuantoEsHandler - canHandle:" + JSON.stringify(handlerInput));
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'IntentRequest'
        && request.intent.name === 'CuantoEsIntent');
  },
  handle(handlerInput) {
    console.log("CuantoEsHandler:" + JSON.stringify(handlerInput));
    const request = handlerInput.requestEnvelope.request;
    let resultado = 0-0;
    let primero = parseInt(request.intent.slots.PrimerOperando.value, 10) ;
    let segundo = parseInt(request.intent.slots.SegundoOperando.value, 10);
//    let operacion = operaciones[request.intent.slots.operacion.value];
    let operacion = request.intent.slots.operacion.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    // eval() is under control, in this case
    resultado = eval(primero + operacion + segundo);

    console.log("CuantoEsHandler - resultado: " + resultado);
    return handlerInput.responseBuilder
      .speak("" + resultado)
      .withSimpleCard(SKILL_NAME, "" + resultado)
      .getResponse();
  },
};

const DimeAlgoBonitoHandler = {
  canHandle(handlerInput) {
    console.log("DimeAlgoBonitoHandler - canHandle:" + JSON.stringify(handlerInput));
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'IntentRequest'
        && request.intent.name === 'DimeAlgoBonitoIntent');
  },
  handle(handlerInput) {
    console.log("DimeAlgoBonitoHandler:" + JSON.stringify(handlerInput));
    const speechOutput = "Atun tao!";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, speechOutput)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Esto... Aqui pasó algo malo.')
      .reprompt('Esto... Aqui pasó algo malo.')
      .getResponse();
  },
};

const SKILL_NAME = 'peque calculadora';
const GET_FACT_MESSAGE = 'Aqui está tu resultado: ';
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const operaciones = {};
operaciones['mas'] = '+';
operaciones['menos'] = '-';
operaciones['por'] = '*';
operaciones['entre'] = '/';

const data = [
  'A year on Mercury is just 88 days long.',
  'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.',
  'Venus rotates counter-clockwise, possibly because of a collision in the past with an asteroid.',
  'On Mars, the Sun appears about half the size as it does on Earth.',
  'Earth is the only planet not named after a god.',
  'Jupiter has the shortest day of all the planets.',
  'The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.',
  'The Sun contains 99.86% of the mass in the Solar System.',
  'The Sun is an almost perfect sphere.',
  'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
  'Saturn radiates two and a half times more energy into space than it receives from the sun.',
  'The temperature inside the Sun can reach 15 million degrees Celsius.',
  'The Moon is moving approximately 3.8 cm away from our planet every year.',
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchHandler,
    CuantoEsHandler,
    DimeAlgoBonitoHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
