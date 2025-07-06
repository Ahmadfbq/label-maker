import * as crypto from 'crypto'

interface EncryptedData {
  iv: string
  encryptedData: string
}

class EncryptDecrypt {
  private secretKey: Buffer
  private iv: Buffer

  constructor(secretKey: string) {
    // The secret key must be 32 bytes for AES-256
    this.secretKey = crypto
      .createHash('sha256')
      .update(secretKey)
      .digest()
      .subarray(0, 32)
    this.iv = crypto.randomBytes(16) // Initialization vector for AES-CBC
  }

  // Encrypt the JSON object
  encrypt(jsonObject: object): EncryptedData {
    const jsonString = JSON.stringify(jsonObject)

    // Create a cipher
    const cipher = crypto.createCipheriv('aes-256-cbc', this.secretKey, this.iv)

    let encrypted = cipher.update(jsonString, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    // Return the IV along with the encrypted data
    return {
      iv: this.iv.toString('hex'),
      encryptedData: encrypted
    }
  }

  // Decrypt the data
  decrypt(encryptedObj: EncryptedData): object {
    const { iv, encryptedData } = encryptedObj

    // Ensure the iv is in the correct format
    const ivBuffer = Buffer.from(iv, 'hex')

    // Create a decipher
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      this.secretKey,
      ivBuffer
    )

    let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    // Parse and return the decrypted JSON
    return JSON.parse(decrypted)
  }
}

export default EncryptDecrypt
