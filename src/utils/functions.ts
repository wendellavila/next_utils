/**
 * Creates an Anchor element in the DOM that automatically downloads a file with the provided content.
 * @param {string} content - Content to be downloaded, such as a JSON or a XML string.
 * @param {string} filename - Filename for the downloaded file.
 * @param {string} extension - File extension for the downloaded file.
 */
export function downloadFile(
  content: string,
  filename: string,
  extension: string
) {
  const link = document.createElement('a');
  link.href = content;
  link.download = `${filename}.${extension}`;
  link.click();
}

/**
 * Formats an ISO date string into dd/mm/yyyy hh:mm:ss
 * @param {string} isoDate - An ISO 8601 date string.
 */
export function formatISODate(isoDate: string) {
  const date = new Date(isoDate);
  if (isNaN(date.getDate())) return '';

  const zeroPad = (n: number) => (n < 10 ? '0' : '') + n;

  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = zeroPad(date.getHours());
  const minutes = zeroPad(date.getMinutes());
  const seconds = zeroPad(date.getSeconds());

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

/**
 * Returns the current date as a yyyymmdd integer. This function does not account for timezones.
 * It is intended to be used in simple scenarios such as using the current date as a seed for a pseudorandom algorithm.
 */
export function dateToInt() {
  return Number(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
}

/**
 * Returns a random integer bigger than or equal to {min} and smaller than {max}.
 * @param {number} min - An integer used as the lower bound of possible randomly generated integers (Inclusive)
 * @param {number} max - An integer used as the upper bound of possible randomly generated integers (Exclusive)
 * @param {number} seed - An integer used as seed for the pseudorandom number generator.
 */
export function getRandomInt(min: number, max: number, seed?: number): number {
  const randomWithSeed = (seed: number): number => {
    // Forcing int
    seed = Math.round(seed);
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  let randomNumber = 0;
  if (seed !== undefined) {
    randomNumber = randomWithSeed(seed);
  } else {
    randomNumber = Math.random();
  }
  return Math.floor(randomNumber * (max - min)) + min;
}
