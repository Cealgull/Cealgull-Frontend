/**
 * Randomly shuffle an array.
 * @author Bojun Ren
 * @data 2023/07/10
 * @see https://bost.ocks.org/mike/shuffle
 * @see https://stackoverflow.com/a/2450976/17838999
 */
export default function shuffle<T>(_array: Array<T>): Array<T> {
  // Use `Array.from` to obtain a shallow copy of the array.
  // Otherwise, the word list will be shuffled globally, which causes a subtle bug.
  const array = Array.from(_array);
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
