# Browser Manipulation 




## Selenium Webdriver


```ruby
#!/usr/bin/env ruby
#
#
require "selenium-webdriver"

# Profile Setup and Tweak 
proxy = Selenium::WebDriver::Proxy.new(:http => "localhost:8080")
profile = Selenium::WebDriver::Firefox::Profile.from_name "default"
profile.proxy = proxy		# Set Proxy
profile.assume_untrusted_certificate_issuer = false	# Set Accept untrusted SSL cetificates
profile.native_events = true

# Start Driver 
driver = Selenium::WebDriver.for(:firefox, :profile => profile)         # Start firefox driver with specified profile
# driver = Selenium::WebDriver.for(:firefox, :profile => "default")     # Use this line if just need a current profile and no need to setup or tweak your profile
driver.manage.window.resize_to(500, 400)                                # Set Browser windows size
driver.navigate.to "http://www.altoromutual.com/search.aspx?"           #

# Interact with elements
element = driver.find_element(:name, 'txtSearch')   # Find an element named 'txtSearch'
element.send_keys "<img src=x onerror='alert(1)'>"  # Send your keys to element
element.send_keys(:control, 't')                    # Open a new tab
element.submit                                      # Submit 
```


> Note that the actual keys to send depend on your OS, for example, Mac uses `COMMAND + t`, instead of `CONTROL + t`.





https://www.browserstack.com/automate/ruby





## Watir Webdriver
http://watirwebdriver.com/

http://watir.com/
