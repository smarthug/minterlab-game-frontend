import ethers from "ethers";
import contractFile from "./Contract.json";

export default function DaisyTest() {
  async function checkNFTKey() {
    // Get the nonce value from the backend server

    // Get the signer account using MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    console.log("BB");
    let contractData = JSON.parse(JSON.stringify(contractFile));

    const NFTAddress = contractData.NFTAddress;
    const NFTABI = contractData.NFTABI;
    const contract = new ethers.Contract(NFTAddress, NFTABI, provider);
    const contractWithSigner = contract.connect(signer);
    console.log(NFTAddress);

    const tx = await contractWithSigner.balanceOf(address);
    // const rc = await tx.wait();

    console.log(tx);
    // const result = ethers.utils.formatUnits(tx);
    const result = tx.toNumber();
    console.log(result);
    // console.log(rc);

    if (result > 0) {
      //   if (answer == "ok") {
      //     // window.location.href = "/success";
      //     // post 요청 보내기
      //   } else {
      //     // var element = document.getElementById("p1");
      //     // element.innerHTML = "Invalid Token !!!";
      //   }
    }
  }
  return (
    <div>
      <h1>hi</h1>
      <button className="btn btn-primary w-64 rounded-full btn-outline">
        Button
      </button>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
}
