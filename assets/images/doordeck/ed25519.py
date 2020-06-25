from nacl.signing import SigningKey, VerifyKey
from nacl.encoding import Base64Encoder

sk = SigningKey.generate()
vk = sk.verify_key

print "Private Key " + sk.encode(Base64Encoder())
print "Public Key " + vk.encode(Base64Encoder())