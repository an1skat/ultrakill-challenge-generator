const mainLevels = [
  { title: "0-1: INTO THE FIRE", time: 150, kills: 71, challenge: true },
  { title: "0-2: THE MEATGRINDER", time: 120, kills: 53, challenge: true },
  { title: "0-3: DOUBLE DOWN", time: 210, kills: 49, challenge: true },
  { title: "0-4: A ONE-MACHINE ARMY", time: 140, kills: 53, challenge: true },
  { title: "0-5: CERBERUS", time: 120, kills: 2, challenge: true },

  { title: "1-1: HEART OF THE SUNRISE", time: 270, kills: 76, challenge: true },
  { title: "1-2: THE BURNING WORLD", time: 280, kills: 62, challenge: true },
  {
    title: "1-3: HALLS OF SACRED REMAINS",
    time: 480,
    kills: 125,
    challenge: true,
  },
  { title: "1-4: CLAIR DE LUNE", time: 135, kills: 0, challenge: true },

  { title: "2-1: BRIDGEBURNER", time: 210, kills: 69, challenge: true },
  {
    title: "2-2: DEATH AT 20,000 VOLTS",
    time: 300,
    kills: 62,
    challenge: true,
  },
  { title: "2-3: SHEER HEART ATTACK", time: 260, kills: 66, challenge: true },
  {
    title: "2-4: COURT OF THE CORPSE KING",
    time: 240,
    kills: 1,
    challenge: true,
  },

  { title: "3-1: BELLY OF THE BEAST", time: 330, kills: 88, challenge: true },
  { title: "3-2: IN THE FLESH", time: 270, kills: 0, challenge: true },

  { title: "4-1: SLAVES TO POWER", time: 240, kills: 102, challenge: true },
  { title: "4-2: GOD DAMN THE SUN", time: 280, kills: 69, challenge: true },
  { title: "4-3: A SHOT IN THE DARK", time: 330, kills: 75, challenge: true },
  { title: "4-4: CLAIR DE SOLEIL", time: 160, kills: 4, challenge: true },

  {
    title: "5-1: IN THE WAKE OF POSEIDON",
    time: 360,
    kills: 67,
    challenge: true,
  },
  {
    title: "5-2: WAVES OF THE STARLESS SEA",
    time: 270,
    kills: 37,
    challenge: true,
  },
  { title: "5-3: SHIP OF FOOLS", time: 480, kills: 120, challenge: true },
  { title: "5-4: LEVIATHAN", time: 130, kills: 1, challenge: true },

  { title: "6-1: CRY FOR THE WEEPER", time: 380, kills: 91, challenge: true },
  { title: "6-2: AESTHETICS OF HATE", time: 110, kills: 0, challenge: true },

  {
    title: "7-1: GARDEN OF FORKING PATHS",
    time: 400,
    kills: 51,
    challenge: true,
  },
  { title: "7-2: LIGHT UP THE NIGHT", time: 435, kills: 35, challenge: true },
  { title: "7-3: NO SOUND, NO MEMORY", time: 435, kills: 60, challenge: true },
  {
    title: "7-4: ...LIKE ANTENNAS TO HEAVEN",
    time: 330,
    kills: 32,
    challenge: true,
  },
];

const secretLevels = [
  {
    title: "0-S: SOMETHING WICKED",
    time: 60,
  },
  {
    title: "1-S: THE WITLESS",
    time: 90,
  },
  {
    title: "2-S: ALL-IMPERFECT LOVE SONG",
    time: null,
  },
  {
    title: "4-S: CLASH OF THE BRANDICOOT",
    time: 90,
    allBoxesTime: 150,
  },
  {
    title: "5-S: I ONLY SAY MORNING",
    time: 180,
  },
  {
    title: "7-S: HELL BATH NO FURY",
    time: 40,
    inboundsTime: 150,
  },
];

const primeLevels = [
  {
    title: "P-1: SOUL SURVIVOR",
    time: 213,
  },
  {
    title: "P-2: WAIT OF THE WORLD",
    time: 620,
    kills: 59,
  },
];

const encoreLevels = [
  {
    title: "0-E: THIS HEAT, AN EVIL HEAT",
    time: 570,
    kills: 111,
  },
  {
    title: "1-E: ...THEN FELL THE ASHES",
    time: 465,
    kills: 61,
  },
];

const challenges = [
  "No weapon",
  "No arm",
  "No parry",
  "Only parry",
  "Fist only",
  "Mayo%",
  "Only blue variation",
  "Only green variation",
  "Only red variation",
  "No alt guns",
  "Only pistols",
  "Only shotguns",
  "Only nailguns",
  "Only railcannons",
  "Only rocket launchers",
  "No restarts",
];

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function generateChallenge() {
  const mainChecked = document.getElementById("mainLevelsCheckbox").checked;
  const secretChecked = document.getElementById("secretLevelsCheckbox").checked;
  const primeChecked = document.getElementById("primeLevelsCheckbox").checked;
  const encoreChecked = document.getElementById("encoreLevelsCheckbox").checked;
  const hardMode = document.getElementById("hardModeCheckbox").checked;

  let availableLevels = [];
  if (mainChecked) availableLevels = availableLevels.concat(mainLevels);
  if (secretChecked) availableLevels = availableLevels.concat(secretLevels);
  if (primeChecked) availableLevels = availableLevels.concat(primeLevels);
  if (encoreChecked) availableLevels = availableLevels.concat(encoreLevels);

  if (availableLevels.length === 0) {
    return "Выберите хотя бы один тип уровней.";
  }

  // Выбираем случайный уровень
  const level =
    availableLevels[Math.floor(Math.random() * availableLevels.length)];

  // Выбираем случайный челлендж
  const challenge = challenges[Math.floor(Math.random() * challenges.length)];

  // Выбираем тип экстра условия (1, 2 или 3)
  const extraType = Math.floor(Math.random() * 3) + 1;

  let extra = "";

  if (extraType === 1 && level.time) {
    const randomTime = Math.floor(
      level.time * 0.75 + Math.random() * level.time * 0.25
    );
    extra = `less than ${formatTime(randomTime)}`;
  } else if (
    extraType === 2 &&
    level.kills !== undefined &&
    level.kills !== null
  ) {
    const randomKills = Math.floor(Math.random() * (level.kills + 10));
    const lessOrMore = Math.random() > 0.5 ? "no more than" : "no less than";
    extra = `${lessOrMore} ${randomKills} kills`;
  }

  // Формируем финальную строку
  let result = `${level.title} : ${challenge};`;
  if (extra) result += ` ${extra}`;
  if (hardMode) result += " P%";

  return result;
}

document
  .querySelector("[data-click]")
  .addEventListener(
    "click",
    () => (document.getElementById("result").textContent = generateChallenge())
  );
