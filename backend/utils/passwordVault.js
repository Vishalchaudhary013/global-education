import crypto from 'crypto';

/**
 * Reversible storage for admin passwords, so a Super Admin can read back a
 * password that was set through the dashboard.
 *
 * This is NOT what authenticates anyone: `user.password` stays a one-way bcrypt
 * hash and remains the only thing login ever checks. The copy kept here is
 * AES-256-GCM encrypted under PASSWORD_VAULT_KEY, which lives in the
 * environment and never in the database, so a stolen dump or backup cannot be
 * read without it.
 *
 * Consequences worth knowing:
 * - Change or lose the key and every stored copy becomes unreadable. Logins
 *   keep working, since those only use the hash.
 * - A password set before the vault existed cannot be recovered. Only a hash
 *   was ever written, and hashing is one way.
 */

const ALGORITHM = 'aes-256-gcm';
const IV_BYTES = 12;

/** 32-byte key derived from the configured secret, or null when unset. */
const vaultKey = () => {
  const secret = process.env.PASSWORD_VAULT_KEY;
  if (!secret) return null;
  return crypto.createHash('sha256').update(secret).digest();
};

export const isVaultConfigured = () => !!vaultKey();

/** `iv:tag:ciphertext` in hex, or null when there is no key to encrypt with. */
export const encryptPassword = (plain) => {
  const key = vaultKey();
  if (!key || !plain) return null;

  const iv = crypto.randomBytes(IV_BYTES);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const ciphertext = Buffer.concat([
    cipher.update(String(plain), 'utf8'),
    cipher.final(),
  ]);

  return [
    iv.toString('hex'),
    cipher.getAuthTag().toString('hex'),
    ciphertext.toString('hex'),
  ].join(':');
};

/**
 * Returns null for anything this key cannot read — a missing value, a record
 * written under a different key, or a tampered one — so the caller can report
 * "not recorded" rather than failing.
 */
export const decryptPassword = (stored) => {
  const key = vaultKey();
  if (!key || !stored) return null;

  try {
    const [iv, tag, ciphertext] = String(stored).split(':');
    if (!iv || !tag || !ciphertext) return null;

    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      key,
      Buffer.from(iv, 'hex'),
    );
    decipher.setAuthTag(Buffer.from(tag, 'hex'));

    return Buffer.concat([
      decipher.update(Buffer.from(ciphertext, 'hex')),
      decipher.final(),
    ]).toString('utf8');
  } catch (error) {
    return null;
  }
};
