const fs = require('fs');
const path = require('path');

function generateVoucherCodes(numCodes, codeLength) {
  const voucherCodes = new Set();
  while (voucherCodes.size < numCodes) {
    const code = Array.from({ length: codeLength }, () => Math.floor(Math.random() * 10)).join('');
    voucherCodes.add(code);
  }
  return voucherCodes;
}

function createCsvFile(filename, voucherCode, zipcode, denomination, validity) {
  const csvData = [
    [voucherCode, zipcode, denomination, validity] // Removed the header row here
  ].map(row => row.join(',')).join('\n');
  fs.writeFileSync(filename, csvData);
}

function main() {
  const numVouchers = 5;
  const voucherLength = 16;
  const zipcodes = [12344, 20001];
  const denomination = 50;
  const validity = '2024-12-31';

  const currentTimestamp = Date.now();
  for (let i = 1; i <= numVouchers; i++) {
    const filename = `file_${currentTimestamp}_${i}.csv`;
    const voucherCodes = generateVoucherCodes(zipcodes.length, voucherLength);
    const voucherIterator = voucherCodes.values();

    for (const zipcode of zipcodes) {
      const voucherCode = voucherIterator.next().value;
      createCsvFile(filename, voucherCode, zipcode, denomination, validity);
    }
  }
}

main();
