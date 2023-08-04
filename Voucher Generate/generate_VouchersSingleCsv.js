const fs = require('fs');
const path = require('path');

function generateVoucherCode(codeLength) {
  return Array.from({ length: codeLength }, () => Math.floor(Math.random() * 10)).join('');
}

function createCsvFile(filename, numVouchers, voucherLength, pincodes, denomination, validity) {
  const rows = [];

  for (let i = 0; i < numVouchers; i++) {
    const voucherCode = generateVoucherCode(voucherLength);
    const pincode = pincodes[i % pincodes.length];
    rows.push([voucherCode, pincode, denomination, validity]);
  }s

  const csvData = rows.map(row => row.join(',')).join('\n');
  fs.writeFileSync(filename, csvData);
}

function getCurrentDateTimeString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}_${hours}${minutes}${seconds}`;
}

function main() {
  const numVouchers = 4000;
  const voucherLength = 16;
  const pincodes = [12344, 20001];
  const denomination = 50;
  const validity = '2024-12-31'; 
aa
  const currentDate = getCurrentDateTimeString();
  const filename = `vouchers_${currentDate}.csv`;

  createCsvFile(filename, numVouchers, voucherLength, pincodes, denomination, validity);
}

main();
