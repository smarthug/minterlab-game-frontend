import { createPublicClient, createWalletClient, http, custom } from "viem";
import { cronosTestnet } from "viem/chains";
import ABI from "./abi.json";
import Web3 from "web3";
import { useRef } from "react";

const report721Address = "0x0a24DC8D22fd2F0DE88bb64132f681aB0F1F605C";
const badge1155Address = "0x455fDdAe3b2E2b7013d72bBE84a6c3536b144d95";

export default function BadgaGiver() {
  const reportId = useRef();
  const badgeType = useRef();

  async function giveBadge() {
    console.log("give badge");

    // 2. Set up your client with desired chain & transport.
    const publicClient = createPublicClient({
      chain: cronosTestnet,
      transport: http(),
    });

    // 3. Consume an action!
    // const blockNumber = await client.getBlockNumber();

    // console.log(blockNumber);

    const walletClient = createWalletClient({
      chain: cronosTestnet,
      transport: custom(window.ethereum),
    });

    const [address] = await walletClient.getAddresses();

    // console.log()
    console.log(ABI.ERC721Token.abi);

    const id = reportId.current.value;

    const TBAAddress = await publicClient.readContract({
      ...ABI.ERC721Token,
      functionName: "getAccountAddress",
      args: [id, 0],
      // account: address,
    });
    // const TBAAddress = await walletClient.writeContract(request);

    console.log(TBAAddress);

    //0 번
    //0xa4d404a14dbaef4338f52850fc77689601d18501eb50139953bec23a897ee27a

    // 29번
    //0xf6123686e6198dbea8dc67827f31fcdc5b05caa752f467f3dfee749f0b43fc8e

    // const { mintRequest } = await publicClient.simulateContract({
    //   ...ABI.ERC1155Token,
    //   functionName: "mint",
    //   args: ["0x209b7962Eb04112fab77F0F1e6cf235752453763", 0, 0],
    //   account: address,
    // });
    // const hash = await walletClient.writeContract(mintRequest);

    // console.log(hash);

    const web3 = new Web3(window.ethereum);

    const contract = await new web3.eth.Contract(
      ABI.ERC1155Token.abi,
      ABI.ERC1155Token.address
    );
    // console.log(contract.methods);
    let ret = await web3.eth
      .sendTransaction({
        from: address,
        to: ABI.ERC1155Token.address,
        data: contract.methods
          .mint(TBAAddress, badgeType.current.value, [])
          .encodeABI(),
        // gas: "1000000",
      })
      .then(function (receipt) {
        console.log("Mint success");
      });
  }

  return (
    <div>
      <h1>Badge Giver</h1>
      <div>
        제보 번호
        <input ref={reportId} id="reportId" type="number" defaultValue="29" />
      </div>

      <div>
        배지 번호
        <input
          ref={badgeType}
          id="badgeType"
          type="number"
          defaultValue="3"
          min={1}
          max={5}
        />
      </div>

      <button onClick={giveBadge}>Give Badge</button>

      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}

{
  /* <fieldset>
<legend>배지 타입:</legend>

<div>
  <input type="radio" id="1" name="badge" value="1" checked />
  <label for="1">1</label>
</div>

<div>
  <input type="radio" id="2" name="badge" value="2" />
  <label for="2">2</label>
</div>

<div>
  <input type="radio" id="3" name="badge" value="3" />
  <label for="3">3</label>
</div>

<div>
  <input type="radio" id="4" name="badge" value="4" />
  <label for="4">4</label>
</div>

<div>
  <input type="radio" id="5" name="badge" value="5" />
  <label for="5">5</label>
</div>
</fieldset> */
}
