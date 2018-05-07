# Android Forensic

## Parsing APK file

Our example will be on DIVA \(Damn insecure and vulnerable App\) APK file. You can download the file from [here](http://www.payatu.com/wp-content/uploads/2016/01/diva-beta.tar.gz).

Note: Some methods may not return the expected output because the missing information in the apk, e.g. the suggested apk doesn't have icon and signs but you can download some known apk like twitter apk or so and test it, it works.

We'll use ruby\_apk gem to do that

* Install ruby\_apk gem

  ```text
  gem install ruby_apk
  ```

Now, lets start parsing

```ruby
require 'ruby_apk'

apk = Android::Apk.new('diva-beta.apk')

# listing files in apk
apk.each_file do |name, data|
  puts "#{name}: #{data.size}bytes" # puts file name and data size
end

# Extract icon data in Apk
icons = apk.icon
icons.each do |name, data|
  File.open(File.basename(name), 'wb') {|f| f.write data } # save to file.
end

# Extract signature and certificate information from Apk
signs = apk.signs                   # retrun Hash(key: signature file path, value: OpenSSL::PKCS7)
signs.each do |path, sign|
  puts path
  puts sign
end

# Manifest
## Get readable xml
manifest = apk.manifest
puts manifest.to_xml

## Listing components and permissions
manifest.components.each do |c|     # 'c' is Android::Manifest::Component object
  puts "#{c.type}: #{c.name}"
  c.intent_filters.each do |filter|
    puts "\t#{filter.type}"
  end
end

## Extract application label string
puts apk.manifest.label

# Resource
## Extract resource strings from apk
rsc = apk.resource
rsc.strings.each do |str|
  puts str
end

## Parse resource file directly
rsc_data = File.open('resources.arsc', 'rb').read{|f| f.read }
rsc = Android::Resource.new(rsc_data)

# Resolve resource id
rsc = apk.resource

## assigns readable resource id
puts rsc.find('@string/app_name')   # => 'application name'

## assigns hex resource id
puts rsc.find('@0x7f040000')        # => 'application name'

## you can set lang attribute.
puts rsc.find('@0x7f040000', :lang => 'ja')

# Dex
## Extract dex information
dex = apk.dex
### listing string table in dex
dex.strings.each do |str|
  puts str
end

### listing all class names
dex.classes.each do |cls|           # cls is Android::Dex::ClassInfo
  puts "class: #{cls.name}"
  cls.virtual_methods.each do |m|   # Android::Dex::MethodInfo
    puts "\t#{m.definition}"        # puts method definition
  end
end

## Parse dex file directly
dex_data = File.open('classes.dex','rb').read{|f| f.read }
dex = Android::Dex.new(dex_data)
```

