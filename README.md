# Hevy SDK

A TypeScript SDK for the Hevy API – compatible with Node.js, JavaScript frameworks, and browser environments.

## Getting Started

Install the SDK:

```
npm install hevy-sdk
```

## Usage Example

The main entry point for the SDK is the `HevyClient` class:

```ts
import { HevyClient, HevyClientConfig } from "hevy-sdk";

const config: HevyClientConfig = { apiKey: "your-api-key" };
const client: HevyClient = new HevyClient(config);
```

See the [HevyClient](https://jackecuyer.github.io/hevy-sdk/classes/HevyClient.html) class for all available methods and properties.

---

## API Reference

- [HevyClient](https://jackecuyer.github.io/hevy-sdk/classes/HevyClient.html): Main SDK client
- [Workouts](https://jackecuyer.github.io/hevy-sdk/classes/Workouts.html): Workouts API section
- [ValidationError](https://jackecuyer.github.io/hevy-sdk/classes/ValidationError.html): Error thrown on validation failure

---

For more details, see the generated documentation below.
