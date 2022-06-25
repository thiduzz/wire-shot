import { ethers } from "ethers";

export class SmartContractService {
  provider: ethers.providers.Web3Provider;
  abiSource: any;

  constructor(abi: any) {
    this.provider = this.getProvider();
    this.abiSource = abi;
  }

  getContract = (address: string, abiSource?: any): ethers.Contract => {
    return new ethers.Contract(
      address,
      abiSource ?? this.abiSource.abi,
      this.provider.getSigner()
    );
  };

  private getProvider = (): ethers.providers.Web3Provider => {
    const { ethereum } = window as any;
    if (!ethereum) {
      throw Error("Provider could not be set");
    }

    return new ethers.providers.Web3Provider(window.ethereum);
  };
}
