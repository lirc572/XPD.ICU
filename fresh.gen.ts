// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[order_id].tsx";
import * as $1 from "./routes/about.tsx";
import * as $2 from "./routes/api/tracking/[order_id].ts";
import * as $3 from "./routes/index.tsx";
import * as $$0 from "./islands/HistoryTable.tsx";
import * as $$1 from "./islands/OrderForm.tsx";

const manifest = {
  routes: {
    "./routes/[order_id].tsx": $0,
    "./routes/about.tsx": $1,
    "./routes/api/tracking/[order_id].ts": $2,
    "./routes/index.tsx": $3,
  },
  islands: {
    "./islands/HistoryTable.tsx": $$0,
    "./islands/OrderForm.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
