# Cryptography

## Generating Hashes

### MD5 hash

```ruby
require 'digest'
puts Digest::MD5.hexdigest 'P@ssw0rd'
```

### SHA1 hash

```ruby
require 'digest'
puts Digest::SHA1.hexdigest 'P@ssw0rd'
```

### SHA2 hash

In SHA2 you have 2 ways to do it.

**Way \#1:** By creating a new SHA2 hash object with a given bit length.

```ruby
require 'digest'

# 1
sha2_256 = Digest::SHA2.new(bitlen = 256) # bitlen could be 256, 384, 512
sha2_256.hexdigest 'P@ssw0rd'

# 2
Digest::SHA2.new(bitlen = 256).hexdigest 'P@ssw0rd'
```

**Way \#2:** By Using the class directly

```ruby
require 'digest'
puts Digest::SHA256.hexdigest 'P@ssw0rd'
puts Digest::SHA384.hexdigest 'P@ssw0rd'
puts Digest::SHA512.hexdigest 'P@ssw0rd'
```

**Bonus: Generate Linux-like Shadow password**

```ruby
require 'digest/sha2'
password = 'P@ssw0rd'
salt = rand(36**8).to_s(36)
shadow_hash = password.crypt("$6$" + salt)
```

### Windows LM Password hash

```ruby
require 'openssl'

def split7(str)
  str.scan(/.{1,7}/)
end

def gen_keys(str)
  split7(str).map do |str7| 

    bits = split7(str7.unpack("B*")[0]).inject('') do |ret, tkn| 
      ret += tkn + (tkn.gsub('1', '').size % 2).to_s 
    end

    [bits].pack("B*")
  end
end

def apply_des(plain, keys)
  dec = OpenSSL::Cipher::DES.new
  keys.map {|k|
    dec.key = k
    dec.encrypt.update(plain)
  }
end

LM_MAGIC = "KGS!@\#$%"
def lm_hash(password)
  keys = gen_keys password.upcase.ljust(14, "\0")
  apply_des(LM_MAGIC, keys).join
end

puts lm_hash "P@ssw0rd"
```

[Source \| RubyNTLM](https://github.com/wimm/rubyntlm/blob/master/lib/net/ntlm.rb)

### Windows NTLMv1 Password hash

```ruby
require 'openssl'
ntlmv1 = OpenSSL::Digest::MD4.hexdigest "P@ssw0rd".encode('UTF-16LE')
puts ntlmv1
```

### Windows NTLMv2 Password hash

```ruby
require 'openssl'
ntlmv1 = OpenSSL::Digest::MD4.hexdigest "P@ssw0rd".encode('UTF-16LE')
userdomain = "administrator".encode('UTF-16LE')
ntlmv2 = OpenSSL::HMAC.digest(OpenSSL::Digest::MD5.new, ntlmv1, userdomain)
puts ntlmv2
```

### MySQL Password hash

```ruby
puts "*" + Digest::SHA1.hexdigest(Digest::SHA1.digest('P@ssw0rd')).upcase
```

### PostgreSQL Password hash

PostgreSQL hashes combined password and username then adds **md5** in front of the hash

```ruby
require 'digest/md5'
puts 'md5' + Digest::MD5.hexdigest('P@ssw0rd' + 'admin')
```

## Symmetric Encryptions

To list all supported algorithms

```ruby
require 'openssl'
puts OpenSSL::Cipher.ciphers
```

To unserdatand the cipher naming \(eg. `AES-128-CBC`\), it devided to 3 parts seperated by hyphen `<Name>-<Key_length>-<Mode>`

Symmetric encrption algorithms modes need 3 import data in order to work

1. Key \(password\)
2. Initial Vector \(iv\)
3. Data to encrypt \(plain text\) 

### AES encryption

#### Encrypt

```ruby
require "openssl"

data = 'Rubyfu Secret Mission: Go Hack The World!'

# Setup the cipher
cipher = OpenSSL::Cipher::AES.new('256-CBC')    # Or use: OpenSSL::Cipher.new('AES-256-CBC')
cipher.encrypt                                  # Initializes the Cipher for encryption. (Must be called before key, iv, random_key, random_iv)
key = cipher.random_key                         # If hard coded key, it must be 265-bits length
iv = cipher.random_iv                           # Generate iv
encrypted = cipher.update(data) + cipher.final  # Finalize the encryption
```

#### Dencrypt

```ruby
decipher = OpenSSL::Cipher::AES.new('256-CBC')  # Or use: OpenSSL::Cipher::Cipher.new('AES-256-CBC')
decipher.decrypt                                # Initializes the Cipher for dencryption. (Must be called before key, iv, random_key, random_iv)
decipher.key = key                              # Or generate secure random key: cipher.random_key
decipher.iv = iv                                # Generate iv
plain = decipher.update(encrypted) + decipher.final  # Finalize the dencryption
```

**Resources**

* [OpenSSL::Cipher docs](https://ruby-doc.org/stdlib-2.3.3/libdoc/openssl/rdoc/OpenSSL/Cipher.html)
* [\(Symmetric\) Encryption With Ruby \(and Rails\)](http://stuff-things.net/2015/02/12/symmetric-encryption-with-ruby-and-rails/)

## Caesar cipher

**Caesar cipher **is one of the oldest known encryption methods. It is very simple - it is just shifting an alphabet. Transformation is termed ROTN, where N is shift value and ROT is from "ROTATE" because this is a cyclic shift.

In Ruby, array rotation is mutter of using rotate\(\) method. So all what we need is to have array of all alphabets rotate it and map it with the original given string.

```ruby
#!/usb/bin/env ruby
#
# Caesar cipher
#

def caesar_cipher(string, shift=1)
  lowercase, uppercase = ('a'..'z').to_a, ('A'..'Z').to_a
  lower = lowercase.zip(lowercase.rotate(shift)).to_h
  upper = uppercase.zip(uppercase.rotate(shift)).to_h

  # One-liner: encrypter = ([*('a'..'z')].zip([*('a'..'z')].rotate(shift)) + [*('A'..'Z')].zip([*('A'..'Z')].rotate(shift))).to_h
  encrypter = lower.merge(upper)
  string.chars.map{|c| encrypter.fetch(c, c)}
end

string = ARGV[0]
1.upto(30) do |r|
  puts "ROT#{r}) " + caesar_cipher(string, r).join
end
```

result

```
$-> ruby caesar-cypher.rb Fipmti
ROT1) Gjqnuj
ROT2) Hkrovk
ROT3) Ilspwl
ROT4) Jmtqxm
ROT5) Knuryn
ROT6) Lovszo
ROT7) Mpwtap
ROT8) Nqxubq
ROT9) Oryvcr
ROT10) Pszwds
ROT11) Qtaxet
ROT12) Rubyfu   <--
ROT13) Svczgv
ROT14) Twdahw
ROT15) Uxebix
ROT16) Vyfcjy
ROT17) Wzgdkz
ROT18) Xahela
ROT19) Ybifmb
ROT20) Zcjgnc
ROT21) Adkhod
ROT22) Belipe
ROT23) Cfmjqf
ROT24) Dgnkrg
ROT25) Eholsh
ROT26) Fipmti
ROT27) Gjqnuj
ROT28) Hkrovk
ROT29) Ilspwl
ROT30) Jmtqxm
```

**Sources:**

* [http://www.blackbytes.info/2015/03/caesar-cipher-in-ruby/](http://www.blackbytes.info/2015/03/caesar-cipher-in-ruby/)
* [https://gist.github.com/matugm/db363c7131e6af27716c](https://gist.github.com/matugm/db363c7131e6af27716c)
* [https://planetcalc.com/1434/](https://planetcalc.com/1434/)

## Enigma script

| ![](../../images/module02/Cryptography__wiringdiagram.png) |
| :---: |
| **Figure 1.** Enigma machine diagram |

```ruby
Plugboard = Hash[*('A'..'Z').to_a.shuffle.first(20)]
Plugboard.merge!(Plugboard.invert)
Plugboard.default_proc = proc { |hash, key| key }

def build_a_rotor
  Hash[('A'..'Z').zip(('A'..'Z').to_a.shuffle)]
end

Rotor_1, Rotor_2, Rotor_3 = build_a_rotor, build_a_rotor, build_a_rotor

Reflector = Hash[*('A'..'Z').to_a.shuffle]
Reflector.merge!(Reflector.invert)

def input(string)
  rotor_1, rotor_2, rotor_3 = Rotor_1.dup, Rotor_2.dup, Rotor_3.dup

  string.chars.each_with_index.map do |char, index|
    rotor_1 = rotate_rotor rotor_1
    rotor_2 = rotate_rotor rotor_2 if index % 25 == 0
    rotor_3 = rotate_rotor rotor_3 if index % 25*25 == 0

    char = Plugboard[char]

    char = rotor_1[char]
    char = rotor_2[char]
    char = rotor_3[char]

    char = Reflector[char]

    char = rotor_3.invert[char]
    char = rotor_2.invert[char]
    char = rotor_1.invert[char]

    Plugboard[char]
  end.join
end

def rotate_rotor(rotor)
  Hash[rotor.map { |k,v| [k == 'Z' ? 'A' : k.next, v] }]
end

plain_text = 'IHAVETAKENMOREOUTOFALCOHOLTHANALCOHOLHASTAKENOUTOFME'
puts "Encrypted '#{plain_text}' to '#{encrypted = input(plain_text)}'"
puts "Decrypted '#{encrypted}' to '#{decrypted = input(encrypted)}'"
puts 'Success!' if plain_text == decrypted
```

[Source \| Understanding the Enigma machine with 30 lines of Ruby](http://red-badger.com/blog/2015/02/23/understanding-the-enigma-machine-with-30-lines-of-ruby-star-of-the-2014-film-the-imitation-game)

---



