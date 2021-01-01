const randomWord = (array) => {
  const data = [];
  for (let i = 0; i < 10; i++) {
    const item = array[Math.floor(Math.random() * array.length)];
    data.push(item);
  }
  return data.join(" ").split("");
};

export default randomWord;
