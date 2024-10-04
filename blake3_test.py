# crypto_utils.py
from Crypto.Cipher import IDEA
import blake3
from Crypto.PublicKey import ECC
from Crypto.Signature import DSS
from Crypto.Hash import SHA256

# Cifrado y Descifrado IDEA
def idea_encrypt(plaintext, key):
    cipher = IDEA.new(key.encode('utf-8'), IDEA.MODE_ECB)
    padded_text = plaintext.ljust((len(plaintext) // 8 + 1) * 8)  # Ajustar a múltiplos de 8 bytes
    encrypted_text = cipher.encrypt(padded_text.encode('utf-8'))
    return encrypted_text.hex()

def idea_decrypt(ciphertext, key):
    cipher = IDEA.new(key.encode('utf-8'), IDEA.MODE_ECB)
    encrypted_bytes = bytes.fromhex(ciphertext)
    decrypted_text = cipher.decrypt(encrypted_bytes).decode('utf-8').strip()
    return decrypted_text

# Hashing con BLAKE3
def hash_blake3(data):
    return blake3.blake3(data.encode('utf-8')).hexdigest()

# Cifrado Asimétrico MQV (uso básico con ECC)
def mqv_key_generation():
    private_key = ECC.generate(curve='P-256')
    return private_key, private_key.public_key()

def mqv_encrypt(plaintext, pub_key):
    h = SHA256.new(plaintext.encode('utf-8'))
    signer = DSS.new(pub_key, 'fips-186-3')
    signature = signer.sign(h)
    return signature.hex()

def mqv_verify(plaintext, signature, priv_key):
    h = SHA256.new(plaintext.encode('utf-8'))
    verifier = DSS.new(priv_key, 'fips-186-3')
    try:
        verifier.verify(h, bytes.fromhex(signature))
        return "Verificación exitosa"
    except ValueError:
        return "La verificación falló"
