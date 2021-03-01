import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import db from '../db.json';
import Widget from '../src/Components/Widget';
import GitHubCorner from '../src/Components/GitHubCorner';
import QuizBackground from '../src/Components/QuizBackground';
import QuizLogo from '../src/Components/QuizLogo';
import QuizContainer from '../src/Components/QuizContainer';
import Input from '../src/Components/Input';
import Button from '../src/Components/Button';

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
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
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

        <Widget>
          <Widget.Header>
            <h1>Quizes da Galera</h1>
          </Widget.Header>
          <Widget.Content>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione,
              distinctio molestiae. Aliquam nemo saepe nihil doloremque
              excepturi facere architecto dolorem ipsa officiis itaque corporis,
              fugit enim esse totam sed ea.
            </p>
          </Widget.Content>
        </Widget>
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/fpaes-beijaflore/NextJS_hands_on" />
    </QuizBackground>
  );
}
