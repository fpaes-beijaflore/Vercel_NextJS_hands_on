import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import Widget from '../../src/Components/Widget';
import GitHubCorner from '../../src/Components/GitHubCorner';
import QuizBackground from '../../src/Components/QuizBackground';
import QuizLogo from '../../src/Components/QuizLogo';
import QuizContainer from '../../src/Components/QuizContainer';
import AlternativesForm from '../../src/Components/AlternativesForm';
import Button from '../../src/Components/Button';
import BackLinkArrow from '../../src/Components/BackLinkArrow';
import db from '../../db.json';
import loadingAnimation from '../../src/screens/Quiz/animations/3010-bb8.json';

function LoadingWidget() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content>
        <Lottie options={defaultOptions} height={250} width={250} />
      </Widget.Content>
    </Widget>
  );
}

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>Tela de Resultado:</Widget.Header>

      <Widget.Content>
        <p>
          Você acertou{' '}
          {results.reduce((acumulado, resultAtual) => {
            return resultAtual ? acumulado + 1 : acumulado;
          }, 0)}{' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result_${index}`}>
              #{index + 1} Resultado: {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  handleSubmit,
  totalQuestions,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;
  const questionId = `question__${questionIndex}`;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          Pergunta {questionIndex + 1} de {totalQuestions}
        </h3>
      </Widget.Header>
      <img
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
        src={question.image}
        alt="Descrição"
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <AlternativesForm
          onSubmit={(e) => {
            e.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              handleSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 2 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;
            const isSelected = selectedAlternative === alternativeIndex;
            const selectedAlternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            return (
              <Widget.Topic
                key={alternativeId}
                as="label"
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && selectedAlternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  type="radio"
                  name={questionId}
                  id={alternativeId}
                  onChange={() => {
                    setSelectedAlternative(alternativeIndex);
                  }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Parabéns, você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Que pena, você errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function Quiz({ isExternal, externalDB }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const question = isExternal
    ? externalDB.questions[questionIndex]
    : db.questions[questionIndex];
  const totalQuestions = isExternal
    ? externalDB.questions.length
    : db.questions.length;

  function addResult(result) {
    setResults([...results, result]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 6 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setQuestionIndex(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={isExternal ? externalDB.bg : db.bg}>
      <QuizContainer
        as={motion.section}
        variants={{
          hidden: { y: '100%', opacity: 1, scale: 0 },
          show: {
            y: '0',
            opacity: 1,
            scale: 1,
            transition: {
              delay: 0,
              duration: 0.3,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        {!isExternal && <QuizLogo />}

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            initial="hidden"
            animate="show"
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            handleSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} />
        )}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/fpaes-beijaflore/NextJS_hands_on" />
    </QuizBackground>
  );
}
