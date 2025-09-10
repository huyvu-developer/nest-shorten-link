import * as crypto from 'crypto';

const ALPHABET =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function encodeBase62BigInt(num: bigint): string {
  if (num === 0n) return '0';
  let str = '';
  while (num > 0n) {
    str = ALPHABET[Number(num % 62n)] + str;
    num /= 62n;
  }
  return str;
}

export function generateShortCode(originalUrl: string, length = 8): string {
  const now = new Date();

  // timestamp dạng YYYYMMDDHHmmss
  const timestamp =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0') +
    String(now.getHours()).padStart(2, '0') +
    String(now.getMinutes()).padStart(2, '0') +
    String(now.getSeconds()).padStart(2, '0');

  // raw = originalUrl + timestamp
  const raw = originalUrl + timestamp;

  // SHA-256 hash
  const hash = crypto.createHash('sha256').update(raw).digest();

  // lấy 8 byte đầu → BigInt
  let num = 0n;
  for (let i = 0; i < 8; i++) {
    num = (num << 8n) + BigInt(hash[i]);
  }

  // encode Base62 → cắt độ dài mong muốn
  return encodeBase62BigInt(num).slice(0, length);
}
