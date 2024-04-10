import {describe, it} from "node:test";
import {expect} from "chai";
import {Query} from "../src/types";
import oomukade from "../src";

describe("App test", () => {
        const amountIn = "50000000"
        const query: Query = {
            params: {
                // USDC in Arbitrum
                tokenIn: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
                // USDC in Optimism
                tokenOut: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
                amountIn: amountIn,
                chainIdIn: 42161,
                chainIdOut: 10
            },
            slippage: 0.5
        }

        it("App should return data on create transaction", async () => {
            const result = await oomukade.createTransaction(
                "0x582dECD2485760D0a3Cb65cDc94777d35363Ed5D",
                "0x582dECD2485760D0a3Cb65cDc94777d35363Ed5D",
                query
            );
            expect(result).not.to.be.undefined;
        });
    }
)