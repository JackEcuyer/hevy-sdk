# Hevy SDK

A TypeScript SDK for the Hevy API – compatible with Node.js, JavaScript frameworks, and browser environments.

## Features

- Fully typed API client for Hevy
- Supports both ESM and CommonJS
- Works in Node.js and browser environments
- Includes helpers for workouts, users, and error handling
- Built-in Zod validation for workout data

## Installation

```sh
npm install hevy-sdk
```

## Usage

### Basic Example

```ts
import { HevyClient, HevyClientConfig, Workout } from "hevy-sdk";

const config: HevyClientConfig = { apiKey: "your-api-key" };
const client = new HevyClient(config);

// Get specific workout info
const Workout: Workout = await client.workouts.getWorkout("workout-id");
```

### Error Handling

The SDK throws rich error types:

- [NetworkError](https://jackecuyer.github.io/hevy-sdk/classes/NetworkError.html): For network/fetch issues
- [ValidationError](https://jackecuyer.github.io/hevy-sdk/classes/ValidationError.html): For Zod validation failures
- [APIError](https://jackecuyer.github.io/hevy-sdk/classes/APIError.html): For errors from Hevy API

## API Reference

- [HevyClient](https://jackecuyer.github.io/hevy-sdk/classes/HevyClient.html): Main SDK client
- [Workouts](https://jackecuyer.github.io/hevy-sdk/classes/Workouts.html): Workouts API section
- [Users](https://jackecuyer.github.io/hevy-sdk/classes/Users.html): Users API section

## License

MIT
