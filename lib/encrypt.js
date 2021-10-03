export default class Crypt {
  secret = "CIPHERKEY";
  // ENCRYPT
  Encrypt = (clear) => {
    var cipher = CryptoJS.AES.encrypt(clear, crypt.secret);
    cipher = cipher.toString();
    return cipher;
  };

  // DECRYPT
  decrypt = (cipher) => {
    var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    return decipher;
  };
}
