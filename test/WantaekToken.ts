import { expect } from "chai";
import { ethers, web3 } from "hardhat";
import { BigNumber } from "ethers";
import { zeroAddress } from "@nomicfoundation/ethereumjs-util";
import { WantaekToken } from "../typechain-types";

describe("WantaekToken", function () {
  const DEFAULT_ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000';
  const MINTER_ROLE = web3.utils.soliditySha3('MINTER_ROLE') ?? '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6';
  const PAUSER_ROLE = web3.utils.soliditySha3('PAUSER_ROLE') ?? '0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a';

  const amount = BigNumber.from('5000');

  async function deployContract() {
    const WantaekTokenFactory = await ethers.getContractFactory("WantaekToken");
    const wantaekToken: WantaekToken = await WantaekTokenFactory.deploy();

    const [deployer, ...others] = await ethers.getSigners();

    return { wantaekToken, deployer, others };
  }

  it('deployer has the default admin role', async function () {
    const { wantaekToken, deployer } = await deployContract();

    expect(await wantaekToken.getRoleMemberCount(DEFAULT_ADMIN_ROLE)).to.be.equal(BigNumber.from('1'));
    expect(await wantaekToken.getRoleMember(DEFAULT_ADMIN_ROLE, 0)).to.equal(deployer.address);
  });

  it('deployer has the minter role', async function () {
    const { wantaekToken, deployer } = await deployContract();

    expect(await wantaekToken.getRoleMemberCount(MINTER_ROLE)).to.be.equal(BigNumber.from('1'));
    expect(await wantaekToken.getRoleMember(MINTER_ROLE, 0)).to.equal(deployer.address);
  });

  it('deployer has the pauser role', async function () {
    const { wantaekToken, deployer } = await deployContract();

    expect(await wantaekToken.getRoleMemberCount(PAUSER_ROLE)).to.be.equal(BigNumber.from('1'));
    expect(await wantaekToken.getRoleMember(PAUSER_ROLE, 0)).to.equal(deployer.address);
  });

  it('minter and pauser role admin is the default admin', async function () {
    const { wantaekToken } = await deployContract();

    expect(await wantaekToken.getRoleAdmin(MINTER_ROLE)).to.equal(DEFAULT_ADMIN_ROLE);
    expect(await wantaekToken.getRoleAdmin(PAUSER_ROLE)).to.equal(DEFAULT_ADMIN_ROLE);
  });

  describe('minting', function () {
    it('deployer can mint tokens', async function () {
      const { wantaekToken, others: [other] } = await deployContract();

      const receipt = await wantaekToken.mint(other.address, amount);
      await expect(receipt).to.emit(wantaekToken, 'Transfer').withArgs(zeroAddress, other.address, amount);

      expect(await wantaekToken.balanceOf(other.address)).to.be.equal(amount);
    });

    it('other accounts cannot mint tokens', async function () {
      const { wantaekToken, others: [other] } = await deployContract();

      await expect(
        wantaekToken.connect(other).mint(other.address, amount),
      ).to.be.revertedWith('ERC20PresetMinterPauser: must have minter role to mint');
    });
  });

  describe('pausing', function () {
    it('deployer can pause', async function () {
      const { wantaekToken, deployer } = await deployContract();

      const receipt = await wantaekToken.pause();
      await expect(receipt).to.emit(wantaekToken, 'Paused').withArgs(deployer.address);

      expect(await wantaekToken.paused()).to.equal(true);
    });

    it('deployer can unpause', async function () {
      const { wantaekToken, deployer } = await deployContract();

      await wantaekToken.pause();

      const receipt = await wantaekToken.unpause();
      await expect(receipt).to.emit(wantaekToken, 'Unpaused').withArgs(deployer.address);

      expect(await wantaekToken.paused()).to.equal(false);
    });

    it('cannot mint while paused', async function () {
      const { wantaekToken, others: [other] } = await deployContract();

      await wantaekToken.pause();

      await expect(
        wantaekToken.mint(other.address, amount),
      ).to.be.revertedWith('ERC20Pausable: token transfer while paused');
    });

    it('other accounts cannot pause', async function () {
      const { wantaekToken, others: [other] } = await deployContract();

      await expect(
        wantaekToken.connect(other).pause(),
      ).to.be.revertedWith('ERC20PresetMinterPauser: must have pauser role to pause');
    });

    it('other accounts cannot unpause', async function () {
      const { wantaekToken, others: [other] } = await deployContract();

      await wantaekToken.pause();

      await expect(
        wantaekToken.connect(other).unpause(),
      ).to.be.revertedWith('ERC20PresetMinterPauser: must have pauser role to unpause');
    });
  });

  describe('burning', function () {
    it('holders can burn their tokens', async function () {
      const { wantaekToken, others: [other] } = await deployContract();

      await wantaekToken.mint(other.address, amount,);

      const receipt = await wantaekToken.connect(other).burn(amount.sub(1));
      await expect(receipt).to.emit(wantaekToken, 'Transfer').withArgs(other.address, zeroAddress, amount.sub(1));

      expect(await wantaekToken.balanceOf(other.address)).to.be.equal(BigNumber.from('1'));
    });
  });
})
