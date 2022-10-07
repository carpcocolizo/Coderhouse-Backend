import yargs from "yargs";

export const args = yargs(process.argv.slice(2))
  .alias({ p: "puerto", m: "modo" })
  .default({ puerto: 8080, modo: "FORK" }).argv;

