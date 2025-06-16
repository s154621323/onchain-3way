const OnChain = artifacts.require("OnChain");

module.exports = function (deployer) {
  deployer.deploy(OnChain);
};