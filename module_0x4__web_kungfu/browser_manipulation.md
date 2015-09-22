# Browser Manipulation 




## Selenium Webdriver


```ruby
#!/usr/bin/env ruby
#
#
require "selenium-webdriver"

# Profile setup
proxy = Selenium::WebDriver::Proxy.new(:http => "localhost:8080")
profile = Selenium::WebDriver::Firefox::Profile.from_name "default"
profile.proxy = proxy		# Set Proxy
profile.assume_untrusted_certificate_issuer = false	# Set Accept untrusted SSL cetificates
profile.native_events = true
driver = Selenium::WebDriver.for(:firefox, :profile => profile)

# driver = Selenium::WebDriver.for(:firefox, :profile => "default")
driver.manage.window.resize_to(500, 400)
driver.navigate.to "http://www.altoromutual.com/search.aspx?"


element = driver.find_element(:name, 'txtSearch')
element.send_keys "<img src=x onerror='alert(1)'>"
element.send_keys(:control, 't')

element = driver.find_element(:name, 'txtSearch')
element.send_keys "<img src=x onerror='alert(1)'>"
element.send_keys(:control, 't')


# element.send_keys(:control, 'w')


element.submit
```


> Note that the actual keys to send depend on your OS, for example, Mac uses `COMMAND + t`, instead of `CONTROL + t`.





https://www.browserstack.com/automate/ruby





## Watir Webdriver
http://watirwebdriver.com/

http://watir.com/
