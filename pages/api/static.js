async function tempo(request, response) {
  const dynamicDate = new Date();

  response.setHeader('Cache-Control', 's-maxage=1000', 'stale-while-revalidate');

  response.json({
    date: dynamicDate.toGMTString(),
  });
}

export default tempo;
