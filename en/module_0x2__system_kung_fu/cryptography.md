# Cryptography


## Generating Hashes 

###  MD5 hash
```ruby
require 'digest'
puts Digest::MD5.hexdigest 'P@ssw0rd'
```
### SHA1,2 hash
```ruby
require 'digest'
puts Digest::SHA256.hexdigest 'P@ssw0rd'
puts Digest::SHA384.hexdigest 'P@ssw0rd'
puts Digest::SHA512.hexdigest 'P@ssw0rd'
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
[Source | RubyNTLM][1]

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



## Enigma script

| ![Wireshark](../images/module02/Cryptography__wiringdiagram.png) |
|:---------------:|
| **Figure 1.** Enigma machine diagram  |

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
[Source | Understanding the Enigma machine with 30 lines of Ruby][2]





<br><br><br>
---
[1]: https://github.com/wimm/rubyntlm/blob/master/lib/net/ntlm.rb
[2]: http://red-badger.com/blog/2015/02/23/understanding-the-enigma-machine-with-30-lines-of-ruby-star-of-the-2014-film-the-imitation-game
- [RubyNTLM](https://github.com/wimm/rubyntlm)

