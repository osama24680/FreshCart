import { setDefaultAutoSelectFamilyAttemptTimeout } from "node:net";

// Node's default of 250ms per connection attempt is too short on slow networks:
// fetch fails with AggregateError (ETIMEDOUT) before it can connect.
// Imported by the services because build workers don't run instrumentation.ts.
setDefaultAutoSelectFamilyAttemptTimeout(2000);
