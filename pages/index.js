import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Widget from '../src/Components/Widget';
import GitHubCorner from '../src/Components/GitHubCorner';
import QuizBackground from '../src/Components/QuizBackground';
import QuizLogo from '../src/Components/QuizLogo';
import QuizContainer from '../src/Components/QuizContainer';
import Input from '../src/Components/Input';
import Button from '../src/Components/Button';
import Link from '../src/Components/Link';
import db from '../db.json';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Star Wars Quiz</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
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
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content
            as={motion.div}
            variants={{
              hidden: { y: '100%', opacity: 1, scale: 0 },
              show: {
                y: '0',
                opacity: 1,
                scale: 1,
                transition: {
                  delay: 0.3,
                  duration: 0.3,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            <p>{db.description}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push(`/quiz?name=${name}`);
              }}
            >
              <Input
                placeholder="Me diga o seu nome"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                name="nome"
              />

              <Button type="submit" disabled={name.length < 3}>
                Jogar
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          variants={{
            hidden: { y: '100%', opacity: 1, scale: 0 },
            show: {
              y: '0',
              opacity: 1,
              scale: 1,
              transition: {
                delay: 0.6,
                duration: 0.3,
              },
            },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Quizes da Galera</h1>
          </Widget.Header>
          <Widget.Content
            as={motion.div}
            variants={{
              hidden: { y: '100%', opacity: 1, scale: 0 },
              show: {
                y: '0',
                opacity: 1,
                scale: 1,
                transition: {
                  delay: 0.9,
                  duration: 0.3,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            <ul>
              {db.external.map((quizExterno) => {
                return (
                  <li key={`External_${quizExterno.name}`}>
                    <Widget.Topic as={Link} href={`/quiz/${quizExterno.url}`}>
                      {quizExterno.name}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/fpaes-beijaflore/NextJS_hands_on" />
    </QuizBackground>
  );
}
