/**
 * Randomly shuffle an array.
 * @author Bojun Ren
 * @data 2023/07/10
 * @see https://bost.ocks.org/mike/shuffle
 * @see https://stackoverflow.com/a/2450976/17838999
 */
export default function shuffle(array: Array<unknown>) {
  let currentIndex = array.length;
  let randomIndex: number;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
