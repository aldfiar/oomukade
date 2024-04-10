# Oomukade

JS client for request to https://docs.crosscurve.fi/

## Get price

```ts
import oomukade from "oomukade";

(async () => {
    const amountIn = "50000000"
    const query: Query = {
        params: {
            tokenIn: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
            tokenOut: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
            amountIn: amountIn,
            chainIdIn: 42161,
            chainIdOut: 10
        },
        slippage: 0.5
    }
    const response = oomukade.scanForRoutes(query)
})()

```

## Get data for transaction

```ts
import oomukade from "oomukade";

(async () => {
    const amountIn = "50000000"
    const query: Query = {
        params: {
            tokenIn: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
            tokenOut: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
            amountIn: amountIn,
            chainIdIn: 42161,
            chainIdOut: 10
        },
        slippage: 0.5
    }
    const response = oomukade.createTransaction("0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", query)
})()

```
