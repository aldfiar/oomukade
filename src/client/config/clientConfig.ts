// Define the interface for the API configuration for better type safety
interface ClientConfig {
    baseUrl: string;
    pools: Map<string, string>
}

const config: ClientConfig = {
    baseUrl: 'https://pusher.eywa.fi',
    pools: new Map([
        ["EUSD", "0xdA8A6f376f056f0b10980Ef0756Bd642BC3EcAb0"],
        ["eUSDT", "0x64D09662725dDc8D01a037618906a04326B9985f"],
        ["eUSDC", "0xBEF8C18a6aeB67f696A18698a067fBED2766D5b8"],
        ["eDAI", "0x0988Ee1FFACb40B39BE2C7af4A6de63A60eFC91D"],
        ["eTUSD", "0x54cc70A3324cAc8308045D027415e4Df82EE72B8"]
    ])
};

export default config;
export {ClientConfig}