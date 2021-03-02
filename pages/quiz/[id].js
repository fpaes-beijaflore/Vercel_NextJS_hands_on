import Quiz from './';
import { ThemeProvider } from 'styled-components';

export default function QuizDaGaleraPage(dbExterno) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <Quiz isExternal={true} externalDB={dbExterno} />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const dbExterno = await fetch(`https://${context.query.id}/api/db`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Falha em pegar os dados');
    })
    .then((resJson) => {
      return resJson;
    })
    .catch((err) => {
      return err;
    });

  return {
    props: dbExterno, // will be passed to the page component as props
  };
}
