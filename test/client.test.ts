import {describe, it} from "node:test";
import {expect} from "chai";
import {CreateTransactionRequest} from "../src/client/types";
import {pusher} from "../src/client";
import {Query} from "../src";

describe("Client test", () => {
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

        it("Should receive data from scan request for pair", async () => {
            const result = await pusher.scanForRoutes(query)
            expect(result).to.be.an("array").that.length.gte(1)
            const firstRoute = result.route.pop()
            expect(firstRoute).to.not.be.undefined;
            expect(firstRoute).to.have.property('amountIn').equals(amountIn);
            expect(firstRoute).to.have.property('amountOut');
            expect(firstRoute).to.have.property('tokenInPrice').gt(0);
            expect(firstRoute).to.have.property('tokenOutPrice').gt(0);
        });

        it("Should receive data from estimate request for pair", async () => {
            const result = await pusher.scanForRoutes(query)
            expect(result).to.be.an("array").that.length.gte(1)
            const firstRoute = result.route.pop()
            expect(firstRoute).to.not.be.undefined;
            if (firstRoute != undefined) {
                const estimate = await pusher.fetchTransactionEstimate(result)
                expect(estimate).to.not.be.undefined;
                expect(estimate).to.have.property('priceInDollars')
                expect(estimate).to.have.property('executionPrice')
                expect(estimate).to.have.property('workerFee')
                expect(estimate).to.have.property('deadline')
                expect(estimate).to.have.property('signature')
            }
        });

        it("Should receive data from create transaction request for pair", async () => {
            const result = await pusher.scanForRoutes(query)
            expect(result).to.be.an("array").that.length.gte(1)
            const firstRoute = result.route.pop()
            expect(firstRoute).to.not.be.undefined;
            if (firstRoute != undefined) {
                const estimate = await pusher.fetchTransactionEstimate(result)
                expect(estimate).to.not.be.undefined;
                const request: CreateTransactionRequest = {
                    from: "0x582dECD2485760D0a3Cb65cDc94777d35363Ed5D",
                    recipient: "0x582dECD2485760D0a3Cb65cDc94777d35363Ed5D",
                    route: result.route,
                    estimate: estimate
                }
                const response = await pusher.createTransaction(request)
                expect(response).to.not.be.undefined;
                expect(response).to.have.property('to')
                expect(response).to.have.property('abi')
                expect(response).to.have.property('args').to.be.an("array")
            }
        });
    }
)