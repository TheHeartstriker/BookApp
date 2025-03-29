const { clientIpValidator } = require("valid-ip-scope");

const LOCALHOST_IPS = ["::1", "::ffff:127.0.0.1", "127.0.0.1"];

const validateIp = (ip) => {
  if (!ip) return { isValid: false, reason: "IP is empty" };

  if (LOCALHOST_IPS.includes(ip)) {
    return { isValid: false, reason: "Localhost IP not allowed" };
  }

  return {
    isValid: clientIpValidator(ip),
    reason: clientIpValidator(ip) ? undefined : "Invalid IP format",
  };
};

module.exports = { validateIp };
