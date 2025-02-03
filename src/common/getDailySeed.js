import {getSeedFromDate} from "./getSeedFromDate";

export default function getDailySeed() {
  const seed = getSeedFromDate();

  const isCustom = false;

  return [seed, isCustom]; // todo no longer need to return iscustom
}
