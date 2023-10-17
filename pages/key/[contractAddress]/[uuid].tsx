import { usePathname, useSearchParams } from "next/navigation";

export default function UUID() {
  const pathname = usePathname();
  console.log(pathname);
  //   const pathArray = pathname.split("/");
  const pathArray = pathname.match(/[^\/]+/g);
  console.log(pathArray);
  const contractAddress = pathArray?.[1];
  const uuid = pathArray?.[2];

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
            <h1 className="text-3xl font-bold">Check NFT Game Key</h1>
            <div>contract Address : {contractAddress}</div>
            <div>uuid : {uuid}</div>
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
