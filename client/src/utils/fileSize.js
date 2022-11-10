export const fileSize = (size) => {
  const Kb = (size / 1024).toFixed(0);
  const Mb = Kb > 1000 ? (Kb / 1024).toFixed(1) : "";
  const Gb = Mb > 1000 ? (Mb / 1024).toFixed(2) : "";
  return (Gb && Gb + "Gb") || (Mb && Mb + "Mb") || Kb + "Kb";
};
