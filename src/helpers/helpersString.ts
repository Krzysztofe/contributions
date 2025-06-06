export class HelpersString {

  static capitalize(words: string) {
    return words
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }


  static replacePolishLetters(text: string) {
    const polishToWesternMap: { [key: string]: string } = {
      ą: "a",
      ć: "c",
      ę: "e",
      ł: "l",
      ń: "n",
      ó: "o",
      ś: "s",
      ż: "z",
      ź: "z",
      Ą: "A",
      Ć: "C",
      Ę: "E",
      Ł: "L",
      Ń: "N",
      Ó: "O",
      Ś: "S",
      Ż: "Z",
      Ź: "Z",
    };
    const replacePolishLetters = (text: string) => {
      return text
        .split("")
        .map((char) => polishToWesternMap[char] || char)
        .join("");
    };

    return replacePolishLetters(text);
  }
  }