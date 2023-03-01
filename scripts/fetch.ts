import { getTrackingInfo } from "../utils/api.ts";

const oid = Deno.args[0];
const n = parseInt(Deno.args[1]) || 0;

let id = 0;

if (!oid) {
  console.error("Please provide an order ID");
  Deno.exit(1);
}

// start with "XPD", followed by digits until the end
if (oid.match(/^XPD\d+$/) !== null) {
  id = parseInt(oid.slice(3));
} else if (oid.match(/^\d+$/) !== null) {
  id = parseInt(oid);
} else {
  console.error("Invalid order ID", oid);
  Deno.exit(1);
}

async function fetchAndSave(id: number) {
  const res = await getTrackingInfo(`XPD${id}`, false);
  if (res.history.length === 0) {
    throw new Error("No history");
  }
  const json = JSON.stringify(res, null, 2);
  await Deno.writeTextFile(`./data/XPD${id}.json`, json);
}

let total = 0;

let currentId = id;
for(;;) {
  if (currentId - id > n) {
    break;
  }
  try {
    await fetchAndSave(currentId);
    console.log(`Fetched XPD${currentId}`);
    total++;
  } catch (e) {
    console.log(`Failed to fetch XPD${currentId}: ${e}`);
  }
  currentId++;
}

currentId = id - 1;
for(;;) {
  if (id - currentId > n) {
    break;
  }
  try {
    await fetchAndSave(currentId);
    console.log(`Fetched XPD${currentId}`);
    total++;
  } catch (e) {
    console.log(`Failed to fetch XPD${currentId}: ${e}`);
  }
  currentId--;
}

console.log(`Fetched ${total} orders in total.`);
