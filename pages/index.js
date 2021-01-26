import styled from "styled-components";
import db from "../db.json";
import Widget from "../src/Components/Widget";
import Footer from "../src/Components/Footer";
import GitHubCorner from "../src/Components/GitHubCorner";
import QuizBackground from "../src/Components/QuizBackground";

/* const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  flex: 1;
  background-size: cover;
  background-position: center;
`; */

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
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
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/fpaes-beijaflore/NextJS_hands_on" />
    </QuizBackground>
  );
}
